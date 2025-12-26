import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export const ImpactStorySection = () => {
  return (
    <section className="py-20 bg-earth text-earth-foreground relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-20 h-20 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-8"
          >
            <Quote className="w-10 h-10 text-gold" />
          </motion.div>

          <h2 className="font-display text-3xl md:text-4xl font-bold mb-8">
            "Now We Can Treat Our Patients with{" "}
            <span className="text-gold">Dignity</span>"
          </h2>

          <p className="text-earth-foreground/80 text-lg leading-relaxed mb-8">
            Last year, Connect with Africa coordinated the delivery of a container 
            of medical supplies to Northern Nigeria. As the nurses unpacked the boxes, 
            many of them wept.
          </p>

          <p className="text-earth-foreground/80 text-lg leading-relaxed mb-8">
            "Now we can treat our patients with dignity," they said.
          </p>

          <p className="text-earth-foreground/80 text-lg leading-relaxed">
            What seemed like simple items — gloves, dressings, basic tools — became 
            the difference between turning patients away and providing safe, respectful care.
            <span className="block mt-4 text-gold font-semibold">
              Your support makes stories like this possible.
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ImpactStorySection;
