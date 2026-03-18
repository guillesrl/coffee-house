# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Coffee House** - A premium coffee shop landing page showcasing artisanal coffee experiences. This is a static website (HTML/CSS/JavaScript) with sophisticated GSAP animations and a luxury dark theme with gold accents.

**Technology Stack:**
- Pure HTML5 (no framework)
- CSS3 with custom properties (CSS variables)
- Vanilla JavaScript with GSAP 3.12.5 library (via CDN)
- No build step, no npm dependencies, no transpilation

## File Structure

```
/
├── index.html          # Main HTML structure with semantic markup
├── css/
│   └── style.css      # Complete design system (658 lines)
├── js/
│   ├── main.js        # Production animations and interactions
│   └── main-FIXED.js  # Alternative version with identified fixes
├── AGENTS.md          # Guidelines for AI agents (see below)
├── SKILL.md           # Design skill documentation
└── CLAUDE.md          # This file
```

## Development Workflow

### Running the Project
Since this is a static site with no build system:
- Open `index.html` directly in a browser
- Or use a simple HTTP server: `python3 -m http.server 8000` or `npx serve`
- No compilation or bundling required

### Testing Changes
- Edit `css/style.css` for styling changes
- Edit `js/main.js` for JavaScript/animations
- Refresh browser to see changes (hard refresh with Cmd+Shift+R to bypass cache)

## Design System (CSS Architecture)

### CSS Custom Properties (Variables)
All design tokens are defined in `:root` at `css/style.css:11-65`:
- **Spacing scale**: `--space-xs` through `--space-5xl` (non-linear progression)
- **Typography scale**: `--text-xs` through `--text-4xl` (responsive)
- **Color system**:
  - `--color-bg`: #0a0a0a (dark background)
  - `--color-accent`: #c9a66b (gold accent)
  - `--color-text`, `--color-text-secondary`, `--color-text-muted`
- **Fonts**: `--font-display` (Playfair Display), `--font-body` (Inter)
- **Shadows, border-radius, transitions** as reusable tokens

### Key CSS Patterns
- Mobile-first responsive design with media queries at 480px, 640px, 768px, 1024px
- Glassmorphism header with `backdrop-filter: blur(16px)`
- Grid layouts using CSS Grid (menu cards, about section)
- Accessibility: skip links, focus-visible states, reduced-motion support
- High contrast mode support with `@media (forced-colors: active)`

## JavaScript Architecture (main.js)

### Libraries
- **GSAP 3.12.5** (Core, ScrollTrigger, ScrollToPlugin) loaded from CDN
- No other dependencies

### Core Functionality (in order)
1. **Header scroll effect** (lines 7-22): Adds `.scrolled` class when scrolled past 100px
2. **Active navigation tracking** (lines 24-48): Updates active nav link based on scroll position
3. **Hero animations** (lines 50-107): Staggered entrance animations using `gsap.from()` and `gsap.to()`
4. **Section scroll animations** (lines 109-175): ScrollTrigger-based animations for content sections
5. **Smooth scroll** (lines 177-195): Intercepts anchor clicks, uses GSAP ScrollToPlugin
6. **Accessibility enhancers** (lines 197-205): Keyboard navigation for buttons
7. **Performance optimizations** (lines 230-245):
   - Respects `prefers-reduced-motion` (disables animations if set)
   - Pauses GSAP timeline when page is hidden (visibility API)

### Important Implementation Notes
- Animation initial states are **NOT** set in CSS (except for `.menu-card` opacity/transform at lines 431-432). GSAP handles initial states via `from()` calls.
- The `.about-image img` has CSS transitions (lines 385-388) that work alongside GSAP's `onComplete` callback (line 145-147) to add `.visible` class.
- Menu cards start with `opacity: 0` and `transform: translateY(40px)` in CSS; GSAP animates to visible at line 150-163 using `gsap.to()` (note: using `to` not `from`).
- There's a known difference between `main.js` and `main-FIXED.js` - review both if debugging animation issues.

## Design Guidelines (from AGENTS.md & SKILL.md)

This project follows the `designing-beautiful-websites` skill with these principles:

### Aesthetic Direction
- **Tone**: Luxury/refined with warmth and elegance - sophisticated but welcoming
- **Typography**: Playfair Display (display) + Inter (body) - no generic fonts
- **Color**: Dark theme (#0a0a0a) with warm gold accents (#c9a66b)
- **Motion**: Staggered entrance animations, scroll-triggered reveals, smooth hover states using GSAP
- **Spatial**: Generous spacing, asymmetric layouts, clear hierarchy
- **Visual Details**: Glassmorphism, subtle shadows, high-quality Unsplash imagery

### What to Avoid
- Generic "AI slop" aesthetics
- Overused fonts (Arial, Roboto) or default system fonts
- Predictable cookie-cutter layouts
- Losing the luxury/premium feel

## Browser Support & Accessibility

- Modern browsers (ES6+, CSS Grid, `backdrop-filter`, `IntersectionObserver`)
- Accessibility features: skip links, ARIA labels, keyboard navigation, focus management
- Respects `prefers-reduced-motion` for motion sensitivity
- Lazy loading images with `loading="lazy"` attribute

## Common Tasks

### Adding a new menu item
1. Add `<article class="menu-card">` in `index.html` inside `.menu-grid` (lines 69-127)
2. Follow the existing schema.org Product markup pattern
3. Images should be from Unsplash with `loading="lazy"`
4. No CSS changes needed (grid auto-fit handles layout)

### Modifying animations
- All GSAP animations are in `js/main.js` - adjust duration, delay, stagger values
- For new scroll-triggered elements, follow the pattern at lines 110-175
- Use `gsap.context()` if you need to scope animations (not currently used)

### Adjusting colors
- Edit CSS custom properties in `css/style.css:11-44` - all colors are centralized
- Primary accent: `--color-accent: #c9a66b` (dark variation available)

### Responsive design changes
- Breakpoints are defined as media queries at lines 412-595 in style.css
- Mobile-first approach: base styles apply to all, overrides in `@media` blocks
- Navigation collapses at 768px (hamburger menu NOT implemented - only hides nav links)

## Known Issues & Considerations

- **Mobile navigation**: Currently hidden at 768px, but no mobile menu toggle implemented. Consider adding if needed.
- **Image lazy loading**: JavaScript IntersectionObserver is implemented (lines 207-228) but not actively used since images use native `loading="lazy"`. Could be removed or used for a custom solution.
- **Menu card visibility**: CSS sets initial state (opacity:0, translateY(40px)), GSAP uses `gsap.to()` to animate. This works but is unconventional - typically `gsap.from()` would be used. Be careful not to duplicate animations.
- **No build optimization**: All assets are loaded as-is. For production, consider image optimization, minification, and caching headers.
- **External CDN dependencies**: GSAP loaded from cdnjs. Site won't work offline or if CDN is blocked.

## Code Style

- **HTML**: Semantic elements, indentation 2 spaces, meaningful class names (BEM-ish)
- **CSS**: One-level indentation for rules, consistent ordering (position → display → box → typography → color → transition)
- **JavaScript**: 2-space indentation, descriptive variable names, console.log at end for debugging
- Comments in English despite Spanish content

## Testing Checklist

Before committing changes, verify:
- [ ] Page loads without JavaScript errors (check console)
- [ ] Animations work on desktop (hero, scroll triggers)
- [ ] Header becomes opaque on scroll (after 100px)
- [ ] Navigation links highlight correctly based on scroll position
- [ ] Smooth scroll works on nav link clicks
- [ ] Responsive layout works at 1024px, 768px, 640px, 480px
- [ ] Buttons are keyboard-focusable (Tab key)
- [ ] Reduced motion preference respected (test: macOS System Settings → Accessibility → Display → Reduce motion)
- [ ] Images load correctly (Unsplash URLs valid)

---

**Remember**: This is a static showcase site. Keep it simple, maintain the luxury aesthetic, and avoid over-engineering.
