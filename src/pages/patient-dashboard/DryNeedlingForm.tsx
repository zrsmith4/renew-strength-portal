
import React, { useState, useEffect } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

const DryNeedlingForm = () => {
  const [isPregnant, setIsPregnant] = useState<boolean | null>(null);
  const [hasBloodBorneIllness, setHasBloodBorneIllness] = useState<boolean | null>(null);
  const [fearOfNeedles, setFearOfNeedles] = useState<boolean | null>(null);
  const [onImmunosuppressant, setOnImmunosuppressant] = useState<boolean | null>(null);
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

  const isFormValid = () => {
    return (
      isPregnant !== null &&
      hasBloodBorneIllness !== null &&
      fearOfNeedles !== null &&
      onImmunosuppressant !== null &&
      agreed
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) return;
    if (!userId) {
      toast({
        title: "Not logged in",
        description: "You must be logged in to submit this form.",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase.from("dry_needling_forms").insert({
      user_id: userId,
      is_pregnant: isPregnant!,
      has_blood_borne_illness: hasBloodBorneIllness!,
      fear_of_needles: fearOfNeedles!,
      on_immunosuppressant: onImmunosuppressant!,
      agreed: true,
      submitted_at: new Date().toISOString(),
    });

    if (!error) {
      setSubmitted(true);
      toast({
        title: "Form Submitted",
        description: "Thank you for completing the Dry Needling Consent & Waiver.",
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
        <main className="flex-grow flex items-center justify-center bg-brand-light py-12 relative overflow-hidden">
          {/* Logo Watermark */}
          <div 
            className="absolute inset-0 bg-no-repeat bg-center bg-contain opacity-20 pointer-events-none z-0"
            style={{
              backgroundImage: 'url(/lovable-uploads/1f7bbb3b-71d2-4a9b-aeaa-8dac88d8d1e2.png)'
            }}
          />
          <div className="text-brand-navy text-lg relative z-10">Checking login...</div>
        </main>
        <Footer />
      </div>
    );
  }

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
        
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-md shadow-md max-w-2xl w-full px-8 py-10 relative z-10"
        >
          <h1 className="text-2xl font-serif text-brand-navy mb-6">
            Dry Needling Consent & Waiver
          </h1>
          
          <div className="mb-6 text-gray-700 text-sm space-y-3">
            <p>
              <strong>What is Dry Needling?</strong> Dry needling is a therapeutic technique using fine needles to target trigger points and tight muscle bands to reduce pain and improve function.
            </p>
            <p>
              <strong>Benefits:</strong> May reduce muscle tension, improve range of motion, decrease pain, and enhance healing.
            </p>
            <p>
              <strong>Potential Side Effects:</strong> Temporary soreness, bruising, minor bleeding, fatigue, or emotional release. Serious but rare risks include pneumothorax (collapsed lung) if needling near the chest area.
            </p>
          </div>

          <div className="mb-6 space-y-6">
            <h3 className="text-lg font-medium text-brand-navy mb-4">Safety Questionnaire</h3>
            
            {/* Pregnancy Question */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Are you pregnant?</Label>
              <RadioGroup 
                value={isPregnant === null ? "" : isPregnant.toString()} 
                onValueChange={(value) => setIsPregnant(value === "true")}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="true" id="pregnant-yes" />
                  <Label htmlFor="pregnant-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="false" id="pregnant-no" />
                  <Label htmlFor="pregnant-no">No</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Blood-borne illness Question */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Do you have Hepatitis B/C or other blood-borne illness?</Label>
              <RadioGroup 
                value={hasBloodBorneIllness === null ? "" : hasBloodBorneIllness.toString()} 
                onValueChange={(value) => setHasBloodBorneIllness(value === "true")}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="true" id="blood-illness-yes" />
                  <Label htmlFor="blood-illness-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="false" id="blood-illness-no" />
                  <Label htmlFor="blood-illness-no">No</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Fear of needles Question */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Do you have a fear of needles?</Label>
              <RadioGroup 
                value={fearOfNeedles === null ? "" : fearOfNeedles.toString()} 
                onValueChange={(value) => setFearOfNeedles(value === "true")}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="true" id="fear-needles-yes" />
                  <Label htmlFor="fear-needles-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="false" id="fear-needles-no" />
                  <Label htmlFor="fear-needles-no">No</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Immunosuppressant Question */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Are you on an immune suppression drug or have a suppressed immune system?</Label>
              <RadioGroup 
                value={onImmunosuppressant === null ? "" : onImmunosuppressant.toString()} 
                onValueChange={(value) => setOnImmunosuppressant(value === "true")}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="true" id="immunosuppressant-yes" />
                  <Label htmlFor="immunosuppressant-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="false" id="immunosuppressant-no" />
                  <Label htmlFor="immunosuppressant-no">No</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <div className="mb-6 p-4 bg-gray-50 rounded-md">
            <h4 className="font-medium mb-2">Liability Waiver</h4>
            <p className="text-sm text-gray-700">
              I understand that dry needling involves risks and that no guarantee of success has been made. 
              I have had the opportunity to ask questions about the treatment, and all my questions have been 
              answered to my satisfaction. I voluntarily consent to dry needling treatment and acknowledge 
              that I understand the risks involved.
            </p>
          </div>

          <div className="my-6 flex items-center gap-2">
            <Checkbox
              id="dryNeedlingConsent"
              checked={agreed}
              onCheckedChange={(val) => setAgreed(Boolean(val))}
              required
            />
            <label htmlFor="dryNeedlingConsent" className="text-sm text-gray-800">
              I have read, understand, and agree to the Dry Needling Consent & Waiver.
            </label>
          </div>

          <Button 
            type="submit" 
            disabled={!isFormValid() || submitted || !userId} 
            className="w-full"
          >
            {submitted ? "Thank you for submitting!" : "Submit Consent & Waiver"}
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

export default DryNeedlingForm;
