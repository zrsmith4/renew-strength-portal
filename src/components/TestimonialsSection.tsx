
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import TestimonialCard from '@/components/testimonials/TestimonialCard';
import TestimonialForm from '@/components/testimonials/TestimonialForm';

const TestimonialsSection: React.FC = () => {
  const [showForm, setShowForm] = useState(false);

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
            <TestimonialCard
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              role={testimonial.role}
            />
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
            <TestimonialForm onClose={() => setShowForm(false)} />
          )}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
