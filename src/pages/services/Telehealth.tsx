
import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Video } from "lucide-react";
import { Link } from "react-router-dom";

const Telehealth = () => (
  <div className="min-h-screen flex flex-col bg-brand-light">
    <NavBar />
    <main className="container mx-auto px-4 py-12 md:py-16 flex-1">
      <h1 className="text-4xl md:text-5xl font-serif font-medium text-brand-navy mb-6 text-center">
        Virtual Assessment
      </h1>
      <div className="flex flex-col items-center max-w-2xl mx-auto">
        <p className="text-lg text-gray-700 mb-4 text-center">
          Secure video consult with a PT for evaluation and a tailored plan—no travel required.
        </p>
        <ul className="list-disc list-inside text-gray-600 mb-8 text-left space-y-1">
          <li>Movement screening via video</li>
          <li>Live discussion of symptoms &amp; history</li>
          <li>Digital home program provided</li>
          <li>Private, HIPAA-compliant, and convenient</li>
        </ul>

        {/* Price Card */}
        <Card className="w-full max-w-md mb-8 shadow-md border border-gray-100">
          <CardContent className="flex flex-col items-center py-8 px-2 gap-4">
            <Video className="h-8 w-8 text-brand-blue" />
            <div className="text-xl font-serif text-brand-navy">Virtual Assessment</div>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-2xl font-bold text-brand-navy">$125</span>
            </div>
            <p className="text-gray-600 text-center text-base max-w-xs">
              Full evaluation and live expert care via secure video.
            </p>
          </CardContent>
        </Card>

        <Button asChild className="bg-brand-green text-white text-lg px-8 py-4 mt-4">
          <Link to="/contact">Book Now</Link>
        </Button>
      </div>
    </main>
    <Footer />
  </div>
);

export default Telehealth;
