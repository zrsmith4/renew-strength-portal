
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { MapPin, Video, Syringe, ActivitySquare, DollarSign } from "lucide-react";

const services = [
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => (
            <Card key={service.name} className="bg-white border border-gray-100 shadow-md hover:shadow-lg transition-shadow flex flex-col h-full">
              <CardHeader className={`flex flex-col items-center ${service.bgColor} py-8`}>
                <div className="mb-2">{service.icon}</div>
                <CardTitle className="text-xl font-serif text-brand-navy">{service.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center flex-grow text-center">
                <p className="text-gray-600 text-base mb-2">{service.sub}</p>
                <div className="flex items-center gap-2 mt-2">
                  <DollarSign className="h-6 w-6 text-brand-green" />
                  <span className="text-2xl font-bold text-brand-navy">{service.price}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
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
