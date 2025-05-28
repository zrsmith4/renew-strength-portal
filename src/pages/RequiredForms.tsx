
import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const RequiredForms = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow flex flex-col items-center justify-center bg-brand-light py-12">
        <div className="bg-white rounded-md shadow-md max-w-xl w-full px-8 py-10 text-center">
          <h1 className="text-2xl font-serif text-brand-navy mb-6">
            Important Next Steps for Scheduling Your Visit
          </h1>
          <p className="text-gray-700 mb-8">
            To finalize your appointment scheduling, please complete the following required intake forms.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button asChild className="w-full sm:w-auto">
              <Link to="/patient-dashboard/financial-policy">Complete Financial Policy</Link>
            </Button>
            <Button asChild variant="secondary" className="w-full sm:w-auto">
              <Link to="/patient-dashboard/consent-to-treat">Complete Consent to Treat</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RequiredForms;
