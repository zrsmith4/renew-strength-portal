
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { Clock, Calendar, DollarSign } from "lucide-react";

export const PendingBookings = () => {
  const { data: pendingBookings, isLoading } = useQuery({
    queryKey: ["pending-bookings"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from("therapist_availability")
        .select(`
          id,
          slot_date,
          start_time,
          end_time,
          service_type,
          pending_started_at,
          payments (
            id,
            amount,
            currency,
            payment_method,
            status,
            created_at
          )
        `)
        .eq("patient_id", user.id)
        .eq("status", "pending_payment")
        .order("slot_date", { ascending: true });

      if (error) {
        console.error("Error fetching pending bookings:", error);
        return [];
      }

      return data || [];
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  const formatTime = (timeString: string) => {
    const date = new Date(`2000-01-01T${timeString}`);
    return format(date, 'h:mm a');
  };

  const handleCompletePayment = (bookingId: string) => {
    // Navigate to payment completion flow
    window.location.href = `/patient-dashboard/complete-payment?booking=${bookingId}`;
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Pending Payments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Loading pending bookings...</p>
        </CardContent>
      </Card>
    );
  }

  if (!pendingBookings || pendingBookings.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Pending Payments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">No pending payments at this time.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Pending Payments ({pendingBookings.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {pendingBookings.map((booking) => {
          const payment = booking.payments?.[0]; // Get the most recent payment record
          
          return (
            <div key={booking.id} className="border rounded-lg p-4 bg-yellow-50">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-brand-navy">
                    {booking.service_type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {format(new Date(booking.slot_date), "PPP")}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {formatTime(booking.start_time)} - {formatTime(booking.end_time)}
                    </div>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                  Payment Pending
                </Badge>
              </div>
              
              {payment && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="h-4 w-4" />
                    <span>${payment.amount} {payment.currency}</span>
                    {payment.payment_method && (
                      <Badge variant="outline" className="capitalize">
                        {payment.payment_method.replace('_', ' ')}
                      </Badge>
                    )}
                  </div>
                  <Button
                    onClick={() => handleCompletePayment(booking.id)}
                    size="sm"
                    className="bg-brand-green hover:bg-brand-green/90"
                  >
                    Complete Payment
                  </Button>
                </div>
              )}
              
              {!payment && (
                <div className="flex justify-end">
                  <Button
                    onClick={() => handleCompletePayment(booking.id)}
                    size="sm"
                    className="bg-brand-green hover:bg-brand-green/90"
                  >
                    Complete Payment
                  </Button>
                </div>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
