
import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import PricingTable from "@/components/PricingTable";
import { MapPin, Video, Syringe, ActivitySquare } from "lucide-react";

const pricingItems = [
  {
    name: "In-Person Assessment",
    price: "$150",
    icon: <MapPin className="h-8 w-8 text-brand-green" />,
    bgColor: "bg-brand-green/10",
    sub: "Comprehensive evaluation and personalized plan at your location.",
  },
  {
    name: "Virtual Assessment",
    price: "$125",
    icon: <Video className="h-8 w-8 text-brand-blue" />,
    bgColor: "bg-brand-blue/10",
    sub: "Full evaluation and live expert care via secure video.",
  },
  {
    name: "Dry Needling",
    price: "$85",
    icon: <Syringe className="h-8 w-8 text-amber-500" />,
    bgColor: "bg-brand-yellow/10",
    sub: "Targeted manual therapy for pain and mobility.",
  },
  {
    name: "Full PT Telehealth Visit",
    price: "$95",
    icon: <ActivitySquare className="h-8 w-8 text-brand-blue" />,
    bgColor: "bg-brand-light",
    sub: "Complete physical therapy session, remotely delivered.",
  },
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
        <div className="mt-16 text-center mx-auto max-w-xl">
          <h2 className="text-2xl font-serif text-brand-navy mb-3">Insurance & Payment Options</h2>
          <p className="text-gray-600 mb-6">
            We operate on a direct-pay model, offering simple, predictable rates. Major credit cards, HSA/FSA, and Zelle are accepted. If you have insurance questions, please <a href="/contact" className="text-brand-green underline">contact us</a>.
          </p>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default Pricing;
