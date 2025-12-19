# SCYLC Fellowship Website

A modern, animated Next.js website for the South Central Youth Leadership Coalition Fellowship. This site features scroll-driven animations, interactive sections, and a responsive design.

## Features

- **Hero Section** - Animated headline with letter-by-letter reveal
- **Story Section** - Character-by-character text animation
- **Who We Are** - Scroll-driven converge animation with bio cards
- **Puzzle Quote Section** - Interactive character reveal animation
- **Fellowship Details** - Parallax image effects and letter animations
- **Topics Section** - Dynamic color transitions and topic listings
- **Responsive Sidebar Navigation** - Theme-aware navigation that adapts to section colors
- **Fully Responsive** - Optimized for desktop, tablet, and mobile devices

## Tech Stack

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **CSS Modules** - Scoped styling
- **Google Fonts** - DM Sans & Anton fonts

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd scylc-nextjs
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
scylc-nextjs/
├── public/
│   └── images/
│       └── who-we-are/     # Image assets
├── src/
│   ├── app/
│   │   ├── globals.css     # Global styles and CSS variables
│   │   ├── layout.tsx      # Root layout with fonts
│   │   ├── page.tsx         # Main page component
│   │   └── page.module.css # Page-specific styles
│   └── components/
│       ├── Sidebar.tsx      # Navigation sidebar component
│       └── Sidebar.module.css
└── package.json
```

## Image Assets

Place the following images in `public/images/who-we-are/`:
- `SCYLCF_WH3.webp` - Quote section image
- `Nalleli headshot 1.webp` - Nalleli Cobo bio image
- `Monic_speakershot.webp` - Monic Uriarte bio image
- `NC_Standingfist.webp` - Fellowship details section image

## Color Scheme

The site uses a consistent color palette defined in CSS variables:
- **Teal**: `#007C8A`
- **Coral**: `#D94435`
- **Sun**: `#F7C948`
- **Base**: `#0D0D0D`
- **Surface**: `#FFFFFF`
- **Ink**: `#1B1B1B`

## Development

### Key Animations

- **Scroll-driven animations** - Many sections use scroll position to drive animations
- **Letter-by-letter reveals** - Headlines and text animate character by character
- **Parallax effects** - Images move at different speeds during scroll
- **Color transitions** - Sections change background colors based on scroll position

### Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Deployment

This project can be deployed on:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **Any Node.js hosting service**

For Vercel deployment:
```bash
npm install -g vercel
vercel
```

## License

Private - All rights reserved

## Contact

For questions about the SCYLC Fellowship, visit [info@scylcfellowship.org](mailto:info@scylcfellowship.org)
