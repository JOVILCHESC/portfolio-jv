# Dependency review

Review date: 2026-11-19.

## Selection

No new direct runtime or development library was added for the case study. React, native document navigation and HTML dialog cover the required functionality. Radix, Motion, Embla and React Router were not needed for this bounded implementation, so they were not installed and no package-security assessment is claimed for them.

Existing development dependencies were updated selectively after `npm audit --json` reported three high and three moderate affected packages. No `npm audit fix --force` or major framework migration was used.

- Vite: 8.3.0 → 8.3.8. Official repository: <https://github.com/vitejs/vite>. Same stable minor series; resolves the reported development-server/launch-editor advisories. npm registry metadata identifies the official repository and an available provenance attestation. Node compatibility was checked against local Node 22.17.1. Vite itself declares no preinstall/postinstall script.
- ESLint: 10.11.0 → 10.15.0. Official repository: <https://github.com/eslint/eslint>. Same major series; moves the minimatch/config-array chain beyond the affected versions. Declared Node engine remains compatible; no preinstall/postinstall script is declared for ESLint itself.
- Transitive corrections: source-map-js 1.2.1 → 1.2.3 ([repository](https://github.com/7rulnik/source-map-js)), zod 4.6.5 → 4.6.7 ([repository](https://github.com/colinhacks/zod)), minimatch 10.2.6 → 11.0.9 through ESLint ([repository](https://github.com/isaacs/minimatch)). These remain development dependencies, not browser libraries.

Registry repository metadata, package dependency trees, installation-script declarations and lockfile changes were inspected. Vite and ESLint are established tools already used by this repository; popularity was not treated as a safety guarantee. Install/update commands used `--ignore-scripts`. The actual build and lint run with the resulting packages. The lockfile pins resolved versions and integrity values from registry.npmjs.org.

The updated build-tool tree also includes upstream optional WASM fallback packages, including `@emnapi/core` and `@emnapi/runtime` at `2.0.0-beta.2`. They are not application dependencies or selected application APIs. This upstream transitive prerelease is explicitly recorded rather than described as a fully stable dependency tree. Windows and GitHub Actions native builds are validated; other platform fallbacks are not.

## Findings and limits

The initial audit included Vite launch-editor/file-serving advisories, source-map-js denial of service, Zod collection-validation exhaustion and minimatch amplification (including inherited reports on ESLint/config-array). References from the registry audit:

- <https://github.com/advisories/GHSA-587h-7wmj-h5pm>
- <https://github.com/advisories/GHSA-68fv-2mgg-jv7q>
- <https://github.com/advisories/GHSA-mrhx-c7xc-m3w5>
- <https://github.com/advisories/GHSA-g3hv-75wg-m249>

After the targeted updates, `npm audit --json` returned zero known advisories. This checks the registry's known vulnerability data, not all source code, malware, future vulnerabilities or every deployment configuration. npm signature verification and OpenSSF Scorecard were not performed. No claim of absolute security is made.

Application review: no new HTML injection, external scripts, credentials, API services, backend or database. Metadata substitutions escape attribute values. Screenshots are served locally, and original application sources/secrets are not included. No runtime dependencies were added.

## Ongoing maintenance

`.github/dependabot.yml` requests monthly npm and Actions update PRs targeting develop, with a small open-PR limit; npm major version updates are excluded. No automatic merging is configured. Each proposal must be reviewed and validated before release. Repository security-alert settings are separate and have not been changed or verified by this configuration.
