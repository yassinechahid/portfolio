"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface TestimonialProps {
  name: string;
  role: string;
  company: string;
  text: string;
  rating?: number;
}

const TestimonialCard = ({
  name,
  role,
  company,
  text,
  rating = 5,
}: TestimonialProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="p-6 rounded-2xl border border-light-outline dark:border-dark-outline bg-light-surfaceContainerLow dark:bg-dark-surfaceContainerLow hover:border-light-primary dark:hover:border-dark-primary transition-colors"
    >
      {/* Rating */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
      </div>

      {/* Text */}
      <p className="text-body-medium text-light-onBackground dark:text-dark-onBackground mb-6 italic">
        &quot;{text}&quot;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-light-primary to-light-secondary dark:from-dark-primary dark:to-dark-secondary flex items-center justify-center text-light-onPrimary dark:text-dark-onPrimary font-medium">
          {name.charAt(0)}
        </div>
        <div>
          <h4 className="text-body-medium font-medium text-light-onBackground dark:text-dark-onBackground">
            {name}
          </h4>
          <p className="text-label-small text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant">
            {role} at {company}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
