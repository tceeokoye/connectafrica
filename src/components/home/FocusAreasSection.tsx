import { motion } from "framer-motion";
import { Stethoscope, Users, GraduationCap, Globe } from "lucide-react";

const focusAreas = [
  {
    icon: Stethoscope,
    title: "Healthcare Support",
    description:
      "Delivering medical supplies, basic equipment, and protective gear to clinics and health centers that are critically under-resourced",
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
    title: "Education & Training (Future Focus)",
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
    <section className="relative py-28 bg-background/50 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_80%_20%,rgba(34,197,94,0.06),transparent_40%)]" />

      <div className="container mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-5 py-2 rounded-full bg-red-500/10 text-red-500 text-sm font-semibold mb-6">
            Our Focus Areas
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
            Areas of Impact
          </h2>
          <p className="text-muted-foreground leading-relaxed text-lg">
            We focus on sustainable, community-driven initiatives that create lasting 
            change across healthcare, education, and community development.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {focusAreas.map((area, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
              whileHover={{ y: -10, scale: 1.02, transition: { duration: 0.25 } }}
              className="bg-card/80 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300"
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
