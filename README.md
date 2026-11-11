# orbit — AI Learning Studio

Standalone React landing page for practical AI and digital-skills programmes for students and young professionals in India. This project contains **orbit only**; it does not include Practo for Animals.

## Run locally

Requirements: Node.js 20.19+ or 22.12+ and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

Build and preview:

```bash
npm run build
npm run preview
```

## Design direction

The page uses a monochrome **Graphite** visual system with Instrument Serif headlines, Inter body copy, generous negative space, tonal panels, hairline borders and subtle film grain. The `orbit` wordmark is paired with an orbit icon.

The hero uses a procedural animated graphite contour field on canvas and a CSS pearl sphere. The contour field pauses when offscreen and becomes static for reduced-motion users. The four-step onboarding section uses stacked V-cut / chevron panels with individual SVG tonal artworks and right-edge step navigation.

## Sections and interactions

- Hero with pearl sphere, contour waves, orbital tool labels, batch/demo learner note, CTAs and a five-point programme-value strip.
- Four interactive chevron onboarding panels and a learner-login explanation.
- Six practical outcomes and three audience cards.
- Scroll-pinned Orbit learning principles.
- Three programme cards with demo durations and fees.
- Week-by-week curriculum accordions and a tools marquee.
- Sample project cards, instructor placeholder and clearly labelled demo testimonials.
- Demo batch/pricing panel, seats-interest meter, FAQ accordion and final enquiry CTA.
- Two-step enquiry modal with Indian mobile and email validation, loading state, demo thank-you state, WhatsApp placeholder link and syllabus download.
- Lighter name/email syllabus capture, local React state logging, Lenis smooth scroll, Framer Motion scroll/section animations, scroll progress, scroll-aware navbar and mobile sticky actions.

## Mock information and real integrations

**Mock:** prices, early-bird prices, batch dates, cohort/seat-interest indicators, active learner count, instructor information, testimonials, sample projects and all form submissions. Form records exist only in local React state and are logged to the browser console; there is no server-side storage.

**Needed for a real launch:** approved programme schedule and terms, real instructor biography/photo, secure lead storage, Google Sheets or CRM integration, WhatsApp and email confirmation automation, official community invite, follow-up workflow, payment processing and learning-platform account creation/onboarding.

The interface explicitly explains that a learner account/login would be shared only after confirmed enrolment. The demo page does not create accounts or process payments.

## Main files

```text
src/App.jsx                       Page sections and interactions
src/styles.css                    Graphite tokens, layout, responsive styles and motion
src/components/SilkWaves.jsx      Procedural contour-wave canvas for the hero
public/orbit-demo-syllabus.html   Downloadable illustrative syllabus
```
