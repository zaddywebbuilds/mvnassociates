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

In the hero the ring appears as a **filmed installation**, a physical sculpture on a terrace above the Dubai skyline. It returns at the close of the page as a **complete** WebGL ring. The hero version is open and physical, the closing one abstract and resolved.

The hero clip is a palindrome, forward then reversed, so the slow orbit loops without a visible cut back to its opening angle. It carries no audio track, is marked decorative, does not autoplay under `prefers-reduced-motion`, and is not loaded below the tablet breakpoint where the hero is deliberately type led.

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

## The environment system

The page is not a stack of coloured sections. It is one dark, lit environment that the content travels through, with two deliberate light breaks for rhythm and for comfortable long-form reading.

The lighting comes from the brand renders themselves. Crops of the reflective floor and light-pool regions are blurred, darkened on a linear ramp so highlights survive, and composited with `screen` over the dark base. Their shadows contribute nothing and only the highlights carry through, so a plate reads as light falling into a room rather than as a photograph sitting behind the text. Every plate is feathered; a plate with a hard edge reads as a pasted rectangle and undoes the point.

Three pieces make up the system, in `src/components/env/Ambient.tsx`:

- `Ambient` places a pool of light from one of three plates
- `LightSpill` bleeds a soft radial across a section boundary so zones run into each other
- `EdgeLight` catches a hairline along a section lip, the way light catches stone

Theming is semantic rather than per-component. The page is dark by default and `.on-light` flips `--fg`, `--fg-soft`, `--rule` and `--accent-eyebrow` for the two breaks, so no component needs to know which ground it is sitting on. Accent colour goes through `--accent-eyebrow`, which resolves to lavender on dark and MNV purple on light, because the brand purple is too dark to read as text on the dark base.

## Tech

- Next.js (App Router) and React
- TypeScript
- Tailwind CSS
- Framer Motion

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

## Deployment

The site deploys to GitHub Pages from `main` via GitHub Actions, so the whole thing lives in this one repository with no external host.

Live: https://zaddywebbuilds.github.io/mvnassociates

GitHub Pages serves static files from a project subpath, so that build runs with `GITHUB_PAGES=true`, which switches Next into static export, sets the base path and turns off the image optimizer. Local development and any Node host keep the optimizer, so the flag is opt in rather than permanent.

To reproduce the Pages build locally:

```bash
GITHUB_PAGES=true NEXT_PUBLIC_BASE_PATH=/mvnassociates npm run build
```

Because the optimizer is off in that mode, `next/image` emits `src` untouched, so image paths go through a small `asset()` helper that prepends the base path. Photography is pre-converted to WebP at the sizes it actually renders, which is why losing the optimizer costs very little here.

Deploying to Vercel instead needs no changes: leave `GITHUB_PAGES` unset and the optimizer comes back automatically.

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
- **Imagery is cropped from the supplied art, not used whole.** The source comps arrived as full section mockups with headlines, buttons and UI baked into the pixels. Baked text cannot be selected, translated or reflowed, and it would have collided with the live HTML headlines, so each image was cropped to its clean photographic region instead. The derived WebP set is bundled into `public/images`, roughly 460KB in total, so the build is self contained with no runtime dependency on a third party host. The original comps stay out of the repo.
- **Gilroy is not bundled.** It is not freely licensable, so Manrope is used as the specified fallback. Swapping in a licensed Gilroy is a one line change in `src/app/layout.tsx`.

## Structure

```
src/
  app/            layout, page composition, design tokens
  components/     section components and UI primitives
    env/          the lighting system
  data/           services and insights content
  hooks/          motion preferences and viewport observers
public/images/    photography
```

Content lives in `src/data` rather than inline in components, so copy can be edited without touching layout.
