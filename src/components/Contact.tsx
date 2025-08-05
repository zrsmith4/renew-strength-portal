import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import ContactForm from './ContactForm';
import TapActions from './mobile/TapActions';
import { Button } from './ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const Contact = () => {
  const [showForm, setShowForm] = useState(false);
  const isMobile = useIsMobile();

  if (showForm) {
    return (
      <section className="py-16 md:py-24 bg-brand-light">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-brand-navy">Contact Us</h2>
                <Button
                  variant="outline"
                  onClick={() => setShowForm(false)}
                  className="text-sm"
                >
                  Back to Info
                </Button>
              </div>
              <ContactForm onSuccess={() => setShowForm(false)} />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-brand-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title inline-block relative pb-3">
            Get In Touch
            <span className="absolute bottom-0 left-1/4 right-1/4 h-1 bg-brand-green"></span>
          </h2>
          <p className="section-description mx-auto">
            Ready to start your journey to better health? We're here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold text-brand-navy mb-6">Contact Information</h3>
            {isMobile ? (
              <div className="space-y-4">
                <TapActions 
                  phone="(123) 456-7890"
                  email="info@renewstrength.com"
                  address="123 Main Street, City, State 12345"
                />
                <div className="flex items-center pt-4 border-t">
                  <Clock className="h-5 w-5 text-brand-green mr-3" />
                  <span className="text-gray-600">Mon-Fri: 8AM-6PM</span>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-brand-green mr-3" />
                  <span className="text-gray-600">(123) 456-7890</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-brand-green mr-3" />
                  <span className="text-gray-600">info@renewstrength.com</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-brand-green mr-3" />
                  <span className="text-gray-600">123 Main Street, City, State 12345</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-brand-green mr-3" />
                  <span className="text-gray-600">Mon-Fri: 8AM-6PM</span>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold text-brand-navy mb-6">Quick Message</h3>
            <p className="text-gray-600 mb-6">
              Have a question or want to schedule an appointment? Send us a message and we'll get back to you within 24 hours.
            </p>
            <Button
              onClick={() => setShowForm(true)}
              className="btn-primary w-full"
            >
              Send Message
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;