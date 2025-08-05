import React, { useState } from 'react';
import { X, Phone, Download, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface ExitIntentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ExitIntentModal: React.FC<ExitIntentModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedOffer, setSelectedOffer] = useState<'callback' | 'guide' | 'consult' | null>(null);
  const { toast } = useToast();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Thank you!",
      description: "We'll be in touch within 24 hours with your requested information.",
    });
    
    setEmail('');
    setPhone('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-xl max-w-md w-full p-6 animate-scale-in relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-brand-navy mb-2">
            Wait! Don't Miss Out
          </h2>
          <p className="text-gray-600">
            Before you go, let us help you take the first step toward pain-free living
          </p>
        </div>

        {!selectedOffer ? (
          <div className="space-y-3">
            <button
              onClick={() => setSelectedOffer('callback')}
              className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-brand-green transition-colors text-left"
            >
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-brand-green mr-3" />
                <div>
                  <div className="font-medium">Free 15-Minute Callback</div>
                  <div className="text-sm text-gray-600">Discuss your pain points with our PT</div>
                </div>
              </div>
            </button>

            <button
              onClick={() => setSelectedOffer('guide')}
              className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-brand-green transition-colors text-left"
            >
              <div className="flex items-center">
                <Download className="h-5 w-5 text-brand-green mr-3" />
                <div>
                  <div className="font-medium">Free Pain Relief Guide</div>
                  <div className="text-sm text-gray-600">5 exercises you can do at home today</div>
                </div>
              </div>
            </button>

            <button
              onClick={() => setSelectedOffer('consult')}
              className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-brand-green transition-colors text-left"
            >
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-brand-green mr-3" />
                <div>
                  <div className="font-medium">Free Virtual Consultation</div>
                  <div className="text-sm text-gray-600">See if we're the right fit for you</div>
                </div>
              </div>
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
              />
            </div>
            
            {selectedOffer === 'callback' && (
              <div>
                <Input
                  type="tel"
                  placeholder="Your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full"
                />
              </div>
            )}

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setSelectedOffer(null)}
                className="flex-1"
              >
                Back
              </Button>
              <Button type="submit" className="flex-1 btn-primary">
                {selectedOffer === 'callback' ? 'Request Callback' : 
                 selectedOffer === 'guide' ? 'Get Free Guide' : 
                 'Schedule Consultation'}
              </Button>
            </div>
          </form>
        )}

        <div className="text-center mt-4">
          <p className="text-xs text-gray-500">
            No spam, unsubscribe anytime. Your information is safe with us.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExitIntentModal;