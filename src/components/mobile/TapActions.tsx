import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface TapActionsProps {
  phone?: string;
  email?: string;
  address?: string;
  className?: string;
}

const TapActions: React.FC<TapActionsProps> = ({
  phone = "(123) 456-7890",
  email = "info@renewstrength.com",
  address = "123 Main St, City, State",
  className = "",
}) => {
  const isMobile = useIsMobile();

  if (!isMobile) {
    return (
      <div className={`flex flex-col space-y-2 ${className}`}>
        <div className="flex items-center text-gray-600">
          <Phone className="h-4 w-4 mr-2" />
          <span>{phone}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Mail className="h-4 w-4 mr-2" />
          <span>{email}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <MapPin className="h-4 w-4 mr-2" />
          <span>{address}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col space-y-3 ${className}`}>
      <a href={`tel:${phone.replace(/\D/g, '')}`} className="block">
        <Button
          variant="outline"
          className="w-full justify-start min-h-[48px] text-left"
        >
          <Phone className="h-5 w-5 mr-3 text-brand-green" />
          <div>
            <div className="font-medium">Call Now</div>
            <div className="text-sm text-gray-600">{phone}</div>
          </div>
        </Button>
      </a>

      <a href={`mailto:${email}`} className="block">
        <Button
          variant="outline"
          className="w-full justify-start min-h-[48px] text-left"
        >
          <Mail className="h-5 w-5 mr-3 text-brand-green" />
          <div>
            <div className="font-medium">Send Email</div>
            <div className="text-sm text-gray-600">{email}</div>
          </div>
        </Button>
      </a>

      <a
        href={`https://maps.google.com/?q=${encodeURIComponent(address)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <Button
          variant="outline"
          className="w-full justify-start min-h-[48px] text-left"
        >
          <MapPin className="h-5 w-5 mr-3 text-brand-green" />
          <div>
            <div className="font-medium">Get Directions</div>
            <div className="text-sm text-gray-600">{address}</div>
          </div>
        </Button>
      </a>
    </div>
  );
};

export default TapActions;