"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export default function UnsubscribePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const handleUnsubscribe = async () => {
      const token = searchParams.get("token");

      if (!token) {
        setStatus("error");
        setMessage("Invalid unsubscribe link. Please check your email.");
        return;
      }

      try {
        const response = await fetch(
          `/api/v1/user/newsletter/unsubscribe?token=${token}`
        );
        const data = await response.json();

        if (data.success) {
          setStatus("success");
          setMessage(data.message || "You have been unsubscribed successfully");
        } else {
          setStatus("error");
          setMessage(data.message || "Failed to unsubscribe");
        }
      } catch (error) {
        setStatus("error");
        setMessage("An error occurred. Please try again later.");
        console.error("Unsubscribe error:", error);
      }
    };

    handleUnsubscribe();
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900/20 to-slate-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-xl p-8">
          {status === "loading" && (
            <div className="text-center">
              <Loader2 className="h-12 w-12 text-emerald-600 mx-auto mb-4 animate-spin" />
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Processing
              </h2>
              <p className="text-slate-600">Unsubscribing you from our newsletter...</p>
            </div>
          )}

          {status === "success" && (
            <div className="text-center">
              <CheckCircle2 className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Unsubscribed
              </h2>
              <p className="text-slate-600 mb-6">{message}</p>
              <p className="text-sm text-slate-500 mb-6">
                We've removed your email from our mailing list. You won't receive
                any more newsletters from us.
              </p>
              <button
                onClick={() => router.push("/")}
                className="inline-block px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Return to Home
              </button>
            </div>
          )}

          {status === "error" && (
            <div className="text-center">
              <AlertCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Error
              </h2>
              <p className="text-slate-600 mb-6">{message}</p>
              <p className="text-sm text-slate-500 mb-6">
                If you continue to have issues, please contact us at{" "}
                <a
                  href="mailto:info@connectafrica.org"
                  className="text-emerald-600 hover:underline"
                >
                  info@connectafrica.org
                </a>
              </p>
              <button
                onClick={() => router.push("/")}
                className="inline-block px-6 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
              >
                Return to Home
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
