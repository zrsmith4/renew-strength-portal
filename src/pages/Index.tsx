
import React from 'react';
import NavBar from '@/components/NavBar';
import Hero from '@/components/Hero';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import BlogPreview from '@/components/BlogPreview';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main>
        <Hero />
        <AboutSection />
        <ServicesSection />
        <TestimonialsSection />
        <BlogPreview />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
