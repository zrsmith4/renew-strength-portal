import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import Policies from "./pages/Policies";
import DashboardRouter from "./pages/DashboardRouter";
import PatientDashboard from "./pages/dashboard/PatientDashboard";
import StaffDashboard from "./pages/dashboard/StaffDashboard";

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
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/schedule" element={<Schedule />} />
          {/* AUTH */}
          <Route path="/auth" element={<Auth />} />
          <Route path="/privacy" element={<Policies />} />
          <Route path="/terms" element={<Policies />} />
          <Route path="/accessibility" element={<Policies />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="/dashboard" element={<DashboardRouter />} />
          <Route path="/dashboard/patient" element={<PatientDashboard />} />
          <Route path="/dashboard/staff" element={<StaffDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
