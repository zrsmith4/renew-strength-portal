
import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { MapPin, Video, Calendar } from 'lucide-react';

const Pricing: React.FC = () => {
  const services = [
    {
      name: "In-Person Initial Assessment",
      description: "Comprehensive evaluation of movement patterns, strength, and areas of concern with personalized care plan development.",
      location: "In-person",
      price: "$150",
      icon: <MapPin className="h-6 w-6" />,
      bgColor: "bg-brand-green/10",
      iconColor: "text-brand-green"
    },
    {
      name: "Virtual Initial Assessment",
      description: "Thorough evaluation conducted via secure video platform with detailed movement analysis and treatment recommendations.",
      location: "Virtual",
      price: "$125",
      icon: <Video className="h-6 w-6" />,
      bgColor: "bg-brand-blue/10",
      iconColor: "text-brand-blue"
    },
    {
      name: "Dry Needling Session",
      description: "Targeted treatment using fine filament needles to release trigger points and reduce muscle tension and pain.",
      location: "In-person",
      price: "$85",
      icon: <MapPin className="h-6 w-6" />,
      bgColor: "bg-brand-yellow/10",
      iconColor: "text-amber-500"
    },
    {
      name: "Full Telehealth PT Visit",
      description: "Complete virtual physical therapy session with guided exercises, movement analysis, and progress evaluation.",
      location: "Virtual",
      price: "$95",
      icon: <Video className="h-6 w-6" />,
      bgColor: "bg-brand-blue/10",
      iconColor: "text-brand-blue"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow">
        <div className="bg-brand-light py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-brand-navy mb-4">Services & Pricing</h1>
              <p className="text-lg text-gray-600">
                Faith-based physical therapy care tailored to your unique needs
              </p>
            </div>
          </div>
        </div>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <div 
                  key={index} 
                  className="border border-gray-100 rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg bg-white"
                >
                  <div className={`${service.bgColor} p-6 flex items-center justify-center`}>
                    <div className={`${service.iconColor} rounded-full p-3 bg-white shadow-sm`}>
                      {service.icon}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-serif font-medium text-brand-navy mb-2">{service.name}</h3>
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        <span className={service.location === "Virtual" ? "text-brand-blue" : "text-brand-green"}>
                          {service.location === "Virtual" ? <Video className="h-4 w-4 inline" /> : <MapPin className="h-4 w-4 inline" />}
                        </span>
                        {service.location}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-6">{service.description}</p>
                    <div className="flex items-center justify-between mt-4">
                      <div className="text-2xl font-medium text-brand-navy">{service.price}</div>
                      <Button className="btn-primary flex items-center gap-2">
                        Schedule Now
                        <Calendar className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-brand-light py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-serif text-brand-navy mb-4">Insurance & Payment Options</h2>
              <p className="text-gray-600 mb-8">
                We currently operate on a direct-pay model, providing you with transparent pricing and flexible payment options. We accept all major credit cards, HSA/FSA, Zelle, and are working to integrate additional payment methods.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button className="btn-secondary">
                  <Link to="/contact">Contact for Details</Link>
                </Button>
                <Button className="btn-primary">
                  <Link to="/services">Learn More About Services</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
