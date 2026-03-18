# IEI Aurangabad Website

A modern, professional website for the Aurangabad division of The Institution of Engineers (India), built with React and TailwindCSS.

## Features

- ✨ **Animated Hero Section** - Slow-moving technical blueprint background
- 🎨 **Professional Design** - Clean, modern UI with exact color scheme
- 📱 **Responsive Layout** - Works perfectly on all devices
- ⚡ **Fast Performance** - Built with Vite for lightning-fast development
- 🎯 **Easy Navigation** - Intuitive menu structure

## Tech Stack

- **React 18** - Modern UI library
- **Vite** - Next-generation frontend tooling
- **TailwindCSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Lucide React** - Beautiful, consistent icons

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Header.jsx       # Top navigation and action buttons
│   ├── Hero.jsx         # Animated hero section
│   ├── SecondaryNav.jsx # Secondary navigation bar
│   └── Content.jsx      # Main content area
├── App.jsx              # Main app component
├── main.jsx             # Entry point
└── index.css            # Global styles with animations

```

## Color Palette

- **Primary Blue**: #1e3a8a
- **Cyan**: #06b6d4
- **Magenta/Pink**: #ec4899
- **Orange**: #f97316
- **Dark Gray**: #374151
- **Navy**: #1e40af

## Customization

You can customize the website by editing:
- Colors in `tailwind.config.js`
- Animation speed in `src/index.css`
- Content in component files
- Logo and branding in `src/components/Header.jsx`

## Notes

- The CSS lint warnings for `@tailwind` directives are normal and can be ignored
- Background animation runs continuously for a smooth, professional effect
- All sections are modular and easy to customize

---

**Developed for IEI Aurangabad Division**
