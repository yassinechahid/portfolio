import { Metadata } from "next";
import ProjectCard from "@/components/portfolio/ProjectCard";

export const metadata: Metadata = {
  title: "Projects - Yassine Toubib",
  description:
    "Explore my portfolio of web and mobile projects, showcasing my skills and expertise.",
};

export default function Projects() {
  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "Full-stack e-commerce solution with real-time inventory management, payment processing, and admin dashboard.",
      tags: ["Next.js", "Stripe", "MongoDB", "Tailwind CSS", "Socket.io"],
      image: "/api/placeholder/800/400",
      liveUrl: "https://ecommerce-demo.com",
      githubUrl: "https://github.com/yassine-toubib/ecommerce",
      featured: true,
    },
    {
      title: "AI Content Generator",
      description:
        "Intelligent content creation tool powered by OpenAI, featuring template system and batch processing.",
      tags: ["React", "OpenAI API", "Node.js", "PostgreSQL"],
      image: "/api/placeholder/400/300",
      liveUrl: "https://ai-content-gen.com",
      githubUrl: "https://github.com/yassine-toubib/ai-content",
    },
    {
      title: "Health Monitoring App",
      description:
        "React Native mobile app for tracking health metrics with real-time analytics and doctor integration.",
      tags: ["React Native", "GraphQL", "Firebase", "TypeScript"],
      image: "/api/placeholder/400/300",
      liveUrl: "https://apps.apple.com/app/healthtrack",
      githubUrl: "https://github.com/yassine-toubib/healthapp",
    },
    {
      title: "Design System & Component Library",
      description:
        "Comprehensive design system with 100+ components, documentation, and Figma integration.",
      tags: ["React", "Storybook", "Tailwind CSS", "TypeScript"],
      image: "/api/placeholder/400/300",
      liveUrl: "https://design-system-ui.vercel.app",
      githubUrl: "https://github.com/yassine-toubib/design-system",
    },
    {
      title: "Project Management Tool",
      description:
        "Collaborative project management platform with real-time updates, file sharing, and team communication.",
      tags: ["Next.js", "Prisma", "WebSockets", "AWS S3"],
      image: "/api/placeholder/400/300",
      liveUrl: "https://projecthub-app.com",
      githubUrl: "https://github.com/yassine-toubib/projecthub",
    },
    {
      title: "Analytics Dashboard",
      description:
        "Real-time analytics platform with interactive charts, data export, and custom report generation.",
      tags: ["React", "D3.js", "Node.js", "PostgreSQL"],
      image: "/api/placeholder/400/300",
      liveUrl: "https://analytics-platform.io",
      githubUrl: "https://github.com/yassine-toubib/analytics",
    },
  ];

  return (
    <main className="min-h-screen bg-light-background dark:bg-dark-background">
      {/* Header */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-display-large font-bold text-light-onBackground dark:text-dark-onBackground mb-6">
            My Projects
          </h1>
          <p className="text-body-large text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant max-w-3xl">
            Here's a selection of projects I've worked on. Each one represents a
            unique challenge and an opportunity to showcase my skills in
            building scalable, user-friendly applications.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-6">
            {projects.map((project, idx) => (
              <ProjectCard
                key={idx}
                title={project.title}
                description={project.description}
                tags={project.tags}
                image={project.image}
                liveUrl={project.liveUrl}
                githubUrl={project.githubUrl}
                featured={project.featured}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-light-primaryContainer dark:bg-dark-primaryContainer">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-headline-large font-bold text-light-onPrimaryContainer dark:text-dark-onPrimaryContainer mb-4">
            Have a project in mind?
          </h2>
          <p className="text-body-large text-light-onPrimaryContainer/80 dark:text-dark-onPrimaryContainer/80 mb-8">
            I'm always interested in working on exciting projects. Let's
            collaborate!
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-light-primary dark:bg-dark-primary text-light-onPrimary dark:text-dark-onPrimary hover:opacity-90 transition-opacity text-label-large font-medium"
          >
            Start a Project
          </a>
        </div>
      </section>
    </main>
  );
}
