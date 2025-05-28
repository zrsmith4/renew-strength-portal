
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { ConversationList } from "@/components/messaging/ConversationList";
import { MessageArea } from "@/components/messaging/MessageArea";
import { NewConversationDialog } from "@/components/messaging/NewConversationDialog";
import { useMessaging } from "@/hooks/useMessaging";
import { useToast } from "@/hooks/use-toast";

const StaffMessages = () => {
  const [selectedPatient, setSelectedPatient] = useState<string>("");
  const [newConversationMessage, setNewConversationMessage] = useState("");
  const [isNewConversationOpen, setIsNewConversationOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    selectedConversation,
    setSelectedConversation,
    newMessage,
    setNewMessage,
    currentUser,
    conversations,
    conversationsLoading,
    messages,
    messagesLoading,
    handleConversationSelect,
    handleSendMessage,
    sendMessageMutation
  } = useMessaging();

  // Fetch all patients for new conversation
  const { data: patients } = useQuery({
    queryKey: ["patients"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("role", "patient");

      if (error) throw error;
      return data || [];
    },
  });

  // Create new conversation mutation
  const createConversationMutation = useMutation({
    mutationFn: async ({ patientId, messageText }: { patientId: string; messageText: string }) => {
      if (!currentUser) throw new Error("User not authenticated");

      // Check if conversation already exists
      const { data: existingConv } = await supabase
        .from("conversations")
        .select("id")
        .or(`and(participant_one_id.eq.${currentUser.id},participant_two_id.eq.${patientId}),and(participant_one_id.eq.${patientId},participant_two_id.eq.${currentUser.id})`)
        .single();

      let conversationId;

      if (existingConv) {
        conversationId = existingConv.id;
      } else {
        // Create new conversation
        const { data: newConv, error: convError } = await supabase
          .from("conversations")
          .insert({
            participant_one_id: currentUser.id,
            participant_two_id: patientId,
          })
          .select("id")
          .single();

        if (convError) throw convError;
        conversationId = newConv.id;
      }

      // Send the message
      const { error: messageError } = await supabase
        .from("messages")
        .insert({
          conversation_id: conversationId,
          sender_id: currentUser.id,
          recipient_id: patientId,
          message_text: messageText,
        });

      if (messageError) throw messageError;

      return conversationId;
    },
    onSuccess: (conversationId) => {
      setNewConversationMessage("");
      setSelectedPatient("");
      setIsNewConversationOpen(false);
      setSelectedConversation(conversationId);
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
      queryClient.invalidateQueries({ queryKey: ["messages"] });
      toast({
        title: "Conversation started",
        description: "Your message has been sent successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to start conversation. Please try again.",
        variant: "destructive",
      });
      console.error("Create conversation error:", error);
    },
  });

  // Handle create new conversation
  const handleCreateConversation = () => {
    if (!selectedPatient || !newConversationMessage.trim()) return;

    createConversationMutation.mutate({
      patientId: selectedPatient,
      messageText: newConversationMessage.trim(),
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow bg-brand-light py-12 relative overflow-hidden">
        {/* Logo Watermark */}
        <div 
          className="absolute inset-0 bg-no-repeat bg-center bg-contain opacity-20 pointer-events-none z-0"
          style={{
            backgroundImage: 'url(/lovable-uploads/1f7bbb3b-71d2-4a9b-aeaa-8dac88d8d1e2.png)'
          }}
        />
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="flex justify-between items-center mb-6">
            <h1 className="font-serif text-3xl text-brand-navy">
              Staff Messaging
            </h1>
            <NewConversationDialog
              isOpen={isNewConversationOpen}
              onOpenChange={setIsNewConversationOpen}
              patients={patients}
              selectedPatient={selectedPatient}
              onPatientSelect={setSelectedPatient}
              message={newConversationMessage}
              onMessageChange={setNewConversationMessage}
              onCreateConversation={handleCreateConversation}
              isCreating={createConversationMutation.isPending}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[600px]">
            <ConversationList
              conversations={conversations}
              isLoading={conversationsLoading}
              selectedConversation={selectedConversation}
              onConversationSelect={handleConversationSelect}
              title="Patient Conversations"
            />

            <MessageArea
              selectedConversation={selectedConversation}
              conversations={conversations}
              messages={messages}
              messagesLoading={messagesLoading}
              currentUserId={currentUser?.id}
              newMessage={newMessage}
              onMessageChange={setNewMessage}
              onSendMessage={handleSendMessage}
              sendDisabled={!newMessage.trim() || sendMessageMutation.isPending}
              bubbleColor="bg-brand-navy"
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StaffMessages;
