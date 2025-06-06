import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-b from-white to-brand-light overflow-hidden">
      <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20 relative z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-12">
          <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight text-brand-navy">
              Healing movement, <br />delivered to you.
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-xl mx-auto lg:mx-0">
              Personalized physical therapy bringing faith-based care and renewed strength to your doorstep.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button className="btn-primary text-lg" asChild>
                <Link to="/contact">Schedule Now</Link>
              </Button>
            </div>
          </div>

          {/* Hero Image Triptych */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative w-full max-w-2xl">
              {/* First panel (unchanged) */}
              <div className="rounded-xl overflow-hidden shadow-lg w-1/3 absolute left-0 top-4 bottom-4 z-10">
                <img 
                  src="/lovable-uploads/d846324f-6125-47a2-8907-92b08d0b6437.png" 
                  alt="Physical therapist with patient exercise" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Middle panel (updated) */}
              <div className="rounded-xl overflow-hidden shadow-lg w-1/3 absolute left-1/3 top-0 bottom-0 z-20 transform -translate-x-1/6">
                <img 
                  src="/lovable-uploads/6d5db411-b0da-48d2-a2b8-6de25407dec7.png"
                  alt="Woman running on a soccer field" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Last panel (right, updated) */}
              <div className="rounded-xl overflow-hidden shadow-lg w-1/3 absolute right-0 top-4 bottom-4 z-10">
                <img 
                  src="/lovable-uploads/8175a5df-98e9-4443-8fe5-e8088297a6d7.png"
                  alt="Woman carrying groceries with improved mobility" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Placeholder to maintain height */}
              <div className="w-full" style={{ paddingTop: "80%" }}></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative shapes */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-brand-yellow opacity-20"></div>
      <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-brand-blue opacity-20"></div>
    </section>
  );
};

export default Hero;
