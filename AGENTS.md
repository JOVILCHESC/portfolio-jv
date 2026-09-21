# Portfolio Project Instructions

## Project Goal

Build a polished, professional portfolio website for a Computer Science and Informatics Engineering student.

The primary goal is to produce a portfolio that is visually impressive, technically solid, responsive, and suitable for internship and job applications.

Prioritize delivering a finished, production-quality portfolio over teaching or explaining every implementation step.

The portfolio should showcase:

- Software development
- Data Analytics
- Business Intelligence
- Machine Learning
- Academic and engineering projects
- Technical skills
- Experience
- Education
- Contact information
- Downloadable CV

---

## Execution Mode

Operate autonomously.

You are authorized to:

- Create, modify, move, and delete project files when appropriate.
- Initialize and configure the application.
- Install reasonable dependencies when they clearly improve the project.
- Create and switch Git branches.
- Stage files.
- Create commits.
- Merge completed feature branches.
- Delete completed local feature branches.
- Run development, build, lint, and validation commands.
- Refactor existing code when it improves maintainability or quality.

Do not ask for confirmation for routine development operations.

Only stop and ask the user when:

- Credentials, secrets, or authentication are required.
- A destructive action could cause meaningful data loss.
- A requirement involving personal information is ambiguous.
- A major product decision cannot reasonably be inferred.

Never use force push.

Never rewrite published Git history unless explicitly requested.

---

## Language

- Source code must use English naming conventions.
- File and directory names must be written in English.
- Git branches must be named in English.
- Git commit messages must be written in English.
- Pull Request titles and descriptions must be written in English.
- Code comments should be written in English when comments are necessary.
- User-facing portfolio content should initially be written in Spanish.
- The architecture should make future Spanish/English localization straightforward.

Avoid unnecessary comments that only repeat what the code already says.

---

## Git Workflow

Maintain a professional Git history automatically.

Use:

- `main` for stable production-ready code.
- `develop` as the integration branch.
- `feature/*` for new functionality.
- `fix/*` for bug fixes.
- `refactor/*` for structural improvements.
- `docs/*` for documentation work.

When starting a substantial feature:

1. Ensure the working tree is clean.
2. Start from the appropriate base branch.
3. Create an appropriately named temporary branch.
4. Implement and validate the feature.
5. Commit using Conventional Commits.
6. Merge the completed feature into `develop`.
7. Delete the completed local feature branch when safe.

Do not develop features directly on `main`.

When the portfolio reaches a stable release state, merge `develop` into `main`.

If a GitHub remote is configured and authenticated, pushing branches is allowed.

Do not use force push.

---

## Commits

Use Conventional Commits.

Examples:

- `chore: initialize portfolio project`
- `feat(hero): add portfolio introduction`
- `feat(projects): add featured project showcase`
- `feat(contact): add contact section`
- `style(portfolio): improve responsive design`
- `fix(navbar): fix mobile navigation`
- `refactor(projects): simplify project data structure`
- `docs: improve project documentation`

Create logical commits.

Do not produce meaningless commit messages such as:

- `changes`
- `update`
- `stuff`
- `final`
- `final 2`
- `working version`

Avoid creating a commit for every tiny edit.

Prefer commits representing meaningful units of completed work.

---

## Technology

Use:

- React
- Vite
- JavaScript
- Modern CSS

Additional libraries may be installed when they provide clear value.

Avoid adding large frameworks or dependencies for functionality that can be implemented cleanly without them.

Prefer a lightweight portfolio with excellent performance.

---

## Architecture

Use a clean and maintainable component structure.

A reasonable structure may include:

src/
  components/
  sections/
  data/
  assets/
  hooks/
  styles/

Do not overengineer the application.

Prefer data-driven project and skill sections rather than duplicated hard-coded components.

Keep components focused and reusable.

---

## Design Direction

The portfolio must look intentionally designed, not like a default student template.

Target aesthetic:

- Modern
- Clean
- Technical
- Professional
- Premium
- Minimal but visually interesting

Avoid:

- Excessive gradients
- Excessive glassmorphism
- Too many animated elements
- Generic progress bars showing arbitrary skill percentages
- Huge amounts of text
- Template-looking layouts
- Excessive icons
- Unnecessary visual effects

Use:

- Strong typography
- Good hierarchy
- Generous but controlled spacing
- Subtle motion
- Project-focused presentation
- High-quality responsive layouts
- Thoughtful hover states
- Clear calls to action
- Good contrast
- Consistent visual language

The portfolio should look strong on:

- Desktop
- Laptop
- Tablet
- Mobile

Use mobile-first responsive principles where practical.

---

## Portfolio Structure

The initial website should include approximately:

1. Navigation
2. Hero
3. About
4. Featured Projects
5. Skills / Technologies
6. Experience
7. Education
8. Contact
9. Footer

The exact structure may be improved if a better UX is identified.

---

## Hero Section

The hero should communicate immediately:

- Name
- Professional profile
- Main technical areas
- Availability / career stage
- Primary calls to action

Possible calls to action:

- View Projects
- Download CV
- Contact Me

Avoid generic phrases such as:

"Hello, I am a passionate developer."

Use concise professional copy.

---

## Projects

Projects are the most important part of the portfolio.

Each featured project should clearly communicate:

- Project name
- Problem or objective
- What was built
- Technologies used
- Relevant technical work
- Result or outcome
- Screenshots or visual evidence when available

Avoid writing academic-report-length descriptions.

Convert technical work into concise portfolio-oriented explanations.

Projects should be displayed using reusable data-driven components.

Support optional links for:

- GitHub repository
- Live demo
- Dashboard
- Documentation

Do not display buttons for unavailable links.

---

## Skills

Group technologies logically.

Possible categories:

- Data & Business Intelligence
- Machine Learning
- Backend
- Frontend
- Databases
- Tools
- Development Practices

Do not use arbitrary percentages such as:

Python 90%
React 75%

Use categories and technologies instead.

---

## Accessibility

Use semantic HTML.

Ensure:

- Keyboard-accessible navigation.
- Appropriate contrast.
- Meaningful alt text for relevant images.
- Visible focus states.
- Correct heading hierarchy.
- Buttons and links have clear purposes.

Respect `prefers-reduced-motion` where reasonable.

---

## Performance

Keep the application lightweight.

Optimize:

- Images
- Fonts
- Animations
- Bundles

Avoid unnecessary network requests.

Lazy-load heavier content when beneficial.

---

## SEO

Include appropriate:

- Page title
- Meta description
- Open Graph metadata where reasonable
- Semantic structure

Use professional metadata suitable for sharing the portfolio with recruiters.

---

## Security

Never commit:

- Passwords
- API keys
- Access tokens
- Private credentials

Use environment variables when secrets are necessary.

Keep `.env` files ignored.

Provide `.env.example` when configuration is required.

---

## Code Quality

Before considering work complete:

- Run the build.
- Run linting.
- Resolve relevant errors.
- Check for obvious console errors.
- Verify responsive behavior.
- Remove unused code.
- Remove unnecessary boilerplate.
- Ensure no placeholder text remains.
- Ensure links and buttons behave correctly.

Do not leave unfinished TODOs unless explicitly documented.

---

## Autonomous Development Loop

For substantial work, follow this workflow automatically:

1. Inspect the current repository.
2. Inspect the Git state.
3. Determine the appropriate branch.
4. Create a feature branch if appropriate.
5. Implement the requested work.
6. Run validation.
7. Fix relevant issues.
8. Review the resulting diff.
9. Commit the completed work.
10. Merge into `develop` when the feature is stable.
11. Clean up the completed feature branch.
12. Continue with the next logical task.

Do not interrupt the user for routine steps.

---

## Definition of Done

The portfolio is not complete merely because it runs.

It should be considered complete when:

- The visual design looks polished.
- Real portfolio content is present.
- Featured projects are clearly presented.
- Desktop and mobile layouts work correctly.
- Build and lint checks pass.
- No obvious placeholder content remains.
- Git history is organized.
- The application is ready for deployment.