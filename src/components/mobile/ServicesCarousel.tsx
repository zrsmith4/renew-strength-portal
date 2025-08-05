import React, { useCallback, useEffect, useState } from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ServiceCard from '@/components/ServiceCard';

interface ServiceItem {
  icon: React.ReactNode;
  name: string;
  bgColor?: string;
  children: React.ReactNode;
  cta?: React.ReactNode;
}

interface ServicesCarouselProps {
  services: ServiceItem[];
  className?: string;
}

const ServicesCarousel: React.FC<ServicesCarouselProps> = ({
  services,
  className = "",
}) => {
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const options: EmblaOptionsType = {
    align: 'center',
    containScroll: 'trimSnaps',
    dragFree: false,
    loop: true,
    skipSnaps: false,
  };

  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className={`relative ${className}`}>
      {/* Carousel Container */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {services.map((service, index) => (
            <div
              key={index}
              className="flex-none w-full sm:w-1/2 lg:w-1/3 px-2 sm:px-3"
            >
              <div
                className={`transition-all duration-300 ${
                  index === selectedIndex
                    ? 'scale-100 opacity-100'
                    : 'scale-95 opacity-70'
                }`}
              >
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
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center mt-6">
        <Button
          variant="outline"
          size="sm"
          onClick={scrollPrev}
          disabled={!canScrollPrev}
          className="h-10 w-10 p-0 rounded-full shadow-sm"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {/* Dots Indicator */}
        <div className="flex space-x-2">
          {services.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`h-2 w-2 rounded-full transition-all duration-200 ${
                index === selectedIndex 
                  ? 'bg-primary scale-125' 
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={scrollNext}
          disabled={!canScrollNext}
          className="h-10 w-10 p-0 rounded-full shadow-sm"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Service Counter */}
      <div className="text-center mt-3 text-sm text-muted-foreground">
        {selectedIndex + 1} of {services.length}
      </div>
    </div>
  );
};

export default ServicesCarousel;