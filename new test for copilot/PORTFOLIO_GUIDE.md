# Professional Portfolio Guide

Welcome to your new professional portfolio website! This guide will help you customize it with your own information.

## 📁 Portfolio Structure

### Pages Created

1. **Home Page** (`/` - `src/app/page.tsx`)
   - Hero section with introduction
   - Featured skills
   - Project showcase
   - Call-to-action section

2. **About Page** (`/about` - `src/app/about/page.tsx`)
   - Professional background
   - Services offered
   - Technology stack
   - Your journey and story

3. **Projects Page** (`/projects` - `src/app/projects/page.tsx`)
   - Portfolio of your best work
   - Project cards with descriptions
   - Technology tags
   - Links to live projects and GitHub repos

4. **Skills Page** (`/skills` - `src/app/skills/page.tsx`)
   - Detailed skill breakdown by category
   - Skill level indicators (0-100%)
   - Certifications
   - Professional achievements

5. **Blog Page** (`/blog` - `src/app/blog/page.tsx`)
   - Article showcase
   - Featured post section
   - Category filtering
   - Newsletter subscription

6. **Contact Page** (`/contact` - `src/app/contact/page.tsx`)
   - Professional contact form
   - Multiple contact methods
   - Form validation
   - Email notifications

7. **Resume Page** (`/resume` - `src/app/resume/page.tsx`)
   - Professional resume/CV
   - Experience section
   - Education
   - Skills summary
   - Download PDF button

## 🎨 Components Created

### Portfolio Components (`src/components/portfolio/`)

- **ProjectCard.tsx** - Display individual projects with image, description, tags, and links
- **SkillBar.tsx** - Animated skill level indicators
- **StatCard.tsx** - Statistics display cards
- **ServiceCard.tsx** - Service/expertise cards
- **TestimonialCard.tsx** - Client testimonials
- **ContactForm.tsx** - Functional contact form with validation

## 🔧 Customization Guide

### 1. Update Personal Information

**Home Page** (`src/app/page.tsx`):

```tsx
// Update the name, title, and introduction
const stats = [
  { label: "Your Label", value: "Your Value" },
  // ... more stats
];
```

**Layout** (`src/app/layout.tsx`):

```tsx
export const metadata: Metadata = {
  title: "Your Name - Portfolio",
  description: "Your professional description",
};
```

### 2. Add Your Projects

Edit `src/app/projects/page.tsx`:

```tsx
const projects = [
  {
    title: "Project Name",
    description: "Project description",
    tags: ["Technology1", "Technology2"],
    image: "/path/to/image.jpg",
    liveUrl: "https://project-url.com",
    githubUrl: "https://github.com/username/project",
    featured: true, // Set to true for featured projects
  },
  // Add more projects...
];
```

### 3. Update Skills

Edit `src/app/skills/page.tsx`:

```tsx
const skillsByCategory = {
  Frontend: [
    { name: "Skill Name", level: 90 },
    // ... more skills
  ],
  // Add more categories...
};
```

### 4. Customize About Section

Edit `src/app/about/page.tsx`:

- Update the introduction paragraph
- Modify services (6 service cards)
- Update tech stack items
- Customize the journey story

### 5. Add Blog Posts

Edit `src/app/blog/page.tsx`:

```tsx
const posts: BlogPost[] = [
  {
    slug: "post-slug",
    title: "Post Title",
    excerpt: "Short excerpt",
    date: "January 1, 2024",
    readTime: "5 min read",
    category: "Technology",
    image: "/path/to/image.jpg",
    featured: false,
  },
  // Add more posts...
];
```

### 6. Set Up Contact Form

Edit `src/components/portfolio/ContactForm.tsx`:

```tsx
const CONTACT_EMAIL = "your@email.com"; // Update email
```

To handle form submissions, you'll need to:

1. Create an API route: `src/app/api/contact/route.ts`
2. Connect to email service (SendGrid, Nodemailer, etc.)
3. Update the form submission logic

### 7. Update Resume

Edit `src/app/resume/page.tsx`:

- Update experience section with your jobs
- Add your education
- Customize skills summary
- Add your certifications

### 8. Social Links

Update social media links in:

- `src/app/page.tsx` (hero section)
- `src/components/portfolio/ContactForm.tsx` (contact methods)

Replace placeholder URLs:

- `https://github.com/yourprofile`
- `https://linkedin.com/in/yourprofile`
- `https://twitter.com/yourprofile`
- `hello@example.com` → your email

## 🎯 Key Features

### Already Implemented

✅ Dark/Light theme toggle
✅ Responsive design (mobile, tablet, desktop)
✅ Smooth animations (Framer Motion)
✅ Contact form with validation
✅ Multi-language support (i18n ready)
✅ SEO optimized (Next.js metadata)
✅ Tailwind CSS styling
✅ Material Design 3 color system

### Optional Enhancements

1. **Blog functionality**
   - Create individual blog post pages
   - Add markdown support
   - Implement reading time calculation

2. **Email notifications**
   - Set up backend API for form submissions
   - Integrate SendGrid or similar service
   - Send confirmation emails

3. **Analytics**
   - Add Google Analytics
   - Track page views and user behavior

4. **SEO**
   - Create sitemap.xml
   - Add robots.txt
   - Optimize meta tags for each page

5. **Performance**
   - Optimize images with next/image
   - Implement lazy loading
   - Create progressive web app (PWA)

## 📧 Contact Form Setup

To make the contact form functional:

1. Create `src/app/api/contact/route.ts`:

```tsx
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  const { name, email, subject, message } = await request.json();

  // Configure your email service
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: email,
      to: process.env.CONTACT_EMAIL,
      subject: subject,
      text: `${name}\n${email}\n\n${message}`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
```

2. Add environment variables to `.env.local`:

```
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
CONTACT_EMAIL=your-email@gmail.com
```

## 🚀 Deployment

Ready to deploy?

### Vercel (Recommended)

1. Push code to GitHub
2. Connect to Vercel: https://vercel.com
3. Deploy with one click

### Other Platforms

- Netlify
- AWS Amplify
- Digital Ocean
- Heroku

## 📱 Mobile Responsive

All pages are fully responsive:

- Mobile: 320px and up
- Tablet: 768px and up
- Desktop: 1024px and up

## 🎨 Customization: Colors & Branding

The portfolio uses Material Design 3 color tokens. To customize:

1. Edit `src/app/globals.css` for color variables
2. Modify Tailwind config if needed
3. Update brand colors across components

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [React Hook Form](https://react-hook-form.com/)
- [Material Design 3](https://m3.material.io/)

## ✨ Next Steps

1. Replace all placeholder text with your information
2. Add your own project images
3. Update contact information
4. Set up email service for contact form
5. Deploy to your preferred platform
6. Monitor analytics and user feedback
7. Keep blog updated with new content

---

**Congratulations!** You now have a professional portfolio website ready to showcase your work to the world! 🎉
