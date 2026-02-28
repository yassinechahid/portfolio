"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import Image from "next/image";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

const ProjectCard = ({
  title,
  description,
  tags,
  image,
  liveUrl,
  githubUrl,
  featured = false,
}: ProjectCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className={`group relative rounded-3xl overflow-hidden border border-light-outline dark:border-dark-outline transition-all duration-300 hover:border-light-primary dark:hover:border-dark-primary hover:shadow-2xl flex flex-col h-full ${
        featured ? "lg:col-span-2" : ""
      }`}>
      {/* Background Image */}
      <div className="relative w-full h-64 overflow-hidden bg-light-surfaceContainerLow dark:bg-dark-surfaceContainerLow">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Featured Badge */}
        {featured && (
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-light-primary dark:bg-dark-primary text-light-onPrimary dark:text-dark-onPrimary text-label-small font-semibold shadow-lg">
            Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 bg-light-surface dark:bg-dark-surface">
        {/* Title and Description */}
        <div className="flex-1">
          <h3 className="text-headline-small text-light-onBackground dark:text-dark-onBackground mb-3 font-bold group-hover:text-light-primary dark:group-hover:text-dark-primary transition-colors">
            {title}
          </h3>
          <p className="text-body-medium text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant mb-4 leading-relaxed">
            {description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 text-label-small rounded-full bg-light-primaryContainer/50 dark:bg-dark-primaryContainer/50 text-light-onPrimaryContainer dark:text-dark-onPrimaryContainer font-medium border border-light-outline/20 dark:border-dark-outline/20">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons - Always at bottom */}
        <div className="flex gap-3 pt-4 border-t border-light-outline/30 dark:border-dark-outline/30 mt-auto">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-light-primary dark:bg-dark-primary text-light-onPrimary dark:text-dark-onPrimary hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all text-label-medium font-semibold">
              <ExternalLink className="w-4 h-4" />
              View Live
            </a>
          )}
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border-2 border-light-outline dark:border-dark-outline hover:bg-light-surfaceContainerLow dark:hover:bg-dark-surfaceContainerLow hover:border-light-primary dark:hover:border-dark-primary hover:scale-[1.02] active:scale-95 transition-all text-label-medium font-semibold">
              <Github className="w-4 h-4" />
              View Code
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
