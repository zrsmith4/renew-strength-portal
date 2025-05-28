
import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const Availability = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow bg-brand-light py-12">
        <div className="container mx-auto max-w-xl text-center">
          <h1 className="font-serif text-3xl text-brand-navy mb-6">
            Manage Your Availability
          </h1>
          <div className="bg-white border rounded-lg shadow-md px-8 py-12">
            <p className="text-gray-700">
              This page will allow you to set and manage your open time slots for patient scheduling.
            </p>
            {/*  */}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Availability;
