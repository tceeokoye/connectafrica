import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Package, Stethoscope, Baby, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const supplies = [
  { icon: Shield, text: "PPE: gloves, masks, and gowns" },
  { icon: Stethoscope, text: "Diagnostic tools: BP cuffs, thermometers, pulse oximeters" },
  { icon: Package, text: "Wound care and infection-control items" },
  { icon: Baby, text: "Maternity and newborn delivery kits" },
];

export const CampaignSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 text-destructive text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
              Current Priority
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              Urgent Medical Container Campaign
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Right now, Connect with Africa is preparing two containers of essential 
              medical supplies for primary healthcare centers in Nigeria. These clinics 
              lack gloves, basic diagnostic tools, wound care materials, and safe delivery 
              supplies for mothers and newborns.
            </p>

            {/* <div className="space-y-4 mb-8">
              <h4 className="font-semibold text-foreground">
                Your support helps us send:
              </h4>
              {supplies.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.08, ease: "easeOut" }}
                  className="flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <item.icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-muted-foreground">{item.text}</span>
                </motion.div>
              ))}
            </div> */}

            <Link href="/medical-container">
              <Button size="lg" className="bg-primary hover:bg-primary/90 transition-colors duration-200">
                Support the Medical Container Campaign
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800"
                alt="Medical supplies and healthcare"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-earth/60 to-transparent" />
            </div>
            {/* Progress Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
              className="absolute -bottom-8 -left-8 bg-card p-6 rounded-xl shadow-xl max-w-[280px] hidden md:block"
            >
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-semibold text-foreground">65%</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "65%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                    className="h-full bg-primary rounded-full"
                  />
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Raised</span>
                <span className="font-semibold text-primary">$32,500 / $50,000</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CampaignSection;
