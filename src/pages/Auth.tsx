
import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(""); // for sign-up
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  // Role-based redirection after auth
  useEffect(() => {
    let ignore = false;

    const checkSessionAndRedirect = async (session: any | null) => {
      if (session && !ignore) {
        // Fetch user's role from the 'user_roles' table
        const { data: roleData, error: roleError } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", session.user.id)
          .maybeSingle();

        if (roleError || !roleData) {
          console.error("Error fetching user role:", roleError?.message || "Role not found");
          // Fallback: navigate to a default safe page if role cannot be determined
          navigate("/");
          return;
        }

        // Redirect based on role
        if (roleData.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/patient-dashboard");
        }
      }
    };

    // Initial check
    supabase.auth.getSession().then(({ data: { session } }) => {
      checkSessionAndRedirect(session);
    });

    // Listen for auth state changes (login/signup)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      checkSessionAndRedirect(session);
    });

    return () => {
      ignore = true;
      subscription.unsubscribe();
    };
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (mode === "signup" && !username) {
      setError("Username is required");
      setLoading(false);
      return;
    }

    if (mode === "signup") {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });
      if (signUpError) {
        setError(signUpError.message);
        setLoading(false);
        return;
      }
      const user = data?.user;
      if (user) {
        // Insert user role as 'patient' (default role for new users)
        const { error: roleError } = await supabase.from("user_roles").insert({
          user_id: user.id,
          role: "patient",
        });
        if (roleError) {
          setError("Account created, but failed to save user role (" + roleError.message + ")");
        }
      }
      setLoading(false);
      // Auth state change will redirect accordingly
    } else {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (signInError) {
        setError(signInError.message);
      }
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-blue/10 to-brand-green/10">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <h1 className="font-serif text-2xl mb-2 text-brand-navy">
            {mode === "login" ? "Login" : "Sign up"}
          </h1>
          <div className="text-muted-foreground">
            {mode === "login" ? (
              <>
                No account?&nbsp;
                <button className="underline text-brand-green" onClick={() => setMode("signup")}>
                  Create one
                </button>
              </>
            ) : (
              <>
                Already have an account?&nbsp;
                <button className="underline text-brand-green" onClick={() => setMode("login")}>
                  Log in
                </button>
              </>
            )}
          </div>
        </CardHeader>
        <form onSubmit={handleSubmit} autoComplete="off">
          <CardContent className="space-y-5">
            {mode === "signup" && (
              <div>
                <label className="block mb-1 text-sm font-medium" htmlFor="username">
                  Username
                </label>
                <input
                  id="username"
                  autoComplete="off"
                  type="text"
                  className="w-full border px-3 py-2 rounded"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={loading}
                />
              </div>
            )}
            <div>
              <label className="block mb-1 text-sm font-medium" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                autoComplete="off"
                type="email"
                className="w-full border px-3 py-2 rounded"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                autoComplete="off"
                type="password"
                className="w-full border px-3 py-2 rounded"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>
            {error && (
              <div className="text-sm text-red-600 text-center">{error}</div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? (mode === "signup" ? "Signing up..." : "Logging in...") : (mode === "signup" ? "Sign up" : "Log in")}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Auth;

