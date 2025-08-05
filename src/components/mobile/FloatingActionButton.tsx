import React from 'react';
import { Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const FloatingActionButton: React.FC = () => {
  const isMobile = useIsMobile();

  if (!isMobile) return null;

  return (
    <Link
      to="/contact"
      className="fixed bottom-20 right-4 z-50 md:hidden"
    >
      <Button
        size="lg"
        className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 bg-brand-green hover:bg-brand-green/90 text-white"
      >
        <Calendar className="h-6 w-6" />
      </Button>
    </Link>
  );
};

export default FloatingActionButton;