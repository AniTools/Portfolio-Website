# Security & Privacy Guide

## 🔐 What Information is Private?

### ✅ Safe to be Public (Already in Code)

These Firebase credentials are **safe to expose** in client-side code:
- **Firebase API Key** (`AIzaSyABhIAQ705h7Aopp-PhnZhSZz82KzvGMYU`)
- **Firebase Auth Domain** (`anidesingit-portfolio.firebaseapp.com`)
- **Firebase Project ID** (`anidesingit-portfolio`)
- **Firebase Storage Bucket** (`anidesingit-portfolio.firebasestorage.app`)
- **Messaging Sender ID** (`397990432239`)
- **App ID** (`1:397990432239:web:e165d77c83330c93bbba1a`)

**Why?** Firebase API keys are designed to be public. Security is enforced through Firebase Security Rules, not by hiding the API key.

### 🚨 MUST Keep Private

These credentials must **NEVER** be committed to version control:

1. **Resend API Key** (`RESEND_API_KEY`)
   - Used for sending emails
   - Should be in `.env` file (already protected by `.gitignore`)
   - Gives access to your email sending service

2. **Future API Keys**
   - Any third-party service API keys
   - Database connection strings (if not using Firestore)
   - OAuth secrets
   - Payment gateway keys

## 🛡️ Security Measures Implemented

### 1. Environment Variables (.env)
- Created `.env.example` as a template
- All sensitive keys go in `.env` (not tracked by Git)
- Astro automatically loads `.env` variables

### 2. Git Ignore Protection
Created comprehensive `.gitignore` to exclude:
- `.env` and all variants (`.env.local`, `.env.production`, etc.)
- Firebase debug logs
- Build outputs (`dist/`, `.astro/`)
- IDE and OS files

### 3. Firebase Security Rules

**Current Status**: Not configured yet (should be done next!)

#### Firestore Rules (Recommended)

Edit in Firebase Console → Firestore Database → Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Public read access for portfolio projects
    match /case_studies/{document=**} {
      allow read: if true;
      allow write: if request.auth != null; // Only authenticated users can write
    }

    // Deny all other collections by default
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

#### Storage Rules (If Using Firebase Storage)

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true; // Public read for portfolio images
      allow write: if request.auth != null; // Only authenticated users can upload
    }
  }
}
```

## 📋 Security Checklist

### Before Committing Code

- [ ] Ensure `.env` file exists and contains all secrets
- [ ] Verify `.env` is listed in `.gitignore`
- [ ] Never hardcode API keys in source files
- [ ] Use environment variables: `import.meta.env.VARIABLE_NAME`
- [ ] Run `git status` to ensure no sensitive files are staged

### Before Deploying

- [ ] Set up Firebase Security Rules (see above)
- [ ] Enable Firebase Authentication if needed
- [ ] Review all API keys and rotate any that were exposed
- [ ] Set up Cloud Functions for sensitive operations (like Resend email)
- [ ] Enable Firebase App Check for additional security

### After Deployment

- [ ] Test that environment variables work in production
- [ ] Monitor Firebase Console for unusual activity
- [ ] Set up billing alerts to prevent abuse
- [ ] Enable 2FA on your Firebase account
- [ ] Review Firebase audit logs regularly

## 🔄 Managing Environment Variables

### Local Development
```bash
# .env file (already in .gitignore)
RESEND_API_KEY=re_your_key_here
```

### Firebase Cloud Functions
Set environment variables for functions:
```bash
firebase functions:config:set resend.api_key="your_key_here"
```

Access in functions:
```javascript
const apiKey = functions.config().resend.api_key;
```

### Firebase Hosting (Static Site)
Environment variables are **built into the static files** at build time:
- They cannot be changed without rebuilding
- Use `PUBLIC_` prefix for client-safe variables (Astro convention)
- Never put secrets in `PUBLIC_` variables

## 🚨 What to Do if Keys are Leaked

### If Resend API Key is Compromised:
1. Immediately go to [resend.com/api-keys](https://resend.com/api-keys)
2. Delete the compromised key
3. Generate a new key
4. Update your `.env` file
5. Redeploy if necessary

### If Firebase Keys are Leaked:
Firebase keys are public by design, but:
1. Review and tighten Security Rules
2. Enable Firebase App Check
3. Monitor usage in Firebase Console
4. Set up billing alerts

### If Git History Contains Secrets:
```bash
# Use BFG Repo-Cleaner or git filter-branch
# Or create a new repository and copy code (nuclear option)
```

## 📚 Best Practices

### API Key Storage

✅ **DO**:
- Use `.env` files for secrets (local development)
- Use Cloud Functions environment config (production)
- Use secret management services for large projects
- Rotate keys regularly

❌ **DON'T**:
- Hardcode keys in source code
- Commit `.env` files to Git
- Share keys in chat/email
- Use the same key across environments

### Access Control

✅ **DO**:
- Implement Firebase Security Rules
- Use Firebase Authentication for admin operations
- Enable App Check for production
- Use least-privilege principle

❌ **DON'T**:
- Leave databases open to public write
- Use admin SDK credentials client-side
- Trust user input without validation
- Skip authentication for sensitive operations

## 🔗 Resources

- [Firebase Security Rules](https://firebase.google.com/docs/rules)
- [Astro Environment Variables](https://docs.astro.build/en/guides/environment-variables/)
- [Firebase App Check](https://firebase.google.com/docs/app-check)
- [OWASP Security Guidelines](https://owasp.org/www-project-top-ten/)

---

**Remember**: Security is an ongoing process, not a one-time setup. Regularly review and update your security measures!
