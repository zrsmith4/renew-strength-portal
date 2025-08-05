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
import PerformanceOptimization from '@/components/seo/PerformanceOptimization';
import AdvancedSchema from '@/components/seo/AdvancedSchema';
import FeaturedSnippetContent from '@/components/seo/FeaturedSnippetContent';
import { Link } from "react-router-dom";

const Index = () => {
  useEffect(() => {
    // Enhanced SEO meta tags
    document.title = "Mobile Physical Therapy Chicago | In-Home PT Services | Renew Strength and Wellness";
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]') || document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    metaDescription.setAttribute('content', 'Professional mobile physical therapy services in Chicago and suburbs. Faith-based in-home PT care, dry needling, assessments. Cash pay practice. Serving Oak Park, Evanston, Naperville.');
    if (!document.querySelector('meta[name="description"]')) {
      document.head.appendChild(metaDescription);
    }

    // Enhanced keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]') || document.createElement('meta');
    metaKeywords.setAttribute('name', 'keywords');
    metaKeywords.setAttribute('content', 'mobile physical therapy Chicago, in-home PT, physical therapist Chicago, mobile PT Oak Park, dry needling Chicago, faith-based physical therapy, home health PT, Chicago suburbs physical therapy');
    if (!document.querySelector('meta[name="keywords"]')) {
      document.head.appendChild(metaKeywords);
    }

    // Geo-targeting meta tags
    const geoRegion = document.querySelector('meta[name="geo.region"]') || document.createElement('meta');
    geoRegion.setAttribute('name', 'geo.region');
    geoRegion.setAttribute('content', 'US-IL');
    if (!document.querySelector('meta[name="geo.region"]')) {
      document.head.appendChild(geoRegion);
    }

    const geoPlacename = document.querySelector('meta[name="geo.placename"]') || document.createElement('meta');
    geoPlacename.setAttribute('name', 'geo.placename');
    geoPlacename.setAttribute('content', 'Chicago, Illinois');
    if (!document.querySelector('meta[name="geo.placename"]')) {
      document.head.appendChild(geoPlacename);
    }

    const geoPosition = document.querySelector('meta[name="geo.position"]') || document.createElement('meta');
    geoPosition.setAttribute('name', 'geo.position');
    geoPosition.setAttribute('content', '41.8781;-87.6298');
    if (!document.querySelector('meta[name="geo.position"]')) {
      document.head.appendChild(geoPosition);
    }

    // ICBM for geo-coordinates
    const icbm = document.querySelector('meta[name="ICBM"]') || document.createElement('meta');
    icbm.setAttribute('name', 'ICBM');
    icbm.setAttribute('content', '41.8781, -87.6298');
    if (!document.querySelector('meta[name="ICBM"]')) {
      document.head.appendChild(icbm);
    }

    // Language and locale
    const language = document.querySelector('meta[name="language"]') || document.createElement('meta');
    language.setAttribute('name', 'language');
    language.setAttribute('content', 'en-US');
    if (!document.querySelector('meta[name="language"]')) {
      document.head.appendChild(language);
    }

    // Open Graph tags for social sharing
    const ogTitle = document.querySelector('meta[property="og:title"]') || document.createElement('meta');
    ogTitle.setAttribute('property', 'og:title');
    ogTitle.setAttribute('content', 'Mobile Physical Therapy Chicago | Renew Strength and Wellness');
    if (!document.querySelector('meta[property="og:title"]')) {
      document.head.appendChild(ogTitle);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]') || document.createElement('meta');
    ogDescription.setAttribute('property', 'og:description');
    ogDescription.setAttribute('content', 'Professional mobile physical therapy services in Chicago. Faith-based in-home care, dry needling, comprehensive assessments. Serving Oak Park, Evanston, Naperville and surrounding suburbs.');
    if (!document.querySelector('meta[property="og:description"]')) {
      document.head.appendChild(ogDescription);
    }

    const ogUrl = document.querySelector('meta[property="og:url"]') || document.createElement('meta');
    ogUrl.setAttribute('property', 'og:url');
    ogUrl.setAttribute('content', 'https://renewstrengthandwellness.com');
    if (!document.querySelector('meta[property="og:url"]')) {
      document.head.appendChild(ogUrl);
    }

    const ogImage = document.querySelector('meta[property="og:image"]') || document.createElement('meta');
    ogImage.setAttribute('property', 'og:image');
    ogImage.setAttribute('content', 'https://renewstrengthandwellness.com/lovable-uploads/1f7bbb3b-71d2-4a9b-aeaa-8dac88d8d1e2.png');
    if (!document.querySelector('meta[property="og:image"]')) {
      document.head.appendChild(ogImage);
    }

    return () => {
      // Cleanup meta tags on unmount
      const metaTags = [
        'meta[name="description"]',
        'meta[name="keywords"]', 
        'meta[name="geo.region"]',
        'meta[name="geo.placename"]',
        'meta[name="geo.position"]',
        'meta[name="ICBM"]',
        'meta[name="language"]',
        'meta[property="og:title"]',
        'meta[property="og:description"]',
        'meta[property="og:url"]',
        'meta[property="og:image"]'
      ];
      
      metaTags.forEach(selector => {
        const element = document.querySelector(selector);
        if (element) {
          element.remove();
        }
      });
    };
  }, []);
  
  return (
    <PerformanceOptimization>
      <div className="min-h-screen bg-gray-50">
        <AdvancedSchema type="website" />
        <NavBar />
        
        <main>
          <div className="bg-brand-navy text-white py-16 md:py-20">
            <div className="container mx-auto px-4">
              <h1 className="text-4xl md:text-6xl font-serif font-medium text-center mb-6">
                Renew Your Strength, Restore Your Wellness
              </h1>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-center text-white mb-8">
                Renew Strength and Wellness Physical Therapy
              </h2>
            </div>
          </div>
          
          <HeroSection />
          <AboutSection />
          <ServicesSection />
          <FeaturedSnippetContent />
          <TestimonialsSection />
          <BlogPreview />
          <CTASection />
        </main>

        <Footer />
        <BottomNavigation />
        <FloatingActionButton />
      </div>
    </PerformanceOptimization>
  );
};

export default Index;