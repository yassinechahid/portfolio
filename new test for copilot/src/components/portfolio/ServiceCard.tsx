"use client";

import { motion } from "framer-motion";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  features?: string[];
}

export default function ServiceCard({
  title,
  description,
  icon,
  features,
}: ServiceCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="p-6 rounded-2xl border border-light-outline dark:border-dark-outline bg-light-surfaceContainerLow dark:bg-dark-surfaceContainerLow hover:border-light-primary dark:hover:border-dark-primary transition-all group"
    >
      <div className="mb-4 text-light-primary dark:text-dark-primary group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-headline-small font-bold text-light-onBackground dark:text-dark-onBackground mb-3">
        {title}
      </h3>
      <p className="text-body-medium text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant mb-4">
        {description}
      </p>
      {features && features.length > 0 && (
        <ul className="space-y-2">
          {features.map((feature, idx) => (
            <li
              key={idx}
              className="flex items-start gap-2 text-body-small text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant"
            >
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-light-primary dark:bg-dark-primary mt-2 flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}
