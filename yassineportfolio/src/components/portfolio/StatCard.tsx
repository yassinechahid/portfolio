"use client";

import { motion } from "framer-motion";

interface StatCardProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

export default function StatCard({ label, value, icon }: StatCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="p-6 rounded-2xl border border-light-outline dark:border-dark-outline bg-light-surfaceContainerLow dark:bg-dark-surfaceContainerLow hover:border-light-primary dark:hover:border-dark-primary transition-colors"
    >
      {icon && (
        <div className="mb-4 text-light-primary dark:text-dark-primary">
          {icon}
        </div>
      )}
      <div className="text-display-small font-bold text-light-primary dark:text-dark-primary mb-2">
        {value}
      </div>
      <div className="text-body-medium text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant">
        {label}
      </div>
    </motion.div>
  );
}
