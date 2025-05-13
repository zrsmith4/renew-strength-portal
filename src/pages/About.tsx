
import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { HandHeart, Heart, Church, Handshake } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-brand-light py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-brand-navy mb-4">About Us</h1>
              <p className="text-lg text-gray-600">
                Dedicated to restoring strength and wellness through faith-based care
              </p>
            </div>
          </div>
        </div>

        {/* Mission Statement */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-block p-2 bg-brand-green/10 rounded-full mb-6">
                <Heart className="h-6 w-6 text-brand-green" />
              </div>
              <h2 className="text-2xl md:text-3xl font-serif text-brand-navy mb-4">Our Mission</h2>
              <p className="text-lg text-gray-700 mb-6">
                At Renew Strength and Wellness, we believe in treating the whole person—body, mind, and spirit. 
                Our mission is to provide exceptional physical therapy care that empowers patients to achieve 
                optimal wellness and function in their daily lives.
              </p>
              <p className="text-lg text-gray-700">
                We bring personalized treatment directly to your doorstep, making quality care accessible
                and convenient, while honoring our faith-based foundation in everything we do.
              </p>
            </div>
          </div>
        </section>

        {/* Founder Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="w-full md:w-1/2 lg:w-2/5 mb-8 md:mb-0">
                <div className="relative rounded-lg overflow-hidden shadow-md bg-white p-4">
                  <img 
                    src="/placeholder.svg" 
                    alt="Founder of Renew Strength and Wellness" 
                    className="w-full h-auto rounded-lg aspect-[4/5] object-cover"
                  />
                  <div className="absolute -bottom-4 -right-4 bg-brand-light p-6 rounded-full">
                    <Handshake className="h-8 w-8 text-brand-green" />
                  </div>
                </div>
              </div>
              
              <div className="w-full md:w-1/2 lg:w-3/5">
                <h2 className="text-2xl md:text-3xl font-serif text-brand-navy mb-4">Our Founder</h2>
                <p className="text-lg text-gray-700 mb-6">
                  Renew Strength and Wellness was founded by a passionate physical therapist with a vision to transform 
                  the traditional PT experience. Drawing from extensive clinical experience and a deep commitment to patient care, 
                  our founder recognized the need for a more personalized, accessible approach to physical therapy.
                </p>
                <p className="text-lg text-gray-700 mb-6">
                  This vision led to the creation of a mobile physical therapy practice that brings expert care directly to patients—whether 
                  in their homes, offices, or via secure telehealth platforms—eliminating barriers to receiving quality treatment.
                </p>
                <p className="text-lg text-gray-700">
                  With specialized training in manual therapy, dry needling, and functional movement, our founder established 
                  Renew Strength and Wellness to provide evidence-based care with a personal touch, helping patients recover 
                  and thrive in environments where they feel most comfortable.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Christian Foundation */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div>
                <div className="inline-block p-2 bg-brand-green/10 rounded-full mb-6">
                  <Church className="h-6 w-6 text-brand-green" />
                </div>
                <h2 className="text-2xl md:text-3xl font-serif text-brand-navy mb-4">Our Christian Foundation</h2>
                <p className="text-lg text-gray-700 mb-6">
                  The name "Renew" draws inspiration from scripture, reflecting our belief in the restoration of body, mind, 
                  and spirit. Just as Isaiah 40:31 speaks of those who wait upon the Lord renewing their strength, we aim to 
                  facilitate physical renewal through compassionate, skilled care.
                </p>
                <p className="text-lg text-gray-700">
                  While our practice welcomes and respects patients of all faiths and backgrounds, our work is guided by Christian 
                  principles of integrity, compassion, and excellence. We believe in treating each person with dignity and providing 
                  care that addresses the whole person.
                </p>
              </div>
              
              <div>
                <div className="inline-block p-2 bg-brand-green/10 rounded-full mb-6">
                  <HandHeart className="h-6 w-6 text-brand-green" />
                </div>
                <h2 className="text-2xl md:text-3xl font-serif text-brand-navy mb-4">Our Commitment to Giving</h2>
                <p className="text-lg text-gray-700 mb-6">
                  As part of our faith commitment, Renew Strength and Wellness tithes 10% of income to support Christian causes 
                  and organizations making a positive difference in our community and around the world.
                </p>
                <p className="text-lg text-gray-700 mb-6">
                  Through these partnerships, we extend healing beyond our direct patient care, supporting initiatives that 
                  provide medical care to underserved communities, offer assistance to families in need, and promote holistic 
                  wellness for all.
                </p>
                <p className="text-lg text-gray-700">
                  We believe that this practice of giving reflects the heart of our mission and allows our work to have 
                  an impact far beyond the individual treatments we provide.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-brand-light">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-serif text-brand-navy mb-4">Our Core Values</h2>
                <p className="text-lg text-gray-700">
                  These principles guide everything we do at Renew Strength and Wellness
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="border-0 shadow-md bg-white">
                  <CardContent className="p-8">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="bg-brand-green/10 p-2 rounded-full">
                        <Heart className="h-5 w-5 text-brand-green" />
                      </div>
                      <h3 className="font-serif text-xl text-brand-navy">Compassionate Care</h3>
                    </div>
                    <p className="text-gray-700">
                      We approach each patient with genuine empathy and understanding, taking the time to listen and develop treatment plans that address individual needs.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="border-0 shadow-md bg-white">
                  <CardContent className="p-8">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="bg-brand-green/10 p-2 rounded-full">
                        <Heart className="h-5 w-5 text-brand-green" />
                      </div>
                      <h3 className="font-serif text-xl text-brand-navy">Clinical Excellence</h3>
                    </div>
                    <p className="text-gray-700">
                      We maintain the highest standards of professional practice, combining evidence-based techniques with continued education to deliver optimal outcomes.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="border-0 shadow-md bg-white">
                  <CardContent className="p-8">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="bg-brand-green/10 p-2 rounded-full">
                        <Heart className="h-5 w-5 text-brand-green" />
                      </div>
                      <h3 className="font-serif text-xl text-brand-navy">Accessibility</h3>
                    </div>
                    <p className="text-gray-700">
                      We remove barriers to quality care by bringing our services directly to you, whether in-person or through secure telehealth platforms.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="border-0 shadow-md bg-white">
                  <CardContent className="p-8">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="bg-brand-green/10 p-2 rounded-full">
                        <Heart className="h-5 w-5 text-brand-green" />
                      </div>
                      <h3 className="font-serif text-xl text-brand-navy">Whole-Person Approach</h3>
                    </div>
                    <p className="text-gray-700">
                      We recognize that physical wellness is connected to mental and spiritual wellbeing, and design our care to support the whole person.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-serif text-brand-navy mb-4">Experience Renew Strength and Wellness</h2>
              <p className="text-lg text-gray-700 mb-8">
                We're dedicated to helping you achieve your wellness goals through personalized, faith-inspired care.
                Reach out today to begin your journey toward renewed strength and function.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button className="btn-primary">
                  <Link to="/contact">Contact Us</Link>
                </Button>
                <Button variant="outline" className="btn-secondary">
                  <Link to="/services">Our Services</Link>
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

export default About;
