
import React, { useState } from "react";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import ConsentPolicy from "@/components/ConsentPolicy";

const services = [
  "In-Person Assessment",
  "Virtual Assessment",
  "Dry Needling",
  "Full PT Telehealth Visit",
];

const AppointmentBookingForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    service: "",
    date: undefined as Date | undefined,
    consent: false,
    financial: false,
    data: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckbox = (key: "consent" | "financial" | "data", checked: boolean) => {
    setForm({ ...form, [key]: checked });
  };

  const canSubmit = form.name && form.email && form.service && form.date && form.consent && form.financial && form.data;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setIsLoading(true);
    setSubmitted(false);

    const { error } = await supabase.from("bookings").insert({
      name: form.name,
      email: form.email,
      service: form.service,
      date: form.date ? form.date.toISOString().slice(0, 10) : null,
      consent: form.consent,
      financial: form.financial,
      data: form.data,
    });

    if (error) {
      toast({
        title: "Booking failed",
        description: "Something went wrong. Please try again or contact us.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    setSubmitted(true);
    setIsLoading(false);
    toast({
      title: "Request sent!",
      description: "Your booking request has been received. We'll review and confirm as soon as possible.",
    });

    setForm({
      name: "",
      email: "",
      service: form.service,
      date: form.date,
      consent: false,
      financial: false,
      data: false,
    });
  };

  return (
    <CardContent>
      {/* Calendar */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-brand-green mb-3">Pick your date</h2>
        <Calendar
          mode="single"
          selected={form.date}
          onSelect={(date) => setForm({ ...form, date: date || undefined })}
          className="pointer-events-auto rounded border"
          classNames={{ months: "justify-center" }}
        />
      </div>
      <form className="space-y-5" onSubmit={handleSubmit} autoComplete="off">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            className="w-full border px-3 py-2 rounded"
            required
            value={form.name}
            onChange={handleChange}
            disabled={submitted || isLoading}
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="w-full border px-3 py-2 rounded"
            required
            value={form.email}
            onChange={handleChange}
            disabled={submitted || isLoading}
          />
        </div>
        <div>
          <label htmlFor="service" className="block text-sm font-medium mb-1">
            Service
          </label>
          <Select
            value={form.service}
            onValueChange={(value) => setForm({ ...form, service: value })}
            disabled={submitted || isLoading}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent>
              {services.map((service) => (
                <SelectItem value={service} key={service}>{service}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* Consent Checkboxes */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Checkbox
              id="consent"
              checked={form.consent}
              onCheckedChange={(checked: boolean) => handleCheckbox("consent", checked)}
              disabled={submitted || isLoading}
            />
            <label htmlFor="consent" className="text-sm">
              I consent to treatment <span className="text-brand-green">&#40;read&#41;</span>
            </label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="financial"
              checked={form.financial}
              onCheckedChange={(checked: boolean) => handleCheckbox("financial", checked)}
              disabled={submitted || isLoading}
            />
            <label htmlFor="financial" className="text-sm">
              I agree to the financial policy <span className="text-brand-green">&#40;read&#41;</span>
            </label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="data"
              checked={form.data}
              onCheckedChange={(checked: boolean) => handleCheckbox("data", checked)}
              disabled={submitted || isLoading}
            />
            <label htmlFor="data" className="text-sm">
              I accept the data policy <span className="text-brand-green">&#40;read&#41;</span>
            </label>
          </div>
        </div>
        {/* Policies text block */}
        <div className="rounded bg-gray-50 mt-2 px-3 py-2 border border-gray-200">
          <ConsentPolicy />
        </div>
        <div className="flex items-center gap-2 mt-4">
          <Button
            type="submit"
            disabled={!canSubmit || submitted || isLoading}
            className="flex-1"
          >
            {isLoading ? "Submitting..." : submitted ? "Request Sent!" : "Request Booking"}
          </Button>
          <Button type="button" variant="outline" onClick={() => navigate("/auth")}>
            Log in / Sign up
          </Button>
        </div>
      </form>
      <CardFooter>
        <div className="text-xs text-gray-400 mx-auto">
          Booking is a request only &ndash; confirmation will follow as we review your submission.
        </div>
      </CardFooter>
    </CardContent>
  );
};

export default AppointmentBookingForm;
