import { motion } from "framer-motion";

export const FounderSection = () => {
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
            className="relative order-2 lg:order-1"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-gold/20 to-accent/20 rounded-2xl blur-xl" />
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600"
                  alt="Cajetan Onu - Founder"
                  className="w-full h-[500px] object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="order-1 lg:order-2"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-gold/10 text-gold text-sm font-medium mb-6">
              Leadership
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              Meet Our Founder
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              <span className="font-semibold text-foreground">Cajetan Onu, JD</span>, 
              is the Founder and Executive Director of Connect with Africa. With a 
              background in law, compliance, and community development, he has dedicated 
              his work to building bridges between global partners and underserved African 
              communities.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              His recent visits to primary healthcare centers in Nigeria inform and 
              guide every aspect of this mission. Through firsthand experience, he has 
              witnessed both the challenges and the incredible resilience of healthcare 
              workers serving their communities with limited resources.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
              className="mt-8 p-6 bg-secondary/50 rounded-xl border border-border"
            >
              <p className="text-foreground italic">
                "Every container we send is more than supplies – it's a message to 
                healthcare workers that the world sees them, values them, and stands with them."
              </p>
              <p className="text-primary font-semibold mt-4">— Cajetan Onu</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
