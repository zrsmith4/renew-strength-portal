
import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import PricingTable from "@/components/PricingTable";
import { MapPin, Video, Syringe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Updated pricingItems array as requested
const pricingItems = [
  {
    name: "Initial Evaluation (incl. DN)",
    price: "$175",
    icon: <MapPin className="h-8 w-8 text-brand-green" />,
    bgColor: "bg-brand-green/10",
    sub: "60-minute session, includes physical therapy assessment and dry needling treatment.",
    cta: (
      <Button asChild className="w-full bg-brand-green hover:bg-brand-green/90 text-white" size="lg">
        <Link to="/contact">Book Now</Link>
      </Button>
    ),
  },
  {
    name: "Telehealth Evaluation",
    price: "$30",
    icon: <Video className="h-8 w-8 text-brand-blue" />,
    bgColor: "bg-brand-blue/10",
    sub: "15-minute session.",
    cta: (
      <Button asChild className="w-full bg-brand-green hover:bg-brand-green/90 text-white" size="lg">
        <Link to="/contact">Book Now</Link>
      </Button>
    ),
  },
  {
    name: "Telehealth Check-in",
    price: "$20",
    icon: <Video className="h-8 w-8 text-brand-blue" />,
    bgColor: "bg-brand-blue/10",
    sub: "10-minute session.",
    cta: (
      <Button asChild className="w-full bg-brand-green hover:bg-brand-green/90 text-white" size="lg">
        <Link to="/contact">Book Now</Link>
      </Button>
    ),
  },
  // {  // OMITTING FOR MVP - UNCOMMENT WHEN AVAILABLE
  //   name: "Telehealth PT Session (Future)",
  //   price: "$125",
  //   icon: <ActivitySquare className="h-8 w-8 text-brand-blue" />,
  //   bgColor: "bg-brand-light",
  //   sub: "45-minute session. (Coming Soon)",
  //   cta: (
  //     <Button asChild className="w-full bg-brand-green hover:bg-brand-green/90 text-white" size="lg">
  //       <Link to="/contact">Book Now</Link>
  //     </Button>
  //   ),
  // },
  {
    name: "Dry Needling Session",
    price: "$60",
    icon: <Syringe className="h-8 w-8 text-amber-500" />,
    bgColor: "bg-brand-yellow/10",
    sub: "30-minute session, focuses on one 'problem' area.",
    cta: (
      <Button asChild className="w-full bg-brand-green hover:bg-brand-green/90 text-white" size="lg">
        <Link to="/contact">Book Now</Link>
      </Button>
    ),
  },
  {
    name: "Dry Needling Bundle (4 sessions/month)",
    price: "Varies",
    icon: <Syringe className="h-8 w-8 text-amber-500" />,
    bgColor: "bg-brand-yellow/10",
    sub: "4 x 30-minute sessions within one calendar month. Each additional dry needling session within the same month costs $10 less than the previous session.",
    cta: (
      <Button asChild className="w-full bg-brand-green hover:bg-brand-green/90 text-white" size="lg">
        <Link to="/contact">Book Now</Link>
      </Button>
    ),
  },
  // {  // OMITTING FOR MVP - UNCOMMENT WHEN AVAILABLE
  //   name: "Future PT Follow-Up Session",
  //   price: "$175",
  //   icon: <ActivitySquare className="h-8 w-8 text-brand-blue" />,
  //   bgColor: "bg-brand-light",
  //   sub: "45-minute session. (Coming Soon)",
  //   cta: (
  //     <Button asChild className="w-full bg-brand-green hover:bg-brand-green/90 text-white" size="lg">
  //       <Link to="/contact">Book Now</Link>
  //     </Button>
  //   ),
  // },
];

const Pricing = () => (
  <div className="min-h-screen flex flex-col">
    <NavBar />
    <main className="flex-grow bg-brand-light py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-brand-navy mb-4">
            Services & Pricing
          </h1>
          <p className="text-lg text-gray-600">
            Transparent, up-front pricing for all services.
          </p>
        </div>
        <PricingTable items={pricingItems} />
        {/* Travel fee section */}
        <div className="mt-16 text-center mx-auto max-w-xl">
          <h2 className="text-2xl font-serif text-brand-navy mb-3">Travel Fee</h2>
          <ul className="text-gray-700 mb-2 text-left mx-auto inline-block">
            <li><strong>0-10 miles:</strong> No Fee</li>
            <li><strong>10-20 miles:</strong> $15</li>
            <li><strong>20-50 miles:</strong> $30</li>
          </ul>
          <p className="text-gray-600 text-sm mt-2">
            Travel fee is waived for multiple "problems" for 1 patient or 2+ patients with one problem at the same location.
          </p>
        </div>
        {/* Insurance & Payment Options section */}
        <div className="mt-16 text-center mx-auto max-w-xl">
          <h2 className="text-2xl font-serif text-brand-navy mb-3">Insurance & Payment Options</h2>
          <p className="text-gray-600 mb-2">
            We operate on a direct-pay model, offering simple, predictable rates.<br />
            <span className="font-semibold">Cash-based only.</span> Major credit cards, HSA/FSA, and Zelle are accepted.<br />
            If you have insurance questions, please <a href="/contact" className="text-brand-green underline">contact us</a>.
          </p>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default Pricing;

