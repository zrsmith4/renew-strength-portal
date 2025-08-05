import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/seo/Breadcrumb';
import RelatedContent from '@/components/seo/RelatedContent';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Shield, Heart } from 'lucide-react';

const ChicagoSuburbs: React.FC = () => {
  const suburbs = [
    {
      name: "Oak Park",
      description: "Serving Oak Park residents with convenient mobile physical therapy services. No need to travel to a clinic - we bring expert care to your home.",
      landmarks: ["Frank Lloyd Wright Home", "Unity Temple", "Oak Park River Forest High School"]
    },
    {
      name: "Evanston", 
      description: "Mobile physical therapy services for Evanston families. Northwestern University area residents enjoy personalized in-home treatment.",
      landmarks: ["Northwestern University", "Evanston Lighthouse", "Grosse Point Lighthouse"]
    },
    {
      name: "Naperville",
      description: "Naperville's premier mobile physical therapy service. From downtown to the suburbs, we provide comprehensive care in your home.",
      landmarks: ["Naperville Riverwalk", "DuPage Children's Museum", "Centennial Beach"]
    },
    {
      name: "Schaumburg",
      description: "Professional mobile physical therapy for Schaumburg residents. Convenient, effective treatment without leaving your neighborhood.",
      landmarks: ["Woodfield Mall", "Busse Woods", "Schaumburg Prairie Center"]
    }
  ];

  // Set page-specific SEO
  React.useEffect(() => {
    document.title = "Mobile Physical Therapy Chicago Suburbs | Oak Park, Evanston, Naperville | Renew Strength and Wellness";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Mobile physical therapy services throughout Chicago suburbs including Oak Park, Evanston, Naperville, and Schaumburg. In-home PT care that comes to you.');
    }

    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 'mobile physical therapy Oak Park, in-home PT Evanston, physical therapy Naperville, mobile PT Schaumburg, Chicago suburbs physical therapy');
    }

    // Add location-specific structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Mobile Physical Therapy Chicago Suburbs",
      "description": "Mobile physical therapy services throughout Chicago suburbs",
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://renewstrengthandwellness.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Locations",
            "item": "https://renewstrengthandwellness.com/locations"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Chicago Suburbs",
            "item": "https://renewstrengthandwellness.com/locations/chicago-suburbs"
          }
        ]
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="container mx-auto px-4 pt-6">
        <Breadcrumb />
      </div>
      
      <main className="pt-8">
        {/* Hero Section */}
        <section className="py-16 bg-brand-navy text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-serif font-medium mb-6">
                Mobile Physical Therapy Chicago Suburbs
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8">
                Expert in-home physical therapy services throughout Oak Park, Evanston, Naperville, Schaumburg, and surrounding Chicago suburbs
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-brand-green text-white hover:bg-opacity-90 text-lg py-6 px-8" asChild>
                  <Link to="/contact">Schedule Your Visit</Link>
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-brand-navy text-lg py-6 px-8" asChild>
                  <Link to="/pricing">View Pricing</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-serif font-medium text-center mb-12">
                Why Choose Mobile Physical Therapy in the Chicago Suburbs?
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-8 h-8 text-brand-green" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Convenient Locations</h3>
                  <p className="text-gray-600">Serving all major Chicago suburbs with reliable, timely service</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-brand-green" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Flexible Scheduling</h3>
                  <p className="text-gray-600">Evening and weekend appointments available for busy families</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-brand-green" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Transparent Pricing</h3>
                  <p className="text-gray-600">Clear cash pay rates with HSA/FSA accepted</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-brand-green" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Faith-Based Care</h3>
                  <p className="text-gray-600">Holistic approach treating body, mind, and spirit</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Suburbs Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-serif font-medium text-center mb-12">
                Areas We Serve in the Chicago Suburbs
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {suburbs.map((suburb, index) => (
                  <Card key={index} className="h-full">
                    <CardHeader>
                      <CardTitle className="text-2xl text-brand-navy">
                        Physical Therapy in {suburb.name}
                      </CardTitle>
                      <CardDescription className="text-lg">
                        {suburb.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <h4 className="font-semibold text-brand-navy mb-2">Local Landmarks We Serve:</h4>
                        <ul className="list-disc list-inside text-gray-600 space-y-1">
                          {suburb.landmarks.map((landmark, idx) => (
                            <li key={idx}>{landmark}</li>
                          ))}
                        </ul>
                      </div>
                      <Button className="w-full bg-brand-green text-white hover:bg-opacity-90" asChild>
                        <Link to="/contact">Book Appointment in {suburb.name}</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-brand-navy text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-serif font-medium mb-6">
                Ready to Start Your Recovery Journey?
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Experience the convenience of professional physical therapy in your Chicago suburb home
              </p>
              <Button className="bg-brand-green text-white hover:bg-opacity-90 text-lg py-6 px-8" asChild>
                <Link to="/contact">Schedule Your Assessment</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <RelatedContent currentPage="chicago-suburbs" />
      <Footer />
    </div>
  );
};

export default ChicagoSuburbs;