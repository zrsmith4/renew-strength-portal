import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

type ContactFormValues = {
  name: string;
  email: string;
  phone: string;
  message: string;
  scheduleRequest: boolean;
};

const Contact = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormValues>();
  
  const onSubmit = async (data: ContactFormValues) => {
    try {
      const response = await fetch('https://izikncebdvtnddtmsdfa.functions.supabase.co/send-contact-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorMsg = (await response.json())?.error || "Something went wrong. Please try again.";
        throw new Error(errorMsg);
      }

      toast.success("Message sent successfully! We'll get back to you soon.");
      reset();
    } catch (err: any) {
      toast.error("Failed to send message. Please try again or email us directly at renewswpt@gmail.com.");
      console.error("Contact form submission failed:", err?.message || err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      
      <main className="flex-grow">
        {/* Header Section */}
        <div className="bg-brand-light py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-serif text-center font-medium text-brand-navy">Get In Touch</h1>
            <p className="mt-4 text-center text-gray-600 max-w-2xl mx-auto">
              We're here to answer your questions about our services, pricing, or how we can help you on your journey to recovery and wellness.
            </p>
          </div>
        </div>
        
        {/* Contact Content */}
        <section className="container mx-auto px-4 py-12 md:py-16">
          <div className="grid md:grid-cols-5 gap-8 lg:gap-12">
            {/* Contact Form - Takes 3 columns on md+ screens */}
            <div className="md:col-span-3">
              <Card className="p-1">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-serif text-brand-navy mb-6">Send Us a Message</h2>
                  <p className="mb-6 text-gray-600">
                    Have questions or special requests? Use this form to get in touch, or you can book your appointment directly through our platform.
                  </p>
                  
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          {...register('name', { required: 'Name is required' })}
                          className={errors.name ? 'border-red-300' : ''}
                        />
                        {errors.name && (
                          <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          {...register('email', { 
                            required: 'Email is required',
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: 'Invalid email address'
                            } 
                          })}
                          className={errors.email ? 'border-red-300' : ''}
                        />
                        {errors.email && (
                          <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="phone">Phone Number (Optional)</Label>
                        <Input
                          id="phone"
                          type="tel"
                          {...register('phone')}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          rows={4}
                          {...register('message', { required: 'Message is required' })}
                          className={errors.message ? 'border-red-300' : ''}
                        />
                        {errors.message && (
                          <p className="text-sm text-red-500 mt-1">{errors.message.message}</p>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="scheduleRequest"
                          {...register('scheduleRequest')}
                          className="rounded border-gray-300 text-brand-green focus:ring-brand-green"
                        />
                        <Label htmlFor="scheduleRequest" className="text-sm font-normal">
                          I'd like assistance scheduling an appointment
                        </Label>
                      </div>
                    </div>
                    
                    <Button type="submit" className="w-full">
                      <Send className="mr-2 h-4 w-4" /> Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
            
            {/* Contact Information - Takes 2 columns on md+ screens */}
            <div className="md:col-span-2">
              <Card className="p-1 mb-6">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-serif text-brand-navy mb-6">Contact Information</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="bg-brand-green/10 p-3 rounded-full mr-4">
                        <Mail className="h-5 w-5 text-brand-green" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-brand-navy">Email</h3>
                        <p className="text-gray-600">contact@renewstrengthwellness.com</p>
                        <p className="text-sm text-gray-500 mt-1">We'll respond within 24 hours</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-brand-blue/20 p-3 rounded-full mr-4">
                        <Phone className="h-5 w-5 text-brand-navy" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-brand-navy">Phone</h3>
                        <p className="text-gray-600">(555) 123-4567</p>
                        <p className="text-sm text-gray-500 mt-1">Available Mon-Fri, 9am-5pm</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-brand-yellow/30 p-3 rounded-full mr-4">
                        <MapPin className="h-5 w-5 text-brand-navy" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-brand-navy">Service Area</h3>
                        <p className="text-gray-600">Mobile service throughout Greater Atlanta</p>
                        <p className="text-sm text-gray-500 mt-1">We come to you!</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Booking CTA Card */}
              <Card className="p-1 border-brand-green/30 bg-brand-green/5">
                <CardContent className="p-6">
                  <h3 className="text-xl font-serif text-brand-navy mb-3">Ready to Book?</h3>
                  <p className="text-gray-600 mb-4">
                    Skip the form and schedule your appointment directly through our online booking system.
                  </p>
                  <Button className="w-full">Book an Appointment</Button>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Map Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-serif text-brand-navy mb-6">Service Area</h2>
            <div className="bg-gray-100 rounded-lg overflow-hidden h-[400px] flex items-center justify-center">
              {/* Placeholder for Google Maps */}
              <div className="text-center p-6">
                <MapPin className="h-12 w-12 text-brand-green mx-auto mb-4" />
                <h3 className="text-xl font-medium text-brand-navy mb-2">Greater Atlanta Area</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  As a mobile practice, we serve clients throughout the Greater Atlanta metropolitan area,
                  bringing physical therapy services directly to your home, office, or preferred location.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
