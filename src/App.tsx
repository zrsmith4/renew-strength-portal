
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FloatingContactWidget from "@/components/FloatingContactWidget";
import PublicConsentForm from "@/pages/forms/PublicConsentForm";
import PublicFinancialPolicyForm from "@/pages/forms/PublicFinancialPolicyForm";
import PublicDryNeedlingForm from "@/pages/forms/PublicDryNeedlingForm";
import Index from "./pages/Index";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Schedule from "./pages/Schedule";
import Services from "./pages/Services";
import InPersonAssessment from "./pages/services/InPersonAssessment";
import Telehealth from "./pages/services/Telehealth";
import DryNeedling from "./pages/services/DryNeedling";
import FullPTTelehealth from "./pages/services/FullPTTelehealth";
import ChicagoSuburbs from "./pages/locations/ChicagoSuburbs";
import OakPark from "./pages/locations/OakPark";
import Policies from "./pages/Policies";
import DashboardRouter from "./pages/DashboardRouter";
import PatientDashboard from "./pages/dashboard/PatientDashboard";
import StaffDashboard from "./pages/dashboard/StaffDashboard";
import BlogPostDetail from "./pages/blog/[slug]";
import ScheduleVisit from "./pages/patient-dashboard/ScheduleVisit";
import Messages from "./pages/patient-dashboard/Messages";
import Notes from "./pages/patient-dashboard/Notes";
import Availability from "./pages/admin-dashboard/Availability";
import StaffMessages from "./pages/admin-dashboard/Messages";
import RequiredForms from "./pages/RequiredForms";
import FinancialPolicyForm from "./pages/patient-dashboard/FinancialPolicyForm";
import ConsentToTreatForm from "./pages/patient-dashboard/ConsentToTreatForm";
import DryNeedlingForm from "./pages/patient-dashboard/DryNeedlingForm";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/in-person" element={<InPersonAssessment />} />
          <Route path="/services/telehealth" element={<Telehealth />} />
          <Route path="/services/dry-needling" element={<DryNeedling />} />
          <Route path="/services/pt-telehealth" element={<FullPTTelehealth />} />
          <Route path="/locations/chicago-suburbs" element={<ChicagoSuburbs />} />
          <Route path="/locations/oak-park" element={<OakPark />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPostDetail />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/patient-dashboard/schedule" element={<ScheduleVisit />} />
          <Route path="/patient-dashboard/messages" element={<Messages />} />
          <Route path="/patient-dashboard/notes" element={<Notes />} />
          {/* AUTH */}
          <Route path="/auth" element={<Auth />} />
          <Route path="/privacy" element={<Policies />} />
          <Route path="/terms" element={<Policies />} />
          <Route path="/accessibility" element={<Policies />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="/dashboard" element={<DashboardRouter />} />
          <Route path="/dashboard/patient" element={<PatientDashboard />} />
          <Route path="/dashboard/staff" element={<StaffDashboard />} />
          {/* Patient Dashboard routes */}
          <Route path="/patient-dashboard/schedule" element={<ScheduleVisit />} />
          <Route path="/patient-dashboard/messages" element={<Messages />} />
          <Route path="/patient-dashboard/notes" element={<Notes />} />
          {/* Admin Dashboard routes */}
          <Route path="/admin-dashboard/availability" element={<Availability />} />
          <Route path="/admin-dashboard/messages" element={<StaffMessages />} />
          <Route path="/required-forms" element={<RequiredForms />} />
          <Route path="/patient-dashboard/financial-policy" element={<FinancialPolicyForm />} />
          <Route path="/patient-dashboard/consent-to-treat" element={<ConsentToTreatForm />} />
          <Route path="/patient-dashboard/dry-needling-consent" element={<DryNeedlingForm />} />
          
          {/* Public Forms */}
          <Route path="/forms/consent" element={<PublicConsentForm />} />
          <Route path="/forms/financial-policy" element={<PublicFinancialPolicyForm />} />
          <Route path="/forms/dry-needling" element={<PublicDryNeedlingForm />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
        <FloatingContactWidget />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
