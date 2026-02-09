"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Heart } from "lucide-react";
import { Button } from "../ui/button";
import logo from "../../assets/logo.png";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/campaigns", label: "Campaigns" },
  { href: "/gallery", label: "Gallery" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname() || "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Use combined state: scrolled OR menu open
  const headerScrolled = scrolled || isOpen;

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        headerScrolled
          ? "bg-gradient-to-r from-black/80 via-emerald-900/40 to-black/80 backdrop-blur-xl border-b border-white/5 shadow-2xl"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <motion.div whileHover={{ scale: 1.03 }} className="flex items-center">
              <Image
                src={logo}
                alt="Connect with Africa"
                className={`h-12 md:h-14 w-auto ${
                  headerScrolled ? "drop-shadow-xl" : "drop-shadow-sm"
                }`}
                priority
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link key={link.href} href={link.href} className="relative group">
                  <span
                    className={`text-sm font-semibold tracking-wide transition-colors ${
                      active
                        ? "text-red-500"
                        : headerScrolled
                        ? "text-white/80 hover:text-emerald-300"
                        : "text-black/80 hover:text-emerald-600"
                    }`}
                  >
                    {link.label}
                  </span>

                  {/* Underline animation */}
                  <motion.span
                    className="absolute -bottom-2 left-0 h-[2px] bg-gradient-to-r from-red-500 to-emerald-500"
                    initial={{ width: 0 }}
                    animate={{ width: active ? "100%" : 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              );
            })}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <Link href="/donate">
              <motion.div whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-red-600 hover:bg-red-700 text-white rounded-xl px-6 shadow-lg flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  Donate Now
                </Button>
              </motion.div>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 ${headerScrolled ? "text-white" : "text-black"}`}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35 }}
              className="lg:hidden overflow-hidden mt-4 bg-gradient-to-br from-black/90 via-emerald-900/40 to-black/90 backdrop-blur-xl rounded-2xl border border-white/5"
            >
              <div className="p-6 space-y-5">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`block text-lg font-semibold ${
                        pathname === link.href
                          ? "text-red-500"
                          : "text-white/80 hover:text-emerald-300"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.08 }}
                >
                  <Link href="/donate" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-red-600 hover:bg-red-700 text-white rounded-xl">
                      Donate Now
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Navbar;
