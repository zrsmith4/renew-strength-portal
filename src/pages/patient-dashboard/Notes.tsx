
import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const Notes = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow bg-brand-light py-12">
        <div className="container mx-auto max-w-xl text-center">
          <h1 className="font-serif text-3xl text-brand-green mb-6">
            Your Session Notes
          </h1>
          <div className="bg-white border rounded-lg shadow-md px-8 py-12">
            <p className="text-gray-700">
              This page will securely display your past session notes.
            </p>
            {/* Placeholder for session notes viewer */}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Notes;

