
import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { DollarSign, Calendar, Clock, User } from "lucide-react";
import { formatTime } from "@/lib/timeUtils";

export const ZellePaymentManagement = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: pendingZellePayments, isLoading } = useQuery({
    queryKey: ["pending-zelle-payments"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from("payments")
        .select(`
          id,
          booking_id,
          patient_id,
          amount,
          currency,
          created_at,
          therapist_availability (
            slot_date,
            start_time,
            end_time,
            service_type
          ),
          profiles!payments_patient_id_fkey (
            username
          )
        `)
        .eq("therapist_id", user.id)
        .eq("payment_method", "zelle")
        .eq("status", "pending")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching pending Zelle payments:", error);
        return [];
      }

      return data || [];
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  const confirmZellePaymentMutation = useMutation({
    mutationFn: async (paymentId: string) => {
      const { data: payment, error: fetchError } = await supabase
        .from("payments")
        .select("booking_id")
        .eq("id", paymentId)
        .single();

      if (fetchError) throw fetchError;

      // Update payment status to succeeded
      const { error: paymentError } = await supabase
        .from("payments")
        .update({ status: "succeeded" })
        .eq("id", paymentId);

      if (paymentError) throw paymentError;

      // Update booking status to booked
      const { error: bookingError } = await supabase
        .from("therapist_availability")
        .update({ status: "booked" })
        .eq("id", payment.booking_id);

      if (bookingError) throw bookingError;

      return paymentId;
    },
    onSuccess: () => {
      toast({
        title: "Payment Confirmed",
        description: "Zelle payment has been confirmed and booking is now active.",
      });
      queryClient.invalidateQueries({ queryKey: ["pending-zelle-payments"] });
    },
    onError: (error) => {
      console.error("Error confirming Zelle payment:", error);
      toast({
        title: "Error",
        description: "Failed to confirm Zelle payment. Please try again.",
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Pending Zelle Payments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Loading pending Zelle payments...</p>
        </CardContent>
      </Card>
    );
  }

  if (!pendingZellePayments || pendingZellePayments.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Pending Zelle Payments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">No pending Zelle payments at this time.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          Pending Zelle Payments ({pendingZellePayments.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {pendingZellePayments.map((payment) => {
          const booking = payment.therapist_availability;
          const patient = payment.profiles;
          
          return (
            <div key={payment.id} className="border rounded-lg p-4 bg-purple-50">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-brand-navy">
                    {booking?.service_type?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {patient?.username || 'Unknown Patient'}
                    </div>
                    {booking && (
                      <>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {format(new Date(booking.slot_date), "PPP")}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {formatTime(booking.start_time)} - {formatTime(booking.end_time)}
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                  Zelle Pending
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4" />
                    <span className="font-semibold">${payment.amount} {payment.currency}</span>
                  </div>
                  <span className="text-gray-500">
                    Requested: {format(new Date(payment.created_at), "PPp")}
                  </span>
                  <span className="text-xs text-gray-500">
                    Booking ID: {payment.booking_id}
                  </span>
                </div>
                <Button
                  onClick={() => confirmZellePaymentMutation.mutate(payment.id)}
                  disabled={confirmZellePaymentMutation.isPending}
                  size="sm"
                  className="bg-green-600 hover:bg-green-700"
                >
                  {confirmZellePaymentMutation.isPending ? "Confirming..." : "Confirm Payment"}
                </Button>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
