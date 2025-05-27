
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { MapPin, Video, Syringe, ActivitySquare } from "lucide-react";

const services = [
  {
    name: "In-Person Assessment",
    icon: <MapPin className="h-8 w-8 text-brand-green" />,
    bgColor: "bg-brand-green/10",
    details: (
      <>
        <p>
          Receive a comprehensive, in-person evaluation at your home, office, or preferred location by a licensed physical therapist.
        </p>
        <ul className="list-disc list-inside mt-2 text-gray-600">
          <li>Movement, strength, and posture analysis</li>
          <li>Personalized treatment plan</li>
          <li>Hands-on care, manual therapy</li>
          <li>Home/gym exercise & mobility program</li>
          <li>Education and goal-setting</li>
        </ul>
      </>
    ),
  },
  {
    name: "Virtual Assessment",
    icon: <Video className="h-8 w-8 text-brand-blue" />,
    bgColor: "bg-brand-blue/10",
    details: (
      <>
        <p>
          Secure video consultation with a PT for evaluation and custom plan—no travel needed, expert care anywhere.
        </p>
        <ul className="list-disc list-inside mt-2 text-gray-600">
          <li>Movement screening via video</li>
          <li>Discuss symptoms & history live</li>
          <li>Receive digital home program</li>
          <li>Convenient, private, and HIPAA-compliant</li>
        </ul>
      </>
    ),
  },
  {
    name: "Dry Needling",
    icon: <Syringe className="h-8 w-8 text-amber-500" />,
    bgColor: "bg-brand-yellow/10",
    details: (
      <>
        <p>
          Targeted trigger point therapy utilizing fine needles to relieve pain, tension, and restore mobility.
        </p>
        <ul className="list-disc list-inside mt-2 text-gray-600">
          <li>Pain relief and muscle relaxation</li>
          <li>Improved flexibility and mobility</li>
          <li>Often combined with other manual therapy</li>
        </ul>
      </>
    ),
  },
  {
    name: "Full PT Telehealth Visit",
    icon: <ActivitySquare className="h-8 w-8 text-brand-blue" />,
    bgColor: "bg-brand-light",
    details: (
      <>
        <p>
          Complete remote PT session for established patients: exercise guidance, progress review, and adjustments to your care.
        </p>
        <ul className="list-disc list-inside mt-2 text-gray-600">
          <li>Individualized PT session (live video)</li>
          <li>Correct form and progress updates</li>
          <li>Home exercise modifications</li>
          <li>Continued plan of care and Q&amp;A</li>
        </ul>
      </>
    ),
  },
];

const Services = () => (
  <div className="min-h-screen flex flex-col">
    <NavBar />
    <main className="flex-grow bg-brand-light py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-brand-navy mb-4">
            Our Services
          </h1>
          <p className="text-lg text-gray-600">
            Faith-based, clinically proven physical therapy available both in-person and virtually to fit your needs.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => (
            <Card key={service.name} className="bg-white border border-gray-100 shadow-md hover:shadow-lg transition-shadow flex flex-col h-full">
              <CardHeader className={`flex flex-col items-center ${service.bgColor} py-8`}>
                <div className="mb-2">{service.icon}</div>
                <CardTitle className="text-xl font-serif text-brand-navy">{service.name}</CardTitle>
              </CardHeader>
              <CardContent className="text-center flex-grow flex flex-col justify-center space-y-2">
                {service.details}
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-16 text-center mx-auto max-w-xl">
          <h2 className="text-2xl font-serif text-brand-navy mb-3">Insurance & Payment Options</h2>
          <p className="text-gray-600 mb-6">
            We offer transparent direct-pay pricing. For insurance coverage or payment questions, please <a href="/contact" className="text-brand-green underline">contact us</a>.
          </p>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default Services;
