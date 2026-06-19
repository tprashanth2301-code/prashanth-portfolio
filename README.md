# Prashanth Terupelli - Professional Portfolio

A high-performance, professional portfolio website built with modern technologies, featuring a dark theme with cyan and purple accents, smooth animations, and optimized for Vercel deployment.

## 🚀 Features

- **Modern Tech Stack**: React 19, TypeScript, and Tailwind CSS 4.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop.
- **Dynamic Content**: Sections for Hero, About, Skills, Experience, and Contact.
- **Interactive UI**: Smooth scroll animations, hover effects, and toast notifications.
- **Backend Integration**: Express + tRPC for contact form handling.
- **Optimized Deployment**: Configured for seamless deployment on Vercel.

## 🏗 Project Structure

```text
prashanth-portfolio/
├── client/           # Frontend (React + Vite)
│   ├── src/
│   │   ├── pages/    # Main portfolio sections
│   │   ├── components/ # UI components
│   │   └── index.css # Global styles & theme
├── server/           # Backend (Express + tRPC)
│   ├── routers.ts    # API endpoints
│   └── email.ts      # Email logic
├── drizzle/          # Database schema
└── shared/           # Shared types & constants
```

## 🛠 Installation & Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/tprashanth2301-code/prashanth-portfolio.git
   cd prashanth-portfolio
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Run the development server**:
   ```bash
   pnpm run dev
   ```

## 📦 Deployment

This project is optimized for **Vercel**. Simply connect your GitHub repository to Vercel, and it will automatically build and deploy the project using the provided `vercel.json` configuration.



---
Crafted with passion by **Prashanth Terupelli**
