
import React from "react";
import { useForm } from "react-hook-form";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { sanitizeTextInput, validateEmail, validatePhone, RateLimiter } from "@/lib/security";

// Added: onSuccess prop and ReactNode children for custom checkbox
type ContactFormValues = {
  name: string;
  email: string;
  phone: string;
  message: string;
  scheduleRequest: boolean;
};

interface ContactFormProps {
  onSuccess?: () => void;
  children?: React.ReactNode;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSuccess, children }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormValues>();

  // Rate limiter instance
  const rateLimiter = new RateLimiter(3, 300000); // 3 requests per 5 minutes

  const onSubmit = async (data: ContactFormValues) => {
    try {
      // Rate limiting check
      const clientId = `${data.email}_${navigator.userAgent}`;
      if (!rateLimiter.isAllowed(clientId)) {
        toast.error("Too many requests. Please wait a few minutes before submitting again.");
        return;
      }

      // Validate and sanitize inputs
      if (!validateEmail(data.email)) {
        toast.error("Please enter a valid email address.");
        return;
      }

      if (data.phone && !validatePhone(data.phone)) {
        toast.error("Please enter a valid phone number.");
        return;
      }

      const sanitizedData = {
        name: sanitizeTextInput(data.name, 100),
        email: data.email.toLowerCase().trim(),
        phone: data.phone ? sanitizeTextInput(data.phone, 20) : '',
        message: sanitizeTextInput(data.message, 2000),
        scheduleRequest: data.scheduleRequest
      };

      // Additional validation
      if (!sanitizedData.name || !sanitizedData.message) {
        toast.error("Name and message are required.");
        return;
      }

      const { data: result, error } = await supabase.functions.invoke('send-contact-email', {
        body: sanitizedData
      });

      if (error) {
        throw error;
      }

      toast.success(
        "Message sent successfully! We'll get back to you soon."
      );
      reset();
      if (onSuccess) onSuccess();
    } catch (err: any) {
      console.error("Contact form submission failed:", err);
      toast.error(
        "Failed to send message. Please try again or email us directly at renewswpt@gmail.com."
      );
    }
  };

  return (
    <>
      <h2 className="text-2xl font-serif text-brand-navy mb-6">
        Send Us a Message
      </h2>
      <p className="mb-6 text-gray-600">
        Have questions or special requests? Use this form to get in touch, or you can book your appointment directly through our platform.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              {...register("name", { required: "Name is required" })}
              className={errors.name ? "border-red-300" : ""}
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">
                {errors.name.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value:
                    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className={errors.email ? "border-red-300" : ""}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="phone">Phone Number (Optional)</Label>
            <Input id="phone" type="tel" {...register("phone")} />
          </div>
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              rows={4}
              {...register("message", {
                required: "Message is required",
              })}
              className={errors.message ? "border-red-300" : ""}
            />
            {errors.message && (
              <p className="text-sm text-red-500 mt-1">
                {errors.message.message}
              </p>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="scheduleRequest"
              {...register("scheduleRequest")}
              className="rounded border-gray-300 text-brand-green focus:ring-brand-green"
            />
            <Label
              htmlFor="scheduleRequest"
              className="text-sm font-normal"
            >
              I'd like assistance scheduling an appointment
            </Label>
          </div>
          {children}
        </div>
        <Button type="submit" className="w-full">
          <Send className="mr-2 h-4 w-4" /> Send Message
        </Button>
      </form>
    </>
  );
};

export default ContactForm;
