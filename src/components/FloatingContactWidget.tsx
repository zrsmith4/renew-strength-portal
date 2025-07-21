import React, { useState } from 'react';
import { MessageCircle, Phone, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
  scheduleRequest: boolean;
  callbackRequested: boolean;
};

const FloatingContactWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
    scheduleRequest: false,
    callbackRequested: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast.error("Name and email are required");
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: formData
      });

      if (error) throw error;

      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        scheduleRequest: false,
        callbackRequested: false,
      });
      setIsOpen(false);
    } catch (err: any) {
      console.error("Contact form submission failed:", err);
      toast.error("Failed to send message. Please try again or email us directly at renewswpt@gmail.com.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            size="lg"
            className="rounded-full w-16 h-16 shadow-lg hover:shadow-xl transition-all duration-300 bg-brand-green hover:bg-brand-green/90"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-brand-navy">Contact Us</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                placeholder="How can we help you?"
                rows={3}
              />
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="callbackRequested"
                  checked={formData.callbackRequested}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, callbackRequested: Boolean(checked) }))
                  }
                />
                <Label htmlFor="callbackRequested" className="text-sm flex items-center gap-1">
                  <Phone className="h-4 w-4" />
                  Request a callback
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="scheduleRequest"
                  checked={formData.scheduleRequest}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, scheduleRequest: Boolean(checked) }))
                  }
                />
                <Label htmlFor="scheduleRequest" className="text-sm">
                  I'd like to schedule an appointment
                </Label>
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FloatingContactWidget;