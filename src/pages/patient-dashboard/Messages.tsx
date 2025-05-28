
import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const Messages = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow bg-brand-light py-12">
        <div className="container mx-auto max-w-xl text-center">
          <h1 className="font-serif text-3xl text-brand-green mb-6">
            Your Messages
          </h1>
          <div className="bg-white border rounded-lg shadow-md px-8 py-12">
            <p className="text-gray-700">
              This page will display your secure messages with your therapist.
            </p>
            {/* Placeholder for messages feature */}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Messages;

