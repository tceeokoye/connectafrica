"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { useHttp } from "@/hooks/useHttp";
import { useToast } from "@/hooks/use-toast";
import { useDispatch } from "react-redux";
import { tokenActions } from "@/store/slices/authSlice";
import Image from "next/image";
import logo from "@/assets/logo.png";

export default function AdminLogin() {
  const router = useRouter();
  const { toast } = useToast();
  const { sendRequest, loading, error: hookError } = useHttp<{ token: string; name?: string }>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("All fields are required.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      const data = await sendRequest({
        url: "/api/v1/admin/login",
        method: "POST",
        data: { email, password },
      });

      dispatch(tokenActions.setToken(data.token));

      if (data.name) localStorage.setItem("admin_name", data.name);

      toast({
        title: "Login Successful!",
        description: `Welcome back, ${data.name || "Admin"}.`,
      });

      // slight delay so toast shows before redirect
      setTimeout(() => {
        router.push("/admin/dashboard");
      }, 800);
    } catch (err: any) {
      setError(err?.response?.data?.message || hookError || "Login failed");
    }
  };

  return (
    <section className="min-h-dvh flex justify-center items-center bg-gradient-to-br from-secondary via-background to-muted px-4">
      <div className="max-w-md w-full mx-auto bg-card border border-border p-10 rounded-2xl shadow-xl">
        {/* Logo / Brand */}
        <div className="flex flex-col items-center mb-8">
          <Image
            src={logo}
            alt="Connect with Africa"
            className="h-16 w-auto mb-4 drop-shadow-sm"
            priority
          />
          <h1 className="text-2xl font-bold text-foreground text-center">
            Admin Login
          </h1>
          <p className="text-muted-foreground text-sm mt-1 text-center">
            Sign in to the Connect with Africa dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Email Address
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="admin@connectwithafrica.org"
              className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full px-4 py-3 pr-12 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <HiEyeOff size={22} /> : <HiEye size={22} />}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <p className="text-destructive text-sm bg-destructive/10 border border-destructive/20 px-3 py-2 rounded-lg">
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary/90 disabled:opacity-60 text-primary-foreground font-semibold py-3 rounded-xl shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            {loading ? "Signing In…" : "Sign In"}
          </button>
        </form>
      </div>
    </section>
  );
}