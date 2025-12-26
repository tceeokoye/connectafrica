import { motion } from "framer-motion";
import { Heart, Users, Globe } from "lucide-react";

export const AboutSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800"
                alt="Healthcare workers in Africa"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-earth/60 to-transparent" />
            </div>
            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
              className="absolute -bottom-8 -right-8 bg-card p-6 rounded-xl shadow-xl max-w-[250px] hidden md:block"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="font-display text-2xl font-bold text-foreground">10K+</div>
                  <div className="text-muted-foreground text-sm">Lives Touched</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              Who We Are
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              About Connect with Africa
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Connect with Africa is a humanitarian initiative dedicated to bridging 
              global generosity with local needs across African communities. We work 
              alongside clinics, community leaders, and development partners to deliver 
              medical supplies, support healthcare workers, and create pathways for 
              long-term change.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              From primary healthcare centers in Nigeria to rural communities with 
              limited access to care, our mission is simple:{" "}
              <span className="text-foreground font-semibold">
                equip those who serve on the frontlines so they can save lives with dignity.
              </span>
            </p>

            {/* Features */}
            <div className="space-y-4">
              {[
                { icon: Heart, text: "Direct impact on healthcare facilities" },
                { icon: Users, text: "Community-driven partnerships" },
                { icon: Globe, text: "Global network of supporters" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.08, ease: "easeOut" }}
                  className="flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-accent" />
                  </div>
                  <span className="text-foreground font-medium">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
