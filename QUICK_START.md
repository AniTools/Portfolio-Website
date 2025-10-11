# 🚀 Quick Start - Deploy to Firebase

## Prerequisites Check
```bash
# Check if Firebase CLI is installed
firebase --version

# If not installed, run:
npm install -g firebase-tools
```

## Step 1: Setup Environment Variables

1. **Copy the example file:**
   ```bash
   cp .env.example .env
   ```

2. **Edit `.env` and add your Resend API key:**
   ```bash
   # Get your key from: https://resend.com/api-keys
   RESEND_API_KEY=re_your_actual_key_here
   ```

## Step 2: Login to Firebase
```bash
firebase login
```

## Step 3: Build Your Site
```bash
npm run build
```

## Step 4: Deploy
```bash
# Option 1: Deploy everything
npm run deploy

# Option 2: Deploy only hosting
npm run deploy:hosting

# Option 3: Manual deployment
firebase deploy --only hosting
```

## 🎉 Done!

Your site will be live at:
- **Default URL**: https://anidesingit-portfolio.web.app
- **Custom domain**: Configure in Firebase Console

## 📝 Common Commands

```bash
# Local development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy everything
npm run deploy

# View deployment logs
firebase hosting:channel:list
```

## ⚠️ Important Notes

### Contact Form API Route
The contact form currently uses `/api/send-email` which requires server-side execution. Firebase Hosting only supports static files, so you have two options:

**Option A: Quick Fix (Not Recommended)**
- Move Resend API call to client-side
- Less secure (exposes API key)

**Option B: Use Cloud Functions (Recommended)**
- Move email logic to `functions/index.js`
- More secure, API key stays server-side
- See `DEPLOYMENT.md` for full instructions

### First Deploy Issues?

If your first deployment fails, try:
```bash
# Reinitialize Firebase (if needed)
firebase init hosting

# Clear cache and rebuild
rm -rf dist/ .astro/
npm run build

# Deploy again
firebase deploy --only hosting
```

## 🔒 Security Checklist

- [x] `.env` file created with RESEND_API_KEY
- [x] `.gitignore` configured (already done)
- [x] Firebase project configured in `.firebaserc`
- [ ] **TODO**: Set up Firebase Security Rules (see SECURITY.md)
- [ ] **TODO**: Move contact form to Cloud Functions (optional but recommended)

## 📚 Full Documentation

- **DEPLOYMENT.md** - Complete deployment guide
- **SECURITY.md** - Security best practices
- **claude.md** - Project architecture overview

## 🆘 Need Help?

1. Check `DEPLOYMENT.md` for troubleshooting
2. View Firebase Console logs
3. Run `firebase --help` for CLI help

---

**Ready to deploy?** Just run: `npm run deploy`
