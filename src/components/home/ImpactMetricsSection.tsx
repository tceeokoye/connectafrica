"use client";

import { motion } from "framer-motion";
import { Users, Heart, Globe, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

const metrics = [
  {
    icon: Heart,
    label: "Lives Impacted",
    value: "50,000+",
    description: "People directly supported through our initiatives",
    color: "red",
  },
  {
    icon: Globe,
    label: "Countries Reached",
    value: "12",
    description: "Active programs across sub-Saharan Africa",
    color: "emerald",
  },
  {
    icon: Users,
    label: "Donors Worldwide",
    value: "8,500+",
    description: "Global community contributing to our mission",
    color: "blue",
  },
  {
    icon: TrendingUp,
    label: "Projects Completed",
    value: "145",
    description: "Successful initiatives delivering real results",
    color: "amber",
  },
];

const Counter = ({ target, duration = 2 }: { target: number; duration?: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = target / (duration * 60);
    const interval = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(interval);
  }, [target, duration]);

  return <>{count.toLocaleString()}</>;
};

export const ImpactMetricsSection = () => {
  return (
    <section className="relative py-20 md:py-32 bg-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 -left-96 w-96 h-96 bg-emerald-100/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-100/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold mb-6">
            Our Impact
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Transforming Lives Through Action
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Measurable results from our programs across Africa, verified through independent audits and community reports.
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200 p-8 text-center hover:border-emerald-300 transition-colors"
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 bg-${metric.color}-100`}>
                <metric.icon className={`w-8 h-8 text-${metric.color}-600`} />
              </div>
              
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                className={`font-display text-3xl md:text-4xl font-bold text-${metric.color}-600 mb-2`}
              >
                <Counter target={parseInt(metric.value.replace(/[^0-9]/g, ""))} />
                {metric.value.replace(/[0-9]/g, "")}
              </motion.div>

              <h3 className="font-semibold text-gray-900 text-lg mb-3">{metric.label}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{metric.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Verification Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 bg-blue-50 border border-blue-200 rounded-2xl p-8 text-center"
        >
          <p className="text-gray-700">
            <span className="font-semibold">Our Impact Verification:</span> All statistics are independently verified and 
            audited annually. Detailed impact reports are available upon request.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ImpactMetricsSection;
