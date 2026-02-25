export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  featured?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Building Modern Web Apps with React and Next.js",
    excerpt:
      "Learn how to leverage React and Next.js to build fast, SEO-friendly web applications with server-side rendering and static generation.",
    content: `React and Next.js have revolutionized the way we build web applications. Next.js provides a powerful framework on top of React that enables server-side rendering, static site generation, and more.

**Key Benefits:**
- **Performance:** Next.js automatically optimizes your application for the best performance with code splitting and lazy loading.
- **SEO:** Server-side rendering ensures your content is crawlable by search engines.
- **Developer Experience:** Hot reloading, TypeScript support, and intuitive file-based routing make development a breeze.

**Getting Started:**
1. Install Next.js: \`npx create-next-app@latest\`
2. Create pages in the \`app\` directory
3. Use server components for better performance
4. Deploy to Vercel for seamless hosting

I've built many projects using this stack, and it's perfect for everything from blogs to complex web applications.`,
    date: "February 20, 2026",
    readTime: "8 min read",
    category: "React",
    image: "/yassine/1.jpg",
    featured: true,
  },
  {
    id: 2,
    title: "Laravel Backend Development Best Practices",
    excerpt:
      "Master Laravel's powerful features for building robust backend APIs. Learn about Eloquent ORM, middleware, authentication, and API design.",
    content: `Laravel is a powerful PHP framework that makes backend development elegant and efficient. With its expressive syntax and robust features, you can build scalable applications quickly.

**Why Laravel:**
- **Eloquent ORM:** Beautiful and intuitive database interactions
- **Built-in Authentication:** Secure user management out of the box
- **RESTful APIs:** Easy to create well-structured APIs
- **Middleware:** Clean request filtering and validation

**Essential Laravel Features:**
1. **Database Migrations:** Version control for your database schema
2. **Eloquent Relationships:** Define model relationships elegantly
3. **API Resources:** Transform your models for JSON responses
4. **Queue System:** Handle background jobs efficiently

**Integration with Frontend:**
Laravel pairs perfectly with React/Next.js frontends. Use Laravel as your API backend and connect it with your JavaScript frontend for a powerful full-stack solution.

I've used Laravel in many projects, and it's my go-to choice for PHP backend development.`,
    date: "February 15, 2026",
    readTime: "10 min read",
    category: "Laravel",
    image: "/yassine/2.webp",
  },
  {
    id: 3,
    title: "MySQL Database Design and Optimization",
    excerpt:
      "Essential techniques for designing efficient MySQL databases. Master indexing, query optimization, and relationship design for better performance.",
    content: `Database design is crucial for application performance. MySQL is a reliable relational database that powers millions of applications worldwide.

**Database Design Principles:**
- **Normalization:** Organize data to reduce redundancy
- **Proper Indexing:** Speed up queries with the right indexes
- **Foreign Keys:** Maintain referential integrity
- **Data Types:** Choose appropriate types for efficiency

**Optimization Techniques:**
1. Use EXPLAIN to analyze query performance
2. Add indexes on frequently searched columns
3. Avoid SELECT * - fetch only what you need
4. Use prepared statements to prevent SQL injection

**Working with Laravel:**
Laravel's query builder and Eloquent ORM make MySQL interactions smooth. You can write expressive queries without sacrificing performance:

\`\`\`php
$users = User::with('posts')
    ->where('active', true)
    ->latest()
    ->paginate(20);
\`\`\`

Proper database design has saved me countless hours in optimization later.`,
    date: "February 10, 2026",
    readTime: "12 min read",
    category: "Database",
    image: "/yassine/3.jpg",
  },
  {
    id: 4,
    title: "Styling Modern UIs with Tailwind CSS",
    excerpt:
      "Learn how Tailwind CSS's utility-first approach speeds up development and creates consistent, responsive designs without leaving your HTML.",
    content: `Tailwind CSS has transformed how I build user interfaces. The utility-first approach means faster development and consistent designs across projects.

**Why Tailwind CSS:**
- **Rapid Development:** Build UIs without leaving your HTML
- **Responsive Design:** Mobile-first utilities make responsive design easy
- **Customization:** Extend and customize to match your design system
- **Small Bundle Size:** Only ship the CSS you use

**Key Features:**
1. **JIT Mode:** Generate classes on-demand for ultimate flexibility
2. **Dark Mode:** Built-in dark mode support with class-based or media queries
3. **Component Extraction:** Reuse styles with @apply directive
4. **Plugins:** Extend functionality with forms, typography, etc.

**Tailwind with React:**
Combining Tailwind with React components creates a powerful workflow. You can build reusable components with consistent styling:

\`\`\`jsx
<button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
  Click Me
</button>
\`\`\`

I use Tailwind in all my projects now - it's become an essential part of my toolkit.`,
    date: "February 5, 2026",
    readTime: "9 min read",
    category: "CSS",
    image: "/yassine/4.jpg",
  },
  {
    id: 5,
    title: "Appwrite BaaS: Backend Made Simple",
    excerpt:
      "Discover how Appwrite simplifies backend development with its comprehensive Backend-as-a-Service platform. Perfect for rapid development.",
    content: `Appwrite is a powerful Backend-as-a-Service platform that handles authentication, databases, storage, and more - letting you focus on building features.

**Appwrite Features:**
- **Database:** NoSQL database with powerful queries
- **Authentication:** Multiple auth methods out of the box
- **Storage:** File upload and management
- **Functions:** Serverless functions for custom logic
- **Real-time:** WebSocket support for live updates

**Why Use Appwrite:**
1. Self-hosted or cloud options
2. SDK support for all major platforms
3. Built-in security and permissions
4. Easy to integrate with any frontend

**Getting Started:**
\`\`\`javascript
import { Client, Databases } from 'appwrite';

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('your-project-id');

const databases = new Databases(client);
\`\`\`

**Real-World Usage:**
I've built several applications using Appwrite as the backend. It's perfect for projects where you want to move fast without compromising on features.

The permission system is particularly powerful - you can control exactly who can access what data at a granular level.`,
    date: "January 30, 2026",
    readTime: "11 min read",
    category: "Backend",
    image: "/yassine/5.webp",
  },
  {
    id: 6,
    title: "Bootstrap to Tailwind: Modern UI Development",
    excerpt:
      "Comparing Bootstrap and Tailwind CSS approaches. Learn when to use each and how to leverage both frameworks for responsive design.",
    content: `Both Bootstrap and Tailwind CSS are excellent frameworks, but they serve different philosophies. Understanding both makes you a versatile developer.

**Bootstrap:**
- Component-based framework
- Pre-built components out of the box
- Great for rapid prototyping
- Extensive JavaScript plugins
- Consistent design language

**Tailwind CSS:**
- Utility-first approach
- Full design control
- Smaller final bundle size
- Requires more initial setup
- More flexible customization

**When to Use Bootstrap:**
- Quick prototypes needed
- Team familiar with Bootstrap
- Projects needing ready-made components
- When you want opinionated design

**When to Use Tailwind:**
- Custom designs required
- Performance is critical
- You want complete control
- Building a design system

**My Experience:**
I've used both extensively. Bootstrap is perfect for admin panels and internal tools where you need functionality fast. Tailwind shines for client-facing applications where design uniqueness matters.

Many of my projects use Tailwind now, but I still reach for Bootstrap components when I need something like a complex modal or carousel quickly.`,
    date: "January 25, 2026",
    readTime: "8 min read",
    category: "CSS",
    image: "/yassine/6.jpg",
  },
];
