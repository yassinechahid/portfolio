# Professional Portfolio Website

A modern, fully responsive portfolio website built with Next.js 15, TypeScript, and Tailwind CSS. Features dark/light mode, smooth animations, multi-language support, and a complete content management system.

## ✨ Features

- 🎨 **Modern Design** - Clean, professional Material Design 3 aesthetics
- 🌓 **Dark/Light Mode** - Built-in theme toggle
- 📱 **Fully Responsive** - Optimized for all devices
- ⚡ **Fast Performance** - Next.js 15 with App Router
- 🎬 **Smooth Animations** - Framer Motion powered transitions
- 🌍 **Multi-language** - i18n support (English, French, Arabic)
- 📧 **Contact Form** - Validated form with email integration ready
- 📝 **Blog System** - Ready for content publishing
- 🔍 **SEO Optimized** - Meta tags and structured data
- ♿ **Accessible** - WCAG compliant components
- 🔐 **Admin Panel** - User management and dashboard (optional)

## 🏗️ Site Structure

```
Portfolio/
├── Home (/)              - Hero, stats, featured projects, skills
├── About (/about)        - Background, services, tech stack
├── Projects (/projects)  - Portfolio showcase with live demos
├── Skills (/skills)      - Technical proficiency with progress bars
├── Blog (/blog)          - Articles and insights
├── Contact (/contact)    - Contact form and methods
├── Resume (/resume)      - Professional CV (not yet created)
└── Admin (/admin)        - Dashboard, users, messages
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎯 Customization Guide

### 1. Update Personal Information

**Main Configuration** (`src/config/portfolio.config.ts`):

```typescript
export const portfolioConfig = {
  name: "Your Name",
  title: "Your Title",
  email: "your@email.com",
  // ... update all fields
};
```

**Home Page** (`src/app/page.tsx`):

- Update name, title, and introduction
- Modify stats (projects, clients, experience)
- Update social media links

**Metadata** (`src/app/layout.tsx`):

```typescript
export const metadata: Metadata = {
  title: "Your Name - Portfolio",
  description: "Your professional description",
};
```

### 2. Add Your Content

**Projects** (`src/app/projects/page.tsx`):

```typescript
const projects = [
  {
    title: "Project Name",
    description: "Description",
    tags: ["React", "Next.js", "TypeScript"],
    image: "/path/to/image.jpg",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/username/repo",
    featured: true,
  },
];
```

**Skills** (`src/app/skills/page.tsx`):

- Update skill categories and levels (0-100)
- Add/remove skills as needed
- Update certifications

**About** (`src/app/about/page.tsx`):

- Update introduction and professional story
- Modify services offered
- Update tech stack

### 3. Add Images

Place your images in `/public/`:

```
public/
├── profile.jpg
├── projects/
│   ├── project1.jpg
│   └── project2.jpg
└── blog/
    └── article1.jpg
```

Reference in code: `image="/profile.jpg"`

### 4. Customize Translations

Edit language files in `public/locales/`:

- `/en/common.json` - English
- `/fr/common.json` - French
- `/ar/common.json` - Arabic

## 📁 Project Structure

```
src/
├── app/                      # Next.js App Router pages
│   ├── page.tsx             # Home page
│   ├── about/page.tsx       # About page
│   ├── projects/page.tsx    # Projects portfolio
│   ├── skills/page.tsx      # Skills & certifications
│   ├── blog/page.tsx        # Blog listing
│   ├── contact/page.tsx     # Contact form
│   ├── admin/               # Admin panel
│   └── api/contact/         # Contact form API
├── components/              # React components
│   ├── portfolio/           # Portfolio-specific components
│   ├── NavBarAndSideBar/    # Navigation components
│   ├── footer/              # Footer component
│   └── admin/               # Admin components
├── config/                  # Configuration files
│   └── portfolio.config.ts  # Main portfolio config
├── contexts/                # React contexts (Theme, Auth)
├── hooks/                   # Custom React hooks
├── lib/                     # External library configs
├── types/                   # TypeScript type definitions
└── utils/                   # Utility functions
```

## 🛠️ Tech Stack

- **Framework:** Next.js 15
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Material-UI (MUI)
- **Animations:** Framer Motion
- **Icons:** React Icons
- **Forms:** React Hook Form
- **Internationalization:** next-i18next
- **Backend (optional):** Appwrite

## 📦 Available Scripts

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm start            # Start production server

# Linting
npm run lint         # Run ESLint
```

## 🚢 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project to [Vercel](https://vercel.com)
3. Deploy automatically

### Other Platforms

- **Netlify:** Connect GitHub repo
- **AWS Amplify:** Use Next.js SSR hosting
- **Docker:** Build and containerize

## 📝 Checklist for Launch

- [ ] Update all personal information
- [ ] Add your projects with images
- [ ] Update skills and proficiency levels
- [ ] Add your work experience
- [ ] Upload profile photo
- [ ] Test contact form
- [ ] Update social media links
- [ ] Add blog posts (optional)
- [ ] Test on mobile devices
- [ ] Run lighthouse audit
- [ ] Deploy to production

## 🔧 Environment Variables

Create `.env.local` for sensitive data:

```env
# Contact form email settings
NEXT_PUBLIC_CONTACT_EMAIL=your@email.com

# Appwrite (optional)
NEXT_PUBLIC_APPWRITE_ENDPOINT=your-endpoint
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your-project-id
```

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Contact

For questions or support, reach out via the contact form on the website.

---

**Built with ❤️ using Next.js**
