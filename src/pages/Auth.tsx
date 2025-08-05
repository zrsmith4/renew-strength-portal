
import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { sanitizeTextInput, validateEmail, RateLimiter } from "@/lib/security";

const Auth = () => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(""); // for sign-up
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const rateLimiter = new RateLimiter(5, 300000); // 5 attempts per 5 minutes

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

    // Rate limiting
    const clientId = `${email}_${navigator.userAgent}`;
    if (!rateLimiter.isAllowed(clientId)) {
      setError("Too many attempts. Please wait a few minutes before trying again.");
      setLoading(false);
      return;
    }

    // Input validation and sanitization
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    const sanitizedEmail = email.toLowerCase().trim();
    const sanitizedUsername = username ? sanitizeTextInput(username, 50) : '';

    if (mode === "signup") {
      if (!sanitizedUsername) {
        setError("Username is required");
        setLoading(false);
        return;
      }

      // Additional password strength check for signup
      if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
        setError("Password must contain at least one uppercase letter, one lowercase letter, and one number");
        setLoading(false);
        return;
      }

      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: sanitizedEmail,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            username: sanitizedUsername
          }
        }
      });
      
      if (signUpError) {
        setError(signUpError.message);
        setLoading(false);
        return;
      }

      // Note: Profile and role creation will be handled by the database trigger
      setLoading(false);
    } else {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: sanitizedEmail,
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
                  onChange={(e) => setUsername(sanitizeTextInput(e.target.value, 50))}
                  maxLength={50}
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

