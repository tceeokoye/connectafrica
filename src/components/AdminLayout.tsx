"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  DollarSign,
  Users,
  Settings,
  Menu,
  X,
  Heart,
  LogOut,

} from "lucide-react";
import { Button } from "@/components/ui/button";

const sidebarLinks = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/campaigns", label: "Campaigns", icon: FileText },
  { href: "/admin/blog", label: "Blog", icon: FileText },
  { href: "/admin/gallery", label: "Gallery", icon: FileText },
  { href: "/admin/donations", label: "Donations", icon: DollarSign },
  { href: "/admin/subscribers", label: "Subscribers", icon: Users },
 
];

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout ({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

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
          <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-sidebar-primary flex items-center justify-center">
                <Heart className="w-4 h-4 text-sidebar-primary-foreground" />
              </div>
              <span className="font-display text-lg font-bold text-sidebar-foreground">
                ConnectAfrica
              </span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-sidebar-foreground"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {sidebarLinks.map((link) => {
              const isActive = pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent"
                  }`}
                >
                  <link.icon className="w-5 h-5" />
                  <span className="font-medium">{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-sidebar-border">
            <Link href="/">
              <Button
                variant="ghost"
                className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent"
              >
                <LogOut className="w-5 h-5 mr-3" />
                Back to Site
              </Button>
            </Link>
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
};


