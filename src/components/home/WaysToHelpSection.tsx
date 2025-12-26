import Link from "next/link";
import { motion } from "framer-motion";
import { DollarSign, Package, Share2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const waysToHelp = [
  {
    icon: DollarSign,
    title: "Give Financially",
    description:
      "Help cover the cost of supplies, shipping, and distribution to clinics in need.",
    cta: "Make a Donation",
    href: "/campaigns",
    color: "primary",
  },
  {
    icon: Package,
    title: "Donate Supplies",
    description:
      "Partner with us as a company, hospital, or supplier to contribute medical items and equipment.",
    cta: "Partner As a Supplier",
    href: "/contact",
    color: "accent",
  },
  {
    icon: Share2,
    title: "Spread the Word",
    description:
      "Share our mission with friends, colleagues, and organizations that may be able to help.",
    cta: "Share Our Story",
    href: "/about",
    color: "terracotta",
  },
];

export const WaysToHelpSection = () => {
  const router = useRouter();
  return (
    <section className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            Get Involved
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ways You Can Help
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Every contribution, whether financial, material, or simply spreading 
            awareness, brings us closer to our goal of serving those in need.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {waysToHelp.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="bg-card rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col"
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                style={{
                  backgroundColor: `hsl(var(--${item.color}) / 0.1)`,
                }}
              >
                <item.icon
                  className="w-8 h-8"
                  style={{ color: `hsl(var(--${item.color}))` }}
                />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-4">
                {item.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                {item.description}
              </p>
              
                <Button  onClick={()=>router.push(item.href)}
                  variant="outline"
                  className="w-full border-border hover:bg-muted hover:text-black/70 transition-colors duration-200"
                >
                  {item.cta}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
             
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WaysToHelpSection;
