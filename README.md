# Developer Portfolio & App Showcase

A modern developer portfolio and app-marketplace/download-hub site, built with
Next.js (App Router), TypeScript, and Tailwind CSS v4.

**This site now reads all of its content live from the CMS backend** (see
the separate `backend/` project) instead of static files — apps, projects,
about/skills/timeline, and contact messages all live in that backend's
database and can be managed via its API (or later, the Flutter CMS).

## Commands

```bash
npm install
cp .env.local.example .env.local   # point at your backend (defaults to :4000)

npm run dev      # http://localhost:3000 — requires the backend running
npm run build    # production build (no backend needed at build time —
                  # every content page renders per-request)
npm run start    # run the production build (requires the backend running)
```

## Running the full stack locally

```bash
# terminal 1
cd backend && npm install && cp .env.example .env
npm run seed:content   # imports existing content into the database
npm run start           # http://localhost:4000

# terminal 2
cd portfolio-site && npm install
cp .env.local.example .env.local
npm run dev              # http://localhost:3000
```

Edit an app or a setting through the backend's API (or later, the Flutter
CMS) and refresh the site — the change appears immediately, no rebuild.

## Managing content

There are no static content files to edit anymore. Everything shown on the
site — apps, projects, about page copy, skills, timeline, social links,
contact messages — is stored and edited through the backend:

- Directly via its REST API (see `backend/README.md` for the full reference)
- Eventually via the Flutter Windows CMS being built against that same API

`[YOUR NAME]`, `[YOUR EMAIL]`, `[GITHUB URL]`, `[LINKEDIN URL]` are seeded
as placeholders in the backend's `site_settings` table — update them via
`PUT /api/profile/settings` (or the CMS, once available) rather than in code.

## Project structure

```
src/
  app/            Routes: / , /apps , /apps/[slug] , /projects , /about , /contact
                  (all `force-dynamic` — rendered per request from the API)
  components/     Navbar, Footer, AppCard, ProjectCard, ScreenshotGallery,
                  DownloadButton, TechnologyBadge, ContactForm, etc.
  lib/api.ts      The only data-access layer — fetches from the backend and
                  maps its responses into the types below
  types/          Shared TypeScript types (AppItem, ProjectItem, ...)
```

## Notes

- Dark/light mode uses `next-themes`, defaulting to the visitor's system
  preference, with a toggle in the navbar.
- The apps page filters/searches client-side with no page reload.
- Icons/screenshots/project images are loaded from the backend's `/uploads`
  path — `next.config.ts` allows `localhost:4000` for development; update
  `images.remotePatterns` there with your real backend domain once deployed.
- The contact form posts to the backend's `/api/messages` and is readable
  from the CMS's Messages section.
