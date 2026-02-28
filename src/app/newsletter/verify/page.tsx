"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle2, AlertCircle, Loader2, Mail } from "lucide-react";

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");
  const hasVerified = useRef(false);

  useEffect(() => {
    console.log("runs");

    const handleVerification = async () => {
      const token = searchParams.get("token");
      if (!token) {
        setStatus("error");
        setMessage("Invalid verification link.");
        return;
      }

      // Check sessionStorage for this token
      const verifiedKey = `newsletter_verified_${token}`;
      if (sessionStorage.getItem(verifiedKey)) {
        setStatus("success");
        setMessage("You have already verified your email.");
        return;
      }

      if (hasVerified.current) return;
      hasVerified.current = true;

      console.log("Verification token:", token);

      try {
        const response = await fetch(
          `/api/v1/user/newsletter/verify?token=${token}`
        );
        const data = await response.json();

        if (data.success) {
          setStatus("success");
          setMessage(data.message);
          sessionStorage.setItem(verifiedKey, "true");
          return;
        } else {
          setStatus("error");
          setMessage(data.message);
        }
      } catch (error) {
        setStatus("error");
        setMessage("An error occurred.");
      }
    };

    handleVerification();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900/20 to-slate-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-xl p-8">
          {status === "loading" && (
            <div className="text-center">
              <Loader2 className="h-12 w-12 text-emerald-600 mx-auto mb-4 animate-spin" />
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Verifying Email
              </h2>
              <p className="text-slate-600">Confirming your email address...</p>
            </div>
          )}

          {status === "success" && (
            <div className="text-center">
              <CheckCircle2 className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Confirmed!
              </h2>
              <p className="text-slate-600 mb-6">{message}</p>
              <p className="text-sm text-slate-500 mb-6">
                Check your inbox for your welcome email with all the details about our newsletter and how to stay updated with Connect with Africa's impact.
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => router.push("/")}
                  className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Return Home
                </button>
                <button
                  onClick={() => router.push("/campaigns")}
                  className="flex-1 px-4 py-2 bg-slate-200 text-slate-900 rounded-lg hover:bg-slate-300 transition-colors"
                >
                  View Campaigns
                </button>
              </div>
            </div>
          )}

          {status === "error" && (
            <div className="text-center">
              <AlertCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Verification Failed
              </h2>
              <p className="text-slate-600 mb-6">{message}</p>
              <p className="text-sm text-slate-500 mb-6">
                {message.includes("expired") 
                  ? "Please subscribe again to receive a new verification link."
                  : "If you continue to have issues, please contact us at info@connectafrica.org"
                }
            </p>
              <div className="flex gap-3 justify-center">
                
                <button
                  onClick={() => router.push("/")}
                  className="flex-1 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
                >
                  Go Home
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
