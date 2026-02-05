# 🖥️ Admin Dashboard Guide

Welcome to your new portfolio management system! This guide explains how to use the Admin Dashboard located at `/admin`.

## 🔑 Logging In
1.  Navigate to `yoursite.com/admin`.
2.  Cloud Google Sign-In.
3.  Currently, the system allows specific authenticated users (configured in `src/lib/actions.ts`).

## 📑 Sections

### 1. Dashboard
An overview of your content counts. Quick links to create new posts or projects.

### 2. Blog Posts
-   **Create**: Use the "New Post" button. Supports Markdown/MDX.
-   **Edit**: Click the pencil icon. Changes the slug and content.
-   **Draft/Publish**: Use the toggle switch to hide or show posts on the frontend.

### 3. Projects
-   Add your latest work, including GitHub and Demo links.
-   Add technologies as comma-separated values (e.g., `React, Node.js, Postgres`).

### 4. Experience & Education
-   Keep your professional and academic timeline up to date.
-   Entries are sorted by creation date (newest first).

### 5. Skills
-   Manage the technical skills displayed in the "What I Do" section.
-   Use icons like `Code`, `Server`, `Database`, and `Smartphone`.

### 6. Settings
-   This section contains the core identity of your site.
-   **Hero**: Edit the JSON to change your name, roles, and main description.
-   **Footer**: Update your email and social media handles.

## 💡 Pro Tips
-   **Images**: For now, use URL links to images hosted elsewhere (e.g., Imgur, Cloudinary).
-   **Markdown**: The blog editor supports standard Markdown syntax.
-   **SEO**: Ensure your project slugs are descriptive for better search engine ranking.
