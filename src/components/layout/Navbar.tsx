"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import logo from "../../assets/logo.png";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/programs", label: "Programs" },
  { href: "/get-involved", label: "Get Involved" },
  { href: "/partners", label: "Partners" },
  { href: "/gallery", label: "Gallery" },
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

  const headerScrolled = scrolled || isOpen;

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-1 ${
        headerScrolled
          ? "bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-xl"
          : "bg-black/40 backdrop-blur-sm border-b border-white/10"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 flex flex-col justify-center w-full">
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center"
            >
              <Image
                src={logo}
                alt="Connect with Africa"
                width={200}
                height={120}
                className="h-[75px] sm:h-[85px] md:h-[90px] w-auto object-contain drop-shadow-md"
                priority
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-7 xl:gap-8">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative group py-1"
                >
                  <span
                    className={`text-base font-bold  transition-colors font-sans ${
                      headerScrolled
                        ? active
                          ? "text-green-600 font-extrabold"
                          : "text-gray-800 hover:text-green-600"
                        : active
                        ? "text-green-400 font-extrabold"
                        : "text-white hover:text-green-300"
                    }`}
                  >
                    {link.label}
                  </span>

                  {/* Underline animation */}
                  <motion.span
                    className={`absolute -bottom-1 left-0 h-[2.5px] rounded-full ${
                      headerScrolled
                        ? "bg-gradient-to-r from-green-600 to-emerald-500"
                        : "bg-gradient-to-r from-green-400 to-emerald-300"
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: active ? "100%" : 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.25 }}
                  />
                </Link>
              );
            })}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <Link href="/donate">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
              >
                <Button className="bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl py-2.5 px-6 shadow-lg shadow-green-900/30 text-base tracking-wide uppercase">
                  <span>DONATE NOW</span>
                </Button>
              </motion.div>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2.5 rounded-xl border transition-all ${
              headerScrolled
                ? "text-gray-800 border-gray-300 hover:bg-gray-100"
                : "text-white border-white/20 hover:bg-white/10"
            }`}
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
              transition={{ duration: 0.3 }}
              className={`lg:hidden w-full overflow-hidden mt-3 backdrop-blur-2xl rounded-2xl border shadow-2xl ${
                headerScrolled
                  ? "bg-white/98 border-gray-200 text-gray-800"
                  : "bg-green-950/98 border-green-600/40 text-white"
              }`}
            >
              <div className="p-6 space-y-4">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`block py-2 text-base font-bold uppercase tracking-wider transition-colors ${
                        headerScrolled
                          ? pathname === link.href
                            ? "text-green-600 font-extrabold"
                            : "text-gray-800 hover:text-green-600"
                          : pathname === link.href
                          ? "text-green-400 font-extrabold"
                          : "text-white hover:text-green-300"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navLinks.length * 0.05 }}
                  className="pt-2"
                >
                  <Link href="/donate" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-xl shadow-lg uppercase tracking-wide">
                      <span>DONATE NOW</span>
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
