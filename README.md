# Pizza for a Cause - NuxtJS Charity Landing Page

A NuxtJS application for a charity pizza event raising funds for Adventure Quest World Club.

## Features

- **Modern NuxtJS 3 Architecture** - Built with the latest NuxtJS 3 framework
- **Responsive Design** - Fully responsive layout that works on all devices
- **Component-Based Structure** - Clean, modular Vue components
- **Interactive Functionality** - Add-to-cart, form validation, smooth scrolling
- **SEO Optimized** - Proper meta tags and semantic HTML
- **Performance Optimized** - Efficient code splitting and lazy loading

## Project Structure

```
pizza-charity-nuxt/
├── assets/
│   └── css/
│       └── main.css          # Global CSS styles
├── components/               # Reusable Vue components
│   ├── Header.vue
│   ├── HeroSection.vue
│   ├── AboutSection.vue
│   ├── MenuSection.vue
│   ├── CauseSection.vue
│   ├── ContactSection.vue
│   └── Footer.vue
├── pages/                    # NuxtJS pages
│   └── index.vue             # Main landing page
├── app.vue                   # Root application component
├── nuxt.config.ts            # NuxtJS configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── package.json              # Project dependencies
└── README.md                 # This file
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone or download this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
npm run preview
```

## Technology Stack

- **Framework**: NuxtJS 3
- **Styling**: Tailwind CSS + Custom CSS
- **Fonts**: Google Fonts (Poppins, Playfair Display)
- **Icons**: Font Awesome
- **State Management**: Vue 3 Composition API

## Customization

### Updating Content

- **Menu Items**: Edit the `pizzas` array in `components/MenuSection.vue`
- **Event Details**: Update content in `components/ContactSection.vue`
- **Charity Information**: Modify `components/CauseSection.vue`
- **Colors**: Adjust colors in `tailwind.config.js` and `assets/css/main.css`

### Adding New Sections

1. Create a new Vue component in the `components/` directory
2. Import and add it to `pages/index.vue`
3. Add appropriate styling in `assets/css/main.css`

## Deployment

This NuxtJS application can be deployed to any static hosting service:

- **Vercel**: Automatic deployment with GitHub integration
- **Netlify**: Drag and drop deployment or GitHub integration
- **GitHub Pages**: Use `npm run generate` and deploy the `dist/` folder
- **Any static hosting**: Build with `npm run generate` and upload the `dist/` folder

## License

This project is open source and available under the MIT License.

---

**Pizza for a Cause** ❤️ Supporting Adventure Quest World Club