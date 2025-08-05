
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Video, Syringe, ActivitySquare } from 'lucide-react';
import ServicesCarousel from './mobile/ServicesCarousel';

const ServicesSection: React.FC = () => {
  const services = [
    {
      icon: <MapPin className="h-8 w-8" />,
      title: "In-Person Assessment",
      description: "Comprehensive evaluation at your location.",
      link: "/services/in-person",
      bgColor: "bg-brand-green/10",
      iconColor: "text-brand-green",
    },
    {
      icon: <Video className="h-8 w-8" />,
      title: "Telehealth",
      description: "Virtual consultations from the comfort of your home.",
      link: "/services/telehealth",
      bgColor: "bg-brand-yellow/10",
      iconColor: "text-amber-500",
    },
    {
      icon: <Syringe className="h-8 w-8" />,
      title: "Dry Needling",
      description: "Targeted treatment for muscle pain and tension.",
      link: "/services/dry-needling",
      bgColor: "bg-brand-blue/10",
      iconColor: "text-blue-500",
    },
    {
      icon: <ActivitySquare className="h-8 w-8" />,
      title: "Full PT Telehealth Visit",
      description: "Complete virtual physical therapy session.",
      link: "/services/pt-telehealth",
      bgColor: "bg-brand-light",
      iconColor: "text-brand-blue",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-brand-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title inline-block relative pb-3">
            Services
            <span className="absolute bottom-0 left-1/4 right-1/4 h-1 bg-brand-green"></span>
          </h2>
          <p className="section-description mx-auto">
            Personalized physical therapy services designed to help you move and feel better.
          </p>
        </div>

        <ServicesCarousel 
          services={services.map(service => ({
            icon: <div className={`p-4 rounded-full flex items-center justify-center ${service.iconColor}`}>
              {service.icon}
            </div>,
            name: service.title,
            bgColor: service.bgColor,
            children: <CardDescription className="text-muted-foreground text-base">
              {service.description}
            </CardDescription>,
            cta: <Link
              to={service.link}
              className="text-foreground font-medium hover:text-primary transition-colors border px-4 py-2 rounded border-border inline-block w-full text-center hover:border-primary"
            >
              Learn More
            </Link>
          }))}
        />
      </div>
    </section>
  );
};

export default ServicesSection;
