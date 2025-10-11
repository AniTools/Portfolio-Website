# AniDesignIt Portfolio

## Project Overview

This is a personal portfolio website for Ana Maria Posada (AniDesignIt), a multidisciplinary designer specializing in digital design, UI/UX, branding, and web development. The portfolio is built with **Astro** and uses **Firebase Firestore** for dynamic content management and **Firebase Hosting** for deployment.

## Tech Stack

### Core Technologies
- **Astro 5.14.1** - Static Site Generator with server rendering capabilities
- **React 19.1.1** - Component library for interactive elements
- **TypeScript** - Type-safe development
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **Firebase 12.3.0** - Backend services (Firestore database, hosting)

### Additional Libraries
- **Framer Motion 12.23.12** - Animation library
- **Embla Carousel 8.6.0** - Carousel component
- **Swiper 11.2.10** - Touch slider
- **Lucide React 0.536.0** - Icon library
- **Marked 15.0.12** - Markdown parser
- **Resend 6.0.3** - Email API for contact form
- **Font Awesome 7.0.1** - Icon toolkit
- **Lottie Animations** - Interactive animations from lottiefiles.com

## Project Structure

```
portfolio-frontend-main/
├── src/
│   ├── components/          # Astro components
│   │   ├── Hero.astro      # Landing section
│   │   ├── MyWork.astro    # Portfolio projects carousel
│   │   ├── Services.astro  # Services grid
│   │   ├── AboutMe.astro   # About section
│   │   ├── Contact.astro   # Contact form
│   │   └── ProjectCard.astro # Individual project card
│   ├── layouts/            # Layout components
│   │   ├── layout.astro    # Main layout with nav & social media
│   │   └── PageLayout.astro # Case study page layout
│   ├── pages/              # Astro pages (file-based routing)
│   │   ├── index.astro     # Home page
│   │   ├── work/
│   │   │   └── [slug].astro # Dynamic case study pages
│   │   └── api/
│   │       └── send-email.ts # Email API endpoint
│   ├── lib/
│   │   └── firebase.js     # Firebase configuration
│   └── types.ts            # TypeScript type definitions
├── functions/              # Firebase Cloud Functions
│   ├── index.js
│   └── package.json
├── public/                 # Static assets
├── firebase.json           # Firebase configuration
├── astro.config.mjs        # Astro configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── package.json
└── seed.js                 # Database seeding script
```

## Key Features

### 1. **Horizontal Scrolling (Desktop)**
- Desktop view features horizontal section scrolling using CSS transforms
- Smooth transitions between sections via wheel scroll or arrow keys
- Mobile automatically switches to vertical scrolling

### 2. **Firebase Integration**
- **Firestore Database**: Stores case studies/projects dynamically
- Collections:
  - `case_studies` - Portfolio projects with fields:
    - `name` - Project name
    - `slug` - URL-friendly identifier
    - `summary` - Short description
    - `subtitle` - Secondary title
    - `role` - Designer's role
    - `client` - Client name
    - `year` - Project year
    - `tools` - Array of tools used
    - `heroImage` - Main project image URL
    - `gallery` - Array of image URLs
    - `body` - HTML content (case study details)
    - `urlWeb` - Live project link

### 3. **Dynamic Case Study Pages**
- Uses Astro's `getStaticPaths()` to generate pages from Firestore
- Each project has a dedicated page at `/work/[slug]`
- Features:
  - Hero image
  - Project details sidebar (client, year, role, tools)
  - Rich HTML body content with markdown support
  - Image gallery with lightbox
  - Previous/Next project navigation

### 4. **Contact Form**
- Client-side form submission
- Uses `/api/send-email` endpoint with Resend API
- Form validation
- Success/error status messages

### 5. **Responsive Design**
- Desktop: Horizontal scrolling sections
- Mobile: Vertical scrolling, hamburger menu
- Fixed social media icons
- Adaptive layouts using Tailwind CSS breakpoints

### 6. **Animations**
- Lottie animations from lottiefiles.com
- Scroll-triggered animations (fade-in, slide-up)
- Service items stagger animation
- Smooth section transitions

## Firebase Configuration

### Firestore Setup
```javascript
// src/lib/firebase.js
const firebaseConfig = {
  apiKey: "AIzaSyABhIAQ705h7Aopp-PhnZhSZz82KzvGMYU",
  authDomain: "anidesingit-portfolio.firebaseapp.com",
  projectId: "anidesingit-portfolio",
  storageBucket: "anidesingit-portfolio.firebasestorage.app",
  messagingSenderId: "397990432239",
  appId: "1:397990432239:web:e165d77c83330c93bbba1a"
};
```

### Hosting Configuration
```json
{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"]
  }
}
```

## Pages & Routes

### Main Pages
- **/** - Home page with sections:
  - Hero
  - My Work (portfolio carousel)
  - Services
  - About Me
  - Contact

### Dynamic Routes
- **/work/[slug]** - Individual case study pages generated from Firestore

### API Routes
- **/api/send-email** - POST endpoint for contact form

## Styling

### Color Scheme
```css
:root {
  --bg-color: #FFEBE5;        /* Soft pink background */
  --primary-color: #FF725E;   /* Coral/orange accent */
  --secondary-color: #3F4142; /* Dark gray text */
  --title-font: 'Literata', serif;
  --paragraph-font: 'Open Sans', sans-serif;
}
```

### Responsive Breakpoints
- Mobile: ≤ 768px - Vertical scrolling, mobile menu
- Tablet: ≤ 1024px - Adjusted grid layouts
- Desktop: > 1024px - Horizontal scrolling

## Development

### Available Scripts
```bash
npm run dev      # Start dev server at localhost:4321
npm run build    # Build for production to ./dist/
npm run preview  # Preview production build
```

### Building & Deployment
1. Build: `npm run build`
2. Output directory: `dist/`
3. Deploy to Firebase: `firebase deploy`

## Data Flow

1. **Fetching Projects (MyWork.astro)**:
   ```javascript
   const querySnapshot = await getDocs(collection(db, "case_studies"));
   projects = querySnapshot.docs.map(doc => doc.data());
   ```

2. **Static Page Generation ([slug].astro)**:
   ```javascript
   export async function getStaticPaths() {
     const querySnapshot = await getDocs(collection(db, "case_studies"));
     return projects.map(project => ({
       params: { slug: project.slug },
       props: { project }
     }));
   }
   ```

3. **Contact Form Submission**:
   ```javascript
   fetch("/api/send-email", {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify({ name, email, message })
   });
   ```

## Key Components

### Hero.astro
- Landing section with Ana's intro
- Lottie animation
- "Explore My Work" CTA button

### MyWork.astro
- Fetches projects from Firestore
- Horizontal carousel with auto-scroll
- Navigation dots
- Uses ProjectCard component

### ProjectCard.astro
- Displays project image, title, role, summary
- Tools tags
- Link to case study page

### Services.astro
- Grid of 6 services offered
- SVG icons for each service
- Scroll animation on desktop

### AboutMe.astro
- Photo with Lottie animation overlay
- Biography text
- Links to resume and booking calendar

### Contact.astro
- Contact form with validation
- Lottie animation
- Footer with location, phone, email info

### [slug].astro (Case Study Page)
- Dynamic page generation from Firestore
- Hero image
- Project info sidebar
- HTML body content
- Image gallery with carousel
- Prev/Next navigation

## Navigation System

### Desktop
- Fixed header with logo and nav links
- Click navigation between sections
- Wheel scroll navigation
- Arrow key navigation
- Horizontal transform: `translateX(-${section}00vw)`

### Mobile
- Hamburger menu
- Smooth scroll to sections
- Fixed header with blur backdrop
- Bottom-fixed social media icons

## External Integrations

### Cloudinary
- Image hosting for photos and assets
- URL format: `https://res.cloudinary.com/dqbxkmkph/...`

### Lottie Animations
- Hosted on lottie.host
- Used in Hero, About Me, and Contact sections
- Loaded via dotlottie-wc web component

### Google Fonts
- Literata (headings) - serif
- Open Sans (body) - sans-serif

### Social Media Links
- Instagram: @aniposada
- YouTube: @ZoluAi
- LinkedIn: aniposada

## Environment Setup

### Prerequisites
- Node.js (v18 or higher)
- Firebase CLI: `npm install -g firebase-tools`
- Firebase project set up at [console.firebase.google.com](https://console.firebase.google.com)

### Installation
```bash
npm install
```

### Firebase Setup
1. Create Firebase project
2. Enable Firestore
3. Update firebase config in `src/lib/firebase.js` (already configured)
4. Run seed script: `node seed.js` (if needed)
5. Firebase is already initialized (see `.firebaserc` and `firebase.json`)

### Environment Variables
1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Add your Resend API key to `.env`:
   ```env
   RESEND_API_KEY=re_your_actual_key_here
   ```
3. **NEVER commit `.env` to Git** (already protected by `.gitignore`)

## Performance Optimizations

- Static page generation at build time
- Image lazy loading
- Component-level code splitting
- Optimized Firestore queries
- CSS/JS minification in production build
- Firebase Hosting CDN with caching headers

## Deployment

### Quick Deploy
```bash
# Install Firebase CLI globally
npm install -g firebase-tools

# Login to Firebase
firebase login

# Build and deploy
npm run deploy
```

### Deployment Scripts
- `npm run deploy` - Build and deploy everything
- `npm run deploy:hosting` - Deploy only hosting
- `npm run deploy:functions` - Deploy only functions

### Important Files
- `.env` - Environment variables (NOT committed to Git)
- `.env.example` - Template for environment variables
- `.gitignore` - Protects sensitive files
- `.firebaserc` - Firebase project configuration
- `firebase.json` - Firebase hosting & functions config

**📚 See `DEPLOYMENT.md` for complete deployment guide**
**🔒 See `SECURITY.md` for security best practices**
**🚀 See `QUICK_START.md` for quick deployment steps**

## Security & Privacy

### What's Public (Safe to Expose)
- Firebase API key, auth domain, project ID, etc. (in `src/lib/firebase.js`)
- These are designed to be public; security is via Firebase Rules

### What's Private (Protected)
- ✅ `RESEND_API_KEY` - In `.env` file (ignored by Git)
- ✅ `.env` file is in `.gitignore`
- ✅ Firebase debug logs excluded from Git

### Security Measures
- Environment variables in `.env` (not committed)
- Comprehensive `.gitignore` file
- Firebase Security Rules needed (see `SECURITY.md`)
- Cloud Functions for sensitive operations recommended

## Future Enhancements

Potential improvements:
- Admin panel for content management
- Blog section
- Image optimization pipeline
- SEO metadata per page
- Analytics integration
- A/B testing for CTAs
- Move contact form to Cloud Functions (more secure)

## Contact Information

- **Email**: hello@aniposada.com
- **Phone**: +1 604-725-1561
- **Location**: Vancouver, BC, Canada
- **Website**: Portfolio hosted on Firebase
- **Live URL**: https://anidesingit-portfolio.web.app

---

**Built with ❤️ using Astro + Firebase**

## Documentation Files

- **claude.md** (this file) - Complete project overview
- **DEPLOYMENT.md** - Step-by-step deployment guide
- **SECURITY.md** - Security best practices and privacy info
- **QUICK_START.md** - Quick reference for deployment
- **README.md** - Original Astro template readme
