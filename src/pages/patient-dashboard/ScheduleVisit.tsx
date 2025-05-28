
import React, { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
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

const ScheduleVisit = () => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedService, setSelectedService] = useState<string>("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");

  const serviceOptions = [
    { value: "in-person-assessment", label: "In-Person Assessment" },
    { value: "telehealth", label: "Telehealth" },
    { value: "dry-needling", label: "Dry Needling" },
    { value: "full-pt-telehealth", label: "Full PT Telehealth" },
  ];

  // TODO: Replace with actual available time slots from backend API
  const availableTimeSlots = [
    "9:00 AM",
    "10:30 AM",
    "12:00 PM",
    "1:00 PM",
    "2:30 PM",
    "4:00 PM"
  ];

  const isBookingEnabled = selectedDate && selectedService && selectedTimeSlot;

  const handleBookAppointment = () => {
    if (isBookingEnabled) {
      // TODO: Integrate with backend booking system
      alert("Appointment request submitted (backend integration needed).");
    }
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
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {availableTimeSlots.map((timeSlot) => (
                      <Button
                        key={timeSlot}
                        variant={selectedTimeSlot === timeSlot ? "default" : "outline"}
                        className={cn(
                          "h-12 flex items-center justify-center gap-2",
                          selectedTimeSlot === timeSlot && "bg-brand-green hover:bg-brand-green/90"
                        )}
                        onClick={() => setSelectedTimeSlot(timeSlot)}
                      >
                        <Clock className="h-4 w-4" />
                        {timeSlot}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Book Appointment Button */}
            <div className="flex justify-center pt-4">
              <Button
                onClick={handleBookAppointment}
                disabled={!isBookingEnabled}
                className="bg-brand-green hover:bg-brand-green/90 text-white px-8 py-3 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Book Appointment
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
