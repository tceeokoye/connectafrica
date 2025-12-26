"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { useHttp } from "@/hooks/useHttp";
import { useToast } from "@/hooks/use-toast";
import { useDispatch } from "react-redux";
import { tokenActions } from "@/store/slices/authSlice";

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

  const inputBaseClasses =
    "w-full px-4 py-3 rounded-xl border transition-all duration-200 text-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-500";

  return (
    <section className="h-dvh flex justify-center items-center bg-gradient-to-br from-indigo-50 to-indigo-100">
      <div className="max-w-md w-full mx-auto bg-white p-10 rounded-2xl shadow-xl border border-gray-200">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Admin Login
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <label className="block text-gray-600 mb-2 font-medium">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="admin@example.com"
              className={`${inputBaseClasses} ${error && !email ? "border-red-500" : "border-gray-300"}`}
              required
            />
          </div>

          <div className="relative">
            <label className="block text-gray-600 mb-2 font-medium">Password</label>
            <div className="relative">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                placeholder="********"
                className={`${inputBaseClasses} ${error && !password ? "border-red-500" : "border-gray-300"} pr-12`}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-500 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <HiEyeOff size={22} /> : <HiEye size={22} />}
              </button>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-1"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </div>
        </form>
        <p className="text-gray-500 text-center text-sm mt-6">
          Use <span className="font-medium">admin@cohaaf.org</span> / <span className="font-medium">password</span> for demo
        </p>
      </div>
    </section>
  );
}