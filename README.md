# Portfolio

This project is a modern single page portfolio built with **React** and **Vite**. It showcases various sections such as About, Projects and Contact with smooth scrolling interactions and 3D effects.

## Folder structure

```text
portfolio/
├── public/
│   └── assets/
├── src/
│   ├── components/
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── DarkModeToggle.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── Icon.jsx
│   │   ├── ProjectCard.jsx
│   │   └── Projects.jsx
│   ├── constants/
│   │   └── icons.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── tailwind.config.js
└── vite.config.js
```

## Build & deploy (Netlify)

1. Install dependencies
   ```bash
   npm install
   ```
2. Build the app
   ```bash
   npm run build
   ```
3. Push the repository to GitHub.
4. In Netlify, create a new site from Git. Choose your repository.
5. Set the build command to `npm run build` and publish directory to `dist`.
6. Deploy the site. Netlify will handle the build and host the output.

## Design choices

- **Dark/Light Theme:** `DarkModeToggle` auto‑detects system preference on first load and persists the user choice in `localStorage`. A subtle CSS fade transition makes switching themes smooth.
- **Lazy Loading:** Components are lazily loaded via `React.lazy` and wrapped in `React.Suspense` to reduce initial bundle size.
- **Routing & Metadata:** `React Router` enables future expansion into multiple pages, while `react-helmet` manages document metadata for better SEO.
- **Animations:** `Framer Motion` can be used for advanced animations. Existing 3D background and card tilts are powered by Three.js (via Vanta) and CSS transforms.

## Performance optimisations

- Only the initial route is loaded on first render; additional components are fetched lazily.
- Tailwind CSS purges unused styles in production for a lean bundle.
- Theme preferences are stored locally to avoid layout shift during hydration.

## Tech stack rationale

- **React + Vite** provide a fast development environment and efficient production builds.
- **Tailwind CSS** offers utility‑first styling with `dark` variants for theme support.
- **Framer Motion** (optional) and Vanta/Three.js create engaging interactions without a heavy footprint.
- **React Router** allows scalable routing, and **React Helmet** gives control over page metadata.
