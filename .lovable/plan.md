

## Plan: Remove All Money/Cost References & Add Country Flags + Auto-Slideshow

### What changes

**1. Remove all cost/money references**

- **`src/data/universities.ts`**: Remove `cost` field from `Program` interface and from all program data entries
- **`src/pages/Index.tsx`**: Remove the `program.cost` display in the Popular Programs section (lines 172-174)
- **`src/pages/CountryPage.tsx`**: Remove any cost display in program cards
- **`src/pages/UniversityPage.tsx`**: Remove any cost display in program listings

**2. Replace university initials/icons with country flags**

The universities already use `countryFlag` emoji (e.g. 🇫🇷, 🇬🇧) in their display across all pages. The user likely wants actual flag images instead of emoji. We'll replace the emoji flag boxes with small flag images using a country code-to-flag-image approach (using `flagcdn.com` or similar CDN for real flag images rendered as `<img>` tags).

Files affected: `Index.tsx`, `UniversityPage.tsx`, `CountryPage.tsx`, `SearchPage.tsx`, `MobileNav.tsx`, `StudentStoriesPage.tsx` — everywhere `countryFlag` emoji is rendered.

**3. Auto-slideshow for Popular Destinations on Home page**

- **`src/pages/Index.tsx`**: Replace the static horizontal scroll of popular countries with an auto-sliding carousel using `useEffect` + `setInterval` that auto-advances every 3 seconds, with smooth CSS transition. Will use `embla-carousel-react` (already installed via the carousel component) with autoplay, or a simpler CSS/state-based approach with `translateX` animation.

### Technical details

- Flag images via `https://flagcdn.com/w40/{countryCode}.png` mapped from country IDs (uk→gb, japan→jp, etc.)
- Add a `countryCode` mapping utility in `src/lib/utils.ts` for ISO 2-letter codes
- Auto-slideshow: use `useEffect` with interval, cycling through countries with `motion.div` or CSS `transition: transform` for smooth sliding
- Pause auto-slide on hover/touch

