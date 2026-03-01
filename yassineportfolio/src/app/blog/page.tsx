"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { blogPosts } from "@/data/blogPosts";

export default function Blog() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string>(
    t("blog.categoryAll"),
  );

  // Get unique categories by translating first, then deduplicating
  const allCategories = blogPosts.map((p) => t(p.category));
  const uniqueCategories = Array.from(new Set(allCategories));

  const categories = [t("blog.categoryAll"), ...uniqueCategories];

  const filteredPosts =
    selectedCategory === t("blog.categoryAll")
      ? blogPosts
      : blogPosts.filter((p) => t(p.category) === selectedCategory);

  const featuredPost = filteredPosts.find((p) => p.featured);

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
      <section className="py-10 px-4 sm:px-6 lg:px-8 border-b border-light-outline dark:border-dark-outline">
        <div className="max-w-5xl mx-auto">
          <div className="flex overflow-x-auto gap-3 pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full whitespace-nowrap text-label-medium font-medium transition-colors ${
                  selectedCategory === cat
                    ? "bg-light-primary dark:bg-dark-primary text-light-onPrimary dark:text-dark-onPrimary"
                    : "border border-light-outline dark:border-dark-outline text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant hover:border-light-primary dark:hover:border-dark-primary"
                }`}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <Link
              href={`/blog/${featuredPost.id}`}
              className="group block rounded-2xl overflow-hidden border border-light-outline dark:border-dark-outline hover:border-light-primary dark:hover:border-dark-primary transition-all">
              {/* Image */}
              <div className="relative w-full h-96 overflow-hidden bg-light-surfaceContainerLow dark:bg-dark-surfaceContainerLow">
                {featuredPost.image && (
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    fill
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative z-10 p-8 -mt-32">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-light-primary dark:bg-dark-primary text-light-onPrimary dark:text-dark-onPrimary text-label-small font-medium">
                      {t(featuredPost.category)}
                    </span>
                    <span className="text-label-small text-white">
                      {t("blog.featured")}
                    </span>
                  </div>
                  <h2 className="text-display-small font-bold text-white">
                    {t(featuredPost.title)}
                  </h2>
                  <p className="text-body-large text-white/80">
                    {t(featuredPost.excerpt)}
                  </p>
                  <div className="flex items-center gap-4 text-body-small text-white/60 pt-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {t(featuredPost.date)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {t(featuredPost.readTime)}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-light-primary dark:text-dark-primary group-hover:gap-4 transition-all pt-4">
                    {t("blog.readArticle")}
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Blog Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
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
