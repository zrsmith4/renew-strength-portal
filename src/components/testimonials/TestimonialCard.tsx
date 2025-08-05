import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, author, role }) => {
  return (
    <Card className="border-none shadow-lg bg-gradient-to-b from-gray-50 to-white">
      <CardContent className="pt-8 pb-6 px-8">
        <div className="text-3xl text-brand-green mb-4">"</div>
        <p className="text-gray-700 italic mb-6">
          {quote}
        </p>
        <div className="text-right">
          <div className="font-medium text-brand-navy">{author}</div>
          <div className="text-sm text-gray-500">{role}</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;