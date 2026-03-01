"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Calendar,
  Clock,
  ArrowLeft,
  Tag,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Link2,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { blogPosts } from "@/data/blogPosts";
import { notFound } from "next/navigation";

export default function BlogPost() {
  const { t } = useTranslation();
  const params = useParams();
  const id = params.id as string;
  const post = blogPosts.find((p) => p.id === parseInt(id));
  const [showShareMenu, setShowShareMenu] = useState(false);

  if (!post) {
    notFound();
  }

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareTitle = t(post.title);

  const handleShare = (platform: string) => {
    const urls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    };

    if (platform === "copy") {
      navigator.clipboard.writeText(shareUrl);
      setShowShareMenu(false);
      return;
    }

    window.open(urls[platform], "_blank", "width=600,height=400");
    setShowShareMenu(false);
  };

  return (
    <main className="min-h-screen bg-light-background dark:bg-dark-background">
      {/* Hero Section */}
      <section className="relative pt-24 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-label-large text-light-primary dark:text-dark-primary hover:gap-3 transition-all mb-6 group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            {t("blog.backToBlog")}
          </Link>

          {/* Category & Featured Badges */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-light-primaryContainer dark:bg-dark-primaryContainer text-light-onPrimaryContainer dark:text-dark-onPrimaryContainer text-label-large font-semibold">
              <Tag className="w-4 h-4" />
              {t(post.category)}
            </span>
            {post.featured && (
              <span className="px-4 py-2 rounded-full bg-light-tertiaryContainer dark:bg-dark-tertiaryContainer text-light-onTertiaryContainer dark:text-dark-onTertiaryContainer text-label-large font-semibold">
                ⭐ {t("blog.featured")}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-display-small md:text-display-medium font-bold text-light-onBackground dark:text-dark-onBackground mb-6 leading-tight">
            {t(post.title)}
          </h1>

          {/* Meta Info & Share */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-6 text-body-large text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{t(post.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{t(post.readTime)}</span>
              </div>
            </div>

            {/* Share Button */}
            <div className="relative">
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-light-outline dark:border-dark-outline text-light-onSurface dark:text-dark-onSurface hover:bg-light-surfaceContainerHigh dark:hover:bg-dark-surfaceContainerHigh transition-all text-label-large font-medium">
                <Share2 className="w-5 h-5" />
                <span>Share</span>
              </button>

              {/* Share Menu */}
              {showShareMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-light-surface dark:bg-dark-surface rounded-2xl shadow-xl border border-light-outline dark:border-dark-outline overflow-hidden z-10">
                  <button
                    onClick={() => handleShare("twitter")}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-light-surfaceContainerHigh dark:hover:bg-dark-surfaceContainerHigh transition-colors text-left">
                    <Twitter className="w-5 h-5 text-[#1DA1F2]" />
                    <span className="text-body-medium text-light-onSurface dark:text-dark-onSurface">
                      Twitter
                    </span>
                  </button>
                  <button
                    onClick={() => handleShare("facebook")}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-light-surfaceContainerHigh dark:hover:bg-dark-surfaceContainerHigh transition-colors text-left">
                    <Facebook className="w-5 h-5 text-[#1877F2]" />
                    <span className="text-body-medium text-light-onSurface dark:text-dark-onSurface">
                      Facebook
                    </span>
                  </button>
                  <button
                    onClick={() => handleShare("linkedin")}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-light-surfaceContainerHigh dark:hover:bg-dark-surfaceContainerHigh transition-colors text-left">
                    <Linkedin className="w-5 h-5 text-[#0A66C2]" />
                    <span className="text-body-medium text-light-onSurface dark:text-dark-onSurface">
                      LinkedIn
                    </span>
                  </button>
                  <button
                    onClick={() => handleShare("copy")}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-light-surfaceContainerHigh dark:hover:bg-dark-surfaceContainerHigh transition-colors text-left border-t border-light-outline dark:border-dark-outline">
                    <Link2 className="w-5 h-5" />
                    <span className="text-body-medium text-light-onSurface dark:text-dark-onSurface">
                      Copy Link
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      {/* Content Section */}
      <section className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Featured Image - Float Left */}
          <div className="float-left w-full sm:w-80 md:w-96 mr-0 sm:mr-8 mb-6 rounded-2xl overflow-hidden border-2 border-light-outlineVariant dark:border-dark-outlineVariant shadow-lg">
            <div className="relative w-full aspect-[4/3]">
              <Image
                src={post.image}
                alt={t(post.title)}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Excerpt - Lead paragraph */}
          <div className="mb-6">
            <p className="text-title-medium text-light-onSurface dark:text-dark-onSurface leading-relaxed font-medium">
              {t(post.excerpt)}
            </p>
          </div>

          {/* Content */}
          <article className="prose prose-lg prose-slate dark:prose-invert max-w-none">
            <div className="text-body-large text-light-onSurface dark:text-dark-onSurface leading-relaxed space-y-5">
              {t(post.content)
                .split("\n\n")
                .map((paragraph: string, index: number) => {
                  // Check if paragraph starts with **
                  if (paragraph.startsWith("**") && paragraph.endsWith(":**")) {
                    return (
                      <h2
                        key={index}
                        className="text-headline-medium font-bold text-light-onBackground dark:text-dark-onBackground mt-8 mb-4 first:mt-0">
                        {paragraph.replace(/\*\*/g, "").replace(":", "")}
                      </h2>
                    );
                  }

                  // Check if paragraph is a list item
                  if (paragraph.startsWith("- ")) {
                    const items = paragraph.split("\n");
                    return (
                      <ul key={index} className="space-y-2 pl-6 my-4 list-none">
                        {items.map((item, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 text-body-large">
                            <span className="text-light-primary dark:text-dark-primary mt-1 text-xl">
                              •
                            </span>
                            <span>
                              {item.replace(/^- /, "").replace(/\*\*/g, "")}
                            </span>
                          </li>
                        ))}
                      </ul>
                    );
                  }

                  // Check if paragraph is numbered list
                  if (/^\d+\./.test(paragraph)) {
                    const items = paragraph.split("\n");
                    return (
                      <ol key={index} className="space-y-2 pl-6 my-4">
                        {items.map((item, i) => (
                          <li
                            key={i}
                            className="text-body-large pl-2 marker:text-light-primary dark:marker:text-dark-primary marker:font-bold">
                            {item.replace(/^\d+\.\s/, "").replace(/\*\*/g, "")}
                          </li>
                        ))}
                      </ol>
                    );
                  }

                  // Regular paragraph
                  return (
                    <p
                      key={index}
                      className="text-body-large leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: paragraph.replace(
                          /\*\*(.*?)\*\*/g,
                          '<strong class="font-bold text-light-onBackground dark:text-dark-onBackground">$1</strong>',
                        ),
                      }}
                    />
                  );
                })}
            </div>
          </article>

          {/* Clear float */}
          <div className="clear-both"></div>

          {/* Action Buttons */}
          <div className="mt-12 pt-8 border-t border-light-outlineVariant dark:border-dark-outlineVariant flex flex-wrap items-center gap-4">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-light-primary dark:bg-dark-primary text-light-onPrimary dark:text-dark-onPrimary hover:shadow-lg hover:scale-[1.02] transition-all text-label-large font-medium">
              <ArrowLeft className="w-5 h-5" />
              {t("blog.allArticles")}
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-light-outline dark:border-dark-outline text-light-onSurface dark:text-dark-onSurface hover:bg-light-surfaceContainerHigh dark:hover:bg-dark-surfaceContainerHigh hover:border-light-primary dark:hover:border-dark-primary transition-all text-label-large font-medium">
              {t("blog.getInTouch")}
            </Link>
          </div>
        </div>
      </section>
      {/* Related Posts */}
      {blogPosts.some(
        (p) => p.id !== post.id && t(p.category) === t(post.category),
      ) && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-light-surface dark:bg-dark-surface border-t border-light-outlineVariant dark:border-dark-outlineVariant">
          <div className="max-w-4xl mx-auto">
            {/* Section Header */}
            <div className="mb-12">
              <h2 className="text-headline-large font-bold text-light-onBackground dark:text-dark-onBackground mb-2">
                {t("blog.moreArticles")}
              </h2>
              <p className="text-body-large text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant">
                Explore more articles in this category
              </p>
            </div>

            {/* Related Posts Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
              {blogPosts
                .filter(
                  (p) => p.id !== post.id && t(p.category) === t(post.category),
                )
                .slice(0, 3)
                .map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    href={`/blog/${relatedPost.id}`}
                    className="group block h-full">
                    <div className="rounded-xl border-2 border-light-outlineVariant dark:border-dark-outlineVariant overflow-hidden hover:border-light-primary dark:hover:border-dark-primary hover:shadow-xl transition-all duration-300 h-full flex flex-col bg-light-background dark:bg-dark-background">
                      {/* Image */}
                      <div className="relative w-full h-44 overflow-hidden">
                        <Image
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      </div>

                      {/* Content */}
                      <div className="p-5 flex-1 flex flex-col">
                        {/* Category Badge */}
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-light-primaryContainer dark:bg-dark-primaryContainer text-light-onPrimaryContainer dark:text-dark-onPrimaryContainer text-label-small font-semibold mb-3 self-start">
                          <Tag className="w-3 h-3" />
                          {t(relatedPost.category)}
                        </span>

                        {/* Title */}
                        <h3 className="text-title-large font-bold text-light-onBackground dark:text-dark-onBackground mb-2 line-clamp-2 group-hover:text-light-primary dark:group-hover:text-dark-primary transition-colors">
                          {t(relatedPost.title)}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-body-medium text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant line-clamp-3 flex-1">
                          {t(relatedPost.excerpt)}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>

            {/* View All Link */}
            <div className="mt-10 pt-8 border-t border-light-outlineVariant dark:border-dark-outlineVariant flex justify-center">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-light-primary dark:bg-dark-primary text-light-onPrimary dark:text-dark-onPrimary hover:shadow-xl hover:scale-105 transition-all text-label-large font-semibold">
                {t("blog.allArticles")}
                <ArrowLeft className="w-5 h-5 rotate-180" />
              </Link>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
