import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const FeaturedSnippetContent: React.FC = () => {
  const faqItems = [
    {
      question: "What is mobile physical therapy?",
      answer: "Mobile physical therapy is a service where licensed physical therapists travel to your home, office, or preferred location to provide treatment. This eliminates the need for travel and allows for personalized care in a comfortable environment."
    },
    {
      question: "How much does mobile physical therapy cost in Chicago?",
      answer: "Mobile physical therapy in Chicago ranges from $65-$150 per session with transparent cash pay pricing. Initial assessments are $150, follow-up treatments are $125, and dry needling add-ons are $85. HSA/FSA accepted for convenient payment."
    },
    {
      question: "What payment options do you accept for mobile PT?",
      answer: "We operate on a transparent cash pay model with upfront pricing. We accept cash, credit cards, HSA, and FSA payments. No surprise bills or insurance hassles - you know exactly what you'll pay before treatment."
    },
    {
      question: "What areas in Chicago do you serve?",
      answer: "We provide mobile physical therapy throughout Chicago and surrounding suburbs including Oak Park, Evanston, Naperville, Schaumburg, and the greater Chicagoland area within a 50-mile radius."
    },
    {
      question: "How long is a typical mobile PT session?",
      answer: "Initial assessments typically last 60-90 minutes, while follow-up treatment sessions are usually 45-60 minutes. The duration depends on your specific needs and treatment plan."
    },
    {
      question: "What equipment do mobile physical therapists bring?",
      answer: "Our mobile physical therapists bring all necessary equipment including therapeutic tools, exercise equipment, assessment materials, and any specialized devices needed for your treatment plan."
    }
  ];

  const howToSteps = [
    {
      step: 1,
      title: "Contact Us",
      description: "Call or fill out our contact form to schedule your initial assessment"
    },
    {
      step: 2,
      title: "Transparent Pricing",
      description: "Receive upfront cash pay pricing with no hidden fees or surprise bills"
    },
    {
      step: 3,
      title: "Assessment Visit",
      description: "Licensed therapist comes to your location for comprehensive evaluation"
    },
    {
      step: 4,
      title: "Treatment Plan",
      description: "Receive personalized treatment plan based on your specific needs"
    },
    {
      step: 5,
      title: "Ongoing Care",
      description: "Continue with regular mobile therapy sessions as recommended"
    }
  ];

  // Set up FAQ schema for featured snippets
  React.useEffect(() => {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqItems.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }))
    };

    const howToSchema = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to get mobile physical therapy in Chicago",
      "description": "Step-by-step guide to accessing mobile physical therapy services in the Chicago area",
      "totalTime": "PT1D",
      "estimatedCost": {
        "@type": "MonetaryAmount",
        "currency": "USD",
        "value": "150"
      },
      "step": howToSteps.map(step => ({
        "@type": "HowToStep",
        "position": step.step,
        "name": step.title,
        "text": step.description
      }))
    };

    // Remove existing schemas
    const existingSchemas = document.querySelectorAll('script[data-snippet-schema]');
    existingSchemas.forEach(script => script.remove());

    // Add new schemas
    [faqSchema, howToSchema].forEach((schema, index) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-snippet-schema', `true-${index}`);
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    return () => {
      const scriptsToRemove = document.querySelectorAll('script[data-snippet-schema]');
      scriptsToRemove.forEach(script => script.remove());
    };
  }, []);

  return (
    <div className="space-y-12">
      {/* How-To Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-center mb-4 text-brand-navy">
              How to Get Mobile Physical Therapy in Chicago
            </h2>
            <p className="text-lg text-gray-600 text-center mb-12">
              Getting started with mobile physical therapy is simple. Follow these steps to begin your healing journey.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {howToSteps.map((step) => (
                <Card key={step.step} className="text-center border-gray-200">
                  <CardHeader className="pb-4">
                    <div className="w-12 h-12 bg-brand-green rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold text-lg">{step.step}</span>
                    </div>
                    <CardTitle className="text-xl text-brand-navy">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600">
                      {step.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button className="bg-brand-green text-white hover:bg-opacity-90 text-lg py-6 px-8" asChild>
                <Link to="/contact">Start Your Journey Today</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-center mb-4 text-brand-navy">
              Frequently Asked Questions About Mobile Physical Therapy
            </h2>
            <p className="text-lg text-gray-600 text-center mb-12">
              Get answers to common questions about our mobile physical therapy services in Chicago.
            </p>
            
            <Accordion type="single" collapsible className="space-y-4">
              {faqItems.map((item, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="bg-white border border-gray-200 rounded-lg px-6"
                >
                  <AccordionTrigger className="text-left text-lg font-semibold text-brand-navy hover:text-brand-green py-6">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 text-base leading-relaxed pb-6">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturedSnippetContent;