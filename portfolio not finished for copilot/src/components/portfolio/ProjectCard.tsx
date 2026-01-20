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
      className={`group relative rounded-2xl overflow-hidden border border-light-outline dark:border-dark-outline transition-all duration-300 hover:border-light-primary dark:hover:border-dark-primary ${
        featured ? "lg:col-span-2" : ""
      }`}
    >
      {/* Background Image */}
      <div className="relative w-full h-64 overflow-hidden bg-light-surfaceContainerLow dark:bg-dark-surfaceContainerLow">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title and Description */}
        <h3 className="text-headline-small text-light-onBackground dark:text-dark-onBackground mb-2 font-bold">
          {title}
        </h3>
        <p className="text-body-medium text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant mb-4">
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-3 py-1 text-label-small rounded-full bg-light-primaryContainer/50 dark:bg-dark-primaryContainer/50 text-light-onPrimaryContainer dark:text-dark-onPrimaryContainer"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-3 pt-4 border-t border-light-outline dark:border-dark-outline">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-light-primary dark:bg-dark-primary text-light-onPrimary dark:text-dark-onPrimary hover:opacity-90 transition-opacity text-label-medium font-medium"
            >
              <ExternalLink className="w-4 h-4" />
              Live
            </a>
          )}
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-light-outline dark:border-dark-outline hover:bg-light-surfaceContainerLow dark:hover:bg-dark-surfaceContainerLow transition-colors text-label-medium font-medium"
            >
              <Github className="w-4 h-4" />
              Code
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
