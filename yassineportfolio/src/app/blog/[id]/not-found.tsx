import Link from "next/link";
import { ArrowLeft, FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-light-background dark:bg-dark-background flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 rounded-full bg-light-errorContainer dark:bg-dark-errorContainer flex items-center justify-center">
            <FileQuestion className="w-12 h-12 text-light-error dark:text-dark-error" />
          </div>
        </div>

        {/* Content */}
        <h1 className="text-display-medium font-bold text-light-onBackground dark:text-dark-onBackground mb-4">
          Blog Post Not Found
        </h1>
        <p className="text-body-large text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant mb-8">
          {
            "The blog post you're looking for doesn't exist or has been removed."
          }
        </p>

        {/* Actions */}
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-light-primary dark:bg-dark-primary text-light-onPrimary dark:text-dark-onPrimary hover:opacity-90 transition-opacity text-label-large font-medium">
            <ArrowLeft className="w-5 h-5" />
            Back to Blog
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-light-outline dark:border-dark-outline text-light-onSurface dark:text-dark-onSurface hover:bg-light-surfaceContainerLow dark:hover:bg-dark-surfaceContainerLow transition-colors text-label-large font-medium">
            Go Home
          </Link>
        </div>
      </div>
    </main>
  );
}
