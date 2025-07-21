import React, { useState } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const PublicDryNeedlingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    is_pregnant: null as boolean | null,
    has_blood_borne_illness: null as boolean | null,
    fear_of_needles: null as boolean | null,
    on_immunosuppressant: null as boolean | null,
    agreed: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFormValid = () => {
    return (
      formData.name &&
      formData.email &&
      formData.is_pregnant !== null &&
      formData.has_blood_borne_illness !== null &&
      formData.fear_of_needles !== null &&
      formData.on_immunosuppressant !== null &&
      formData.agreed
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) {
      toast.error("Please fill in all required fields and agree to the waiver.");
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke('submit-public-form', {
        body: {
          formType: 'dryNeedling',
          formData: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            is_pregnant: formData.is_pregnant!,
            has_blood_borne_illness: formData.has_blood_borne_illness!,
            fear_of_needles: formData.fear_of_needles!,
            on_immunosuppressant: formData.on_immunosuppressant!,
            agreed: formData.agreed,
          }
        }
      });

      if (error) throw error;

      setSubmitted(true);
      toast.success("Dry needling consent form submitted successfully!");
    } catch (err: any) {
      console.error("Form submission failed:", err);
      toast.error("Failed to submit form. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
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
            <div className="text-2xl text-brand-green mb-4">✓</div>
            <h1 className="text-2xl font-serif text-brand-navy mb-4">
              Thank You!
            </h1>
            <p className="text-gray-700 mb-6">
              Your dry needling consent and waiver has been submitted successfully. We'll review it and be in touch with you soon.
            </p>
            <Button 
              onClick={() => window.location.href = '/'}
              className="w-full"
            >
              Return to Home
            </Button>
          </div>
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

          {/* Contact Information */}
          <div className="space-y-4 mb-6">
            <h3 className="text-lg font-medium text-brand-navy">Contact Information</h3>
            <div>
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              />
            </div>
          </div>

          <div className="mb-6 space-y-6">
            <h3 className="text-lg font-medium text-brand-navy mb-4">Safety Questionnaire</h3>
            
            {/* Pregnancy Question */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Are you pregnant? *</Label>
              <RadioGroup 
                value={formData.is_pregnant === null ? "" : formData.is_pregnant.toString()} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, is_pregnant: value === "true" }))}
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
              <Label className="text-sm font-medium">Do you have Hepatitis B/C or other blood-borne illness? *</Label>
              <RadioGroup 
                value={formData.has_blood_borne_illness === null ? "" : formData.has_blood_borne_illness.toString()} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, has_blood_borne_illness: value === "true" }))}
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
              <Label className="text-sm font-medium">Do you have a fear of needles? *</Label>
              <RadioGroup 
                value={formData.fear_of_needles === null ? "" : formData.fear_of_needles.toString()} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, fear_of_needles: value === "true" }))}
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
              <Label className="text-sm font-medium">Are you on an immune suppression drug or have a suppressed immune system? *</Label>
              <RadioGroup 
                value={formData.on_immunosuppressant === null ? "" : formData.on_immunosuppressant.toString()} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, on_immunosuppressant: value === "true" }))}
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
              checked={formData.agreed}
              onCheckedChange={(val) => setFormData(prev => ({ ...prev, agreed: Boolean(val) }))}
              required
            />
            <label htmlFor="dryNeedlingConsent" className="text-sm text-gray-800">
              I have read, understand, and agree to the Dry Needling Consent & Waiver. *
            </label>
          </div>

          <Button 
            type="submit" 
            disabled={!isFormValid() || isSubmitting} 
            className="w-full"
          >
            {isSubmitting ? "Submitting..." : "Submit Consent & Waiver"}
          </Button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default PublicDryNeedlingForm;