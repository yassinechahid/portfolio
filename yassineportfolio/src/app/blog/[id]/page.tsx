import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowLeft, Tag } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    id: post.id.toString(),
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const post = blogPosts.find((p) => p.id === parseInt(id));

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} - Yassine Chahid`,
    description: post.excerpt,
  };
}

export default async function BlogPost({ params }: PageProps) {
  const { id } = await params;
  const post = blogPosts.find((p) => p.id === parseInt(id));

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-light-background dark:bg-dark-background">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-body-medium text-light-primary dark:text-dark-primary hover:opacity-80 transition-opacity mb-8">
            <ArrowLeft className="w-5 h-5" />
            Back to Blog
          </Link>

          {/* Category Badge */}
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-light-primaryContainer dark:bg-dark-primaryContainer text-light-onPrimaryContainer dark:text-dark-onPrimaryContainer text-label-medium font-medium">
              <Tag className="w-4 h-4" />
              {post.category}
            </span>
            {post.featured && (
              <span className="px-4 py-2 rounded-full bg-light-tertiaryContainer dark:bg-dark-tertiaryContainer text-light-onTertiaryContainer dark:text-dark-onTertiaryContainer text-label-medium font-medium">
                Featured
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-display-medium md:text-display-large font-bold text-light-onBackground dark:text-dark-onBackground mb-6">
            {post.title}
          </h1>

          {/* Meta Info */}
          <div className="flex items-center gap-6 text-body-medium text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant mb-8">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              {post.date}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              {post.readTime}
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative w-full h-96 rounded-3xl overflow-hidden border-2 border-light-outlineVariant dark:border-dark-outlineVariant mb-12">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-light-surfaceContainerLow dark:bg-dark-surfaceContainerLow rounded-3xl p-8 md:p-12 border border-light-outlineVariant dark:border-dark-outlineVariant">
            {/* Excerpt */}
            <p className="text-title-large text-light-onSurface dark:text-dark-onSurface mb-8 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Content */}
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <div className="whitespace-pre-line text-body-large text-light-onSurface dark:text-dark-onSurface leading-relaxed">
                {post.content}
              </div>
            </div>

            {/* Share / Navigation */}
            <div className="mt-12 pt-8 border-t border-light-outline dark:border-dark-outline">
              <div className="flex items-center justify-between">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-light-primary dark:bg-dark-primary text-light-onPrimary dark:text-dark-onPrimary hover:opacity-90 transition-opacity text-label-large font-medium">
                  <ArrowLeft className="w-5 h-5" />
                  All Articles
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-light-outline dark:border-dark-outline text-light-onSurface dark:text-dark-onSurface hover:bg-light-surfaceContainerLow dark:hover:bg-dark-surfaceContainerLow transition-colors text-label-large font-medium">
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8 bg-light-surfaceContainerLow dark:bg-dark-surfaceContainerLow">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-headline-large font-bold text-light-onBackground dark:text-dark-onBackground mb-12 text-center">
            More Articles
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {blogPosts
              .filter((p) => p.id !== post.id && p.category === post.category)
              .slice(0, 3)
              .map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.id}`}
                  className="group">
                  <div className="rounded-2xl border border-light-outline dark:border-dark-outline overflow-hidden hover:border-light-primary dark:hover:border-dark-primary transition-all h-full flex flex-col bg-light-background dark:bg-dark-background">
                    {/* Image */}
                    <div className="relative w-full h-48 overflow-hidden bg-light-surfaceContainerLow dark:bg-dark-surfaceContainerLow">
                      <Image
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <span className="px-3 py-1 rounded-full bg-light-primaryContainer dark:bg-dark-primaryContainer text-light-onPrimaryContainer dark:text-dark-onPrimaryContainer text-label-small font-medium mb-3 self-start">
                        {relatedPost.category}
                      </span>
                      <h3 className="text-headline-small font-bold text-light-onBackground dark:text-dark-onBackground mb-2 line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-body-medium text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
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
