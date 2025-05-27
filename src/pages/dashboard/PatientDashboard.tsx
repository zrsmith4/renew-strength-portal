
import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const PatientDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow bg-brand-light py-8">
        <div className="container mx-auto max-w-2xl text-center">
          <h1 className="font-serif text-3xl text-brand-green mb-3">Patient Dashboard</h1>
          <p>Welcome to your personalized patient dashboard!</p>
          {/* Add appointments, upcoming sessions, messages, etc. here */}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PatientDashboard;
