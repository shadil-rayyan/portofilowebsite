# Shadil AM - Full Stack Developer Portfolio

This repository contains the source code for my personal portfolio website, designed to showcase my skills, projects, and professional experience as a Full Stack Developer. The site is built with Next.js and Tailwind CSS, and it is deployed using GitHub Pages.

## ✨ Features

- **Responsive Design**: Fully responsive layout that looks great on desktops, tablets, and mobile devices.
- **Dynamic Content**: Project, experience, and education data are loaded from JSON files, making content updates easy.
- **Featured Projects**: A dedicated section on the homepage to highlight key projects.
- **All Projects Page**: A comprehensive page with filtering capabilities to browse all my work.
- **Detailed Project Views**: Each project has its own page with a long description, tags, and a link to the GitHub repository.
- **Interactive UI**: Smooth animations and transitions for a modern user experience.
- **Dark/Light Mode**: Theme toggling for user preference.
- **Automated Deployment**: The site is automatically deployed to GitHub Pages on every push to the `main` branch using GitHub Actions.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/guide/packages/lucide-react)
- **Deployment**: [GitHub Pages](https://pages.github.com/) & [GitHub Actions](https://github.com/features/actions)

## 🚀 Getting Started

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Shadil-rayyan/shadil-portfolio.git
    cd shadil-portfolio
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

    Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## 🔧 Configuration for GitHub Pages

Deploying a Next.js static export to GitHub Pages requires specific configuration. Here’s how it's set up in this project:

-   **`next.config.ts`**:
    -   `output: 'export'`: This enables the static HTML export feature of Next.js.
    -   `basePath` & `assetPrefix`: These are set dynamically based on whether the build is running in a GitHub Actions environment. This ensures that all assets (CSS, JS, images) are loaded correctly from the repository's subdirectory on GitHub Pages (e.g., `/shadil-portfolio/`).
    -   `images: { unoptimized: true }`: Next.js Image Optimization is not supported in a static export environment. This setting disables it to prevent errors.

-   **GitHub Actions Workflow (`.github/workflows/deploy.yml`)**:
    -   This workflow triggers on pushes to the `main` branch.
    -   It builds the Next.js application using `npm run build`.
    -   The resulting static files from the `out` directory are uploaded as a GitHub Pages artifact.
    -   A separate `deploy` job takes this artifact and deploys it to the `gh-pages` branch, making it live.
