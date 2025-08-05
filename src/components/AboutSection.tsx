import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AboutSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      {/* Logo Watermark */}
      <div 
        className="absolute inset-0 bg-no-repeat bg-center bg-contain opacity-20 pointer-events-none z-0"
        style={{
          backgroundImage: 'url(/lovable-uploads/1f7bbb3b-71d2-4a9b-aeaa-8dac88d8d1e2.png)'
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-start gap-12">
          <div className="w-full md:w-1/3">
            <h2 className="section-title relative pb-3 inline-block">
              About
              <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-brand-green"></span>
            </h2>
          </div>
          
          <div className="w-full md:w-2/3">
            <p className="text-lg text-gray-700 mb-6">
              I'm a physical therapist dedicated to restoring strength and wellness through faith-based care, 
              bringing personalized treatment directly to your doorstep.
            </p>
            <p className="text-lg text-gray-700 mb-8">
              My approach combines evidence-based physical therapy with a holistic understanding of 
              health and healing. I believe in treating the whole person—body, mind, and spirit—and 
              empowering you with the knowledge and tools to achieve lasting recovery.
            </p>
            <div className="flex justify-end">
              <Button variant="outline" className="btn-secondary" asChild>
                <Link to="/about">Read More</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
