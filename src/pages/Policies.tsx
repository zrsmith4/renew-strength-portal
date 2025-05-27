
import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const anchorMap = {
  "/privacy": "privacy",
  "/terms": "terms",
  "/accessibility": "accessibility"
} as const;

const Policies: React.FC = () => {
  const location = useLocation();
  const privacyRef = useRef<HTMLDivElement>(null);
  const termsRef = useRef<HTMLDivElement>(null);
  const accessibilityRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to the appropriate section based on the current hash or path
    let hash = location.hash.replace('#', '');
    // If arriving directly on a route like /terms, map to anchor
    if (!hash && anchorMap[location.pathname as keyof typeof anchorMap]) {
      hash = anchorMap[location.pathname as keyof typeof anchorMap];
    }
    const refs: { [k: string]: React.RefObject<HTMLDivElement> } = {
      privacy: privacyRef,
      terms: termsRef,
      accessibility: accessibilityRef
    };
    if (hash && refs[hash]?.current) {
      refs[hash].current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-brand-light flex flex-col">
      <NavBar />
      <main className="container mx-auto px-4 py-12 flex-1 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-serif font-medium text-brand-navy mb-8 text-center">
          Legal & Accessibility
        </h1>

        {/* Privacy Policy */}
        <div ref={privacyRef} id="privacy" className="mb-12">
          <h2 className="text-2xl font-serif text-brand-navy mb-2">Privacy Policy</h2>
          <p className="text-gray-700 mb-2 text-sm">
            <strong>Effective Date:</strong> [Insert Date]
          </p>
          <p className="text-gray-700 mb-4">
            [Insert your privacy policy content here. Describe how you collect, use, and protect users' personal information.]
          </p>
        </div>

        {/* Terms of Service */}
        <div ref={termsRef} id="terms" className="mb-12">
          <h2 className="text-2xl font-serif text-brand-navy mb-2">Terms of Service</h2>
          <p className="text-gray-700 mb-2 text-sm">
            <strong>Last Updated:</strong> [Insert Date]
          </p>
          <p className="text-gray-700 mb-4">
            [Insert your terms of service here. Include information on acceptable use, user responsibilities, and disclaimers.]
          </p>
        </div>

        {/* Accessibility */}
        <div ref={accessibilityRef} id="accessibility" className="mb-12">
          <h2 className="text-2xl font-serif text-brand-navy mb-2">Accessibility</h2>
          <p className="text-gray-700 mb-4">
            [Insert your accessibility statement here. Let users know your commitment to accessibility and how to contact you if they encounter an issue.]
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Policies;
