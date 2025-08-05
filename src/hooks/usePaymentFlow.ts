
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { validatePaymentAmount, logAuditEvent } from "@/lib/security";

interface CreatePaymentParams {
  bookingId: string;
  therapistId: string;
  amount: number;
  paymentMethod: 'stripe_card' | 'paypal' | 'zelle';
}

export const usePaymentFlow = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("");
  const [zelleConfirmed, setZelleConfirmed] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Reserve slot mutation
  const reserveSlotMutation = useMutation({
    mutationFn: async ({ slotId, patientId }: { slotId: string; patientId: string }) => {
      const { error } = await supabase
        .from('therapist_availability')
        .update({ 
          status: 'pending_payment',
          patient_id: patientId,
          pending_started_at: new Date().toISOString()
        })
        .eq('id', slotId)
        .eq('status', 'available');

      if (error) throw error;
      return slotId;
    }
  });

  // Create payment record mutation
  const createPaymentMutation = useMutation({
    mutationFn: async (params: CreatePaymentParams) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // Validate payment amount
      if (!validatePaymentAmount(params.amount)) {
        throw new Error('Invalid payment amount');
      }

      // Validate payment method
      if (!['stripe_card', 'paypal', 'zelle'].includes(params.paymentMethod)) {
        throw new Error('Invalid payment method');
      }

      const { data, error } = await supabase
        .from('payments')
        .insert({
          booking_id: params.bookingId,
          patient_id: user.id,
          therapist_id: params.therapistId,
          amount: params.amount,
          currency: 'USD',
          payment_method: params.paymentMethod,
          status: 'pending'
        })
        .select()
        .single();

      if (error) throw error;

      // Log audit event
      await logAuditEvent('payment_created', 'payments', data.id, null, {
        amount: params.amount,
        paymentMethod: params.paymentMethod,
        bookingId: params.bookingId
      });

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['therapist-availability'] });
    }
  });

  // Handle Zelle payment confirmation
  const handleZelleConfirmation = async (bookingId: string, therapistId: string, amount: number) => {
    try {
      // Additional validation for Zelle payments
      if (!validatePaymentAmount(amount)) {
        toast({
          title: "Error",
          description: "Invalid payment amount",
          variant: "destructive",
        });
        return false;
      }

      await createPaymentMutation.mutateAsync({
        bookingId,
        therapistId,
        amount,
        paymentMethod: 'zelle'
      });

      // Log Zelle confirmation attempt
      await logAuditEvent('zelle_payment_confirmed', 'payments', bookingId, null, {
        amount,
        therapistId
      });

      toast({
        title: "Zelle Payment Initiated",
        description: "Your slot is reserved. Please complete the Zelle transfer as instructed.",
      });

      return true;
    } catch (error) {
      // Log failed attempt
      await logAuditEvent('zelle_payment_failed', 'payments', null, null, {
        error: error instanceof Error ? error.message : 'Unknown error',
        amount,
        bookingId
      });

      toast({
        title: "Error",
        description: "Failed to initiate Zelle payment. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    selectedPaymentMethod,
    setSelectedPaymentMethod,
    zelleConfirmed,
    setZelleConfirmed,
    reserveSlotMutation,
    createPaymentMutation,
    handleZelleConfirmation,
  };
};
