
import React, { useState } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
// !! Prototype only: Requires consent_forms table in Supabase with user_id, agreed, submitted_at fields

const ConsentToTreatForm = () => {
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // !! Prototype uses a placeholder user session (should retrieve current session with Supabase Auth in real use)
  const session = { user: { id: "prototype-user" } };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;

    // !! Prototype: You must create the consent_forms table in Supabase for persistence.
    const { error } = await supabase.from("consent_forms").insert([
      {
        user_id: session?.user?.id,
        agreed: true,
        submitted_at: new Date().toISOString(),
      },
    ]);

    if (!error) {
      setSubmitted(true);
      setTimeout(() => {
        window.location.href = "/required-forms";
      }, 1500);
    } else {
      alert("Submission failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow flex flex-col items-center justify-center bg-brand-light py-12">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-md shadow-md max-w-xl w-full px-8 py-10"
        >
          <h1 className="text-2xl font-serif text-brand-navy mb-6">
            Consent to Treat Form
          </h1>
          <p className="mb-4 text-gray-700">
            Your consent is required prior to any evaluation or treatment.
          </p>
          <div className="mb-3 text-gray-600 text-sm space-y-3">
            <p>
              I hereby consent to receive physical therapy evaluation and treatment from Renew Strength and Wellness.
            </p>
            <p>
              I understand the nature, purpose, risks, and benefits of my treatment and have the opportunity to ask questions.
            </p>
            <p>
              I understand that my participation is voluntary and I may withdraw consent at any time.
            </p>
            <p>
              I acknowledge that all treatment information will be kept confidential.
            </p>
          </div>
          <div className="my-6 flex items-center gap-2">
            <Checkbox
              id="consentToTreat"
              checked={agreed}
              onCheckedChange={(val) => setAgreed(Boolean(val))}
              required
            />
            <label htmlFor="consentToTreat" className="text-sm text-gray-800">
              I have read, understand, and provide my consent to treatment.
            </label>
          </div>
          <Button type="submit" disabled={!agreed || submitted} className="w-full">
            {submitted ? "Thank you for submitting!" : "Submit Consent"}
          </Button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default ConsentToTreatForm;
