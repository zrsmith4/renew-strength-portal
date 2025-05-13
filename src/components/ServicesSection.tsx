
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

const ServicesSection: React.FC = () => {
  const services = [
    {
      icon: "location",
      title: "In-Person Assessment",
      description: "Comprehensive evaluation at your location.",
      link: "/services/in-person",
      bgColor: "bg-brand-green/10",
      iconColor: "text-brand-green",
    },
    {
      icon: "telehealth",
      title: "Telehealth",
      description: "Virtual consultations from the comfort of your home.",
      link: "/services/telehealth",
      bgColor: "bg-brand-yellow/10",
      iconColor: "text-amber-500",
    },
    {
      icon: "needling",
      title: "Dry Needling",
      description: "Targeted treatment for muscle pain and tension.",
      link: "/services/dry-needling",
      bgColor: "bg-brand-blue/10",
      iconColor: "text-blue-500",
    },
  ];

  const renderIcon = (icon: string, className: string) => {
    switch (icon) {
      case "location":
        return (
          <div className={`p-4 rounded-full ${className} flex items-center justify-center`}>
            <MapPin className="h-8 w-8" />
          </div>
        );
      case "telehealth":
        return (
          <div className={`p-4 rounded-full ${className} flex items-center justify-center`}>
            <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
              <path d="M8 21H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M12 17V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
        );
      case "needling":
        return (
          <div className={`p-4 rounded-full ${className} flex items-center justify-center`}>
            <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M9 5L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M7 9L17 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="border border-gray-100 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className={`flex items-center justify-center ${service.bgColor} py-8`}>
                {renderIcon(service.icon, service.iconColor)}
              </CardHeader>
              <CardContent className="pt-6 text-center">
                <CardTitle className="text-xl mb-3 font-serif text-brand-navy">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-gray-600 text-base">
                  {service.description}
                </CardDescription>
              </CardContent>
              <CardFooter className="flex justify-center pb-6">
                <Link
                  to={service.link}
                  className="text-brand-navy font-medium hover:text-brand-green transition-colors"
                >
                  Learn More
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
