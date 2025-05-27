
import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import AppointmentBookingForm from "@/components/AppointmentBookingForm";

const Schedule = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow bg-brand-light py-8">
        <div className="container mx-auto max-w-2xl">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-serif text-2xl text-brand-navy text-center">
                Book an Appointment
              </CardTitle>
            </CardHeader>
            <AppointmentBookingForm />
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Schedule;
