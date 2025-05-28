
import React, { useRef } from 'react';
import { MapPin } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from '@/components/ui/card';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';

const Contact = () => {
  // We'll use a ref to access the checkbox state after submit
  const needScheduleHelpRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // We'll redefine onSubmit so we can handle redirect after ContactForm submission
  // ContactForm will now get an onSuccess callback
  const handleContactSuccess = () => {
    if (needScheduleHelpRef.current && needScheduleHelpRef.current.checked) {
      navigate("/required-forms");
    } else {
      // Redirect to homepage or show a simple confirmation
      navigate("/");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow">
        {/* Header Section */}
        <div className="bg-brand-light py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-serif text-center font-medium text-brand-navy">Get In Touch</h1>
            <p className="mt-4 text-center text-gray-600 max-w-2xl mx-auto">
              We're here to answer your questions about our services, pricing, or how we can help you on your journey to recovery and wellness.
            </p>
          </div>
        </div>

        {/* Contact Content */}
        <section className="container mx-auto px-4 py-12 md:py-16">
          <div className="grid md:grid-cols-5 gap-8 lg:gap-12">
            {/* Contact Form - Takes 3 columns on md+ screens */}
            <div className="md:col-span-3">
              <Card className="p-1">
                <CardContent className="p-6">
                  {/* Extend ContactForm to accept a custom checkbox and onSuccess callback */}
                  <ContactForm onSuccess={handleContactSuccess}>
                    <div className="flex items-center space-x-2 mt-4 mb-1">
                      <input
                        type="checkbox"
                        id="needScheduleHelp"
                        ref={needScheduleHelpRef}
                        className="rounded border-gray-300 text-brand-green focus:ring-brand-green"
                        name="needScheduleHelp"
                      />
                      <label htmlFor="needScheduleHelp" className="text-sm font-normal">
                        I need help scheduling an appointment.
                      </label>
                    </div>
                  </ContactForm>
                </CardContent>
              </Card>
            </div>
            {/* The contact info and "Ready to Book" button are intentionally hidden for now, per user request */}
          </div>
          {/* Map Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-serif text-brand-navy mb-6">Service Area</h2>
            <div className="bg-gray-100 rounded-lg overflow-hidden h-[400px] flex items-center justify-center">
              {/* Placeholder for Google Maps */}
              <div className="text-center p-6">
                <MapPin className="h-12 w-12 text-brand-green mx-auto mb-4" />
                <h3 className="text-xl font-medium text-brand-navy mb-2">Greater Chicagoland Area</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  As a mobile practice, we serve clients throughout the Greater Chicagoland metropolitan area,
                  bringing physical therapy services directly to your home, office, or preferred location.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
