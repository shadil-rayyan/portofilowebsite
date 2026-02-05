# 🚀 Portfolio Website Setup Guide

This guide will walk you through setting up this portfolio website from scratch. It is designed for beginners and will help you get your site live on **Netlify** or **Vercel** with a **Neon** database and **Firebase** authentication.

---

## 📋 Prerequisites

1.  **Node.js**: Install the latest LTS version from [nodejs.org](https://nodejs.org/).
2.  **GitHub Account**: To host your code and deploy.
3.  **Neon Account**: For your PostgreSQL database (free tier available at [neon.tech](https://neon.tech/)).
4.  **Firebase Account**: For Admin authentication (Google Login) at [firebase.google.com](https://firebase.google.com/).

---

## 🛠️ Step 1: Clone and Install

```bash
git clone <your-repo-url>
cd portofilowebsite
npm install
```

---

## 🗄️ Step 2: Database Setup (Neon)

1.  Go to [Neon.tech](https://neon.tech/) and create a new project.
2.  Copy your **Connection String** (it starts with `postgresql://...`).
3.  In your project root, create a `.env` file (copying `.env.example` if available) and add:
    ```env
    DATABASE_URL=your_neon_connection_string_here
    ```
4.  Push the schema to your database:
    ```bash
    npx drizzle-kit push
    ```

---

## 🔐 Step 3: Authentication Setup (Firebase)

1.  Go to [Firebase Console](https://console.firebase.google.com/) and create a new project.
2.  **Enable Google Auth**:
    *   Go to **Authentication** > **Sign-in method** > **Add new provider** > **Google**.
    *   Enable it and save.
3.  **Get Client Config**:
    *   Go to **Project Settings** (gear icon) > **General**.
    *   Scroll down to **Your apps** and add a **Web App**.
    *   Copy the `firebaseConfig` object and add these to your `.env`:
        ```env
        NEXT_PUBLIC_FIREBASE_API_KEY=...
        NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
        NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
        NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
        NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
        NEXT_PUBLIC_FIREBASE_APP_ID=...
        ```
4.  **Get Admin SDK Key**:
    *   Go to **Project Settings** > **Service accounts**.
    *   Click **Generate new private key**.
    *   Download the JSON file. **DO NOT SHARE THIS FILE.**
    *   Open the JSON, and add its content to your `.env` (you might need to escape newlines if using a single string, but the project is configured to read from `FIREBASE_ADMIN_SDK_KEY`):
        ```env
        FIREBASE_ADMIN_SDK_KEY='{"type": "service_account", ...}'
        ```

---

## 📦 Step 4: Import Initial Data

If you have existing data in the `src/data/*.json` files, you can migrate it to your database automatically:

```bash
npm run db:migrate-data
```

---

## 🌐 Step 5: Deployment

### Option A: Deploying to Netlify (Recommended)

1.  **Push to GitHub**: Ensure your code is on GitHub.
2.  **New Site on Netlify**: 
    *   Log in to [Netlify](https://app.netlify.com/).
    *   Click **Add new site** > **Import an existing project**.
    *   Connect your GitHub and select this repository.
3.  **Configure Build**:
    *   Netlify should auto-detect Next.js.
    *   Ensure the **Build command** is `npm run build`.
    *   Ensure the **Publish directory** is `.next`.
4.  **Add Environment Variables**:
    *   Go to **Site configuration** > **Environment variables**.
    *   Add all variables from your `.env` (DATABASE_URL, Firebase keys, etc.).
5.  **Deploy**: Click **Deploy site**.

### Option B: Deploying to Vercel

1.  Connect your GitHub repository to [Vercel](https://vercel.com/).
2.  Vercel will auto-detect the Next.js framework.
3.  Paste all your `.env` variables into the **Environment Variables** section during setup.
4.  Click **Deploy**.

---

## 🗃️ Step 6: Database Maintenance (Neon)

To keep your database schema up to date with the code:

```bash
npx drizzle-kit push
```

If you ever need to reset your data and re-migrate from JSON:

```bash
# WARNING: This might duplicate data if IDs are not unique
npm run db:migrate-data
```

## 🖥️ Step 6: Managing Your Content

1.  Visit your site URL and add `/admin` to the end.
2.  Log in with your Google account.
3.  **Fully Managed Dashboard**:
    *   **Blog**: Write articles in Markdown/MDX.
    *   **Projects**: Add your GitHub links and tech stacks.
    *   **Settings**: Update your name, roles, and bio via the JSON editor in the Settings tab.

---

## 🎨 Customization

*   **Colors**: Modify `src/app/globals.css` to change the theme colors.
*   **Fonts**: Update `src/app/layout.tsx` to use different Google Fonts.

Happy Coding! 🚀
