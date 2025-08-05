import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/seo/Breadcrumb';
import RelatedContent from '@/components/seo/RelatedContent';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Train, Clock, Award } from 'lucide-react';

const Chicago: React.FC = () => {
  const neighborhoods = [
    {
      name: "West Town",
      description: "Mobile PT services in West Town including Ukrainian Village and Noble Square areas",
      highlights: ["Near UIC", "Transit accessible", "Young professional population"]
    },
    {
      name: "Lincoln Park",
      description: "Comprehensive physical therapy for Lincoln Park residents and nearby DePaul area",
      highlights: ["Family-friendly", "Active community", "Park proximity for outdoor therapy"]
    },
    {
      name: "Lakeview",
      description: "Professional mobile therapy serving Lakeview and Wrigleyville neighborhoods",
      highlights: ["Sports-focused", "Cubs fans recover here", "Lake access for activities"]
    },
    {
      name: "Logan Square",
      description: "In-home physical therapy for Logan Square's vibrant community",
      highlights: ["Creative district", "Bike-friendly", "Young families"]
    },
    {
      name: "Wicker Park",
      description: "Mobile PT services in trendy Wicker Park and neighboring Bucktown",
      highlights: ["Arts district", "Active lifestyle", "Music scene"]
    },
    {
      name: "Lincoln Square",
      description: "Professional care for Lincoln Square and North Center residents",
      highlights: ["German heritage area", "Family community", "Quiet residential"]
    }
  ];

  React.useEffect(() => {
    document.title = "Mobile Physical Therapy Chicago Neighborhoods | West Town, Lincoln Park, Lakeview | Renew Strength and Wellness";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Mobile physical therapy services in Chicago neighborhoods including West Town, Lincoln Park, Lakeview, Logan Square, and Wicker Park. Professional in-home PT care.');
    }

    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 'mobile physical therapy West Town, PT Lincoln Park Chicago, Lakeview physical therapy, Logan Square mobile PT, Wicker Park physical therapy');
    }

    // Location-specific structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Renew Strength and Wellness - Chicago",
      "description": "Mobile physical therapy services in Chicago neighborhoods",
      "areaServed": neighborhoods.map(n => ({
        "@type": "Place",
        "name": n.name,
        "containedInPlace": {
          "@type": "City",
          "name": "Chicago",
          "containedInPlace": {
            "@type": "State",
            "name": "Illinois"
          }
        }
      }))
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
                Mobile Physical Therapy in Chicago
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8">
                Professional in-home physical therapy services throughout Chicago's West, Northwest, and North neighborhoods
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-brand-green text-white hover:bg-opacity-90 text-lg py-6 px-8" asChild>
                  <Link to="/contact">Book Chicago Visit</Link>
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-brand-navy text-lg py-6 px-8" asChild>
                  <Link to="/services">Our Services</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Why Chicago Mobile PT */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-serif font-medium text-center mb-12 text-brand-navy">
                Why Choose Mobile PT in Chicago?
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Train className="w-8 h-8 text-brand-green" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No Transit Hassles</h3>
                  <p className="text-gray-600">Skip the L ride and parking stress - we come to you</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-brand-green" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Fast Response</h3>
                  <p className="text-gray-600">2-4 hour response time in most Chicago neighborhoods</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-8 h-8 text-brand-green" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">City-Smart Care</h3>
                  <p className="text-gray-600">Treatment plans designed for urban lifestyles</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-brand-green" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Local Expertise</h3>
                  <p className="text-gray-600">Understanding Chicago's unique health needs</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Neighborhoods Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-serif font-medium text-center mb-12 text-brand-navy">
                Chicago Neighborhoods We Serve
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {neighborhoods.map((neighborhood, index) => (
                  <Card key={index} className="h-full border-gray-200 hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <CardTitle className="text-xl text-brand-navy flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-brand-green" />
                        {neighborhood.name}
                      </CardTitle>
                      <CardDescription className="text-gray-600">
                        {neighborhood.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {neighborhood.highlights.map((highlight, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 bg-brand-green rounded-full"></div>
                            {highlight}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Service Coverage */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-serif font-medium mb-6 text-brand-navy">
                Complete Chicago Coverage
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                We serve all neighborhoods within the Chicago city limits, with special focus on West, Northwest, and North side communities. Same-day appointments often available.
              </p>
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="text-center">
                  <div className="text-2xl font-bold text-brand-green mb-2">2-4 hrs</div>
                  <div className="text-gray-600">Average Response Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-brand-green mb-2">7 Days</div>
                  <div className="text-gray-600">Weekly Availability</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-brand-green mb-2">All Ages</div>
                  <div className="text-gray-600">Patients Welcome</div>
                </div>
              </div>
              <Button className="bg-brand-green text-white hover:bg-opacity-90 text-lg py-6 px-8" asChild>
                <Link to="/contact">Schedule Your Chicago Appointment</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <RelatedContent currentPage="chicago" />
      <Footer />
    </div>
  );
};

export default Chicago;