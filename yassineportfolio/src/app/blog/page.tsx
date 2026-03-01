"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowRight, Filter } from "lucide-react";
import { useTranslation } from "react-i18next";
import { blogPosts } from "@/data/blogPosts";

export default function Blog() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string>(
    t("blog.categoryAll"),
  );
  const postsRef = useRef<HTMLElement>(null);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    // Scroll to posts section smoothly with offset for fixed navbar
    setTimeout(() => {
      if (postsRef.current) {
        const yOffset = -0; // Offset for fixed navbar
        const y =
          postsRef.current.getBoundingClientRect().top +
          window.pageYOffset +
          yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 100);
  };

  // Get unique categories by translating first, then deduplicating
  const allCategories = blogPosts.map((p) => t(p.category));
  const uniqueCategories = Array.from(new Set(allCategories));

  const categories = [t("blog.categoryAll"), ...uniqueCategories];

  const filteredPosts =
    selectedCategory === t("blog.categoryAll")
      ? blogPosts
      : blogPosts.filter((p) => t(p.category) === selectedCategory);

  return (
    <main className="min-h-screen bg-light-background dark:bg-dark-background">
      {/* Header */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-display-large font-bold text-light-onBackground dark:text-dark-onBackground mb-6">
            {t("blog.title")}
          </h1>
          <p className="text-body-large text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant max-w-3xl">
            {t("blog.description")}
          </p>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 ">
        <div className="max-w-3xl mx-auto shadow-lg shadow-light-surfaceContainerLow dark:shadow-dark-surfaceContainerLow rounded-full">
          <div className="flex items-center gap-2 p-2 rounded-full bg-light-surface dark:bg-dark-surface shadow-lg max-w-full">
            <Filter className="w-5 h-5 text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant ml-2 flex-shrink-0" />
            <div className="flex gap-2 px-4 overflow-x-auto scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 whitespace-nowrap ${
                    selectedCategory === cat
                      ? "bg-gradient-to-r from-light-primary to-light-primary/80 dark:from-dark-primary dark:to-dark-primary/80 text-light-onPrimary dark:text-dark-onPrimary shadow-lg"
                      : "text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant hover:bg-light-surfaceContainerHigh dark:hover:bg-dark-surfaceContainerHigh"
                  }`}>
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section ref={postsRef} className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts
              .filter((p) => !p.featured)
              .map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.id}`}
                  className="group flex flex-col rounded-2xl border border-light-outline dark:border-dark-outline overflow-hidden hover:border-light-primary dark:hover:border-dark-primary transition-all h-full">
                  {/* Image */}
                  <div className="relative w-full h-48 overflow-hidden bg-light-surfaceContainerLow dark:bg-dark-surfaceContainerLow">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="mb-3">
                      <span className="px-3 py-1 rounded-full bg-light-primaryContainer dark:bg-dark-primaryContainer text-light-onPrimaryContainer dark:text-dark-onPrimaryContainer text-label-small font-medium">
                        {t(post.category)}
                      </span>
                    </div>
                    <h3 className="text-headline-small font-bold text-light-onBackground dark:text-dark-onBackground mb-2">
                      {t(post.title)}
                    </h3>
                    <p className="text-body-medium text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant mb-4 flex-1">
                      {t(post.excerpt)}
                    </p>
                    <div className="flex items-center gap-4 text-body-small text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant pt-4 border-t border-light-outline dark:border-dark-outline">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {t(post.date)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {t(post.readTime)}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-light-primary dark:text-dark-primary mt-4 group-hover:gap-3 transition-all">
                      {t("blog.readMore")}
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </main>
  );
}
