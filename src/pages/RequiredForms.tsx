
import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const RequiredForms = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow flex flex-col items-center justify-center bg-brand-light py-12 relative overflow-hidden">
        {/* Logo Watermark */}
        <div 
          className="absolute inset-0 bg-no-repeat bg-center bg-contain opacity-20 pointer-events-none z-0"
          style={{
            backgroundImage: 'url(/lovable-uploads/1f7bbb3b-71d2-4a9b-aeaa-8dac88d8d1e2.png)'
          }}
        />
        
        <div className="bg-white rounded-md shadow-md max-w-xl w-full px-8 py-10 text-center relative z-10">
          <h1 className="text-2xl font-serif text-brand-navy mb-6">
            Important Next Steps for Scheduling Your Visit
          </h1>
          <p className="text-gray-700 mb-8">
            To finalize your appointment scheduling, please complete the following required intake forms.
          </p>
          <div className="flex flex-col gap-4 justify-center">
            <Button asChild className="w-full">
              <Link to="/patient-dashboard/financial-policy">Complete Financial Policy</Link>
            </Button>
            <Button asChild variant="secondary" className="w-full">
              <Link to="/patient-dashboard/consent-to-treat">Complete Consent to Treat</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link to="/patient-dashboard/dry-needling-consent">Complete Dry Needling Consent & Waiver</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RequiredForms;
