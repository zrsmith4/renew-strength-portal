
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useMessaging } from "./useMessaging";

interface EligibleTherapist {
  id: string;
  username: string;
  role: string;
}

export const usePatientMessaging = () => {
  const [isNewConversationOpen, setIsNewConversationOpen] = useState(false);
  const [selectedTherapist, setSelectedTherapist] = useState<string>("");
  const [newConversationMessage, setNewConversationMessage] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Use the existing messaging hook
  const messagingHook = useMessaging();

  // Fetch eligible therapists for patient to message
  const { data: eligibleTherapists, isLoading: therapistsLoading } = useQuery({
    queryKey: ["eligible-therapists"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      // Get therapists that the patient has appointments with (past, current, or within next 48 hours)
      const now = new Date();
      const fortyEightHoursFromNow = new Date(now.getTime() + 48 * 60 * 60 * 1000);
      
      const { data, error } = await supabase
        .from("therapist_availability")
        .select(`
          therapist_id,
          slot_date,
          start_time
        `)
        .eq("patient_id", user.id)
        .eq("status", "booked");

      if (error) {
        console.error("Error fetching eligible therapists:", error);
        return [];
      }

      // Filter by date/time criteria and get unique therapists
      const eligibleTherapistIds = new Set<string>();

      data?.forEach((appointment) => {
        const slotDate = new Date(appointment.slot_date);
        const [hours, minutes] = appointment.start_time.split(':').map(Number);
        const slotDateTime = new Date(slotDate);
        slotDateTime.setHours(hours, minutes, 0, 0);

        // Check eligibility: past appointments OR within next 48 hours
        const isPastOrCurrent = slotDateTime <= now;
        const isWithinNext48Hours = slotDateTime <= fortyEightHoursFromNow && slotDateTime > now;

        if (isPastOrCurrent || isWithinNext48Hours) {
          eligibleTherapistIds.add(appointment.therapist_id);
        }
      });

      // Now fetch the therapist profiles for the eligible therapist IDs
      if (eligibleTherapistIds.size === 0) return [];

      const { data: therapists, error: therapistsError } = await supabase
        .from("profiles")
        .select("id, username, role")
        .in("id", Array.from(eligibleTherapistIds));

      if (therapistsError) {
        console.error("Error fetching therapist profiles:", therapistsError);
        return [];
      }

      return therapists || [];
    },
    enabled: !!messagingHook.currentUser,
  });

  // Create new conversation mutation
  const createConversationMutation = useMutation({
    mutationFn: async ({ therapistId, message }: { therapistId: string; message: string }) => {
      if (!messagingHook.currentUser) throw new Error("User not authenticated");

      // Check if conversation already exists
      const { data: existingConversation } = await supabase
        .from("conversations")
        .select("id")
        .or(
          `and(participant_one_id.eq.${messagingHook.currentUser.id},participant_two_id.eq.${therapistId}),and(participant_one_id.eq.${therapistId},participant_two_id.eq.${messagingHook.currentUser.id})`
        )
        .single();

      let conversationId: string;

      if (existingConversation) {
        conversationId = existingConversation.id;
      } else {
        // Create new conversation with consistent ordering
        const participantOneId = messagingHook.currentUser.id < therapistId ? messagingHook.currentUser.id : therapistId;
        const participantTwoId = messagingHook.currentUser.id < therapistId ? therapistId : messagingHook.currentUser.id;

        const { data: newConversation, error: conversationError } = await supabase
          .from("conversations")
          .insert({
            participant_one_id: participantOneId,
            participant_two_id: participantTwoId,
          })
          .select("id")
          .single();

        if (conversationError) throw conversationError;
        conversationId = newConversation.id;
      }

      // Send the initial message
      const { error: messageError } = await supabase
        .from("messages")
        .insert({
          conversation_id: conversationId,
          sender_id: messagingHook.currentUser.id,
          recipient_id: therapistId,
          message_text: message,
        });

      if (messageError) throw messageError;

      return conversationId;
    },
    onSuccess: (conversationId) => {
      // Close dialog and reset form
      setIsNewConversationOpen(false);
      setSelectedTherapist("");
      setNewConversationMessage("");
      
      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
      queryClient.invalidateQueries({ queryKey: ["messages"] });
      
      // Select the new/existing conversation
      messagingHook.setSelectedConversation(conversationId);
      
      toast({
        title: "Success",
        description: "Conversation started successfully!",
      });
    },
    onError: (error) => {
      console.error("Create conversation error:", error);
      toast({
        title: "Error",
        description: "Failed to start conversation. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleCreateConversation = () => {
    if (!selectedTherapist || !newConversationMessage.trim()) return;
    
    createConversationMutation.mutate({
      therapistId: selectedTherapist,
      message: newConversationMessage.trim(),
    });
  };

  return {
    ...messagingHook,
    // New conversation specific state and functions
    isNewConversationOpen,
    setIsNewConversationOpen,
    selectedTherapist,
    setSelectedTherapist,
    newConversationMessage,
    setNewConversationMessage,
    eligibleTherapists,
    therapistsLoading,
    handleCreateConversation,
    createConversationMutation,
  };
};
