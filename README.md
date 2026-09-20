# Brookwell Harmony School — Website

React + TypeScript + Vite + Framer Motion.

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually http://localhost:5173).

To build for production:

```bash
npm run build
npm run preview
```

> This project was written in an offline container without network
> access, so `npm install` has not been run or verified here. The
> code is written to standard, current APIs for React 18, Vite 5,
> TypeScript 5 and Framer Motion 11 — run `npm install` locally and
> let me know if anything needs adjusting.

## Structure

```
src/
  components/       one component + one co-located CSS file per section
  data/school.ts     all real school content (contact info, values, card
                      copy, image list) — edit this file to update content
                      without touching component code
  styles/global.css  design tokens (colors, fonts, spacing) and resets
public/
  assets/images/     the real Brookwell photographs, mapped to the
                      filenames referenced in the project brief
```

Each section (`Header`, `Hero`, `About`, `Values`, `Academics`,
`WhyBrookwell`, `LifeAtBrookwell`, `Gallery`, `Lightbox`, `Testimonials`,
`Admissions`, `Contact`, `Footer`, `WhatsAppButton`) is an independent
component so any one of them can be redesigned or replaced later
(e.g. swapping the Gallery for a circular gallery, or adding new
scroll/text-reveal effects) without touching the rest of the site.

## Image mapping

The nine supplied photographs were mapped to the asset names used in
the design brief, based on their content:

| Brief filename            | Source upload                  |
|----------------------------|---------------------------------|
| hero-parade.jpg            | IMG-20260906-WA0002_1_.jpg      |
| community-tent.jpg         | IMG-20260906-WA0003_1_.jpg      |
| traditional-dance.jpg      | IMG-20260906-WA0004_2_.jpg      |
| swimming.jpg                | IMG-20260906-WA0005_1_.jpg      |
| school-outing.jpg          | IMG-20260906-WA0006_2_.jpg      |
| early-years-circle.jpg     | IMG-20260906-WA0007_1_.jpg      |
| ballet-performance.jpg     | IMG-20260906-WA0008_2_.jpg      |
| group-dance.jpg            | IMG-20260906-WA0009_1_.jpg      |
| community-event.jpg        | IMG-20260906-WA0010_1_.jpg      |

No `group-dance.jpg` or `community-tent.jpg` is currently referenced
in a section, but both are included in the Gallery. If you'd rather
swap which photo represents which moment, just update the `image`
field in `src/data/school.ts` or `galleryImages`.

## Content policy

No school facts (history, accreditation, results, testimonials,
statistics) have been invented. Testimonials shows an honest
placeholder state until real parent quotes are provided. The
admissions form has no backend — submitting it opens the user's email
client with a pre-filled message to
brookwellharmonyschoolnanyuki@gmail.com.

## Accessibility & motion

- Semantic landmarks, heading order, alt text on every photograph.
- Keyboard support and focus states throughout, including full
  keyboard navigation (Escape, arrow keys) in the Gallery lightbox.
- `prefers-reduced-motion` is respected globally (global.css) and
  specifically in the Life at Brookwell scroll stack, which swaps to a
  static stacked layout when reduced motion is requested.

## Infinite Image Field (Gallery)

`src/components/InfiniteImageField.tsx` (+ `.css`) is a reusable, canvas-based
component that tiles a list of image URLs across an endlessly-panning field:

- Desktop: hover moves the "camera" like a joystick (position relative to
  center controls direction/speed), easing via `smoothing`.
- Touch: dragging pans the field directly (1:1 with the finger); when idle,
  a slow constant drift keeps it visually alive instead of sitting static.
- `prefers-reduced-motion`: the animation loop never starts — a single
  static frame is drawn once and left alone.
- Deterministic tiling: each grid cell's image is chosen by a hash of its
  column/row, so the pattern is stable across re-renders/resizes rather
  than reshuffling.
- High-DPI aware (capped at 2x to control cost), resizes via
  `ResizeObserver`, cleans up its `requestAnimationFrame` loop and all
  listeners on unmount.

It's wired into `Gallery.tsx` as the primary visual, using the same
`galleryImages` data the site already had. Clicking/tapping a tile calls
back with that image's `src`, which `Gallery.tsx` resolves against
`galleryImages` to open the **existing** `Lightbox` at the right index — no
new lightbox logic was written.

**Accessibility note:** a `<canvas>` can't expose individual clickable
regions to assistive tech, so the field itself is marked
`role="img"`/`aria-hidden` on its canvas (decorative/bonus interaction
only). The original masonry grid — fully keyboard-navigable buttons, real
`alt` text, captions, and the same lightbox with arrow-key/Escape support —
is preserved underneath as "All photographs," so no functionality or
keyboard path was lost; the canvas is additive, not a replacement of the
accessible experience.

No dependencies were added — the component uses only the Canvas 2D API,
React hooks, and Pointer Events, all already available.

## Known follow-ups

- Verify the Google Maps embed in `Contact.tsx` once an exact
  address/pin is available (it currently centers on "Nanyuki, Kenya").
- Add real parent testimonials to `Testimonials.tsx` when available.
- `npm install` / `npm run build` have not been run in this
  environment (no network access) — please run them locally as a
  first step.
