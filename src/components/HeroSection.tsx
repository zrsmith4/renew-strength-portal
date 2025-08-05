import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, Clock, Award, CheckCircle } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-b from-white to-brand-light overflow-hidden">
      <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20 relative z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-12">
          <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
            {/* Social proof snippet */}
            <div className="inline-flex items-center gap-2 bg-green-50 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
              <span className="text-green-600">⭐⭐⭐⭐⭐</span>
              "Life-changing care!" - Sarah M.
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight text-brand-navy">
              Healing movement, <br />delivered to you.
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-xl mx-auto lg:mx-0">
              Personalized physical therapy bringing faith-based care and renewed strength to your doorstep.
            </p>
            
            {/* Free consultation offer */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center lg:text-left">
              <p className="text-blue-900 font-semibold">🎁 FREE 15-minute consultation call</p>
              <p className="text-blue-700 text-sm">Discuss your goals and see if we're a good fit - no commitment required</p>
            </div>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button className="btn-primary text-lg px-8 py-4 md:py-3 min-h-[48px]" asChild>
                  <Link to="/contact">Schedule Now - Limited Availability</Link>
                </Button>
              </div>
              
              {/* Urgency messaging */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start text-sm">
                <div className="bg-amber-50 text-amber-800 px-3 py-2 rounded-full border border-amber-200">
                  🔥 Limited spots remaining this week
                </div>
                <div className="bg-green-50 text-green-800 px-3 py-2 rounded-full border border-green-200">
                  ⚡ Responding to new patients within 24 hours
                </div>
                <div className="bg-blue-50 text-blue-800 px-3 py-2 rounded-full border border-blue-200">
                  📅 Same day appointments available
                </div>
              </div>
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
      
      {/* Trust Bar */}
      <div className="border-t border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <Shield className="h-4 w-4 text-brand-green" />
              <span className="font-medium">Licensed PT</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <Award className="h-4 w-4 text-brand-green" />
              <span className="font-medium">11 Years Experience</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <Clock className="h-4 w-4 text-brand-green" />
              <span className="font-medium">5,000+ Patient Sessions</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <CheckCircle className="h-4 w-4 text-brand-green" />
              <span className="font-medium">Cash Pay Practice</span>
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
