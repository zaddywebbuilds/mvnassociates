# MNV Associates Homepage Concept

A premium homepage concept for MNV Associates, a Dubai based tax and advisory firm. The concept combines professional services clarity with an immersive editorial design system and restrained 3D interaction.

Built as a proof of work assignment.

## The idea

Most advisory firms online look competent and forgettable. The brief here was to produce something a reviewer opens and immediately reads as "far beyond the usual test submission", while still communicating what MNV actually does within seconds.

The approach is roughly:

- 70% sophisticated professional services design
- 20% architectural and editorial design
- 10% experimental 3D

3D is treated as a high value accent, not as the website.

### The MNV Orbital Ring

The page is built around one recurring motif: a dimensional ring representing connection, continuity and MNV sitting at the centre of several advisory disciplines.

It carries a small piece of visual storytelling. In the hero the ring is **open**, an unfinished arc. In the closing section it returns **complete**. The intent is progression and growth, stated quietly rather than spelled out.

The ring is built from crossing planes at different attitudes rather than concentric circles facing the viewer, because flat circles read as drawn graphics while crossing planes read as a built object.

### Page rhythm

Sections alternate deliberately between high impact and calm so the page breathes:

| Section | Register |
| --- | --- |
| Hero | Impact |
| Trust strip | Calm |
| Services orbital | Impact |
| Clarity statement | Calm, dramatic |
| Why MNV | Calm, architectural |
| Stats story | Editorial impact |
| Insights | Calm, editorial |
| Contact | Impact |

## Tech

- Next.js (App Router) and React
- TypeScript
- Tailwind CSS
- Framer Motion
- Three.js with React Three Fiber and Drei

## Running locally

```bash
npm install
npm run dev
```

Production:

```bash
npm run build
npm start
```

Deployment target is Vercel.

## Performance and accessibility notes

The page carries visual effects but is built to stay fast and usable.

- WebGL is dynamically imported and never blocks first render.
- Each ring canvas pauses rendering entirely when it is outside the viewport.
- Quality tiers scale device pixel ratio, geometry segments and detail by screen size, CPU cores and device memory.
- Reflective surfaces use polished rather than mirrored materials. A fully metallic surface in a sparse environment reflects black, which is what makes most WebGL accents look cheap.
- If WebGL is unavailable or the scene throws, an error boundary swaps in a drawn SVG ring that matches the composition, so the layout never breaks.
- The services orbital is DOM and SVG, not WebGL, so the labels stay crisp, selectable and keyboard reachable. On small screens it becomes an accordion rather than being squeezed.
- No information exists only inside a 3D object.
- Semantic landmarks, a single H1, visible focus states, `aria-expanded` on the accordion, descriptive alt text and a skip link.
- `prefers-reduced-motion` is respected, including the scroll reveals, the magnetic buttons and the ring drift.
- Scroll reveals are driven by IntersectionObserver with a `noscript` fallback that shows all content if JavaScript is unavailable.

## Deliberate decisions

A few judgement calls worth flagging:

- **Nothing is fabricated.** No invented office address, phone number, email, client logos, testimonials, awards, certifications or article dates. The footer lists the city only. Structured data includes just the facts given in the brief.
- **Navigation anchors resolve.** The nav was reduced to sections that actually exist on this page rather than linking to pages that do not, which would be a dead link in a reviewed submission.
- **Imagery is checked in, not hotlinked.** Photography is bundled into `public/images` so the build is self contained with no runtime dependency on a third party host. Images are from Unsplash under the Unsplash licence. Conventional corporate stock, handshakes, staged boardrooms and high fives, was deliberately rejected in favour of architectural and abstract geometry.
- **Gilroy is not bundled.** It is not freely licensable, so Manrope is used as the specified fallback. Swapping in a licensed Gilroy is a one line change in `src/app/layout.tsx`.

## Structure

```
src/
  app/            layout, page composition, design tokens
  components/     section components and UI primitives
    three/        the WebGL scene
  data/           services and insights content
  hooks/          motion preferences and viewport observers
public/images/    photography
```

Content lives in `src/data` rather than inline in components, so copy can be edited without touching layout.
