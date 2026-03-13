import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, Globe, Facebook, Twitter, Instagram, Linkedin, FileText, Shield } from "lucide-react";
import logo from "@/assets/logo.png";

const footerLinks = {
  quickLinks: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/campaigns", label: "Our Work" },
    { href: "/blog", label: "Blog & Resources" },
    { href: "/donate", label: "Donate" },
    { href: "/contact", label: "Contact" },
  ],
  resources: [
    { href: "/", label: "Annual Reports" },
    { href: "/", label: "Financial Statements" },
    { href: "/", label: "Audit Reports" },
    { href: "/", label: "Impact Stories" },
  ],
  compliance: [
    { href: "/", label: "Privacy Policy" },
    { href: "/", label: "Terms of Service" },
    { href: "/", label: "Compliance" },
    { href: "/", label: "Governance" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-gray-100">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <Link href="/" className="block mb-4">
              <Image 
                src={logo} 
                alt="Connect with Africa" 
                className="h-12 w-auto bg-white rounded-lg p-1"
                priority={false}
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              Bridging global generosity with local needs. We deliver essential resources 
              to underserved communities across Africa with integrity and transparency.
            </p>
            
            {/* Organization Info */}
            <div className="mb-8 space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-emerald-500" />
                <a href="mailto:connectwithafrica1@gmail.com" className="hover:text-emerald-400 transition-colors">
                  connectwithafrica1@gmail.com
                </a>
              </div>
              {/* <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-emerald-500" />
                <span>Organization Registration #: CWA-2024-001</span>
              </div> */}
            </div>

            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  title={social.label}
                  className="w-10 h-10 rounded-full bg-gray-800 hover:bg-emerald-600 flex items-center justify-center transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-semibold text-white mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-emerald-500 rounded" />
              Navigation
            </h4>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-emerald-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources & Transparency */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="font-semibold text-white mb-6 flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-500" />
              Transparency
            </h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-emerald-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Compliance & Legal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="font-semibold text-white mb-6 flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-500" />
              Compliance
            </h4>
            <ul className="space-y-3">
              {footerLinks.compliance.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-emerald-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Certifications & Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 pt-8 border-t border-gray-800"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
            <div className="flex flex-wrap gap-6 text-sm">
              {/* <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                <span className="text-gray-400">ISO 9001:2015 Certified</span>
              </div> */}
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                <span className="text-gray-400">Tax Exempt NGO</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-4 border-t border-gray-800">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Connect with Africa. All rights reserved. | Registered 501(c)(3) Organization
            </p>
            <div className="flex gap-6 text-sm">
              <Link
                href="/"
                className="text-gray-500 hover:text-emerald-400 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/"
                className="text-gray-500 hover:text-emerald-400 transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/"
                className="text-gray-500 hover:text-emerald-400 transition-colors"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
