
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MapPin, Video, Needle, ActivitySquare } from "lucide-react";

const services = [
  {
    name: "In-Person Assessment",
    description:
      "A comprehensive evaluation of movement patterns, strength, and areas of concern at your location, including a personalized care plan.",
    icon: <MapPin className="h-8 w-8 text-brand-green" />,
    bgColor: "bg-brand-green/10",
  },
  {
    name: "Virtual Assessment",
    description:
      "A full evaluation conducted securely via video platform, with detailed movement analysis and tailored treatment recommendations.",
    icon: <Video className="h-8 w-8 text-brand-blue" />,
    bgColor: "bg-brand-blue/10",
  },
  {
    name: "Dry Needling",
    description:
      "Targeted manual therapy using fine needles to release trigger points, relieve pain, and improve range of motion.",
    icon: <Needle className="h-8 w-8 text-amber-500" />,
    bgColor: "bg-brand-yellow/10",
  },
  {
    name: "Full PT Telehealth Visit",
    description:
      "A complete virtual physical therapy session with guided exercise, live feedback, and progress review—no travel needed.",
    icon: <ActivitySquare className="h-8 w-8 text-brand-blue" />,
    bgColor: "bg-brand-light",
  },
];

const Services = () => (
  <div className="min-h-screen flex flex-col">
    <div className="bg-brand-light py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-brand-navy mb-4">
            Our Services
          </h1>
          <p className="text-lg text-gray-600">
            Faith-based, personalized physical therapy, available both in-person and virtually.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, idx) => (
            <Card key={service.name} className="bg-white border border-gray-100 shadow-md hover:shadow-lg transition-shadow flex flex-col h-full">
              <CardHeader className={`flex flex-col items-center ${service.bgColor} py-8`}>
                <div className="mb-2">{service.icon}</div>
                <CardTitle className="text-xl font-serif text-brand-navy">{service.name}</CardTitle>
              </CardHeader>
              <CardContent className="text-center flex-grow flex flex-col justify-center">
                <p className="text-gray-600 text-base">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default Services;
