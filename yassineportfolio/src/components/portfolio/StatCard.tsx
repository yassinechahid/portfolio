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
      className="
      group flex flex-col rounded-2xl overflow-hidden
      shadow-sm
      dark:shadow-[0_2px_6px_rgba(183,202,239,0.05)]
      hover:shadow-md
      dark:hover:shadow-[0_8px_24px_rgba(183,202,239,0.3)]
      transition-shadow duration-300
      h-full
      ">
      <div className="p-6 bg-light-surfaceContainerLow dark:bg-dark-surfaceContainerLow h-full">
        {icon && (
          <div className="mb-4 flex justify-center items-center text-light-primary dark:text-dark-primary">
            {icon}
          </div>
        )}
        <div className="text-display-small flex justify-center items-center font-bold text-light-primary dark:text-dark-primary mb-2">
          {value}
        </div>
        <div className="text-body-medium flex justify-center items-center text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant">
          {label}
        </div>
      </div>
    </motion.div>
  );
}
