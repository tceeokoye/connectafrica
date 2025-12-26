import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, Globe, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import logo from "@/assets/logo.jpg";

const footerLinks = {
  quickLinks: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/campaigns", label: "Campaigns" },
    { href: "/gallery", label: "Gallery" },
    { href: "/blog", label: "Blog" },
    { href: "/donate", label: "Donate" },
    { href: "/contact", label: "Contact" },
  ],
  campaigns: [
    { href: "/medical-container-campaign", label: "Medical Container Campaign" },
    { href: "/campaigns", label: "Healthcare Support" },
    { href: "/campaigns", label: "Community Partnerships" },
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
    <footer className="bg-earth text-earth-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/" className="block mb-4">
              <Image 
                src={logo} 
                alt="Connect with Africa" 
                className="h-14 w-auto bg-white rounded-lg p-1"
                priority={false}
              />
            </Link>
            <p className="text-earth-foreground/80 text-sm leading-relaxed mb-6">
              Bridging global generosity with local needs across African communities. 
              Together, we can save lives with dignity.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 rounded-full bg-earth-foreground/10 flex items-center justify-center hover:bg-primary transition-colors"
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
            <h4 className="font-display text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-earth-foreground/80 hover:text-gold transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Campaigns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="font-display text-lg font-semibold mb-6">Our Work</h4>
            <ul className="space-y-3">
              {footerLinks.campaigns.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-earth-foreground/80 hover:text-gold transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="font-display text-lg font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gold" />
                <a
                  href="mailto:connectwithafrica@gmail.com"
                  className="text-earth-foreground/80 hover:text-gold transition-colors text-sm"
                >
                  connectwithafrica@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-gold" />
                <span className="text-earth-foreground/80 text-sm">
                  www.connectwithafrica.org
                </span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 pt-8 border-t border-earth-foreground/20"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-earth-foreground/60 text-sm">
              © {new Date().getFullYear()} Connect with Africa. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href="/privacy"
                className="text-earth-foreground/60 hover:text-gold transition-colors text-sm"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-earth-foreground/60 hover:text-gold transition-colors text-sm"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
