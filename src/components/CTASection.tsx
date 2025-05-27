
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CTASection: React.FC = () => {
  return (
    <section className="py-16 md:py-20 bg-brand-navy text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-brand-green opacity-10 transform translate-x-1/3 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-brand-blue opacity-10 transform -translate-x-1/3 translate-y-1/2"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-medium mb-6 text-white">
            Ready to Begin Your Healing Journey?
          </h2>
          <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Take the first step toward renewed strength and wellness with personalized physical therapy that comes to you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-brand-green text-white hover:bg-opacity-90 text-lg py-6 px-8" asChild>
              <Link to="/contact">Schedule an Appointment</Link>
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10 text-lg py-6 px-8" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
          <p className="mt-8 text-white/70 text-sm">
            Most insurance plans accepted, including Medicare and Tricare.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
