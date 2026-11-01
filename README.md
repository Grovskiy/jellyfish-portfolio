# Grovskiy — Software Developer

A static portfolio for selected projects and a visual archive of earlier web work. The site is generated with Node.js and has no runtime dependencies, build packages, external fonts, or required private repositories.

## Local development

Use Node.js 20 or newer (the GitHub Pages workflow uses Node 24).

```sh
npm run check    # Validate project records and local media
npm run build    # Generate dist/
npm test         # Check generated pages, links, and content invariants
npm run preview  # http://127.0.0.1:4173/jellyfish-portfolio/
```

Project content is in `data/projects.json`, page templates in `scripts/build.mjs`, and styles and local assets in `site/`. Each featured project receives a real HTML page under `projects/<id>/`, so direct links and reloads work on GitHub Pages. Links are relative and do not require a server fallback.

`site/demos/` contains interactive adaptations of the archived websites and the public Simple Tracking Native project. Forms and sample data are illustrative; the demos do not transmit submissions or persist entries. Featured cards use moving previews on fine-pointer devices and respect reduced-motion preferences. Archive cards use static images captured from the matching demos. Earlier visual reconstructions are available on their project pages.

For the nine archive covers listed in `data/archive-cover-manifest.json`, the tests compare the cover and demo source hashes with the recorded capture. After changing a listed demo, capture and visually verify a fresh cover, then update its two hashes in the manifest using `hashDemo` and `hashFile` from `scripts/cover-hash.mjs`.

## Publishing

A push to `master` runs the GitHub Actions workflow in `.github/workflows/deploy.yml`; it checks the project data, builds the static site, runs tests, and publishes `dist/` using GitHub Pages. No private-repository token or submodule is required. The legacy `work-sites` repository is a separate archive.

## Content and font attribution

Historical previews are adapted representations of earlier work. Names and text in those previews are fictionalised for the portfolio. Original source projects are not shipped as running demos. Image and project provenance are maintained in the private archive.

Fraunces, Inter, and JetBrains Mono are distributed under the SIL Open Font License; their license texts are in `site/assets/fonts/`.
