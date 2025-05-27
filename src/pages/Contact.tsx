
import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import { Button } from '@/components/ui/button';

const Contact = () => {
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
                  <ContactForm />
                </CardContent>
              </Card>
            </div>

            {/* 
            --- CONTACT INFO and BOOKING HIDDEN FOR NOW ---
            <div className="md:col-span-2">
              <Card className="p-1 mb-6">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-serif text-brand-navy mb-6">Contact Information</h2>
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="bg-brand-green/10 p-3 rounded-full mr-4">
                        <Mail className="h-5 w-5 text-brand-green" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-brand-navy">Email</h3>
                        <p className="text-gray-600">renewswpt@gmail.com</p>
                        <p className="text-sm text-gray-500 mt-1">We'll respond within 24 hours</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-brand-blue/20 p-3 rounded-full mr-4">
                        <Phone className="h-5 w-5 text-brand-navy" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-brand-navy">Phone</h3>
                        <p className="text-gray-600">312-725-3741</p>
                        <p className="text-sm text-gray-500 mt-1">Available Mon-Fri, 9am-5pm</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-brand-yellow/30 p-3 rounded-full mr-4">
                        <MapPin className="h-5 w-5 text-brand-navy" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-brand-navy">Service Area</h3>
                        <p className="text-gray-600">Mobile service throughout Greater Chicagoland Area</p>
                        <p className="text-sm text-gray-500 mt-1">We come to you!</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              {/* Booking CTA Card */}
              <Card className="p-1 border-brand-green/30 bg-brand-green/5">
                <CardContent className="p-6">
                  <h3 className="text-xl font-serif text-brand-navy mb-3">Ready to Book?</h3>
                  <p className="text-gray-600 mb-4">
                    Skip the form and schedule your appointment directly through our online booking system.
                  </p>
                  <Button className="w-full">Book an Appointment</Button>
                </CardContent>
              </Card>
            </div>
            */}
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
