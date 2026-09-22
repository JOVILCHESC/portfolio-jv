# Josué Vilches Castro · Portfolio

A responsive Spanish-language portfolio built with React, Vite, JavaScript, and modern CSS. The verified content presents Josué Vilches Castro, a final-stage Ingeniería Civil en Computación e Informática student at Universidad Arturo Prat, with practical web development and IT support experience and academic work in data and applied AI.

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

`npm run build` creates the production site in `dist/`. Vite is configured for `/portfolio-jv/`, including local development and production preview. Use the complete URL printed by Vite. The canonical and Open Graph URL is `https://jovilchesc.github.io/portfolio-jv/`; no unverified social preview image is declared.

The build also prerenders the existing React components into HTML with `scripts/prerender.js`. Production content and anchor navigation remain available if JavaScript is disabled or fails to download. React hydrates this markup to enable interactions; the development server still renders on the client.

## GitHub Pages release

`.github/workflows/deploy.yml` runs on pushes to `main` or a manual dispatch on `main`. It uses the official Pages actions pinned to commit SHAs: checkout, Node.js setup, artifact upload, Pages configuration, and deployment. The build job runs `npm ci`, lint, the prerendered build, and Playwright checks before uploading `dist/`. Only the deployment job receives `pages: write` and `id-token: write`; the build job has `contents: read`.

GitHub Pages must be enabled once in the repository: **Settings → Pages → Build and deployment → Source → GitHub Actions**. If the first workflow ran before this setting was enabled, open **Actions → Deploy portfolio to GitHub Pages → Re-run all jobs** (or dispatch the workflow on `main`). A successful workflow and an HTTP check of the actual site confirm deployment; pushing `main` alone does not.

Release URL: <https://jovilchesc.github.io/portfolio-jv/>. Promote a validated `develop` release to `main` using a normal merge, then push both branches. No deployment branch or additional dependency is needed.

The real CV is `public/CV_Josue_Vilches.pdf`, used without modification. Its link uses `import.meta.env.BASE_URL`; the prerenderer reads the same Vite configuration as the client build. Both download actions preserve the original filename. Asset and download tests run under the repository subpath and compare the served PDF bytes with the supplied file.

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
- `tests/content.spec.js`: verified identity and contact channels, academic team attribution, project years, publication restrictions, and real project detail interactions.
- `tests/release.spec.js`: CV downloads, base-path asset and font loading, favicon, canonical metadata, and production HTML checks.

The interface uses locally bundled Manrope fonts. It does not request remote fonts, use analytics, or submit personal data. Project graphics are labeled conceptual illustrations; they do not represent measured outcomes or actual project screenshots.

## Interaction system

Reveal groups are marked with `data-reveal="group"` and observed once by a shared `IntersectionObserver`. Content is visible by default; entering the viewport triggers a short opacity/translate animation and releases the observer target. Keyboard focus permanently finishes a group's reveal, so leaving a project detail control cannot restart it. The SVG artwork uses the same observer with finite, restrained node and icon animations.

Artwork tilt is limited to 1.5 degrees per axis on hovering fine-pointer devices and mouse events. Pointer movement and scrolling schedule at most one pending animation frame, with no idle render loop. Scroll progress updates a transform directly; React state changes only when the active section changes. Section offsets and document height are cached and remeasured after resize or content-size changes. Effects remove their listeners, observers, and pending frames on cleanup.

Reduced motion disables reveals, SVG animation, tilt, hover translation, and the decorative scroll progress line, including when the preference changes while the page is open. Active navigation and keyboard focus remain functional. Cards do not gain artificial tab stops; focus styles apply to their optional links and detail controls. Touch devices retain static card interactions.

## Content handoff

The portfolio owner supplied the profile, YMCA Iquique internship (January–February 2025), UNAP education (2021–present), Cisco Networking Academy certifications, skills, email, GitHub profile, and academic project descriptions. These supplied facts are the content source of truth; they were not inferred from third-party profiles.

The 2026 datamart and Data Mining projects are explicitly team academic work. Datamart attribution is limited to team membership. The documented individual Data Mining role is data preparation, data quality, transformation, and ETL; the regression, classification, and time-series work belongs to the team. Its React/FastAPI application is an academic deployment simulation. The computer-vision prototype uses a pretrained model, has no verified year, and includes experimental Gemini integration. No model performance numbers, experimental predictor columns, business-impact projections, or production-adoption claims are published.

Update `src/data/portfolio.js` to add confirmed details:

| Field                                                         | Expected value                                                                   | Behavior when absent              |
| ------------------------------------------------------------- | -------------------------------------------------------------------------------- | --------------------------------- |
| `email`                                                       | Confirmed email address                                                          | Email action hidden               |
| `cv`                                                          | Path to an actual PDF in `public/`                                               | Download actions hidden           |
| `socialLinks`                                                 | Objects with `label` and `href`                                                  | Social links hidden               |
| `education.institution`, `education.period`                   | Official institution and dates                                                   | Fields hidden                     |
| `experience`                                                  | Objects with `id`, `role`, optional `organization` / `period`, and `description` | Academic project experience shown |
| Project `year`                                                | Verified project year                                                            | Year hidden                       |
| Project `objective`, `development`, `contribution`, `outcome` | Verified descriptions separating team development from individual work           | Absent fields hidden              |
| Project `technologies`                                        | Verified technology names                                                        | Technology list hidden            |
| Project `links`                                               | Objects with `label` and real `href`                                             | Project actions hidden            |
| Project `image`                                               | Object with `src` and meaningful `alt`                                           | Conceptual illustration shown     |

Project `tags` show a short selection of verified technologies; the complete technology and method lists live inside the detail disclosure. AI assistants are listed separately from programming languages and ML frameworks. Visible interface text lives in `copy.es`; translated profile/project fields can be selected alongside a future `copy.en`. Keep `index.html` title, description, language, and Open Graph metadata aligned when changing identity or language.

Optional future additions: verified project screenshots and repository/demo/dashboard URLs, a confirmed year for the computer-vision prototype, and a real social preview image. More specific individual ownership of datamart or AI tasks requires confirmation before adding it. The supplied CV is published as provided; no phone number or unprovided social profile is added to the portfolio page. Missing project visuals and links do not block this first release.

## Browser validation

```sh
npx playwright install chromium
npm run build
npm run test:e2e
```

Playwright starts a local production preview automatically. Tests cover 360, 390, 768, 1024, and 1440 px widths, plus desktop/mobile screenshots in the ignored `test-results/` directory. Automated accessibility checks complement manual visual review; they are not a full accessibility certification.

## Git workflow

Use `feature/*`, `fix/*`, or `docs/*` branches based on `develop`. Run lint, build, and relevant browser checks before merging into `develop`. Promote a verified release to `main`. See `AGENTS.md` for the complete project conventions.
