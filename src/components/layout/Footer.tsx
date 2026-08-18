"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, Globe, Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import logo from "@/assets/logo.png";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/about#mission", label: "Our Mission" },
  { href: "/programs", label: "Programs" },
  { href: "/#impact", label: "Impact" },
  { href: "/gallery", label: "Gallery" },
  { href: "/partners", label: "Partners" },
  { href: "/donate", label: "Donate" },
  { href: "/contact", label: "Contact" },
];

const getInvolvedLinks = [
  { href: "/donate", label: "Donate" },
  { href: "/get-involved#volunteer", label: "Volunteer" },
  { href: "/get-involved#donate-supplies", label: "Donate Medical Supplies" },
  { href: "/get-involved#corporate-partner", label: "Become a Partner" },
  { href: "/get-involved#fundraise", label: "Fundraise" },
];

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
];

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-slate-950 via-slate-900 to-black text-gray-200 border-t border-emerald-900/20">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="inline-block">
              <Image
                src={logo}
                alt="Connect with Africa"
                className="h-12 w-auto drop-shadow-md"
                priority={false}
              />
            </Link>
            <h3 className="text-xl font-bold text-white tracking-wide">
              CONNECT WITH AFRICA
            </h3>
            <p className="text-emerald-400 font-medium text-sm leading-relaxed">
              Connecting Global Generosity. Empowering African Communities.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Connect with Africa is a humanitarian initiative dedicated to bridging global generosity with local needs across African communities. We work alongside clinics, healthcare workers, community leaders, and development partners to deliver critical medical supplies, strengthen frontline healthcare, and create pathways for sustainable community development.
            </p>

            <div className="pt-2 space-y-2 text-sm text-gray-300">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a href="mailto:connectwithafrica1@gmail.com" className="hover:text-emerald-300 transition-colors">
                  connectwithafrica1@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a href="tel:+18183005881" className="hover:text-emerald-300 transition-colors">
                  +1 (818) 300-5881
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <Link href="/" className="hover:text-emerald-300 transition-colors">
                  www.connectwithafrica.org
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3">
            <h4 className="font-bold text-white text-base uppercase tracking-wider mb-5 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-emerald-500 rounded" />
              Quick Links
            </h4>
            <ul className="grid grid-cols-1 gap-2.5">
              {quickLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-emerald-400 transition-colors text-sm flex items-center gap-2"
                  >
                    <span className="text-emerald-500 text-xs">›</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Involved */}
          <div className="lg:col-span-3">
            <h4 className="font-bold text-white text-base uppercase tracking-wider mb-5 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-emerald-500 rounded" />
              Get Involved
            </h4>
            <ul className="space-y-2.5">
              {getInvolvedLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-emerald-400 transition-colors text-sm flex items-center gap-2"
                  >
                    <span className="text-emerald-500 text-xs">›</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Link href="/donate">
                <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold py-3 px-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all">
                  <span>DONATE NOW</span>
                </button>
              </Link>
            </div>
          </div>

          {/* Follow Us */}
          <div className="lg:col-span-2">
            <h4 className="font-bold text-white text-base uppercase tracking-wider mb-5 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-emerald-500 rounded" />
              Follow Us
            </h4>
            <div className="flex flex-wrap gap-3 mb-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-emerald-600 text-gray-300 hover:text-white flex items-center justify-center transition-all duration-200 shadow-md"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Disclaimer & Legal */}
        <div className="mt-14 pt-8 border-t border-slate-800/80 space-y-6">
          <div className="bg-slate-900/60 rounded-2xl p-6 border border-slate-800">
            <h5 className="font-semibold text-white text-sm mb-2">Nonprofit & Tax-Exemption Notice</h5>
            <p className="text-gray-400 text-xs leading-relaxed">
              Connect with Africa is a nonprofit organization recognized as tax-exempt under Section 501(c)(3) of the Internal Revenue Code. Contributions may be tax-deductible to the extent permitted by law. Consult your tax advisor regarding your individual circumstances.
            </p>
            <p className="text-emerald-400 text-xs font-semibold mt-2">
              EIN: [Insert EIN]
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
            <p>
              © 2026 Connect with Africa. All Rights Reserved.
            </p>
            <div className="flex flex-wrap gap-4 sm:gap-6">
              <Link href="/privacy-policy" className="hover:text-emerald-400 transition-colors">
                Privacy Policy
              </Link>
              <span className="text-gray-700">|</span>
              <Link href="/terms-of-use" className="hover:text-emerald-400 transition-colors">
                Terms of Use
              </Link>
              <span className="text-gray-700">|</span>
              <Link href="/donor-privacy-policy" className="hover:text-emerald-400 transition-colors">
                Donor Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
