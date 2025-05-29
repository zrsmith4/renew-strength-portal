
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { Profile, AvailabilitySlot, SlotFormData } from "@/types/availability";

export const useAvailability = () => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTherapistId, setSelectedTherapistId] = useState<string>("");
  const [currentUserProfile, setCurrentUserProfile] = useState<Profile | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch current user profile
  const { data: userProfile, isLoading: profileLoading } = useQuery({
    queryKey: ['current-user-profile'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      return data as Profile;
    },
  });

  // Fetch all therapists (for admin users)
  const { data: therapists, isLoading: therapistsLoading } = useQuery({
    queryKey: ['therapists'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'therapist')
        .order('username');

      if (error) throw error;
      return data as Profile[];
    },
    enabled: userProfile?.role === 'admin',
  });

  // Set current user profile and initial therapist selection
  useEffect(() => {
    if (userProfile) {
      setCurrentUserProfile(userProfile);
      if (userProfile.role === 'therapist') {
        setSelectedTherapistId(userProfile.id);
      } else if (userProfile.role === 'admin' && therapists && therapists.length > 0) {
        setSelectedTherapistId(therapists[0].id);
      }
    }
  }, [userProfile, therapists]);

  // Fetch availability slots for selected date and therapist
  const { data: availabilitySlots, isLoading: slotsLoading } = useQuery({
    queryKey: ['availability-slots', selectedDate, selectedTherapistId],
    queryFn: async () => {
      if (!selectedDate || !selectedTherapistId) return [];
      
      const dateString = format(selectedDate, 'yyyy-MM-dd');
      
      const { data, error } = await supabase
        .from('therapist_availability')
        .select('*')
        .eq('slot_date', dateString)
        .eq('therapist_id', selectedTherapistId)
        .order('start_time');

      if (error) throw error;
      return data as AvailabilitySlot[];
    },
    enabled: !!selectedDate && !!selectedTherapistId,
  });

  // Add new slot mutation
  const addSlotMutation = useMutation({
    mutationFn: async (slotData: SlotFormData) => {
      if (!selectedDate || !selectedTherapistId) throw new Error('Missing required data');

      const { error } = await supabase
        .from('therapist_availability')
        .insert({
          therapist_id: selectedTherapistId,
          slot_date: format(selectedDate, 'yyyy-MM-dd'),
          start_time: slotData.start_time,
          end_time: slotData.end_time,
          service_type: slotData.service_type,
          status: 'available',
        });

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "New availability slot added successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['availability-slots'] });
    },
    onError: (error) => {
      console.error('Add slot error:', error);
      toast({
        title: "Error",
        description: "Failed to add availability slot. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Update slot mutation
  const updateSlotMutation = useMutation({
    mutationFn: async ({ slotId, slotData }: { slotId: string; slotData: SlotFormData }) => {
      const { error } = await supabase
        .from('therapist_availability')
        .update({
          start_time: slotData.start_time,
          end_time: slotData.end_time,
          service_type: slotData.service_type,
        })
        .eq('id', slotId);

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Availability slot updated successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['availability-slots'] });
    },
    onError: (error) => {
      console.error('Update slot error:', error);
      toast({
        title: "Error",
        description: "Failed to update availability slot. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Delete slot mutation
  const deleteSlotMutation = useMutation({
    mutationFn: async (slotId: string) => {
      const { error } = await supabase
        .from('therapist_availability')
        .delete()
        .eq('id', slotId);

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Availability slot deleted successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['availability-slots'] });
    },
    onError: (error) => {
      console.error('Delete slot error:', error);
      toast({
        title: "Error",
        description: "Failed to delete availability slot. Please try again.",
        variant: "destructive",
      });
    },
  });

  return {
    selectedDate,
    setSelectedDate,
    selectedTherapistId,
    setSelectedTherapistId,
    currentUserProfile,
    userProfile,
    therapists,
    availabilitySlots,
    profileLoading,
    therapistsLoading,
    slotsLoading,
    addSlotMutation,
    updateSlotMutation,
    deleteSlotMutation,
  };
};
