# ⚡ Quick Reference Guide

## 🚀 Fast Track Setup (15 Minutes)

### Step 1: Update Your Info (3 min)

```bash
# Edit this file with YOUR information
src/config/portfolio.config.ts
```

Replace:

- Name → Your name
- Email → Your email
- All links → Your links

### Step 2: Update Home Page (3 min)

```bash
src/app/page.tsx
```

Find and update:

- "Yassine chahid" → Your name
- "Senior Frontend Developer" → Your title
- The introductory text
- Social media links

### Step 3: Add Your Projects (4 min)

```bash
src/app/projects/page.tsx
```

Update the `projects` array with your 3-6 best projects:

- Title
- Description
- Technologies (tags)
- Image path
- Links (live URL and GitHub)

### Step 4: Update Skills (3 min)

```bash
src/app/skills/page.tsx
```

Update `skillsByCategory`:

- Add/remove skills
- Set accurate proficiency levels (0-100)
- Adjust categories if needed

### Step 5: Add Images (2 min)

Place images in `/public/`:

- Profile photo
- Project screenshots
- Blog images
- Any other assets

## 🔍 File Quick Reference

```
Essential Files to Edit:
├─ src/config/portfolio.config.ts     (Main config)
├─ src/app/page.tsx                   (Home page)
├─ src/app/about/page.tsx             (About page)
├─ src/app/projects/page.tsx          (Projects list)
├─ src/app/skills/page.tsx            (Skills & expertise)
├─ src/app/blog/page.tsx              (Blog articles)
├─ src/app/resume/page.tsx            (Resume/CV)
└─ src/app/contact/page.tsx           (Contact form)
```

## 🎯 What to Update & Where

| Info       | File                   | Search For                  |
| ---------- | ---------------------- | --------------------------- |
| Name       | `page.tsx` (all pages) | "Yassine chahid"            |
| Title      | `page.tsx`             | "Senior Frontend Developer" |
| Email      | Multiple               | "hello@example.com"         |
| Phone      | `page.tsx`             | "+1 (555)"                  |
| GitHub     | `Navbar.tsx`           | "github.com"                |
| LinkedIn   | `Navbar.tsx`           | "linkedin.com"              |
| Twitter    | `Navbar.tsx`           | "twitter.com"               |
| Projects   | `projects/page.tsx`    | `projects` array            |
| Skills     | `skills/page.tsx`      | `skillsByCategory`          |
| Experience | `resume/page.tsx`      | `experience` array          |

## 🖼️ Image Paths

```
Place images in: public/

Then reference as:
├─ /profile.jpg
├─ /projects/project-1.jpg
├─ /blog/article-1.jpg
└─ /assets/logo.png

In code: <img src="/image-name.jpg" />
```

## 🎨 Common Customizations

### Change Colors

Edit: `src/app/globals.css`
Or: `tailwind.config.ts`

### Change Fonts

Edit: `src/app/layout.tsx`
Update import: `@import url('...')`

### Add Social Link

Edit: `src/components/NavBarAndSideBar/Navbar.tsx`
Add icon and link to navbar

### Update Contact Email

Edit: `src/components/portfolio/ContactForm.tsx`
Change: `const CONTACT_EMAIL = "your@email.com"`

### Add Blog Post

Edit: `src/app/blog/page.tsx`
Add to `posts` array:

```tsx
{
  slug: "url-slug",
  title: "Article Title",
  excerpt: "Short description",
  date: "January 1, 2024",
  readTime: "5 min read",
  category: "Category",
  image: "/path/to/image.jpg",
  featured: false,
}
```

## 💻 Terminal Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## 📱 Testing

```bash
# Test on mobile
# Option 1: Use Chrome DevTools (F12)
# Option 2: Open on phone: http://[your-ip]:3000

# Test all breakpoints:
- Mobile: 375px (iPhone SE)
- Tablet: 768px (iPad)
- Desktop: 1024px+ (Monitor)
```

## 🌓 Dark Mode Test

```bash
# In browser DevTools:
1. Open Console (F12)
2. Type: document.documentElement.classList.toggle('dark')
3. Page switches to dark mode
4. Verify all text is readable
```

## 🔗 Important Links

| Item          | Link                                  |
| ------------- | ------------------------------------- |
| Production    | https://your-domain.com               |
| GitHub Repo   | https://github.com/username/portfolio |
| Vercel        | https://vercel.com/dashboard          |
| Email Service | SendGrid, Nodemailer, etc.            |
| Domain        | Namecheap, GoDaddy, etc.              |

## ⚠️ Common Mistakes

```
❌ Don't: Forget to update email address
✅ Do: Search for "hello@example.com" and replace

❌ Don't: Leave placeholder images
✅ Do: Add your own project screenshots

❌ Don't: Keep test skills
✅ Do: Update with your real expertise

❌ Don't: Forget social media links
✅ Do: Update all social profiles

❌ Don't: Deploy without testing
✅ Do: Test locally first (npm run dev)
```

## 📋 Pre-Launch Checklist

- [ ] Updated all personal information
- [ ] Added your projects
- [ ] Updated skills
- [ ] Added images
- [ ] Tested on mobile
- [ ] Tested on tablet
- [ ] Tested on desktop
- [ ] Checked dark mode
- [ ] Verified all links work
- [ ] Tested contact form
- [ ] Fixed any typos
- [ ] Ready to deploy

## 🚀 Deployment (Choose One)

### Vercel (Easiest - 5 minutes)

```bash
# Option 1: CLI
npm install -g vercel
vercel

# Option 2: GitHub
# Connect repo to Vercel dashboard
# Auto-deploys on push
```

### Netlify (Easy - 10 minutes)

1. Go to netlify.com
2. Connect GitHub repo
3. Set build: `npm run build`
4. Set publish: `.next`
5. Deploy!

### Other Services

- AWS Amplify
- Digital Ocean
- Heroku
- Railway

## 🆘 Quick Troubleshooting

**Dark mode not working?**

- Clear browser cache (Ctrl+Shift+Delete)
- Restart dev server

**Images not showing?**

- Check path: `/public/image-name.jpg`
- Verify file exists
- Use lowercase filenames

**Styling broken?**

- Rebuild: `npm run dev`
- Clear: `rm -rf .next`

**Form not sending?**

- Set up email service API
- Add environment variables
- Check API endpoint

## 🎓 Still Need Help?

Read these in order:

1. `PORTFOLIO_CHECKLIST.md` - Step-by-step
2. `PORTFOLIO_GUIDE.md` - Detailed guide
3. `README_PORTFOLIO.md` - Full reference
4. `SITE_MAP.md` - Structure overview

## ✨ You're Almost There!

1. ✅ Update info
2. ✅ Add images
3. ✅ Test locally
4. ✅ Deploy
5. ✅ Share with world!

---

**Questions?** Check the documentation files or search for your specific issue. Good luck! 🚀
