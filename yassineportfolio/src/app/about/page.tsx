import { Metadata } from "next";
import { Code, Zap, Layout, Rocket, Shield, Smartphone } from "lucide-react";
import ServiceCard from "@/components/portfolio/ServiceCard";

export const metadata: Metadata = {
  title: "About Me - Yassine chahid",
  description:
    "Learn about my background, expertise, and journey as a frontend developer.",
};

export default function About() {
  const services = [
    {
      title: "Web Development",
      description: "Building responsive, high-performance web applications",
      icon: <Code className="w-8 h-8" />,
      features: [
        "React &amp; Next.js development",
        "TypeScript for type safety",
        "Performance optimization",
        "SEO best practices",
      ],
    },
    {
      title: "UI/UX Design",
      description: "Creating beautiful and intuitive user interfaces",
      icon: <Layout className="w-8 h-8" />,
      features: [
        "Figma &amp; design systems",
        "Responsive design",
        "Accessibility (WCAG)",
        "Component libraries",
      ],
    },
    {
      title: "Frontend Architecture",
      description: "Designing scalable and maintainable code structures",
      icon: <Zap className="w-8 h-8" />,
      features: [
        "State management",
        "Testing & CI/CD",
        "Code optimization",
        "Documentation",
      ],
    },
    {
      title: "Mobile Development",
      description: "Creating native and cross-platform mobile experiences",
      icon: <Smartphone className="w-8 h-8" />,
      features: [
        "React Native development",
        "iOS & Android optimization",
        "App store deployment",
        "Native module integration",
      ],
    },
    {
      title: "Full-Stack Solutions",
      description: "End-to-end development with backend integration",
      icon: <Rocket className="w-8 h-8" />,
      features: [
        "Node.js & Express",
        "API integration",
        "Database design",
        "Authentication & security",
      ],
    },
    {
      title: "Security & DevOps",
      description: "Ensuring secure and reliable deployments",
      icon: <Shield className="w-8 h-8" />,
      features: [
        "Security best practices",
        "Cloud deployment",
        "Performance monitoring",
        "CI/CD pipelines",
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-light-background dark:bg-dark-background">
      {/* Header */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-display-large font-bold text-light-onBackground dark:text-dark-onBackground mb-6">
            About Me
          </h1>
          <p className="text-body-large text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant max-w-3xl">
            I&apos;m Yassine chahid, a Senior Frontend Developer with 5+ years
            of experience crafting beautiful, performant web and mobile
            applications. My passion is transforming complex requirements into
            elegant, user-centric solutions.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-light-surfaceContainerLow dark:bg-dark-surfaceContainerLow">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-headline-large font-bold text-light-onBackground dark:text-dark-onBackground mb-6">
              My Journey
            </h2>
            <div className="space-y-4 text-body-large text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant">
              <p>
                I started my career as a self-taught developer, driven by a
                passion for creating beautiful digital experiences. Over the
                years, I&apos;ve evolved from building simple websites to
                architecting complex applications used by thousands of users.
              </p>
              <p>
                My expertise spans modern frontend technologies including React,
                Next.js, TypeScript, and Tailwind CSS. I&apos;m also comfortable
                with mobile development using React Native and have solid
                backend knowledge with Node.js.
              </p>
              <p>
                What sets me apart is my holistic approach to development—I
                don&apos;t just write code, I think about users, performance,
                accessibility, and long-term maintainability. Every project is
                an opportunity to learn something new.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-light-primaryContainer to-light-secondaryContainer dark:from-dark-primaryContainer dark:to-dark-secondaryContainer p-8 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl font-bold text-light-primary dark:text-dark-primary mb-4">
                  5+
                </div>
                <p className="text-body-large text-light-onBackground dark:text-dark-onBackground">
                  Years of Experience
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-headline-large font-bold text-light-onBackground dark:text-dark-onBackground mb-12 text-center">
            Services & Expertise
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => (
              <ServiceCard
                key={idx}
                title={service.title}
                description={service.description}
                icon={service.icon}
                features={service.features}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-light-surfaceContainerLow dark:bg-dark-surfaceContainerLow">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-headline-large font-bold text-light-onBackground dark:text-dark-onBackground mb-12 text-center">
            Tech Stack
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              "React",
              "Next.js",
              "TypeScript",
              "Tailwind CSS",
              "Node.js",
              "Express",
              "MongoDB",
              "PostgreSQL",
              "GraphQL",
              "Firebase",
              "AWS",
              "Docker",
            ].map((tech, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-light-outline dark:border-dark-outline bg-light-background dark:bg-dark-background text-center text-body-medium font-medium text-light-onBackground dark:text-dark-onBackground hover:border-light-primary dark:hover:border-dark-primary transition-colors"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
