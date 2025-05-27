
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const InPersonAssessment = () => (
  <div className="min-h-screen flex flex-col bg-brand-light">
    <div className="container mx-auto px-4 py-12 md:py-16 flex-1">
      <h1 className="text-4xl md:text-5xl font-serif font-medium text-brand-navy mb-6 text-center">
        In-Person Assessment
      </h1>
      <div className="max-w-2xl mx-auto text-lg text-gray-700 space-y-6">
        <p>
          Receive a comprehensive evaluation at your home, office, or preferred location by a licensed physical therapist.
        </p>
        <ul className="list-disc list-inside text-gray-600 mb-6">
          <li>Thorough movement, strength, and posture assessment</li>
          <li>Personalized treatment plan for your goals</li>
          <li>Hands-on care & manual techniques</li>
          <li>Home/gym exercise & mobility prescription</li>
          <li>Education & collaborative recovery approach</li>
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

export default InPersonAssessment;
