import React from 'react';
import { Button } from '@/components/ui/button';
import { useForm } from '@/hooks/useForm';
import { FormField } from '@/components/forms/FormField';
import { useToast } from '@/hooks/use-toast';

// Edge function URL
const EDGE_FUNC_URL = "https://izikncebdvtnddtmsdfa.supabase.co/functions/v1/submit-testimonial";

interface TestimonialFormData {
  name: string;
  email: string;
  role: string;
  quote: string;
}

interface TestimonialFormProps {
  onClose: () => void;
}

const TestimonialForm: React.FC<TestimonialFormProps> = ({ onClose }) => {
  const { toast } = useToast();
  const {
    values,
    isSubmitting,
    handleChange,
    handleSubmit,
    reset,
  } = useForm<TestimonialFormData>({
    initialValues: {
      name: "",
      email: "",
      role: "",
      quote: "",
    },
    onSubmit: async (formData) => {
      try {
        const res = await fetch(EDGE_FUNC_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        
        if (res.ok) {
          toast({ 
            title: "Thank you!", 
            description: "Testimonial submitted for review!" 
          });
          reset();
          onClose();
        } else {
          toast({
            title: "Failed to submit",
            description: data?.error || "There was an error. Try again later.",
            variant: "destructive",
          });
        }
      } catch {
        toast({ 
          title: "Error", 
          description: "Unable to submit at this time.", 
          variant: "destructive" 
        });
      }
    },
    validate: (formData) => {
      const errors: Record<string, string> = {};
      if (!formData.name.trim()) errors.name = "Name is required";
      if (!formData.email.trim()) errors.email = "Email is required";
      if (!formData.quote.trim()) errors.quote = "Testimonial text is required";
      if (formData.quote.length > 500) errors.quote = "Testimonial must be 500 characters or less";
      return Object.keys(errors).length > 0 ? errors : null;
    }
  });

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white border rounded shadow p-8 space-y-5 transition">
      <FormField
        type="text"
        name="name"
        label="Name"
        value={values.name}
        onChange={(value) => handleChange('name', value)}
        disabled={isSubmitting}
        required
      />
      
      <FormField
        type="email"
        name="email"
        label="Email"
        value={values.email}
        onChange={(value) => handleChange('email', value)}
        disabled={isSubmitting}
        required
      />
      
      <FormField
        type="text"
        name="role"
        label="Role"
        value={values.role}
        onChange={(value) => handleChange('role', value)}
        disabled={isSubmitting}
        placeholder="e.g. Recovery from Surgery"
        maxLength={100}
      />
      
      <FormField
        type="textarea"
        name="quote"
        label="Testimonial"
        value={values.quote}
        onChange={(value) => handleChange('quote', value)}
        disabled={isSubmitting}
        required
        maxLength={500}
        rows={4}
      />
      
      <Button 
        type="submit" 
        className="btn-primary w-full text-base py-3" 
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Send Submission"}
      </Button>
    </form>
  );
};

export default TestimonialForm;