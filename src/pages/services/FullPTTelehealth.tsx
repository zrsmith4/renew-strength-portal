
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const FullPTTelehealth = () => (
  <div className="min-h-screen flex flex-col bg-brand-light">
    <div className="container mx-auto px-4 py-12 md:py-16 flex-1">
      <h1 className="text-4xl md:text-5xl font-serif font-medium text-brand-navy mb-6 text-center">
        Full PT Telehealth Visit
      </h1>
      <div className="max-w-2xl mx-auto text-lg text-gray-700 space-y-6">
        <p>
          Complete remote PT session: exercise guidance, progress check-ins, and plan updates.
        </p>
        <ul className="list-disc list-inside text-gray-600 mb-6">
          <li>Individualized PT session (live video)</li>
          <li>Correct form guidance and progression</li>
          <li>Home exercise updates</li>
          <li>Full support, Q&amp;A for ongoing care</li>
        </ul>
        <div className="text-center mt-10">
          <Button asChild className="bg-brand-green text-white text-lg px-8 py-4">
            <Link to="/contact">Book Now</Link>
          </Button>
        </div>
      </div>
    </div>
  </div>
);

export default FullPTTelehealth;
