import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Sparkles,
  Mail,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";
import AnimatedText from "@/components/portfolio/AnimatedText";

export default function Home() {
  const skills = [
    { name: "React/Next.js", level: 95 },
    { name: "TypeScript", level: 90 },
    { name: "Tailwind CSS", level: 95 },
    { name: "Node.js", level: 85 },
    { name: "UI/UX Design", level: 80 },
    { name: "AWS/DevOps", level: 75 },
  ];

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce with real-time inventory",
      tags: ["Next.js", "Stripe", "MongoDB", "Redis"],
      image: "/yassine/1.jpg",
    },
    {
      title: "AI Content Generator",
      description: "AI-powered content creation tool with GPT-4",
      tags: ["OpenAI", "React", "Node.js", "PostgreSQL"],
      image: "/yassine/2.webp",
    },
    {
      title: "Health Monitoring App",
      description: "Mobile app for health tracking and analytics",
      tags: ["React Native", "GraphQL", "Firebase", "TypeScript"],
      image: "/yassine/3.jpg",
    },
  ];

  const stats = [
    { label: "Projects Completed", value: "50+" },
    { label: "Happy Clients", value: "30+" },
    { label: "Years Experience", value: "2+" },
    { label: "Open Source Repos", value: "20+" },
  ];

  return (
    <main className="min-h-screen bg-light-background dark:bg-dark-background overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-light-primaryContainer dark:bg-dark-primaryContainer text-light-onPrimaryContainer dark:text-dark-onPrimaryContainer">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-label-medium">
                    Frontend Developer & UI Specialist
                  </span>
                </div>

                <h1 className="text-display-small md:text-display-medium lg:text-display-large text-light-onBackground dark:text-dark-onBackground font-bold leading-tight">
                  <AnimatedText
                    phrases={[
                      "Crafting Digital Experiences",
                      "Building Beautiful Interfaces",
                      "Creating Innovative Solutions",
                      "Designing User-Centric Apps",
                    ]}
                    speed={80}
                    deleteSpeed={40}
                    delayBetweenPhrases={6500}
                    className="text-light-primary dark:text-dark-primary"
                  />
                </h1>

                <p className="text-body-large text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant max-w-2xl">
                  I transform complex problems into beautiful, intuitive
                  solutions. With 2+ years of experience in modern web
                  technologies, I create digital products that users love.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-light-primary dark:bg-dark-primary text-light-onPrimary dark:text-dark-onPrimary hover:opacity-90 transition-opacity text-label-large font-medium"
                >
                  Start a Project
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-light-outline dark:border-dark-outline text-light-primary dark:text-dark-primary hover:bg-light-primaryContainer/10 dark:hover:bg-dark-primaryContainer/10 transition-colors text-label-large font-medium"
                >
                  View My Work
                </Link>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-4 pt-4">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-light-surfaceContainerLow dark:bg-dark-surfaceContainerLow text-light-onSurface dark:text-dark-onSurface hover:bg-light-surfaceContainer dark:hover:bg-dark-surfaceContainer transition-colors"
                >
                  <Github className="w-6 h-6" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-light-surfaceContainerLow dark:bg-dark-surfaceContainerLow text-light-onSurface dark:text-dark-onSurface hover:bg-light-surfaceContainer dark:hover:bg-dark-surfaceContainer transition-colors"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-light-surfaceContainerLow dark:bg-dark-surfaceContainerLow text-light-onSurface dark:text-dark-onSurface hover:bg-light-surfaceContainer dark:hover:bg-dark-surfaceContainer transition-colors"
                >
                  <Twitter className="w-6 h-6" />
                </a>
                <a
                  href="mailto:hello@example.com"
                  className="p-3 rounded-full bg-light-surfaceContainerLow dark:bg-dark-surfaceContainerLow text-light-onSurface dark:text-dark-onSurface hover:bg-light-surfaceContainer dark:hover:bg-dark-surfaceContainer transition-colors"
                >
                  <Mail className="w-6 h-6" />
                </a>
              </div>
            </div>

            {/* Right Content - Hero Image/Visual */}
            <div className="relative mx-6">
              <div className="relative w-full aspect-square max-w-xs mx-auto">
                {/* Background Glow */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-light-primary/30 to-light-secondaryContainer/30 dark:from-dark-primary/30 dark:to-dark-secondaryContainer/30 blur-3xl" />

                {/* Main Image Container */}
                <div className="relative rounded-3xl overflow-visible border-2 border-light-outlineVariant dark:border-dark-outlineVariant shadow-2xl">
                  <Image
                    src="/assets/yassine.jpeg"
                    alt="Yassine chahid - Senior Frontend Developer"
                    width={400}
                    height={400}
                    priority
                    className="w-full h-full object-cover rounded-3xl"
                  />

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4 sm:p-6 md:p-8 rounded-3xl">
                    <div className="text-white">
                      <h3 className="text-base sm:text-lg md:text-headline-small font-bold mb-1 sm:mb-2">
                        Yassine chahid
                      </h3>
                      <p className="text-xs sm:text-sm md:text-body-medium">
                        Senior Frontend Developer
                      </p>
                    </div>
                  </div>

                  {/* Floating Badge - Top Right */}
                  <div className="absolute -top-2 sm:-top-3 md:-top-4 -right-2 sm:-right-3 md:-right-4 w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-light-tertiaryContainer to-light-secondaryContainer dark:from-dark-tertiaryContainer dark:to-dark-secondaryContainer border border-light-outline dark:border-dark-outline xs:border-2 sm:border-2 md:border-2 shadow-lg p-1 xs:p-2 sm:p-3 md:p-4 flex items-center justify-center z-20">
                    <div className="text-center">
                      <div className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold text-light-onTertiaryContainer dark:text-dark-onTertiaryContainer leading-none">
                        2+
                      </div>
                      <p className="text-xs xs:text-label-small sm:text-label-small md:text-label-small text-light-onTertiaryContainer dark:text-dark-onTertiaryContainer">
                        Years
                      </p>
                    </div>
                  </div>

                  {/* Floating Badge - Bottom Right */}
                  <div className="absolute -bottom-2 sm:-bottom-3 md:-bottom-4 -right-2 sm:-right-3 md:-right-4 w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-light-primaryContainer to-light-primary dark:from-dark-primaryContainer dark:to-dark-primary border border-light-outline dark:border-dark-outline xs:border-2 sm:border-2 md:border-2 shadow-lg p-1 xs:p-2 sm:p-3 md:p-3 flex items-center justify-center z-20">
                    <Sparkles className="w-full h-full text-light-onPrimary dark:text-dark-onPrimary" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-light-surfaceContainerLowest dark:bg-dark-surfaceContainerLowest">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-display-small text-light-primary dark:text-dark-primary font-bold">
                  {stat.value}
                </div>
                <p className="text-body-medium text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant mt-2">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-headline-large text-light-onBackground dark:text-dark-onBackground font-bold mb-4">
              Technical Expertise
            </h2>
            <p className="text-body-large text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant max-w-3xl mx-auto">
              Mastery in modern web technologies and frameworks
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="p-6 rounded-3xl bg-light-surfaceContainerLow dark:bg-dark-surfaceContainerLow border border-light-outlineVariant dark:border-dark-outlineVariant hover:border-light-outline dark:hover:border-dark-outline transition-colors"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-body-large text-light-onSurface dark:text-dark-onSurface font-medium">
                    {skill.name}
                  </span>
                  <span className="text-label-large text-light-primary dark:text-dark-primary">
                    {skill.level}%
                  </span>
                </div>
                <div className="h-2 rounded-full bg-light-surfaceVariant dark:bg-dark-surfaceVariant overflow-hidden">
                  <div
                    className="h-full rounded-full bg-light-primary dark:bg-dark-primary transition-all duration-1000"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-light-surfaceContainerLowest dark:bg-dark-surfaceContainerLowest">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-headline-large text-light-onBackground dark:text-dark-onBackground font-bold mb-4">
                Featured Projects
              </h2>
              <p className="text-body-large text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant">
                Showcasing my best work
              </p>
            </div>
            <Link
              href="/projects"
              className="text-label-large text-light-primary dark:text-dark-primary hover:underline"
            >
              View all projects →
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-3xl mb-6">
                  <div className="aspect-video bg-gradient-to-br from-light-primaryContainer/30 to-light-surfaceContainer/30 dark:from-dark-primaryContainer/30 dark:to-dark-surfaceContainer/30 relative">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <span className="text-label-large text-white">
                      View Case Study →
                    </span>
                  </div>
                </div>

                <h3 className="text-headline-small text-light-onBackground dark:text-dark-onBackground font-medium mb-2">
                  {project.title}
                </h3>

                <p className="text-body-medium text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 rounded-full text-label-small bg-light-secondaryContainer dark:bg-dark-secondaryContainer text-light-onSecondaryContainer dark:text-dark-onSecondaryContainer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-light-primary/10 via-light-secondaryContainer/10 to-light-primary/10 dark:from-dark-primary/10 dark:via-dark-secondaryContainer/10 dark:to-dark-primary/10 rounded-3xl blur-3xl" />

            <div className="relative rounded-3xl p-12 border border-light-outlineVariant dark:border-dark-outlineVariant bg-light-surfaceContainerLow dark:bg-dark-surfaceContainerLow">
              <h2 className="text-headline-large text-light-onBackground dark:text-dark-onBackground font-bold mb-6">
                Let&apos;s Build Something Amazing Together
              </h2>

              <p className="text-body-large text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant mb-8 max-w-2xl mx-auto">
                Have a project in mind? I&apos;d love to hear about it.
                Let&apos;s connect and bring your ideas to life.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-light-primary dark:bg-dark-primary text-light-onPrimary dark:text-dark-onPrimary hover:opacity-90 transition-opacity text-label-large font-medium"
                >
                  Get In Touch
                  <Mail className="w-5 h-5" />
                </Link>

                <Link
                  href="/about"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-light-outline dark:border-dark-outline text-light-primary dark:text-dark-primary hover:bg-light-primaryContainer/10 dark:hover:bg-dark-primaryContainer/10 transition-colors text-label-large font-medium"
                >
                  Learn More About Me
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
