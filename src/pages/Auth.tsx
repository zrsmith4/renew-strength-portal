
import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

/**
 * Auth page provides both Log In and Sign Up flow.
 * - Hidden from navigation.
 * - On sign up, collects a username and saves a profile row.
 * - Redirects authenticated users home.
 */
const Auth = () => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(""); // for sign-up
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    let ignore = false;
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session && !ignore) {
        navigate("/");
      }
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        navigate("/");
      }
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
      // Insert profile
      const user = data?.user;
      if (user) {
        const { error: profileError } = await supabase.from("profiles").insert({
          id: user.id,
          username,
        });
        if (profileError) {
          setError("Account created, but failed to save profile (" + profileError.message + ")");
        }
      }
      setLoading(false);
      // supabase will trigger auth state change and navigate home
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
