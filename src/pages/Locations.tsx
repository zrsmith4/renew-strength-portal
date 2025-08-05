import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/seo/Breadcrumb';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Users, Clock } from 'lucide-react';

const Locations: React.FC = () => {
  React.useEffect(() => {
    document.title = "Service Areas | Mobile Physical Therapy Chicago & Suburbs | Renew Strength and Wellness";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Mobile physical therapy services throughout Chicago and surrounding suburbs. Professional in-home PT care in your neighborhood.');
    }
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
                Mobile Physical Therapy Service Areas
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8">
                Professional in-home physical therapy throughout Chicago and surrounding communities
              </p>
            </div>
          </div>
        </section>

        {/* Service Areas */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Chicago */}
                <Card className="h-full group hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="text-center pb-6">
                    <div className="w-16 h-16 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MapPin className="w-8 h-8 text-brand-green" />
                    </div>
                    <CardTitle className="text-2xl text-brand-navy">
                      Chicago Neighborhoods
                    </CardTitle>
                    <CardDescription className="text-lg">
                      Serving West, Northwest, and North Chicago neighborhoods with convenient mobile PT services
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                      <div>• West Town</div>
                      <div>• Lincoln Park</div>
                      <div>• Lakeview</div>
                      <div>• Logan Square</div>
                      <div>• Wicker Park</div>
                      <div>• Bucktown</div>
                      <div>• Lincoln Square</div>
                      <div>• North Center</div>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex items-center gap-3 mb-2">
                        <Clock className="w-4 h-4 text-brand-green" />
                        <span className="text-sm font-medium">Average Response: 2-4 hours</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Users className="w-4 h-4 text-brand-green" />
                        <span className="text-sm font-medium">Urban-focused care plans</span>
                      </div>
                    </div>

                    <Button className="w-full bg-brand-green text-white hover:bg-opacity-90 mt-6" asChild>
                      <Link to="/locations/chicago">Explore Chicago Services</Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* Suburbs */}
                <Card className="h-full group hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="text-center pb-6">
                    <div className="w-16 h-16 bg-brand-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MapPin className="w-8 h-8 text-brand-blue" />
                    </div>
                    <CardTitle className="text-2xl text-brand-navy">
                      Chicago Suburbs
                    </CardTitle>
                    <CardDescription className="text-lg">
                      Professional mobile physical therapy services in Oak Park, Evanston, Naperville, and beyond
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                      <div>• Oak Park</div>
                      <div>• Evanston</div>
                      <div>• Naperville</div>
                      <div>• Schaumburg</div>
                      <div>• Elmhurst</div>
                      <div>• Downers Grove</div>
                      <div>• Palatine</div>
                      <div>• Arlington Heights</div>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex items-center gap-3 mb-2">
                        <Clock className="w-4 h-4 text-brand-blue" />
                        <span className="text-sm font-medium">Same-day appointments available</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Users className="w-4 h-4 text-brand-blue" />
                        <span className="text-sm font-medium">Family-focused care</span>
                      </div>
                    </div>

                    <Button className="w-full bg-brand-blue text-white hover:bg-opacity-90 mt-6" asChild>
                      <Link to="/locations/chicago-suburbs">Explore Suburban Services</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Coverage Information */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-serif font-medium mb-8 text-brand-navy">
                Comprehensive Coverage Area
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-brand-green mb-2">50+</div>
                  <div className="text-gray-600">Miles Coverage Radius</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-brand-green mb-2">24hr</div>
                  <div className="text-gray-600">Average Response Time</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-brand-green mb-2">100%</div>
                  <div className="text-gray-600">Mobile Service Coverage</div>
                </div>
              </div>
              
              <div className="mt-12">
                <Button className="bg-brand-green text-white hover:bg-opacity-90 text-lg py-6 px-8" asChild>
                  <Link to="/contact">Schedule Your Visit Today</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Locations;