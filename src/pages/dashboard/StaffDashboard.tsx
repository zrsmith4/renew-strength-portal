
import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const StaffDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow bg-brand-light py-8">
        <div className="container mx-auto max-w-2xl text-center">
          <h1 className="font-serif text-3xl text-brand-navy mb-3">Staff Dashboard</h1>
          <p>Welcome to the staff dashboard. Review bookings, patient info, and more here.</p>
          {/* Add appointment management, analytics, etc. here */}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StaffDashboard;
