import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const StaffDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow bg-brand-light py-8 relative overflow-hidden">
        {/* Logo Watermark */}
        <div 
          className="absolute inset-0 bg-no-repeat bg-center bg-contain opacity-20 pointer-events-none z-0"
          style={{
            backgroundImage: 'url(/lovable-uploads/1f7bbb3b-71d2-4a9b-aeaa-8dac88d8d1e2.png)'
          }}
        />
        
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="text-center mb-8">
            <h1 className="font-serif text-3xl text-brand-navy mb-2">Staff Dashboard</h1>
            <p>Welcome to the staff dashboard. Review bookings, patient info, and more here.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Upcoming Patient Visits */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Patient Visits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  {/* Placeholder table/list */}
                  <table className="min-w-full text-left">
                    <thead>
                      <tr>
                        <th className="font-medium py-2 pr-4 text-gray-700">Date</th>
                        <th className="font-medium py-2 pr-4 text-gray-700">Patient</th>
                        <th className="font-medium py-2 pr-4 text-gray-700">Service</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Example dummy data row */}
                      {/* <tr>
                        <td className="py-2 pr-4">05/29/2025</td>
                        <td className="py-2 pr-4">John Doe</td>
                        <td className="py-2 pr-4">Assessment</td>
                      </tr> */}
                      <tr>
                        <td colSpan={3} className="py-4 text-gray-500 text-center">
                          No upcoming visits.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  {/*  */}
                </div>
              </CardContent>
            </Card>

            {/* Past Visits & Notes */}
            <Card>
              <CardHeader>
                <CardTitle>Past Visits & Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-3 text-gray-700">This section will display a list of past visits and let you view or edit session notes.</p>
                {/* Placeholder for visit/note list */}
                <div className="bg-gray-50 border border-dashed rounded p-4 text-gray-400 text-center">
                  No past visits to display.
                </div>
                {/*  */}
              </CardContent>
            </Card>

            {/* Set Availability */}
            <Card>
              <CardHeader>
                <CardTitle>Set Your Availability</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Define the time slots when you are available for patient bookings.
                </CardDescription>
                <div className="mt-4">
                  <Link to="/admin-dashboard/availability">
                    <Button variant="default">Manage Availability</Button>
                  </Link>
                </div>
                {/*  */}
              </CardContent>
            </Card>

            {/* Patient Messaging */}
            <Card>
              <CardHeader>
                <CardTitle>Patient Messaging</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Communicate securely with your patients.
                </CardDescription>
                <div className="mt-4">
                  <Link to="/admin-dashboard/messages">
                    <Button variant="default">Go to Messages</Button>
                  </Link>
                </div>
                {/*  */}
              </CardContent>
            </Card>

            {/* Analytics Overview */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Practice Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 md:gap-8 justify-between">
                  <div className="bg-brand-green/10 rounded p-4 flex-1 text-center">
                    <div className="text-2xl font-bold text-brand-green">--</div>
                    <div className="text-sm mt-1 text-gray-700">Total Visits</div>
                  </div>
                  <div className="bg-brand-navy/10 rounded p-4 flex-1 text-center">
                    <div className="text-2xl font-bold text-brand-navy">--</div>
                    <div className="text-sm mt-1 text-gray-700">Expected Revenue</div>
                  </div>
                  <div className="bg-brand-pink/10 rounded p-4 flex-1 text-center">
                    <div className="text-2xl font-bold text-brand-pink">--</div>
                    <div className="text-sm mt-1 text-gray-700">Visits by Type</div>
                  </div>
                </div>
                {/* Placeholder for chart integration */}
                {/*  */}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StaffDashboard;
