
import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { PendingBookings } from "@/components/dashboard/PendingBookings";

const appointmentList = []; // You can replace this with dummy data or fetch from an API later

const PatientDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow bg-brand-light py-8 relative overflow-hidden">
        {/* Logo Watermark */}
        <div 
          className="absolute inset-0 bg-no-repeat bg-center bg-contain opacity-20 pointer-events-none z-0"
          style={{
            backgroundImage: 'url(/lovable-uploads/1f7bbb3b-71d2-4a9b-aeaa-8dac88d8d1e2.png)'
          }}
        />
        
        <div className="container mx-auto max-w-4xl relative z-10">
          <h1 className="font-serif text-3xl text-brand-green mb-3 text-center">
            Patient Dashboard
          </h1>
          <p className="text-center mb-8">
            Welcome to your personalized patient dashboard!
          </p>
          
          {/* Pending Payments Section - Full Width */}
          <div className="mb-8">
            <PendingBookings />
          </div>
          
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
            {/* Upcoming Appointments Section */}
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-brand-navy">
                  Your Upcoming Appointments
                </h2>
              </CardHeader>
              <CardContent>
                {appointmentList.length === 0 ? (
                  <p>You have no upcoming appointments.</p>
                ) : (
                  <ul className="list-disc pl-5">
                    {appointmentList.map((appt, idx) => (
                      <li key={idx}>{appt.details}</li>
                    ))}
                  </ul>
                )}
                {/* Later: Replace with real data from backend */}
              </CardContent>
            </Card>
            
            {/* Schedule New Visit Section */}
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-brand-navy">
                  Schedule a New Visit
                </h2>
              </CardHeader>
              <CardContent>
                <p>
                  Find a time that works for you and book your next session.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild>
                  <Link to="/patient-dashboard/schedule">Schedule Now</Link>
                </Button>
              </CardFooter>
            </Card>
            
            {/* Messaging Section */}
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-brand-navy">
                  Message Your Therapist
                </h2>
              </CardHeader>
              <CardContent>
                <p>
                  Send and receive secure messages from your therapist.
                </p>
                {/* Later: Add real messaging component */}
              </CardContent>
              <CardFooter>
                <Button asChild>
                  <Link to="/patient-dashboard/messages">Go to Messages</Link>
                </Button>
              </CardFooter>
            </Card>
            
            {/* Previous Notes Section */}
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-brand-navy">
                  View Your Session Notes
                </h2>
              </CardHeader>
              <CardContent>
                <p>
                  Securely access notes from your past physical therapy sessions.
                </p>
                {/* Later: Add notes viewer */}
              </CardContent>
              <CardFooter>
                <Button asChild>
                  <Link to="/patient-dashboard/notes">View Notes</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PatientDashboard;
