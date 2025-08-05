import React, { useEffect } from 'react';
import NavBar from '@/components/NavBar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import BlogPreview from '@/components/BlogPreview';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import BottomNavigation from '@/components/mobile/BottomNavigation';
import FloatingActionButton from '@/components/mobile/FloatingActionButton';
import ExitIntentModal from '@/components/conversion/ExitIntentModal';
import { useExitIntent } from '@/hooks/useExitIntent';
import { Link } from "react-router-dom";

const Index = () => {
  const { showExitIntent, hideExitIntent } = useExitIntent();
  
  // Add SEO meta tags directly to document head
  useEffect(() => {
    // Update page title
    document.title = "Renew Strength and Wellness | Mobile Physical Therapy Chicago";
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Expert mobile physical therapy services in Chicago. Faith-based, personalized care delivered to your home. Dry needling, telehealth available. Insurance accepted.');
    }
    
    // Add keywords meta tag
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'mobile physical therapy Chicago, in-home PT Chicago, faith-based physical therapy, dry needling Chicago, telehealth PT Illinois, Medicare physical therapy');
    
    // Add geo-targeting meta tags
    const geoRegion = document.createElement('meta');
    geoRegion.setAttribute('name', 'geo.region');
    geoRegion.setAttribute('content', 'US-IL');
    document.head.appendChild(geoRegion);
    
    const geoPlacename = document.createElement('meta');
    geoPlacename.setAttribute('name', 'geo.placename');
    geoPlacename.setAttribute('content', 'Chicago');
    document.head.appendChild(geoPlacename);
    
    // Add structured data
    const structuredDataScript = document.createElement('script');
    structuredDataScript.type = 'application/ld+json';
    structuredDataScript.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": ["MedicalBusiness", "HealthAndBeautyBusiness", "LocalBusiness"],
      "name": "Renew Strength and Wellness Physical Therapy",
      "description": "Faith-based mobile physical therapy services bringing personalized care to your doorstep in the Chicago area.",
      "url": window.location.origin,
      "telephone": "+1-XXX-XXX-XXXX",
      "email": "info@renewstrengthandwellness.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Chicago",
        "addressRegion": "IL",
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "41.8781",
        "longitude": "-87.6298"
      },
      "areaServed": {
        "@type": "State",
        "name": "Illinois"
      },
      "priceRange": "$65-$150",
      "openingHours": "Mo-Fr 08:00-18:00",
      "paymentAccepted": ["Insurance", "Medicare", "Tricare", "Cash"]
    });
    document.head.appendChild(structuredDataScript);
    
    // Cleanup function
    return () => {
      // Remove added elements on unmount
      if (geoRegion.parentNode) geoRegion.parentNode.removeChild(geoRegion);
      if (geoPlacename.parentNode) geoPlacename.parentNode.removeChild(geoPlacename);
      if (structuredDataScript.parentNode) structuredDataScript.parentNode.removeChild(structuredDataScript);
    };
  }, []);
  
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
      <BottomNavigation />
      <FloatingActionButton />
      <ExitIntentModal isOpen={showExitIntent} onClose={hideExitIntent} />
    </div>;
};
export default Index;