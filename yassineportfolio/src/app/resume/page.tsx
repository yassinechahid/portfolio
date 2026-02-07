import { Metadata } from "next";
import { MapPin, Phone, Mail, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "Resume - Yassine chahid",
  description: "Download my professional resume and CV",
};

export default function Resume() {
  const experience = [
    {
      role: "Senior Frontend Developer",
      company: "Tech Innovations Inc.",
      period: "2022 - Present",
      description:
        "Leading frontend development for enterprise-scale applications. Architecting scalable React/Next.js solutions, mentoring junior developers, and improving overall code quality and performance metrics.",
      achievements: [
        "Reduced application load time by 40% through optimization",
        "Established design system used across 2+ projects",
        "Mentored 3 junior developers to senior level",
      ],
    },
    {
      role: "Full Stack Developer",
      company: "Digital Solutions Co.",
      period: "2020 - 2022",
      description:
        "Developed full-stack web applications using React, Node.js, and MongoDB. Collaborated with product and design teams to deliver user-centric solutions.",
      achievements: [
        "Built 2+ web applications from scratch to production",
        "Implemented GraphQL API reducing payload sizes by 35%",
        "Improved test coverage from 40% to 90%",
      ],
    },
    {
      role: "Frontend Developer",
      company: "StartUp Hub",
      period: "2019 - 2020",
      description:
        "Created responsive web interfaces and interactive features for SaaS applications. Worked with REST APIs and maintained component library.",
      achievements: [
        "Built reusable component library with 50+ components",
        "Implemented real-time features using WebSockets",
        "Achieved 98% Lighthouse performance score",
      ],
    },
  ];

  const education = [
    {
      degree: "Bachelor of Science in Computer Science",
      school: "University of Technology",
      year: "2019",
      details: "GPA: 3.8/4.0 • Honors: Summa Cum Laude",
    },
    {
      degree: "Full Stack Web Development Bootcamp",
      school: "Codecademy",
      year: "2018",
      details: "Intensive 3-month program covering MERN stack",
    },
  ];

  return (
    <main className="min-h-screen mt-20 bg-light-background dark:bg-dark-background">

      {/* Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Contact Info */}
          <div className="mb-12 p-6 rounded-2xl border border-light-outline dark:border-dark-outline bg-light-surfaceContainerLow dark:bg-dark-surfaceContainerLow">
            <h2 className="text-display-small font-bold text-light-onBackground dark:text-dark-onBackground mb-2">
              Yassine chahid
            </h2>
            <p className="text-body-large text-light-primary dark:text-dark-primary font-medium mb-4">
              Senior Frontend Developer & Full Stack Engineer
            </p>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2 text-body-medium text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant">
                <Mail className="w-4 h-4" />
                hello@example.com
              </div>
              <div className="flex items-center gap-2 text-body-medium text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant">
                <Phone className="w-4 h-4" />
                +1 (555) 123-4567
              </div>
              <div className="flex items-center gap-2 text-body-medium text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant">
                <Globe className="w-4 h-4" />
                yassinchahid.com
              </div>
              <div className="flex items-center gap-2 text-body-medium text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant">
                <MapPin className="w-4 h-4" />
                San Francisco, CA
              </div>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="mb-12">
            <h3 className="text-headline-medium font-bold text-light-onBackground dark:text-dark-onBackground mb-4 pb-2 border-b border-light-outline dark:border-dark-outline">
              Professional Summary
            </h3>
            <p className="text-body-large text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant leading-relaxed">
              Results-driven Senior Frontend Developer with 2+ years of
              experience building scalable, high-performance web applications.
              Specialized in React, Next.js, and TypeScript with proven
              expertise in leading cross-functional teams, architecting complex
              systems, and delivering products that exceed user expectations.
              Passionate about clean code, performance optimization, and
              creating exceptional user experiences.
            </p>
          </div>

          {/* Experience */}
          <div className="mb-12">
            <h3 className="text-headline-medium font-bold text-light-onBackground dark:text-dark-onBackground mb-6 pb-2 border-b border-light-outline dark:border-dark-outline">
              Professional Experience
            </h3>
            <div className="space-y-6">
              {experience.map((exp, idx) => (
                <div key={idx} className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-headline-small font-bold text-light-onBackground dark:text-dark-onBackground">
                        {exp.role}
                      </h4>
                      <p className="text-body-medium text-light-primary dark:text-dark-primary font-medium">
                        {exp.company}
                      </p>
                    </div>
                    <span className="text-label-medium text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant whitespace-nowrap ml-4">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-body-medium text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant">
                    {exp.description}
                  </p>
                  <ul className="space-y-2 ml-4">
                    {exp.achievements.map((achievement, aidx) => (
                      <li
                        key={aidx}
                        className="text-body-medium text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant flex gap-3"
                      >
                        <span className="text-light-primary dark:text-dark-primary flex-shrink-0 mt-1">
                          •
                        </span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="mb-12">
            <h3 className="text-headline-medium font-bold text-light-onBackground dark:text-dark-onBackground mb-6 pb-2 border-b border-light-outline dark:border-dark-outline">
              Education
            </h3>
            <div className="space-y-6">
              {education.map((edu, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-headline-small font-bold text-light-onBackground dark:text-dark-onBackground">
                        {edu.degree}
                      </h4>
                      <p className="text-body-medium text-light-primary dark:text-dark-primary font-medium">
                        {edu.school}
                      </p>
                    </div>
                    <span className="text-label-medium text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant">
                      {edu.year}
                    </span>
                  </div>
                  <p className="text-body-medium text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant mt-1">
                    {edu.details}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Summary */}
          <div className="mb-12">
            <h3 className="text-headline-medium font-bold text-light-onBackground dark:text-dark-onBackground mb-6 pb-2 border-b border-light-outline dark:border-dark-outline">
              Key Skills
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-body-large font-medium text-light-onBackground dark:text-dark-onBackground mb-3">
                  Frontend Technologies
                </h4>
                <p className="text-body-medium text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant">
                  React, Next.js, TypeScript, JavaScript, Tailwind CSS, Framer
                  Motion, Redux, React Query, GraphQL Client
                </p>
              </div>
              <div>
                <h4 className="text-body-large font-medium text-light-onBackground dark:text-dark-onBackground mb-3">
                  Backend & DevOps
                </h4>
                <p className="text-body-medium text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant">
                  Node.js, Express, GraphQL, REST APIs, MongoDB, PostgreSQL,
                  Firebase, AWS, Docker, CI/CD
                </p>
              </div>
              <div>
                <h4 className="text-body-large font-medium text-light-onBackground dark:text-dark-onBackground mb-3">
                  Tools & Platforms
                </h4>
                <p className="text-body-medium text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant">
                  Git, GitHub, VS Code, Figma, Postman, Jira, Webpack, Vite,
                  Storybook, Jest
                </p>
              </div>
              <div>
                <h4 className="text-body-large font-medium text-light-onBackground dark:text-dark-onBackground mb-3">
                  Soft Skills
                </h4>
                <p className="text-body-medium text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant">
                  Team Leadership, Project Management, Problem Solving,
                  Communication, Mentoring, Agile/Scrum
                </p>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="text-headline-medium font-bold text-light-onBackground dark:text-dark-onBackground mb-6 pb-2 border-b border-light-outline dark:border-dark-outline">
              Certifications & Awards
            </h3>
            <div className="space-y-3">
              {[
                "AWS Certified Solutions Architect - Professional (2023)",
                "Google UX Design Certificate (2022)",
                "Frontend Masters Advanced React Certification (2023)",
                "Employee of the Year - Tech Innovations Inc. (2023)",
                "Open Source Contributor Recognition - React Community (2022)",
              ].map((cert, idx) => (
                <div
                  key={idx}
                  className="flex gap-3 p-3 rounded-lg bg-light-surfaceContainerLow dark:bg-dark-surfaceContainerLow"
                >
                  <span className="text-light-primary dark:text-dark-primary flex-shrink-0 mt-1">
                    ✓
                  </span>
                  <span className="text-body-medium text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant">
                    {cert}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
