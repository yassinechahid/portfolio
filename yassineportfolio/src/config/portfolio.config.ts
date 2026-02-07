/**
 * Portfolio Configuration
 * Update this file with your personal information
 */

export const portfolioConfig = {
  // Personal Information
  name: "Yassine chahid",
  title: "Senior Frontend Developer",
  email: "hello@example.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  website: "chahid.com",

  // Social Links
  social: {
    github: "https://github.com/yassine-chahid",
    linkedin: "https://linkedin.com/in/yassine-chahid",
    twitter: "https://twitter.com/yassinechahid",
    portfolio: "https://chahid.com",
  },

  // SEO & Meta
  seo: {
    description:
      "Frontend developer with 2+ years of experience building scalable web applications",
    keywords: "frontend, developer, react, nextjs, typescript, web development",
    ogImage: "/og-image.jpg",
  },

  // About Section
  about: {
    intro:
      "I'm a Senior Frontend Developer with 2+ years of experience crafting beautiful, performant web and mobile applications.",
    longBio:
      "I started my career as a self-taught developer, driven by a passion for creating beautiful digital experiences. Over the years, I've evolved from building simple websites to architecting complex applications used by thousands of users.",
    yearsOfExperience: 2,
    projectsCompleted: 50,
    happyClients: 30,
    openSourceRepos: 20,
  },

  // Skills
  skills: {
    frontend: [
      { name: "React/Next.js", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "Tailwind CSS", level: 95 },
      { name: "Framer Motion", level: 85 },
      { name: "State Management", level: 88 },
    ],
    backend: [
      { name: "Node.js/Express", level: 85 },
      { name: "GraphQL", level: 80 },
      { name: "API Design", level: 88 },
      { name: "Database Design", level: 82 },
      { name: "Authentication/Security", level: 85 },
    ],
    mobile: [
      { name: "React Native", level: 80 },
      { name: "iOS Development", level: 75 },
      { name: "Android Development", level: 75 },
      { name: "Native Modules", level: 70 },
    ],
    tools: [
      { name: "Git/GitHub", level: 95 },
      { name: "Docker", level: 80 },
      { name: "AWS/DevOps", level: 75 },
      { name: "Figma", level: 85 },
      { name: "CI/CD", level: 80 },
    ],
  },

  // Services
  services: [
    {
      title: "Web Development",
      description: "Building responsive, high-performance web applications",
      features: [
        "React & Next.js development",
        "TypeScript for type safety",
        "Performance optimization",
        "SEO best practices",
      ],
    },
    {
      title: "UI/UX Design",
      description: "Creating beautiful and intuitive user interfaces",
      features: [
        "Figma & design systems",
        "Responsive design",
        "Accessibility (WCAG)",
        "Component libraries",
      ],
    },
    {
      title: "Full-Stack Solutions",
      description: "End-to-end development with backend integration",
      features: [
        "Node.js & Express",
        "API integration",
        "Database design",
        "Authentication & security",
      ],
    },
  ],

  // Featured Projects
  projects: [
    {
      id: 1,
      title: "E-Commerce Platform",
      description:
        "Full-stack e-commerce solution with real-time inventory management",
      longDescription:
        "Built a complete e-commerce platform featuring real-time inventory management, payment processing with Stripe, and an admin dashboard for managing products and orders.",
      tags: ["Next.js", "Stripe", "MongoDB", "Tailwind CSS"],
      image: "/api/placeholder/800/400",
      liveUrl: "https://ecommerce-demo.com",
      githubUrl: "https://github.com/yassine-chahid/ecommerce",
      featured: true,
      year: "2023",
    },
    {
      id: 2,
      title: "AI Content Generator",
      description: "AI-powered content creation tool with GPT-4",
      tags: ["React", "OpenAI API", "Node.js", "PostgreSQL"],
      image: "/api/placeholder/400/300",
      liveUrl: "https://ai-content-gen.com",
      githubUrl: "https://github.com/yassine-chahid/ai-content",
      featured: false,
      year: "2023",
    },
    {
      id: 3,
      title: "Health Monitoring App",
      description:
        "React Native mobile app for tracking health metrics with analytics",
      tags: ["React Native", "GraphQL", "Firebase", "TypeScript"],
      image: "/api/placeholder/400/300",
      liveUrl: "https://apps.apple.com/app/healthtrack",
      githubUrl: "https://github.com/yassine-chahid/healthapp",
      featured: false,
      year: "2022",
    },
  ],

  // Blog Posts
  blogPosts: [
    {
      id: 1,
      slug: "building-scalable-react-apps",
      title: "Building Scalable React Applications",
      excerpt:
        "Learn best practices for architecting React applications that can grow with your business.",
      content: "Full blog post content here...",
      date: "January 18, 2024",
      readTime: "8 min read",
      category: "React",
      featured: true,
      tags: ["React", "Architecture", "Performance"],
    },
    {
      id: 2,
      slug: "nextjs-13-app-router",
      title: "Mastering Next.js 13 App Router",
      excerpt: "A comprehensive guide to the new App Router in Next.js 13.",
      content: "Full blog post content here...",
      date: "January 10, 2024",
      readTime: "10 min read",
      category: "Next.js",
      featured: false,
      tags: ["Next.js", "App Router", "Routing"],
    },
  ],

  // Experience
  experience: [
    {
      id: 1,
      role: "Senior Frontend Developer",
      company: "Tech Innovations Inc.",
      period: "2022 - Present",
      description:
        "Leading frontend development for enterprise-scale applications.",
      achievements: [
        "Reduced application load time by 40%",
        "Established design system used across 2+ projects",
        "Mentored 3 junior developers to senior level",
      ],
    },
    {
      id: 2,
      role: "Full Stack Developer",
      company: "Digital Solutions Co.",
      period: "2020 - 2022",
      description:
        "Developed full-stack web applications using React and Node.js.",
      achievements: [
        "Built 12+ web applications from scratch",
        "Implemented GraphQL API reducing payload sizes by 35%",
        "Improved test coverage from 40% to 90%",
      ],
    },
  ],

  // Education
  education: [
    {
      id: 1,
      degree: "Bachelor of Science in Computer Science",
      school: "University of Technology",
      year: "2019",
      details: "GPA: 3.8/4.0 • Honors: Summa Cum Laude",
    },
    {
      id: 2,
      degree: "Full Stack Web Development Bootcamp",
      school: "Codecademy",
      year: "2018",
      details: "Intensive 3-month program covering MERN stack",
    },
  ],

  // Certifications
  certifications: [
    "AWS Certified Solutions Architect - Professional (2023)",
    "Google UX Design Certificate (2022)",
    "Frontend Masters Advanced React Certification (2023)",
    "Employee of the Year - Tech Innovations Inc. (2023)",
  ],

  // Testimonials
  testimonials: [
    {
      name: "John Smith",
      role: "CEO",
      company: "Tech Startup",
      text: "Yassine delivered exceptional work on our project. His attention to detail and problem-solving skills are remarkable.",
      rating: 5,
    },
    {
      name: "Sarah Johnson",
      role: "Product Manager",
      company: "Innovation Labs",
      text: "Working with Yassine was a pleasure. He understood our requirements perfectly and delivered beyond expectations.",
      rating: 5,
    },
  ],

  // Newsletter
  newsletter: {
    enabled: true,
    description: "Get the latest articles and insights delivered to your inbox",
  },

  // Theme
  theme: {
    primaryColor: "#6366f1", // Indigo
    secondaryColor: "#8b5cf6", // Purple
    accentColor: "#ec4899", // Pink
  },

  // Features to Enable/Disable
  features: {
    blog: true,
    testimonials: true,
    newsletter: true,
    downloadResume: true,
    darkMode: true,
    animations: true,
  },
};

export default portfolioConfig;
