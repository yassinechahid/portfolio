# Yassine chahid - Professional Portfolio

A modern, responsive, and feature-rich portfolio website built with Next.js, TypeScript, and Tailwind CSS. Showcase your projects, skills, and professional journey with style.

## ✨ Features

- **📱 Fully Responsive Design** - Perfect on all devices (mobile, tablet, desktop)
- **🌓 Dark & Light Mode** - Toggle between themes for comfortable viewing
- **⚡ Fast Performance** - Optimized with Next.js 15 and modern best practices
- **🎨 Beautiful Animations** - Smooth transitions with Framer Motion
- **📧 Contact Form** - Fully functional with validation (ready for email integration)
- **📝 Blog Ready** - Create and publish articles
- **🔍 SEO Optimized** - Built-in meta tags and structured data
- **🌍 Multi-language Ready** - i18n support for internationalization
- **📱 Mobile First** - Designed for mobile users first
- **♿ Accessible** - WCAG compliant components
- **🚀 Easy Deployment** - Ready for Vercel, Netlify, and more

## 🏗️ Site Structure

```
Portfolio/
├── Home              (/)              - Hero section, featured projects, skills
├── About             (/about)         - Professional background, services, tech stack
├── Projects          (/projects)      - Complete portfolio of your work
├── Skills            (/skills)        - Detailed skills with proficiency levels
├── Blog              (/blog)          - Articles and insights
├── Resume            (/resume)        - Professional CV with download option
└── Contact           (/contact)       - Contact form and methods
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone or download the project**

```bash
cd "new test for copilot"
```

2. **Install dependencies**

```bash
npm install
```

3. **Start development server**

```bash
npm run dev
```

4. **Open your browser**

```
http://localhost:3000
```

## 🎯 Customization

### 1. Update Configuration

Edit `src/config/portfolio.config.ts` with your information:

```typescript
export const portfolioConfig = {
  name: "Your Name",
  title: "Your Title",
  email: "your@email.com",
  // ... more config
};
```

### 2. Personalize Each Page

- **Home** → `src/app/page.tsx`
- **About** → `src/app/about/page.tsx`
- **Projects** → `src/app/projects/page.tsx`
- **Skills** → `src/app/skills/page.tsx`
- **Blog** → `src/app/blog/page.tsx`
- **Resume** → `src/app/resume/page.tsx`
- **Contact** → `src/app/contact/page.tsx`

### 3. Add Your Assets

Place your images in `/public` directory:

```
public/
├── profile-image.jpg
├── project-1.jpg
├── project-2.jpg
└── ...
```

### 4. Update Navigation

Edit social links and contact info in `src/components/NavBarAndSideBar/Navbar.tsx`

## 📚 Documentation

- **[PORTFOLIO_GUIDE.md](./PORTFOLIO_GUIDE.md)** - Comprehensive customization guide
- **[PORTFOLIO_CHECKLIST.md](./PORTFOLIO_CHECKLIST.md)** - Step-by-step setup checklist

## 🛠️ Tech Stack

### Frontend

- **Next.js 15** - React framework with server-side rendering
- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library

### Form & Validation

- **React Hook Form** - Efficient form management
- **SweetAlert2** - Beautiful alerts and modals

### Utilities

- **Lucide React** - Beautiful SVG icons
- **i18next** - Internationalization
- **next-themes** - Dark mode support

### Development

- **ESLint** - Code quality
- **PostCSS** - CSS processing
- **Tailwind CSS** - Styling

## 📦 Project Structure

```
src/
├── app/                    # App routes
│   ├── page.tsx           # Home page
│   ├── about/             # About page
│   ├── projects/          # Projects page
│   ├── skills/            # Skills page
│   ├── blog/              # Blog page
│   ├── resume/            # Resume page
│   ├── contact/           # Contact page
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── portfolio/         # Portfolio-specific components
│   │   ├── ProjectCard.tsx
│   │   ├── SkillBar.tsx
│   │   ├── StatCard.tsx
│   │   ├── ServiceCard.tsx
│   │   ├── TestimonialCard.tsx
│   │   └── ContactForm.tsx
│   ├── NavBarAndSideBar/  # Navigation
│   ├── footer/            # Footer component
│   └── ...               # Other components
├── config/               # Configuration files
│   └── portfolio.config.ts
├── contexts/             # React contexts
├── hooks/                # Custom hooks
├── types/                # TypeScript types
└── utils/                # Utility functions
```

## 🎨 Customization

### Colors

Edit color variables in `src/app/globals.css` or `tailwind.config.ts`

### Fonts

Update font imports in `src/app/layout.tsx`

### Animations

Adjust animation settings in individual components using Framer Motion props

## 📧 Email Integration

To enable contact form submissions:

1. Create API route: `src/app/api/contact/route.ts`
2. Set up email service (SendGrid, Nodemailer, etc.)
3. Add environment variables to `.env.local`
4. Update form submission handler

See [PORTFOLIO_GUIDE.md](./PORTFOLIO_GUIDE.md#-contact-form-setup) for detailed instructions.

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Netlify

1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `.next`

### Other Platforms

- AWS Amplify
- Digital Ocean App Platform
- Heroku (with custom buildpack)
- Any Node.js hosting provider

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔐 Security

- No sensitive data in source code
- Environment variables for secrets
- HTTPS enabled in production
- Security headers configured
- XSS and CSRF protection

## 📈 SEO

- Meta tags on all pages
- Open Graph support
- Sitemap generation ready
- Structured data markup
- Mobile-friendly design
- Fast Core Web Vitals

## 🎯 Performance

- Next.js Image optimization
- Lazy loading for images
- Code splitting
- CSS optimization
- Asset compression
- Caching strategies

## 🐛 Troubleshooting

### Build Issues

```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

### Styling Not Applied

```bash
# Rebuild Tailwind CSS
npm run dev
```

### Environment Variables Not Working

- Check `.env.local` file exists
- Restart development server
- Use `process.env.VARIABLE_NAME` in server components

## 📞 Support

For help:

1. Check [PORTFOLIO_GUIDE.md](./PORTFOLIO_GUIDE.md)
2. Review [PORTFOLIO_CHECKLIST.md](./PORTFOLIO_CHECKLIST.md)
3. Check Next.js documentation: https://nextjs.org/docs
4. Review Tailwind CSS docs: https://tailwindcss.com/docs

## 📄 License

This portfolio template is free to use and modify for your personal use.

## 🙏 Credits

Built with:

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [React Hook Form](https://react-hook-form.com/)
- [Material Design 3](https://m3.material.io/)

## 🎉 Getting Started

1. ✅ Customize `src/config/portfolio.config.ts`
2. ✅ Update pages with your information
3. ✅ Add your project images to `/public`
4. ✅ Test locally with `npm run dev`
5. ✅ Deploy to your favorite platform
6. ✅ Share with the world!

**Happy building! 🚀**

---

For detailed instructions, see [PORTFOLIO_GUIDE.md](./PORTFOLIO_GUIDE.md) and [PORTFOLIO_CHECKLIST.md](./PORTFOLIO_CHECKLIST.md)
