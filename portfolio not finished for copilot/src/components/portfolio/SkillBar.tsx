"use client";

import { motion } from "framer-motion";

interface SkillBarProps {
  name: string;
  level: number;
}

export default function SkillBar({ name, level }: SkillBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="space-y-2"
    >
      <div className="flex justify-between items-center">
        <h4 className="text-body-medium font-medium text-light-onBackground dark:text-dark-onBackground">
          {name}
        </h4>
        <span className="text-label-small text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant">
          {level}%
        </span>
      </div>
      <div className="w-full h-2 rounded-full bg-light-surfaceContainerHigh dark:bg-dark-surfaceContainerHigh overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          className="h-full rounded-full bg-gradient-to-r from-light-primary to-light-secondary dark:from-dark-primary dark:to-dark-secondary"
        />
      </div>
    </motion.div>
  );
}
