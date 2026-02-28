import Head from "next/head";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  keywords?: string[];
}

export default function SEO({
  title,
  description,
  canonical,
  ogImage = "/assets/yassine.png",
  ogType = "website",
  keywords = [],
}: SEOProps) {
  const baseUrl = "https://yassinechahid.vercel.app";
  const fullUrl = canonical ? `${baseUrl}${canonical}` : baseUrl;
  const imageUrl = ogImage.startsWith("http")
    ? ogImage
    : `${baseUrl}${ogImage}`;

  return (
    <Head>
      <title>{title} | Yassine Chahid - Full-Stack Developer</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(", ")} />
      )}
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph */}
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={ogType} />
      <meta
        property="og:title"
        content={`${title} | Yassine Chahid - Full-Stack Developer`}
      />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content="Yassine Chahid Portfolio" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${title} | Yassine Chahid`} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:creator" content="@2vdUkvownfF8Ian" />
    </Head>
  );
}
