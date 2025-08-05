import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ServiceCard from '@/components/ServiceCard';
import { useIsMobile } from '@/hooks/use-mobile';

interface ServiceItem {
  icon: React.ReactNode;
  name: string;
  bgColor?: string;
  children: React.ReactNode;
  cta?: React.ReactNode;
}

interface ServiceCardCarouselProps {
  services: ServiceItem[];
  className?: string;
}

const ServiceCardCarousel: React.FC<ServiceCardCarouselProps> = ({
  services,
  className = "",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isMobile = useIsMobile();

  if (!isMobile) {
    // Return regular grid for desktop
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}>
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            icon={service.icon}
            name={service.name}
            bgColor={service.bgColor}
            cta={service.cta}
          >
            {service.children}
          </ServiceCard>
        ))}
      </div>
    );
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % services.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + services.length) % services.length);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Mobile Carousel */}
      <div className="relative overflow-hidden rounded-lg">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {services.map((service, index) => (
            <div key={index} className="w-full flex-shrink-0 px-2">
              <ServiceCard
                icon={service.icon}
                name={service.name}
                bgColor={service.bgColor}
                cta={service.cta}
                className="h-full"
              >
                {service.children}
              </ServiceCard>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center mt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={prevSlide}
          disabled={currentIndex === 0}
          className="h-10 w-10 p-0 rounded-full"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {/* Dots Indicator */}
        <div className="flex space-x-2">
          {services.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 w-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-brand-green' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={nextSlide}
          disabled={currentIndex === services.length - 1}
          className="h-10 w-10 p-0 rounded-full"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Service Counter */}
      <div className="text-center mt-2 text-sm text-gray-600">
        {currentIndex + 1} of {services.length}
      </div>
    </div>
  );
};

export default ServiceCardCarousel;