
import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const StaffMessages = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow bg-brand-light py-12">
        <div className="container mx-auto max-w-xl text-center">
          <h1 className="font-serif text-3xl text-brand-navy mb-6">
            Staff Messaging
          </h1>
          <div className="bg-white border rounded-lg shadow-md px-8 py-12">
            <p className="text-gray-700">
              This page will provide an interface for communicating with patients.
            </p>
            {/*  */}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StaffMessages;
