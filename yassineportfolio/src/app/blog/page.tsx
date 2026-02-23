"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowRight } from "lucide-react";

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  featured?: boolean;
}

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const posts: BlogPost[] = [
    {
      slug: "building-scalable-react-apps",
      title: "Building Scalable React Applications",
      excerpt:
        "Learn best practices for architecting React applications that can grow with your business. We&#39;ll cover component structure, state management, and performance optimization.",
      date: "January 18, 2024",
      readTime: "8 min read",
      category: "React",
      image: "/yassine/1.jpg",
      featured: true,
    },
    {
      slug: "nextjs-13-app-router",
      title: "Mastering Next.js 13 App Router",
      excerpt:
        "A comprehensive guide to the new App Router in Next.js 13. Discover how it simplifies routing, improves performance, and enables better code organization.",
      date: "January 10, 2024",
      readTime: "10 min read",
      category: "Next.js",
      image: "/yassine/2.webp",
    },
    {
      slug: "typescript-best-practices",
      title: "TypeScript Best Practices for Frontend",
      excerpt:
        "Master TypeScript's advanced features to write safer, more maintainable code. Including generics, type guards, and useful patterns.",
      date: "January 5, 2024",
      readTime: "12 min read",
      category: "TypeScript",
      image: "/yassine/3.jpg",
    },
    {
      slug: "performance-optimization-guide",
      title: "Web Performance Optimization Guide",
      excerpt:
        "Complete guide to optimizing your web applications. From code splitting to image optimization, learn techniques to improve Core Web Vitals.",
      date: "December 28, 2023",
      readTime: "15 min read",
      category: "Performance",
      image: "/yassine/4.jpg",
    },
    {
      slug: "design-systems-implementation",
      title: "Building a Scalable Design System",
      excerpt:
        "How to create and maintain a design system that scales across your organization. Best practices for component design and documentation.",
      date: "December 20, 2023",
      readTime: "11 min read",
      category: "Design",
      image: "/yassine/5.webp",
    },
    {
      slug: "testing-react-components",
      title: "Modern React Testing Strategies",
      excerpt:
        "Learn how to test React components effectively using Testing Library and Jest. Write tests that focus on user behavior, not implementation details.",
      date: "December 15, 2023",
      readTime: "9 min read",
      category: "Testing",
      image: "/yassine/6.jpg",
    },
  ];

  const categories = ["All", ...new Set(posts.map((p) => p.category))];

  const filteredPosts =
    selectedCategory === "All"
      ? posts
      : posts.filter((p) => p.category === selectedCategory);

  return (
    <main className="min-h-screen bg-light-background dark:bg-dark-background">
      {/* Header */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-display-large font-bold text-light-onBackground dark:text-dark-onBackground mb-6">
            Blog & Articles
          </h1>
          <p className="text-body-large text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant max-w-3xl">
            Insights and articles about web development, design systems,
            performance optimization, and the latest technologies in the
            frontend ecosystem.
          </p>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 border-b border-light-outline dark:border-dark-outline">
        <div className="max-w-5xl mx-auto">
          <div className="flex overflow-x-auto gap-3 pb-2">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full whitespace-nowrap text-label-medium font-medium transition-colors ${
                  selectedCategory === cat
                    ? "bg-light-primary dark:bg-dark-primary text-light-onPrimary dark:text-dark-onPrimary"
                    : "border border-light-outline dark:border-dark-outline text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant hover:border-light-primary dark:hover:border-dark-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {filteredPosts.find((p) => p.featured) && (
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <Link href={`/blog/${filteredPosts.find((p) => p.featured)?.slug}`}>
              <div className="group cursor-pointer rounded-2xl overflow-hidden border border-light-outline dark:border-dark-outline hover:border-light-primary dark:hover:border-dark-primary transition-all">
                {/* Image */}
                <div className="relative w-full h-96 overflow-hidden bg-light-surfaceContainerLow dark:bg-dark-surfaceContainerLow">
                  {filteredPosts.find((p) => p.featured)?.image && (
                    <Image
                      src={filteredPosts.find((p) => p.featured)?.image || ""}
                      alt="Featured post"
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
                        {filteredPosts.find((p) => p.featured)?.category}
                      </span>
                      <span className="text-label-small text-white">
                        Featured
                      </span>
                    </div>
                    <h2 className="text-display-small font-bold text-white">
                      {filteredPosts.find((p) => p.featured)?.title}
                    </h2>
                    <p className="text-body-large text-white/80">
                      {filteredPosts.find((p) => p.featured)?.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-body-small text-white/60 pt-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {filteredPosts.find((p) => p.featured)?.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {filteredPosts.find((p) => p.featured)?.readTime}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-light-primary dark:text-dark-primary group-hover:gap-4 transition-all pt-4">
                      Read Article
                      <ArrowRight className="w-5 h-5" />
                    </div>
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
              .map((post, idx) => (
                <Link key={idx} href={`/blog/${post.slug}`}>
                  <div className="group cursor-pointer rounded-2xl border border-light-outline dark:border-dark-outline overflow-hidden hover:border-light-primary dark:hover:border-dark-primary transition-all h-full flex flex-col">
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
                          {post.category}
                        </span>
                      </div>
                      <h3 className="text-headline-small font-bold text-light-onBackground dark:text-dark-onBackground mb-2">
                        {post.title}
                      </h3>
                      <p className="text-body-medium text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant mb-4 flex-1">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-body-small text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant pt-4 border-t border-light-outline dark:border-dark-outline">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {post.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.readTime}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-light-primaryContainer dark:bg-dark-primaryContainer">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-headline-large font-bold text-light-onPrimaryContainer dark:text-dark-onPrimaryContainer mb-4">
            Subscribe to My Newsletter
          </h2>
          <p className="text-body-large text-light-onPrimaryContainer/80 dark:text-dark-onPrimaryContainer/80 mb-8">
            Get the latest articles, tutorials, and insights delivered to your
            inbox weekly.
          </p>
          <div className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-light-background dark:bg-dark-background border border-light-outline dark:border-dark-outline focus:outline-none focus:border-light-primary dark:focus:border-dark-primary"
            />
            <button className="px-6 py-3 rounded-lg bg-light-primary dark:bg-dark-primary text-light-onPrimary dark:text-dark-onPrimary hover:opacity-90 transition-opacity font-medium">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
