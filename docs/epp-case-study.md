# EPP case study: implementation and evidence

Reviewed on 2026-11-19. The existing portfolio is extended, not replaced.

## Pages and navigation

`src/data/caseStudies.js` registers case studies and their paths, metadata, screenshots and technical content. `ProjectPage.jsx` renders the shared editorial template; `ProjectGallery.jsx` handles screenshot selection and enlargement. `ProjectCard.jsx` uses `caseStudyPath` when available; projects without an independent page keep their existing native details disclosure.

The first path is `/portfolio-jv/projects/deteccion-epp/`. The build writes an actual `dist/projects/deteccion-epp/index.html` with the project's content, title, description, canonical and Open Graph metadata. Ordinary anchors perform document navigation, so direct links, reload, back/forward and no-JavaScript access do not depend on a Pages 404 redirect or a client router. The same route registry selects the React tree during prerendering and hydration. Add a case-study entry and link it from a project to extend this structure. Keep `path` values as trusted relative directory paths ending in `/`.

The gallery uses the native HTML dialog top layer, Escape handling and modal semantics, with explicit Tab boundary wrapping, focus return and scroll locking. Each image selector and enlargement trigger falls back to the actual PNG without JavaScript. Mobile captures preserve their complete proportions; the original-size viewer is independently scrollable. No camera, API, database or remote service runs inside the portfolio.

## Verified source

Read-only review of the supplied sibling project `Sistema Control de Ingreso Inteligente`:

- `src/models/epp_model.py`: Ultralytics YOLOv8, selected classes, bounding boxes and confidence values.
- `src/controllers/camera_controller.py`: OpenCV camera capture.
- `src/controllers/detection_controller.py`: association rules, annotation, capture storage and JSON/base64 JPEG delivery.
- `src/controllers/websocket_server.py` and `video_stream.py`: local WebSocket transport.
- `server.py`, `incidence_controller.py`, `incidence_model.py`: HTTP history/details and observation operations; MongoDB persistence.
- `frontend/src/services/`, `frontend/src/hooks/useCamera.js`, feature components, package manifest and README: React/Vite UI, filtering, observation controls, explicit camera connection and missing-frame states.
- `portfolio-assets/README.md` and screenshot manifest: original captures from the real local API, with visual privacy enabled and no simulated camera.

This is code and supplied-evidence verification. The original backend was not started, database records were not changed, and live inference was not tested. No files in the original project were modified. No individual authorship, model training method, precision, latency, industrial deployment or client claims were added.

The intended helmet/vest policy treats boots as optional, but the inherited condition still requires boots. This discrepancy is disclosed. Historical labels are not reinterpreted. The unavailable original camera and inconsistent backend date handling are also documented. Nginx configuration was not found. Gemini is not presented as part of the verified Vigía architecture. The portfolio is a case study, not a live demonstration.

## Image provenance and delivery

The six supplied PNGs are copied without modification into `public/projects/epp/`, using English filenames: dashboard, history, incident-detail, monitoring, dashboard-mobile and history-mobile. Their source order corresponds to the supplied files 01–06. Photos are already blurred within these screenshots; no unblurred evidence was copied.

Lossless WebP derivatives were created locally with Pillow (`lossless=True`, `method=6`). Decoded RGBA pixels were compared byte-for-byte to each PNG and matched. Total image bytes decrease from 1,633,115 to 1,200,142 (26.5%) for the displayed variants. Original PNG downloads remain available. Images declare dimensions, retain aspect ratio, and use lazy loading except for the detail page's primary image. Only the selected gallery image is loaded; originals load on request.

## Design decisions and references

- [Linear's interface refresh](https://linear.app/now/behind-the-latest-design-refresh): establish visual priority and let supporting controls recede.
- [Vercel customer stories](https://vercel.com/customers): separate context, implementation and evidence into a readable narrative.
- [Raycast](https://www.raycast.com/): product-led presentation and explicit interaction affordances.

These informed hierarchy and navigation, not copied components. Home now uses two broader analytical cards and a contrasting full-width EPP feature. The detail page alternates an editorial introduction, a large authentic capture, a contextual gallery, a flow description and a dark scope/status section. Existing typography, palette, Home sections and native motion are retained.
