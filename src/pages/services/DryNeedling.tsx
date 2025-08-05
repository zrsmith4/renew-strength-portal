
import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Syringe } from "lucide-react";
import { Link } from "react-router-dom";

const DryNeedling = () => (
  <div className="min-h-screen flex flex-col bg-brand-light">
    <NavBar />
    <main className="container mx-auto px-4 py-12 md:py-16 flex-1">
      <h1 className="text-4xl md:text-5xl font-serif font-medium text-brand-navy mb-6 text-center">
        Mobile Dry Needling Chicago
      </h1>
      <div className="flex flex-col items-center max-w-2xl mx-auto">
        <p className="text-lg text-gray-700 mb-4 text-center">
          Targeted trigger point therapy with fine needles for Chicago area residents—reduce pain, tension, and improve mobility in the comfort of your home.
        </p>
        <ul className="list-disc list-inside text-gray-600 mb-8 text-left space-y-1">
          <li>Pain relief and muscle relaxation for Chicago residents</li>
          <li>Improved flexibility and function at home</li>
          <li>Can be combined with other mobile therapy services</li>
          <li>Convenient in-home treatment throughout Chicago suburbs</li>
        </ul>

        {/* Price Card */}
        <Card className="w-full max-w-md mb-8 shadow-md border border-gray-100">
          <CardContent className="flex flex-col items-center py-8 px-2 gap-4">
            <Syringe className="h-8 w-8 text-amber-500" />
            <div className="text-xl font-serif text-brand-navy">Dry Needling</div>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-2xl font-bold text-brand-navy">$85</span>
            </div>
            <p className="text-gray-600 text-center text-base max-w-xs">
              Targeted manual therapy for pain and mobility.
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

export default DryNeedling;
