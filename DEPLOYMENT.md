# Firebase Deployment Guide - 2025

This guide will help you deploy your Astro portfolio to Firebase Hosting.

## Prerequisites

1. **Node.js** installed (v18 or higher)
2. **Firebase CLI** installed globally:
   ```bash
   npm install -g firebase-tools
   ```
3. **Firebase account** and project created at [console.firebase.google.com](https://console.firebase.google.com)

## 🔐 Security Setup (CRITICAL)

### Step 1: Create `.env` File

Create a `.env` file in the root directory with your sensitive credentials:

```bash
# Copy the example file
cp .env.example .env
```

Then edit `.env` and add your Resend API key:

```env
RESEND_API_KEY=re_your_actual_api_key_here
```

**⚠️ IMPORTANT**: The `.env` file is already in `.gitignore` and will NEVER be committed to Git.

### Step 2: Get Your Resend API Key

1. Go to [resend.com](https://resend.com)
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new API key
5. Copy it to your `.env` file

### Step 3: Verify `.gitignore`

Make sure these files are ignored (already configured):
```
.env
.env.local
.env.production
.firebase/
firebase-debug.log
```

## 📦 Build Configuration

The project is now configured for **static deployment** compatible with Firebase Hosting:

- **`astro.config.mjs`**: Uses `output: 'static'` (no Node.js adapter)
- **`firebase.json`**: Configured for optimal hosting with rewrites and caching
- **`.firebaserc`**: Points to your Firebase project

## 🚀 Deployment Steps

### First-Time Setup

1. **Login to Firebase**:
   ```bash
   firebase login
   ```

2. **Verify Project Configuration**:
   ```bash
   firebase projects:list
   ```

   Ensure `anidesingit-portfolio` is listed. If not, update `.firebaserc`.

3. **Install Dependencies**:
   ```bash
   npm install
   ```

### Deploy Your Site

#### Option 1: Deploy Everything (Recommended First Time)
```bash
npm run deploy
```

This will:
1. Build your Astro site (`npm run build`)
2. Deploy to Firebase Hosting
3. Deploy Firebase Functions (if configured)

#### Option 2: Deploy Only Hosting
```bash
npm run deploy:hosting
```

#### Option 3: Manual Deploy
```bash
# Build first
npm run build

# Then deploy
firebase deploy --only hosting
```

### Preview Locally Before Deploy

```bash
# Build the production version
npm run build

# Preview it locally
npm run preview

# Or use Firebase emulators
firebase serve
```

## 📝 What Gets Deployed

- **Static files**: Everything in the `dist/` folder after building
- **Astro pages**: All routes are pre-rendered at build time
- **Dynamic pages**: Case study pages (`/work/[slug]`) are generated from Firestore data at build time
- **Assets**: Images, fonts, CSS, JS from the `dist/` folder

## ⚠️ Important Notes About the Contact Form

### Current Limitation

The contact form API route (`/api/send-email`) requires server-side execution, which Firebase Hosting doesn't support directly. You have two options:

### Option 1: Client-Side Email (Quick Fix - Less Secure)

Move the Resend API call to the client-side (browser). This exposes your API key in the browser, so it's **not recommended** for production.

### Option 2: Firebase Cloud Functions (Recommended)

Move the email sending logic to Firebase Cloud Functions:

1. Create a new function in `functions/index.js`:
   ```javascript
   const { onRequest } = require("firebase-functions/v2/https");
   const { Resend } = require("resend");

   exports.sendEmail = onRequest(async (req, res) => {
     const resend = new Resend(process.env.RESEND_API_KEY);
     const { name, email, message } = req.body;

     try {
       await resend.emails.send({
         from: "AniDesignIt <onboarding@resend.dev>",
         to: "anidesignit@gmail.com",
         replyTo: email,
         subject: `New message from ${name}`,
         html: `
           <h2>New Contact Form Submission</h2>
           <p><strong>Name:</strong> ${name}</p>
           <p><strong>Email:</strong> ${email}</p>
           <p><strong>Message:</strong> ${message}</p>
         `
       });
       res.json({ success: true });
     } catch (error) {
       res.status(500).json({ error: error.message });
     }
   });
   ```

2. Update contact form to call the Cloud Function instead of `/api/send-email`

3. Deploy functions:
   ```bash
   npm run deploy:functions
   ```

## 🌐 Post-Deployment

After deploying, your site will be available at:
```
https://anidesingit-portfolio.web.app
```

Or your custom domain if configured.

### Custom Domain Setup

1. Go to Firebase Console → Hosting
2. Click "Add custom domain"
3. Follow the verification steps
4. Add DNS records to your domain registrar

## 🔄 Continuous Deployment

### GitHub Actions (Optional)

Create `.github/workflows/firebase-deploy.yml`:

```yaml
name: Deploy to Firebase

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run build
      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
          projectId: anidesingit-portfolio
```

**Remember to add secrets to GitHub repository settings!**

## 📊 Monitoring & Analytics

### Enable Analytics in Firebase Console

1. Go to Firebase Console
2. Navigate to Analytics
3. Enable Google Analytics for your project

### View Deployment Logs

```bash
firebase hosting:channel:list
firebase functions:log
```

## 🔍 Troubleshooting

### Build Errors

```bash
# Clear cache and rebuild
rm -rf dist/ .astro/
npm run build
```

### Deployment Fails

```bash
# Check Firebase authentication
firebase login --reauth

# Verify project
firebase use anidesingit-portfolio
```

### 404 Errors After Deploy

- Make sure `firebase.json` has the rewrite rule:
  ```json
  "rewrites": [
    { "source": "**", "destination": "/index.html" }
  ]
  ```

### Environment Variables Not Working

- `.env` file is only for local development
- For Cloud Functions, set environment variables:
  ```bash
  firebase functions:config:set resend.api_key="your_key_here"
  ```

## 🔒 Security Checklist

- [ ] `.env` file created and contains RESEND_API_KEY
- [ ] `.env` is in `.gitignore` (already done)
- [ ] Firebase API keys in `firebase.js` are safe (they're meant to be public)
- [ ] Never commit `.env`, `.env.local`, or any file with secrets
- [ ] Use Cloud Functions for sensitive API calls (like Resend)
- [ ] Enable Firebase Security Rules for Firestore

## 📚 Additional Resources

- [Astro Deployment Docs](https://docs.astro.build/en/guides/deploy/)
- [Firebase Hosting Docs](https://firebase.google.com/docs/hosting)
- [Firebase Cloud Functions](https://firebase.google.com/docs/functions)
- [Resend API Docs](https://resend.com/docs)

---

**Need Help?** Check the Firebase Console logs or run `firebase --help`
