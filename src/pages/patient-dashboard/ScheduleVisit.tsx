
import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const ScheduleVisit = () => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedService, setSelectedService] = useState<string>("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const serviceOptions = [
    { value: "in-person-assessment", label: "In-Person Assessment" },
    { value: "telehealth", label: "Telehealth" },
    { value: "dry-needling", label: "Dry Needling" },
    { value: "full-pt-telehealth", label: "Full PT Telehealth" },
  ];

  // Fetch available time slots from the database
  const { data: availableSlots, isLoading: slotsLoading } = useQuery({
    queryKey: ['therapist-availability', selectedDate, selectedService],
    queryFn: async () => {
      if (!selectedDate || !selectedService) return [];
      
      const dateString = format(selectedDate, 'yyyy-MM-dd');
      
      const { data, error } = await supabase
        .from('therapist_availability')
        .select('*')
        .eq('slot_date', dateString)
        .eq('service_type', selectedService)
        .eq('is_booked', false)
        .order('start_time');

      if (error) {
        console.error('Error fetching availability:', error);
        toast({
          title: "Error",
          description: "Failed to fetch available time slots",
          variant: "destructive",
        });
        return [];
      }

      return data || [];
    },
    enabled: !!selectedDate && !!selectedService,
  });

  // Book appointment mutation
  const bookAppointmentMutation = useMutation({
    mutationFn: async (slotId: string) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('therapist_availability')
        .update({ is_booked: true })
        .eq('id', slotId);

      if (error) throw error;
      
      return true;
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Your appointment has been booked successfully.",
      });
      // Reset form
      setSelectedDate(undefined);
      setSelectedService("");
      setSelectedTimeSlot("");
      // Refetch availability data
      queryClient.invalidateQueries({ queryKey: ['therapist-availability'] });
    },
    onError: (error) => {
      console.error('Booking error:', error);
      toast({
        title: "Error",
        description: "Failed to book appointment. Please try again.",
        variant: "destructive",
      });
    },
  });

  const isBookingEnabled = selectedDate && selectedService && selectedTimeSlot;

  const handleBookAppointment = () => {
    if (!isBookingEnabled) return;
    
    const selectedSlot = availableSlots?.find(slot => 
      `${slot.start_time}-${slot.end_time}` === selectedTimeSlot
    );
    
    if (selectedSlot) {
      bookAppointmentMutation.mutate(selectedSlot.id);
    }
  };

  // Format time for display
  const formatTime = (timeString: string) => {
    const date = new Date(`2000-01-01T${timeString}`);
    return format(date, 'h:mm a');
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
        
        <div className="container mx-auto max-w-2xl relative z-10 px-4">
          <h1 className="font-serif text-3xl text-brand-green mb-8 text-center">
            Schedule Your Visit
          </h1>
          
          <div className="space-y-6">
            {/* Date Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium text-brand-navy">Select Date</CardTitle>
              </CardHeader>
              <CardContent>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !selectedDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date < new Date()}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </CardContent>
            </Card>

            {/* Service Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium text-brand-navy">Select Service</CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={selectedService} onValueChange={setSelectedService}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose a service type" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceOptions.map((service) => (
                      <SelectItem key={service.value} value={service.value}>
                        {service.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Available Time Slots */}
            {selectedDate && selectedService && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-medium text-brand-navy">
                    Available Time Slots for {format(selectedDate, "PPP")} - {serviceOptions.find(s => s.value === selectedService)?.label}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {slotsLoading ? (
                    <div className="flex justify-center py-4">
                      <p className="text-gray-600">Loading available slots...</p>
                    </div>
                  ) : availableSlots && availableSlots.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {availableSlots.map((slot) => {
                        const timeSlotValue = `${slot.start_time}-${slot.end_time}`;
                        const displayTime = `${formatTime(slot.start_time)} - ${formatTime(slot.end_time)}`;
                        
                        return (
                          <Button
                            key={slot.id}
                            variant={selectedTimeSlot === timeSlotValue ? "default" : "outline"}
                            className={cn(
                              "h-12 flex items-center justify-center gap-2",
                              selectedTimeSlot === timeSlotValue && "bg-brand-green hover:bg-brand-green/90"
                            )}
                            onClick={() => setSelectedTimeSlot(timeSlotValue)}
                          >
                            <Clock className="h-4 w-4" />
                            {displayTime}
                          </Button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-gray-600">No available slots for the selected date and service.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Book Appointment Button */}
            <div className="flex justify-center pt-4">
              <Button
                onClick={handleBookAppointment}
                disabled={!isBookingEnabled || bookAppointmentMutation.isPending}
                className="bg-brand-green hover:bg-brand-green/90 text-white px-8 py-3 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {bookAppointmentMutation.isPending ? "Booking..." : "Book Appointment"}
              </Button>
            </div>

            {!isBookingEnabled && (
              <p className="text-center text-gray-600 text-sm">
                Please select a date, service, and time slot to book your appointment.
              </p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ScheduleVisit;
