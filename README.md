# Josué Vilches Castro · Portfolio

A responsive Spanish-language portfolio built with React, Vite, JavaScript, and modern CSS. The initial content focuses on Data Analytics, Business Intelligence, Power BI, Machine Learning, and software development.

## Local development

Use Node.js 22.13+ (22.x) or 24+ and npm.

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite. No environment variables or external accounts are required.

```sh
npm run lint
npm run build
npm run preview
```

`npm run build` creates the production site in `dist/`. Deploy that directory to a static host. For deployment under a subdirectory, configure Vite's `base` option and adjust public asset references. A custom domain, canonical URL, and absolute Open Graph image URL should be added once the hosting address is known.

The build also prerenders the existing React components into HTML with `scripts/prerender.js`. Production content and anchor navigation remain available if JavaScript is disabled or fails to download. React hydrates this markup to enable interactions; the development server still renders on the client.

## Architecture

- `src/data/portfolio.js`: profile, projects, education, professional experience, contact channels, and CV.
- `src/data/copy.js`: Spanish interface copy, structured by locale for future translation.
- `src/components/`: navigation, project cards, conceptual SVG graphics, and footer.
- `src/sections/`: the page's main content sections.
- `src/styles/index.css`: design tokens, layouts, responsive rules, focus states, and reduced motion.
- `src/styles/motion.css`: finite reveal animations, SVG motion, project interactions, and progressive-enhancement fallbacks.
- `src/hooks/`: shared reveal observer, fine-pointer artwork tilt, and scroll position tracking.
- `public/`: static assets, including the favicon and a future CV PDF.
- `tests/portfolio.spec.js`: browser checks for navigation, responsive overflow, runtime errors, reduced motion, and WCAG A/AA automated accessibility checks.
- `tests/motion.spec.js`: active navigation, scroll progress, reveal lifecycle, pointer capabilities, reduced motion changes, and HTML without JavaScript.

The interface uses locally bundled Manrope fonts. It does not request remote fonts, use analytics, or submit personal data. Project graphics are labeled conceptual illustrations; they do not represent measured outcomes or actual project screenshots.

## Interaction system

Reveal groups are marked with `data-reveal="group"` and observed once by a shared `IntersectionObserver`. Content is visible by default; entering the viewport triggers a short opacity/translate animation and releases the observer target. Keyboard focus cancels a group's reveal. The SVG artwork uses the same observer with finite, restrained node and icon animations.

Artwork tilt is limited to 1.5 degrees per axis on hovering fine-pointer devices and mouse events. Pointer movement and scrolling schedule at most one pending animation frame, with no idle render loop. Scroll progress updates a transform directly; React state changes only when the active section changes. Section offsets and document height are cached and remeasured after resize or content-size changes. Effects remove their listeners, observers, and pending frames on cleanup.

Reduced motion disables reveals, SVG animation, tilt, hover translation, and the decorative scroll progress line, including when the preference changes while the page is open. Active navigation and keyboard focus remain functional. Cards do not gain artificial tab stops; focus styles apply to their optional links and detail controls. Touch devices retain static card interactions.

## Content handoff

Only supplied personal facts and project categories are represented. No employment history, project metrics, technology stacks, institutions, dates, or contact URLs have been invented.

Update `src/data/portfolio.js` to add confirmed details:

| Field                                          | Expected value                                                                   | Behavior when absent              |
| ---------------------------------------------- | -------------------------------------------------------------------------------- | --------------------------------- |
| `email`                                        | Confirmed email address                                                          | Email action hidden               |
| `cv`                                           | Path to an actual PDF in `public/`                                               | Download actions hidden           |
| `socialLinks`                                  | Objects with `label` and `href`                                                  | Social links hidden               |
| `education.institution`, `education.period`    | Official institution and dates                                                   | Fields hidden                     |
| `experience`                                   | Objects with `id`, `role`, optional `organization` / `period`, and `description` | Academic project experience shown |
| Project `objective`, `contribution`, `outcome` | Verified short descriptions                                                      | Detail disclosure hidden          |
| Project `technologies`                         | Verified technology names                                                        | Technology list hidden            |
| Project `links`                                | Objects with `label` and real `href`                                             | Project actions hidden            |
| Project `image`                                | Object with `src` and meaningful `alt`                                           | Conceptual illustration shown     |

Project `tags` describe the provided categories; they do not assert a specific implementation stack. Visible interface text lives in `copy.es`; translated profile/project fields can be selected alongside a future `copy.en`. Keep `index.html` title, description, language, and Open Graph metadata aligned when changing identity or language.

Needed before a complete public release: preferred contact channel, CV, official degree/institution wording and dates, verified project contributions/results/stacks, screenshots, and any repository/demo URLs. The site itself builds as a deployable static foundation without these fields.

## Browser validation

```sh
npx playwright install chromium
npm run build
npm run test:e2e
```

Playwright starts a local production preview automatically. Tests cover 360, 390, 768, 1024, and 1440 px widths, plus desktop/mobile screenshots in the ignored `test-results/` directory. Automated accessibility checks complement manual visual review; they are not a full accessibility certification.

## Git workflow

Use `feature/*`, `fix/*`, or `docs/*` branches based on `develop`. Run lint, build, and relevant browser checks before merging into `develop`. Promote a verified release to `main`. See `AGENTS.md` for the complete project conventions.
