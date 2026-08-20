"use client";

import { ReactNode, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  DollarSign,
  Users,
  Settings,
  Menu,
  X,
  LogOut,
  Target,
  BookOpen,
  ImageIcon,
  Globe,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { tokenActions } from "@/store/slices/authSlice";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";

import logo from "@/assets/logo.png";
import Image from "next/image";

const sidebarLinks = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/campaigns", label: "Campaigns", icon: Target },
  { href: "/admin/blog", label: "Blog", icon: BookOpen },
  { href: "/admin/gallery", label: "Gallery", icon: ImageIcon },
  { href: "/admin/donations", label: "Donations", icon: DollarSign },
  { href: "/admin/subscribers", label: "Subscribers", icon: Users },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.token.token);

  // Helper to check token expiration
  const checkAuth = useCallback(() => {
    if (!token) {
      dispatch(tokenActions.deleteToken());
      setIsAuthorized(false);
      router.replace("/admin/login");
      return false;
    }

    try {
      const decoded: { exp?: number; role?: string } = jwtDecode(token);
      
      // Check if expired
      if (!decoded.exp || decoded.exp * 1000 <= Date.now()) {
        dispatch(tokenActions.deleteToken());
        setIsAuthorized(false);
        toast.error("Your admin session has expired. Please log in again.");
        router.replace("/admin/login");
        return false;
      }

      setIsAuthorized(true);
      return true;
    } catch {
      dispatch(tokenActions.deleteToken());
      setIsAuthorized(false);
      toast.error("Invalid session. Please log in again.");
      router.replace("/admin/login");
      return false;
    }
  }, [token, dispatch, router]);

  // Initial check & periodic active session monitoring
  useEffect(() => {
    const valid = checkAuth();
    if (!valid) return;

    // Check every 5 seconds while user is on page
    const interval = setInterval(() => {
      checkAuth();
    }, 5000);

    // Check when user tabs back into the window
    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        checkAuth();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [checkAuth]);

  // Handle Logout
  const handleLogout = () => {
    dispatch(tokenActions.deleteToken());
    toast.success("Logged out successfully");
    router.replace("/admin/login");
  };

  // If still checking initial authentication or unauthorized, show brief loading screen
  if (isAuthorized === false || isAuthorized === null) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3 text-center">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
          <p className="text-sm font-semibold text-muted-foreground">
            Verifying admin session...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-sidebar border-b border-sidebar-border h-16 flex items-center px-4">
        <button
          onClick={() => setSidebarOpen(true)}
          className="text-sidebar-foreground"
        >
          <Menu className="w-6 h-6" />
        </button>
        <span className="ml-4 font-display text-lg font-bold text-sidebar-foreground">
          Admin Panel
        </span>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-sidebar border-r border-sidebar-border transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-16 flex items-center px-4 justify-between bg-white border-b border-sidebar-border">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src={logo}
                alt="Connect with Africa"
                width={200}
                height={120}
                className="h-[75px] sm:h-[85px] md:h-[60px] w-auto object-contain drop-shadow-md"
                priority
              />
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-sidebar-foreground"
            >
              <X className="w-5 h-5 text-black" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {sidebarLinks.map((link) => {
              const isActive = pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium text-sm ${
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground font-bold shadow-sm"
                      : "text-sidebar-foreground hover:bg-sidebar-accent"
                  }`}
                >
                  <link.icon className="w-5 h-5" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Footer Actions */}
          <div className="p-4 border-t border-sidebar-border space-y-2 bg-sidebar/50">
            <Link href="/" target="_blank">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent text-xs font-medium"
              >
                <Globe className="w-4 h-4 mr-2.5 text-muted-foreground" />
                View Public Site
              </Button>
            </Link>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="w-full justify-start text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 border-red-200 dark:border-red-900/50 text-xs font-bold"
            >
              <LogOut className="w-4 h-4 mr-2.5 text-red-600" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-foreground/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="lg:ml-64 pt-16 lg:pt-0 min-h-screen">
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}

