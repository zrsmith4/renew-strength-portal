
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast'; // sonner toast
import { Link } from 'react-router-dom';

// Edge function URL (update project ref as needed)
const EDGE_FUNC_URL = "https://izikncebdvtnddtmsdfa.supabase.co/functions/v1/submit-testimonial";

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      quote: "Working with Renew PT has been transformative. The convenience of at-home sessions and the personalized care plan made all the difference in my recovery.",
      author: "Sarah M.",
      role: "Recovery from ACL Surgery"
    },
    {
      quote: "I appreciate the holistic approach that addresses not just the physical symptoms but considers my overall wellbeing. The faith-based approach resonates deeply with me.",
      author: "Michael T.",
      role: "Chronic Back Pain Patient"
    },
    {
      quote: "The telehealth option has been a lifesaver when I couldn't make in-person appointments. Same quality care, just through a screen!",
      author: "Jennifer L.",
      role: "Post-surgery Rehabilitation"
    }
  ];

  // Form state
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    quote: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(EDGE_FUNC_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        toast({ title: "Thank you!", description: "Testimonial submitted for review!" });
        setForm({ name: "", email: "", role: "", quote: "" });
        setShowForm(false);
      } else {
        toast({
          title: "Failed to submit",
          description: data?.error || "There was an error. Try again later.",
          variant: "destructive",
        });
      }
    } catch {
      toast({ title: "Error", description: "Unable to submit at this time.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title inline-block relative pb-3">
            Patient Stories
            <span className="absolute bottom-0 left-1/4 right-1/4 h-1 bg-brand-green"></span>
          </h2>
          <p className="section-description mx-auto">
            Hear from individuals who have experienced restoration and renewal through our care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-none shadow-lg bg-gradient-to-b from-gray-50 to-white">
              <CardContent className="pt-8 pb-6 px-8">
                <div className="text-3xl text-brand-green mb-4">"</div>
                <p className="text-gray-700 italic mb-6">
                  {testimonial.quote}
                </p>
                <div className="text-right">
                  <div className="font-medium text-brand-navy">{testimonial.author}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 flex flex-col items-center">
          <h3 className="text-2xl md:text-3xl font-serif text-brand-navy mb-4 text-center">
            Ready to experience your own renewal?
          </h3>
          <Button asChild className="btn-primary text-lg px-8 py-4 shadow-md">
            <Link to="/contact">
              Begin Your Journey
            </Link>
          </Button>
        </div>

        {/* Submit Testimonial CTA/Form */}
        <div className="mt-16 flex flex-col items-center">
          <h3 className="text-xl md:text-2xl font-serif text-brand-navy mb-3 text-center">
            Help us inspire others!
          </h3>
          <p className="text-brand-navy/70 mb-4 text-center">
            Ready to share your story? We’d love to hear about your restoration and renewal.
          </p>
          <Button className="btn-secondary text-base px-6 py-3 mb-4" onClick={() => setShowForm(!showForm)}>
            {showForm ? "Cancel" : "Submit Your Testimonial"}
          </Button>
          {showForm && (
            <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white border rounded shadow p-8 space-y-5 transition">
              <div>
                <label htmlFor="name" className="block font-medium mb-1 text-brand-navy">Name<span className="text-red-500">*</span></label>
                <Input id="name" name="name" type="text" required value={form.name} onChange={handleChange} disabled={submitting} />
              </div>
              <div>
                <label htmlFor="email" className="block font-medium mb-1 text-brand-navy">Email<span className="text-red-500">*</span></label>
                <Input id="email" name="email" type="email" required value={form.email} onChange={handleChange} disabled={submitting} />
              </div>
              <div>
                <label htmlFor="role" className="block font-medium mb-1 text-brand-navy">Role <span className="text-brand-navy/60 text-xs">(optional)</span></label>
                <Input id="role" name="role" type="text" value={form.role} onChange={handleChange} maxLength={100} disabled={submitting} placeholder="e.g. Recovery from Surgery" />
              </div>
              <div>
                <label htmlFor="quote" className="block font-medium mb-1 text-brand-navy">Testimonial<span className="text-red-500">*</span></label>
                <Textarea id="quote" name="quote" required value={form.quote} onChange={handleChange} disabled={submitting} maxLength={500} />
                <div className="text-xs text-gray-500 mt-1">{form.quote.length}/500 characters</div>
              </div>
              <Button type="submit" className="btn-primary w-full text-base py-3" disabled={submitting}>
                {submitting ? "Sending..." : "Send Submission"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
