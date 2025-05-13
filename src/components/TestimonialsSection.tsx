
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

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
      </div>
    </section>
  );
};

export default TestimonialsSection;
