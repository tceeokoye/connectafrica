import { motion } from "framer-motion";
import { Stethoscope, Users, GraduationCap, Globe } from "lucide-react";

const focusAreas = [
  {
    icon: Stethoscope,
    title: "Healthcare Support",
    description:
      "Delivering medical supplies, basic equipment, and protective gear to clinics and health centers that are critically under-resourced.",
    color: "primary",
  },
  {
    icon: Users,
    title: "Community Partnerships",
    description:
      "Working directly with local leaders, nurses, and administrators to ensure supplies reach the people who need them most.",
    color: "accent",
  },
  {
    icon: GraduationCap,
    title: "Education & Training",
    description:
      "Supporting capacity building, health education, and partnerships that strengthen systems beyond a single shipment.",
    color: "terracotta",
  },
  {
    icon: Globe,
    title: "Diaspora & Global Engagement",
    description:
      "Connecting individuals, companies, and institutions around the world to meaningful, trackable projects in Africa.",
    color: "gold",
  },
];

export const FocusAreasSection = () => {
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
            Our Focus
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
            Areas of Impact
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            We focus on sustainable, community-driven initiatives that create lasting 
            change across healthcare, education, and community development.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {focusAreas.map((area, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="bg-card rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                style={{
                  backgroundColor: `hsl(var(--${area.color}) / 0.1)`,
                }}
              >
                <area.icon
                  className="w-8 h-8"
                  style={{ color: `hsl(var(--${area.color}))` }}
                />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-4">
                {area.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {area.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FocusAreasSection;
