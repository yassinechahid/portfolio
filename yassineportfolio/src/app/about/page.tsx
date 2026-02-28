import { Metadata } from "next";
import { Code, Zap, Layout, Rocket, Shield, Smartphone } from "lucide-react";
import ServiceCard from "@/components/portfolio/ServiceCard";
import { useTranslation } from "react-i18next";

export const metadata: Metadata = {
  title: "About Me - Yassine Chahid",
  description:
    "Learn about my journey as a Full-Stack Developer specializing in React, Next.js, Laravel, and modern web technologies.",
};

export default function About() {
  const {t}=useTranslation();
  const services = [
    {
      title: "Frontend Development",
      description: "Building modern, responsive web interfaces",
      icon: <Code className="w-8 h-8" />,
      features: [
        "React & Next.js applications",
        "JavaScript/ES6+ expertise",
        "Tailwind CSS & Bootstrap",
        "Responsive & mobile-first design",
      ],
    },
    {
      title: "Backend Development",
      description: "Creating robust server-side solutions",
      icon: <Rocket className="w-8 h-8" />,
      features: [
        "Laravel PHP framework",
        "RESTful API development",
        "MySQL database design",
        "Appwrite BaaS integration",
      ],
    },
    {
      title: "Full-Stack Applications",
      description: "End-to-end web application development",
      icon: <Zap className="w-8 h-8" />,
      features: [
        "Complete project development",
        "Frontend-backend integration",
        "Authentication & authorization",
        "Real-time features",
      ],
    },
    {
      title: "UI/UX Implementation",
      description: "Translating designs into pixel-perfect code",
      icon: <Layout className="w-8 h-8" />,
      features: [
        "Component-based architecture",
        "Modern CSS frameworks",
        "Responsive layouts",
        "Cross-browser compatibility",
      ],
    },
    {
      title: "Database Management",
      description: "Efficient data storage and retrieval",
      icon: <Shield className="w-8 h-8" />,
      features: [
        "MySQL optimization",
        "Database schema design",
        "Query optimization",
        "Data security",
      ],
    },
    {
      title: "Modern Development",
      description: "Using cutting-edge tools and practices",
      icon: <Smartphone className="w-8 h-8" />,
      features: [
        "Appwrite cloud services",
        "Version control (Git)",
        "API integration",
        "Performance optimization",
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
            I&apos;m Yassine Chahid, a Full-Stack Developer with 2+ years of
            experience building modern web applications. I specialize in
            creating responsive, scalable solutions using cutting-edge
            technologies like React, Next.js, Laravel, and Appwrite. My passion
            is transforming ideas into elegant, user-centric digital
            experiences.
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
                I started my journey as a passionate developer, driven by
                curiosity and the desire to build impactful applications. Over
                the years, I&apos;ve built numerous projects and apps, mastering
                both frontend and backend development to deliver complete
                solutions.
              </p>
              <p>
                My expertise includes JavaScript, React, and Next.js for
                building dynamic user interfaces, combined with Laravel and
                MySQL for robust backend systems. I&apos;m proficient in styling
                frameworks like Tailwind CSS and Bootstrap, and I leverage
                Appwrite BaaS for rapid development and scalable backend
                services.
              </p>
              <p>
                What drives me is creating solutions that make a difference.
                Whether it&apos;s a full-stack web application, a responsive
                dashboard, or a complex data-driven platform, I bring
                dedication, attention to detail, and a commitment to code
                quality to every project.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-light-primaryContainer to-light-secondaryContainer dark:from-dark-primaryContainer dark:to-dark-secondaryContainer p-8 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl font-bold text-light-primary dark:text-dark-primary mb-4">
                  2+
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
              "JavaScript",
              "React",
              "Next.js",
              "Laravel",
              "PHP",
              "MySQL",
              "Tailwind CSS",
              "Bootstrap",
              "Appwrite",
              "RESTful APIs",
              "Git",
              "Responsive Design",
            ].map((tech, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-light-outline dark:border-dark-outline bg-light-background dark:bg-dark-background text-center text-body-medium font-medium text-light-onBackground dark:text-dark-onBackground hover:border-light-primary dark:hover:border-dark-primary transition-colors">
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
