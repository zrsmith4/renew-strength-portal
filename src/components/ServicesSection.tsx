
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Video, Syringe, ActivitySquare } from 'lucide-react';
import ServiceCardCarousel from './mobile/ServiceCardCarousel';
import { useIsMobile } from '@/hooks/use-mobile';

const ServicesSection: React.FC = () => {
  const isMobile = useIsMobile();
  
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

        {isMobile ? (
          <ServiceCardCarousel 
            services={services.map(service => ({
              icon: <div className={`p-4 rounded-full flex items-center justify-center ${service.iconColor}`}>
                {service.icon}
              </div>,
              name: service.title,
              bgColor: service.bgColor,
              children: <CardDescription className="text-gray-600 text-base">
                {service.description}
              </CardDescription>,
              cta: <Link
                to={service.link}
                className="text-brand-navy font-medium hover:text-brand-green transition-colors border px-4 py-2 rounded border-brand-navy/20 inline-block w-full text-center"
              >
                Learn More
              </Link>
            }))}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="border border-gray-100 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className={`flex items-center justify-center ${service.bgColor} py-8`}>
                  <div className={`p-4 rounded-full flex items-center justify-center ${service.iconColor}`}>
                    {service.icon}
                  </div>
                </CardHeader>
                <CardContent className="pt-6 text-center">
                  <CardTitle className="text-xl mb-3 font-serif text-brand-navy">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 text-base">
                    {service.description}
                  </CardDescription>
                </CardContent>
                <CardFooter className="flex justify-center pb-6 space-x-2">
                  <Link
                    to={service.link}
                    className="text-brand-navy font-medium hover:text-brand-green transition-colors border px-4 py-2 rounded border-brand-navy/20"
                  >
                    Learn More
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;
