
import React, { useEffect, useRef } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ServiceCard from "@/components/ServiceCard";
import { MapPin, Video, Syringe, ActivitySquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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
        <ul className="list-disc list-inside mt-2 text-gray-600 text-left">
          <li>Thorough movement, strength, and posture assessment</li>
          <li>Personalized treatment plan for your goals</li>
          <li>Hands-on care & manual techniques</li>
          <li>Home/gym exercise & mobility prescription</li>
          <li>Education & collaborative recovery approach</li>
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
          Secure video consult with a PT for evaluation and a tailored plan—no travel required.
        </p>
        <ul className="list-disc list-inside mt-2 text-gray-600 text-left">
          <li>Movement screening via video</li>
          <li>Live discussion of symptoms & history</li>
          <li>Digital home program provided</li>
          <li>Private, HIPAA-compliant, and convenient</li>
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
          Targeted trigger point therapy with fine needles—reduce pain, tension, and improve mobility.
        </p>
        <ul className="list-disc list-inside mt-2 text-gray-600 text-left">
          <li>Pain relief and muscle relaxation</li>
          <li>Improved flexibility and function</li>
          <li>Can be combined with other manual therapy</li>
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
          Complete remote PT session: exercise guidance, progress check-ins, and plan updates.
        </p>
        <ul className="list-disc list-inside mt-2 text-gray-600 text-left">
          <li>Individualized PT session (live video)</li>
          <li>Correct form guidance and progression</li>
          <li>Home exercise updates</li>
          <li>Full support, Q&amp;A for ongoing care</li>
        </ul>
      </>
    ),
  },
];

const Services = () => {
  const cardsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // If the hash is #cards, scroll to the cards grid
    if (window.location.hash === "#cards" && cardsRef.current) {
      // Use smooth scroll if supported
      cardsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow bg-brand-light py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-brand-navy mb-4">
              Our Services
            </h1>
            <p className="text-lg text-gray-600">
              Faith-based, clinically proven physical therapy—available in-person or virtually to fit your needs.
            </p>
          </div>
          {/* Anchor for scrolling */}
          <div ref={cardsRef} id="cards" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, i) => (
              <ServiceCard
                key={service.name}
                icon={service.icon}
                name={service.name}
                bgColor={service.bgColor}
                cta={
                  <Button asChild size="lg" className="w-full mt-2">
                    <Link to="/pricing">See Pricing</Link>
                  </Button>
                }
              >
                {service.details}
              </ServiceCard>
            ))}
          </div>
          <div className="mt-16 text-center mx-auto max-w-xl">
            <h2 className="text-2xl font-serif text-brand-navy mb-3">Insurance & Payment Options</h2>
            <p className="text-gray-600 mb-6">
              We offer transparent direct-pay pricing. For insurance or payment questions, <a href="/contact" className="text-brand-green underline">contact us</a>.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
