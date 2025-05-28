import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const ScheduleVisit = () => {
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
        
        <div className="container mx-auto max-w-xl text-center relative z-10">
          <h1 className="font-serif text-3xl text-brand-green mb-6">
            Schedule Your Visit
          </h1>
          <div className="bg-white border rounded-lg shadow-md px-8 py-12">
            <p className="text-gray-700 mb-2">
              This page will feature a calendar and options to select service types and available time slots.
            </p>
            {/* Here: Calendar and service selectors will be added in the future */}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ScheduleVisit;
