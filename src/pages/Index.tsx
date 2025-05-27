import React from 'react';
import NavBar from '@/components/NavBar';
import Hero from '@/components/Hero';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import BlogPreview from '@/components/BlogPreview';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main>
        {/* Auth Link */}
        <div className="w-full text-right px-4 py-2 bg-white border-b">
          <Link
            to="/auth"
            className="inline-block rounded px-4 py-1 bg-brand-green/10 text-brand-green font-medium hover:bg-brand-green/20 transition"
          >
            Log in / Sign up
          </Link>
        </div>
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
