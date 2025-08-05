import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 animate-fade-in md:hidden">
      <div 
        className="fixed inset-x-0 bottom-0 bg-white rounded-t-3xl max-h-[85vh] overflow-hidden animate-slide-in-right"
        style={{ transform: isOpen ? 'translateY(0)' : 'translateY(100%)' }}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold text-brand-navy">{title}</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="overflow-y-auto max-h-[75vh] p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MobileDrawer;