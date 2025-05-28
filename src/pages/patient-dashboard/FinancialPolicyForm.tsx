
import React, { useState, useEffect } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

const FinancialPolicyForm = () => {
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!cancelled) {
        setUserId(session?.user?.id ?? null);
        setLoading(false);
      }
    };
    fetchSession();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;
    if (!userId) {
      toast({
        title: "Not logged in",
        description: "You must be logged in to submit this form.",
        variant: "destructive",
      });
      return;
    }
    const { error } = await supabase.from("financial_policies_forms").insert({
      user_id: userId,
      agreed: true,
      submitted_at: new Date().toISOString(),
    });

    if (!error) {
      setSubmitted(true);
      toast({
        title: "Agreement Submitted",
        description: "Thank you for agreeing to our financial policy.",
        variant: "default",
      });
      setTimeout(() => {
        window.location.href = "/required-forms";
      }, 1500);
    } else {
      toast({
        title: "Submission failed",
        description: error.message ?? "Submission failed. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <NavBar />
        <main className="flex-grow flex items-center justify-center bg-brand-light py-12">
          <div className="text-brand-navy text-lg">Checking login...</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow flex flex-col items-center justify-center bg-brand-light py-12">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-md shadow-md max-w-xl w-full px-8 py-10"
        >
          <h1 className="text-2xl font-serif text-brand-navy mb-6">
            Financial Policy Agreement
          </h1>
          <p className="mb-4 text-gray-700">
            Please review and agree to our financial policy before your first appointment.
          </p>
          <div className="mb-3 text-gray-600 text-sm space-y-3">
            <p>
              Payment is due at the time of service. We accept all major credit cards, health savings, and flexible spending accounts.
            </p>
            <p>
              Cancellation policy requires at least 24-hour notice to avoid a cancellation fee.
            </p>
            <p>
              Refunds are not available for missed appointments.
            </p>
            <p>
              Unpaid balances may be subject to collections and may impact scheduling future visits.
            </p>
          </div>
          <div className="my-6 flex items-center gap-2">
            <Checkbox
              id="financialPolicy"
              checked={agreed}
              onCheckedChange={(val) => setAgreed(Boolean(val))}
              required
            />
            <label htmlFor="financialPolicy" className="text-sm text-gray-800">
              I have read, understand, and agree to the Financial Policy.
            </label>
          </div>
          <Button type="submit" disabled={!agreed || submitted || !userId} className="w-full">
            {submitted ? "Thank you for submitting!" : "Submit Agreement"}
          </Button>
          {!userId && (
            <div className="text-red-500 text-xs text-center mt-3">
              You must be logged in to submit this form.
            </div>
          )}
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default FinancialPolicyForm;
