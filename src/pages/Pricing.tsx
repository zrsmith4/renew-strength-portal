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
    price: "$200",
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
    price: "$70",
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
    sub: "4 x 30-minute sessions within one calendar month. Any additional dry needling sessions in the same month are $10 off the regular price ($60 each).",
    cta: (
      <Button asChild className="w-full bg-brand-green hover:bg-brand-green/90 text-white" size="lg">
        <Link to="/contact">Book Now</Link>
      </Button>
    ),
  },
  {
    name: "In-Person PT Follow-Up Session",
    price: "$150",
    icon: <MapPin className="h-8 w-8 text-brand-green" />,
    bgColor: "bg-brand-green/10",
    sub: "45-minute session.",
    cta: (
      <Button asChild className="w-full bg-brand-green hover:bg-brand-green/90 text-white" size="lg">
        <Link to="/contact">Book Now</Link>
      </Button>
    ),
  },
];

const Pricing = () => (
  <div className="min-h-screen flex flex-col">
    <NavBar />
    <main className="flex-grow bg-brand-light py-12 md:py-16 relative overflow-hidden">
      {/* Logo Watermark */}
      <div 
        className="absolute inset-0 bg-no-repeat bg-center bg-contain opacity-20 pointer-events-none z-0"
        style={{
          backgroundImage: 'url(/lovable-uploads/1f7bbb3b-71d2-4a9b-aeaa-8dac88d8d1e2.png)'
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
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
          <p className="text-gray-700 mb-2">
            <strong>$5 for every 5 miles from Renew Strength & Wellness location</strong><br />
            <span className="text-sm text-gray-600">(0-5 miles: $5, 5-10 miles: $10, 10-15 miles: $15, etc.)</span>
          </p>
          <p className="text-gray-600 text-sm mt-2">
            Travel fee is waived for multiple "problems" for 1 patient or 2+ patients with one problem at the same location.
          </p>
        </div>
        {/* Payment Options section */}
        <div className="mt-16 text-center mx-auto max-w-xl">
          <h2 className="text-2xl font-serif text-brand-navy mb-3">Payment Options</h2>
          <p className="text-gray-600 mb-2">
            We operate on a direct-pay model, offering simple, predictable rates.<br />
            <span className="font-semibold">Cash-based only.</span> Major credit cards, HSA/FSA, and Zelle are accepted.<br />
            If you have payment questions, please <a href="/contact" className="text-brand-green underline">contact us</a>.
          </p>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default Pricing;
