import React, { useState } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const PublicConsentForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    agreed: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreed || !formData.name || !formData.email) {
      toast.error("Please fill in required fields and agree to treatment.");
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke('submit-public-form', {
        body: {
          formType: 'consent',
          formData: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            agreed: formData.agreed,
          }
        }
      });

      if (error) throw error;

      setSubmitted(true);
      toast.success("Consent form submitted successfully! We'll be in touch soon.");
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
              Your consent form has been submitted successfully. We'll review it and be in touch with you soon.
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
          className="bg-white rounded-md shadow-md max-w-xl w-full px-8 py-10 relative z-10"
        >
          <h1 className="text-2xl font-serif text-brand-navy mb-6">
            Consent to Treat Form
          </h1>
          <p className="mb-4 text-gray-700">
            Your consent is required prior to any evaluation or treatment. Please provide your contact information and review the consent terms below.
          </p>
          
          {/* Contact Information */}
          <div className="space-y-4 mb-6">
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
              checked={formData.agreed}
              onCheckedChange={(val) => setFormData(prev => ({ ...prev, agreed: Boolean(val) }))}
              required
            />
            <label htmlFor="consentToTreat" className="text-sm text-gray-800">
              I have read, understand, and provide my consent to treatment. *
            </label>
          </div>
          <Button 
            type="submit" 
            disabled={!formData.agreed || !formData.name || !formData.email || isSubmitting} 
            className="w-full"
          >
            {isSubmitting ? "Submitting..." : "Submit Consent"}
          </Button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default PublicConsentForm;