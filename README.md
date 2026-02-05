# 🚀 Shadil AM - Full Stack Portfolio (Pro Edition)

A high-performance, fully-managed personal portfolio website built with **Next.js 15**, **Neon PostgreSQL**, and **Firebase Auth**.

Check out the **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** for a detailed walkthrough on how to set this up for yourself!

## ✨ New Features
- **🏠 Fully Dynamic**: No more editing JSON files. Manage your entire site via a beautiful Admin Dashboard.
- **🔐 Admin Dashboard**: Secure Google Login using Firebase Authentication to manage your content.
- **✍️ Blog System**: Full-featured blog with Markdown/MDX support.
- **🗃️ Database Powered**: All projects, experience, education, and skills are stored in a Neon PostgreSQL database.
- **⚙️ Site Settings**: Update your profile name, roles, bio, and social links directly from the admin panel.
- **🌗 Modern UI**: Premium aesthetics with Glassmorphism, smooth animations, and tailored color palettes.

## 🛠️ Tech Stack
- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Database**: [Neon PostgreSQL](https://neon.tech/)
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/)
- **Auth**: [Firebase Authentication](https://firebase.google.com/) (Admin SDK)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [Shadcn UI](https://ui.shadcn.com/)

## 🚀 Getting Started

To get the site running locally:

1.  **Clone & Install**:
    ```bash
    git clone <your-repo-url>
    cd portofilowebsite
    npm install
    ```

2.  **Environment Variables**:
    Create a `.env` file and add your `DATABASE_URL` and Firebase keys (see `SETUP_GUIDE.md`).

3.  **Database Migration**:
    ```bash
    npx drizzle-kit push
    npm run db:migrate-data # Only if you want to import initial JSON data
    ```

4.  **Run Dev**:
    ```bash
    npm run dev
    ```

## 📖 Important Documentation
- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)**: How to set up Neon, Firebase, and deploy to Netlify/Vercel.
- **[ADMIN_GUIDE.md](./ADMIN_GUIDE.md)**: How to use the admin dashboard.

## 🛡️ License
MIT
