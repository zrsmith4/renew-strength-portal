import React from 'react';
import NavBar from '@/components/NavBar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import BlogPreview from '@/components/BlogPreview';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import RecentBookingNotification from '@/components/RecentBookingNotification';
import { Link } from "react-router-dom";
const Index = () => {
  return <div className="min-h-screen flex flex-col">
      <NavBar />
      {/* Main Focus Heading */}
      <div className="w-full bg-white border-b py-6 flex flex-col items-center z-10 relative">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-navy text-center tracking-tight leading-tight drop-shadow-sm">Renew Strength and Wellness  
Physical Therapy</h1>
      </div>
      <main>
        {/* MVP: Re-enable for future auth features */}
        {/*
         <div className="w-full text-right px-4 py-2 bg-white border-b">
          <Link to="/auth" className="inline-block rounded px-4 py-1 bg-brand-green/10 text-brand-green font-medium hover:bg-brand-green/20 transition">
            Log in / Sign up
          </Link>
         </div>
         */}
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <TestimonialsSection />
        <BlogPreview />
        <CTASection />
      </main>
      <Footer />
      <RecentBookingNotification />
    </div>;
};
export default Index;