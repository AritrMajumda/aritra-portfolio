# Aritra Majumdar - Portfolio Website

A modern, minimalist portfolio website showcasing expertise in Data Science, Quantitative Finance, Generative AI, and Blockchain technologies.

## Features

- **Responsive Design**: Mobile-first approach with breakpoints for tablet and desktop
- **Smooth Animations**: Scroll-triggered animations using GSAP and Intersection Observer
- **Dark Theme**: Professional dark theme with high-contrast typography
- **Accessibility**: WCAG AA compliant with semantic HTML and keyboard navigation
- **Performance**: Optimized for sub-3s load time with 60 FPS animations
- **SEO Optimized**: Semantic HTML structure with meta tags and structured data

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Animations**: GSAP, Lottie, Intersection Observer
- **Build Tool**: Vite
- **Fonts**: Goga (Regular, SemiBold)
- **Testing**: Vitest

## Project Structure

```
├── index.html              # Main HTML entry point
├── src/
│   ├── main.js            # Main entry point
│   ├── styles/
│   │   ├── main.css       # Main stylesheet with design tokens
│   │   └── components/    # Component-specific styles
│   │       ├── navbar.css
│   │       ├── hero.css
│   │       ├── services.css
│   │       ├── work.css
│   │       ├── about.css
│   │       ├── cta.css
│   │       ├── footer.css
│   │       ├── modal.css
│   │       └── animations.css
│   └── modules/           # JavaScript modules
│       ├── navigation.js
│       ├── hero.js
│       ├── scrollAnimations.js
│       ├── projectModal.js
│       ├── formHandling.js
│       └── performance.js
├── fonts/                 # Custom fonts
├── images/                # Project images
├── videos-work/           # Project videos
├── package.json
├── vite.config.js
├── postcss.config.js
├── vitest.config.js
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/aritramajumdar/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

The site will be available at `https://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build optimized production bundle
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality
- `npm run format` - Format code with Prettier
- `npm run test` - Run test suite with Vitest
- `npm run test:ui` - Run tests with UI dashboard

## Design System

### Color Palette

- **Background**: #0a0a0a (dark black)
- **Surface**: #1a1a1a (dark gray)
- **Text Primary**: #ffffff (white)
- **Text Secondary**: #b0b0b0 (light gray)
- **Accent Primary**: #00d4ff (cyan)
- **Accent Secondary**: #ff006e (magenta)

### Typography

- **Font Family**: Goga (Regular, SemiBold)
- **Heading Sizes**: 72px (H1), 48px (H2), 28px (H3)
- **Body Size**: 16px
- **Line Height**: 1.2 (headings), 1.6 (body)

### Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px+
- **Wide**: 1440px+
- **Ultra**: 1920px+

## Accessibility

The website is designed with accessibility in mind:

- Semantic HTML structure with proper heading hierarchy
- ARIA labels and roles for interactive elements
- Keyboard navigation support with visible focus indicators
- Color contrast ratios exceeding WCAG AA standards (4.5:1)
- Support for `prefers-reduced-motion` media query
- Alt text for all images
- Form labels associated with inputs

## Performance

- Page load time: < 3 seconds on 4G
- Animation frame rate: 60 FPS
- JavaScript bundle: < 150KB (gzipped)
- CSS bundle: < 50KB (gzipped)
- Images optimized with WebP format and lazy loading

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Deployment

The site can be deployed to:

- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

## Contact

- Email: aritramajumdar2005@gmail.com
- Phone: +91-9830336569
- LinkedIn: https://linkedin.com/in/aritra-majumdar
- GitHub: https://github.com/aritramajumdar

## License

MIT License - feel free to use this project as a template for your own portfolio.

## Acknowledgments

- Design inspired by juanmora.co
- Built with Vite, GSAP, and modern web standards
- Fonts: Goga by Aritra Majumdar
