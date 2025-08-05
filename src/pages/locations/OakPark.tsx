import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/seo/Breadcrumb';
import RelatedContent from '@/components/seo/RelatedContent';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Users, Clock, Award } from 'lucide-react';

const OakPark: React.FC = () => {
  // Set page-specific SEO
  React.useEffect(() => {
    document.title = "Mobile Physical Therapy Oak Park IL | In-Home PT Services | Renew Strength and Wellness";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Professional mobile physical therapy services in Oak Park, Illinois. Expert in-home PT care near Frank Lloyd Wright Home and Unity Temple. Insurance accepted.');
    }

    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 'mobile physical therapy Oak Park, in-home PT Oak Park IL, physical therapist Oak Park, mobile rehabilitation Oak Park');
    }

    // Add location-specific structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Renew Strength and Wellness - Oak Park",
      "description": "Mobile physical therapy services in Oak Park, Illinois",
      "areaServed": {
        "@type": "City",
        "name": "Oak Park",
        "containedInPlace": {
          "@type": "State",
          "name": "Illinois"
        }
      },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Oak Park",
        "addressRegion": "IL",
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "41.8850",
        "longitude": "-87.7845"
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
                Mobile Physical Therapy in Oak Park, IL
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8">
                Professional in-home physical therapy services for Oak Park residents. Expert care in the comfort of your home.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-brand-green text-white hover:bg-opacity-90 text-lg py-6 px-8" asChild>
                  <Link to="/contact">Book Your Oak Park Visit</Link>
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-brand-navy text-lg py-6 px-8" asChild>
                  <Link to="/services">Our Services</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Oak Park Specific Content */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-serif font-medium mb-6 text-brand-navy">
                    Serving Oak Park's Unique Community
                  </h2>
                  <p className="text-lg text-gray-700 mb-6">
                    Oak Park's historic charm and walkable neighborhoods make it an ideal community for mobile physical therapy. 
                    We understand the unique needs of Oak Park residents and provide convenient in-home care that fits your lifestyle.
                  </p>
                  <p className="text-lg text-gray-700 mb-8">
                    Whether you're recovering from an injury, managing chronic pain, or working to improve mobility, 
                    our mobile physical therapy services bring expert care directly to your Oak Park home.
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-6 h-6 text-brand-green mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-brand-navy">Local Coverage</h4>
                        <p className="text-gray-600">All Oak Park neighborhoods served</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Clock className="w-6 h-6 text-brand-green mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-brand-navy">Flexible Hours</h4>
                        <p className="text-gray-600">Evening and weekend availability</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Users className="w-6 h-6 text-brand-green mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-brand-navy">Family Care</h4>
                        <p className="text-gray-600">Services for all ages</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Award className="w-6 h-6 text-brand-green mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-brand-navy">Expert Care</h4>
                        <p className="text-gray-600">Licensed, experienced therapists</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Card className="p-6">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-2xl text-brand-navy">
                        Oak Park Areas We Serve
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-brand-navy mb-2">Historic Districts</h4>
                        <ul className="text-gray-600 space-y-1">
                          <li>• Frank Lloyd Wright Historic District</li>
                          <li>• Ridgeland-Oak Park Historic District</li>
                          <li>• Gunderson Historic District</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-brand-navy mb-2">Popular Neighborhoods</h4>
                        <ul className="text-gray-600 space-y-1">
                          <li>• Downtown Oak Park</li>
                          <li>• North Oak Park</li>
                          <li>• South Oak Park</li>
                          <li>• Arts District</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-brand-navy mb-2">Near Local Landmarks</h4>
                        <ul className="text-gray-600 space-y-1">
                          <li>• Unity Temple</li>
                          <li>• Ernest Hemingway Birthplace</li>
                          <li>• Oak Park Conservatory</li>
                          <li>• Scoville Park</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-serif font-medium text-center mb-12">
                Physical Therapy Services for Oak Park Residents
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="text-center">
                  <CardHeader>
                    <CardTitle className="text-xl text-brand-navy">Comprehensive Assessment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Thorough evaluation in your Oak Park home to create a personalized treatment plan.
                    </p>
                    <p className="text-2xl font-bold text-brand-green mb-2">$150</p>
                    <p className="text-sm text-gray-500">Most insurance accepted</p>
                  </CardContent>
                </Card>
                
                <Card className="text-center">
                  <CardHeader>
                    <CardTitle className="text-xl text-brand-navy">Follow-up Treatment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Ongoing therapy sessions focused on your recovery goals and pain management.
                    </p>
                    <p className="text-2xl font-bold text-brand-green mb-2">$125</p>
                    <p className="text-sm text-gray-500">Flexible scheduling available</p>
                  </CardContent>
                </Card>
                
                <Card className="text-center">
                  <CardHeader>
                    <CardTitle className="text-xl text-brand-navy">Dry Needling</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Specialized trigger point therapy for pain relief and improved mobility.
                    </p>
                    <p className="text-2xl font-bold text-brand-green mb-2">$75</p>
                    <p className="text-sm text-gray-500">Add-on to regular sessions</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-brand-navy text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-serif font-medium mb-6">
                Experience Physical Therapy in Your Oak Park Home
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Join your Oak Park neighbors who trust us for convenient, professional mobile physical therapy
              </p>
              <Button className="bg-brand-green text-white hover:bg-opacity-90 text-lg py-6 px-8" asChild>
                <Link to="/contact">Schedule Your Oak Park Appointment</Link>
              </Button>
              <p className="mt-6 text-white/70">
                Serving all of Oak Park, IL • Insurance accepted • Evening appointments available
              </p>
            </div>
          </div>
        </section>
      </main>

      <RelatedContent currentPage="oak-park" />
      <Footer />
    </div>
  );
};

export default OakPark;