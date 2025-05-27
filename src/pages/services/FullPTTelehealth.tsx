
import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ActivitySquare } from "lucide-react";
import { Link } from "react-router-dom";

const FullPTTelehealth = () => (
  <div className="min-h-screen flex flex-col bg-brand-light">
    <NavBar />
    <main className="container mx-auto px-4 py-12 md:py-16 flex-1">
      <h1 className="text-4xl md:text-5xl font-serif font-medium text-brand-navy mb-6 text-center">
        Full PT Telehealth Visit
      </h1>
      <div className="flex flex-col items-center max-w-2xl mx-auto">
        <p className="text-lg text-gray-700 mb-4 text-center">
          Complete remote PT session: exercise guidance, progress check-ins, and plan updates.
        </p>
        <ul className="list-disc list-inside text-gray-600 mb-8 text-left space-y-1">
          <li>Individualized PT session (live video)</li>
          <li>Correct form guidance and progression</li>
          <li>Home exercise updates</li>
          <li>Full support, Q&amp;A for ongoing care</li>
        </ul>

        {/* Price Card */}
        <Card className="w-full max-w-md mb-8 shadow-md border border-gray-100">
          <CardContent className="flex flex-col items-center py-8 px-2 gap-4">
            <ActivitySquare className="h-8 w-8 text-brand-blue" />
            <div className="text-xl font-serif text-brand-navy">Full PT Telehealth Visit</div>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-2xl font-bold text-brand-navy">$95</span>
            </div>
            <p className="text-gray-600 text-center text-base max-w-xs">
              Complete physical therapy session, remotely delivered.
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

export default FullPTTelehealth;
