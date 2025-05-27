
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Loader } from "lucide-react";

const DashboardRouter = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    async function getRoleAndRedirect() {
      const { data: { session } } = await supabase.auth.getSession();
      const user = session?.user;
      if (!user) {
        navigate("/auth");
        return;
      }
      // Query user_roles to get role
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id);

      if (error || !data || data.length === 0) {
        // Fallback: unauth or missing role
        navigate("/auth");
        return;
      }
      const userRole = data[0].role;
      if (userRole === "user") {
        navigate("/dashboard/patient");
      } else if (userRole === "admin") {
        navigate("/dashboard/staff");
      } else {
        navigate("/auth");
      }
    }

    getRoleAndRedirect().finally(() => {
      if (!ignore) setLoading(false);
    });
    return () => {
      ignore = true;
    };
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <Loader className="animate-spin h-8 w-8 text-brand-green mr-2" />
        <span className="text-brand-green/80 text-lg">Loading dashboard...</span>
      </div>
    );
  }
  return null;
};

export default DashboardRouter;
