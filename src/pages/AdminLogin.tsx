import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  // If already logged in as admin, redirect
  useEffect(() => {
    if (!authLoading && user && isAdmin) {
      navigate("/admin");
    }
  }, [user, isAdmin, authLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setLoading(false);
        toast.error(error.message);
        return;
      }
      const userId = data.user?.id;
      if (!userId) {
        setLoading(false);
        toast.error("Sign in failed");
        return;
      }
      const { data: roleData, error: roleError } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .eq("role", "admin")
        .maybeSingle();
      if (roleError || !roleData) {
        setLoading(false);
        toast.error(roleError?.message || "You don't have admin access");
        if (!roleError) await supabase.auth.signOut();
        return;
      }
      setLoading(false);
      navigate("/admin");
    } catch {
      setLoading(false);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center">
          <h1 className="font-display text-4xl tracking-wider text-foreground">
            AUTO<span className="text-primary">DOPE</span>
          </h1>
          <p className="text-muted-foreground mt-2 text-sm">Admin Login</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-muted border-border text-foreground"
          />
          <Input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-muted border-border text-foreground"
          />
          <Button
            type="submit"
            disabled={loading}
            className="w-full gradient-purple text-primary-foreground font-semibold"
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
