# personal-site

Portfolio and blog for Jeremy Aidan Hernandez Yu.

**Live:** https://jeremyaidanhernandezyu.vercel.app

Astro, static output, deployed on Vercel from `master`. No database, no
backend, no auth.

## Quick start

```sh
npm install
npx astro dev --background     # http://localhost:4321
```

Manage the background server with `astro dev stop`, `astro dev status`,
and `astro dev logs`.

| Command | What it does |
| :-- | :-- |
| `npx astro dev --background` | Dev server with hot reload |
| `npm run build` | Production build to `./dist/` — must pass before any commit |
| `npm run preview` | Serve `./dist/` exactly as Vercel will |
| `npx astro dev logs` | Dev server log; the first place to look when something is wrong |

## Editing content

**Almost everything on the homepage lives in one file: `src/data/profile.ts`.**
Name, tagline, rotating terms, contact links, credentials, the details
table, and every project. Change it there, not in the markup.

Nothing on this site may be invented. Unfilled values read `TBD` and the
document carries a `PRELIMINARY` revision stamp until they are real.

## Writing a post

Drop a `.md` file into `src/content/blog/`. The filename becomes the URL:
`bringing-up-the-stm32.md` → `/blog/bringing-up-the-stm32/`.

```markdown
---
title: 'Bringing up the STM32'
description: 'One sentence. Shows on the blog index and in search results.'
pubDate: 'Sep 01 2026'
tags: ['embedded', 'pcb']
# heroImage: '../../assets/your-photo.jpg'   (optional)
---

Body in plain Markdown.
```

Copy `src/content/_post-template.md` to start. That template sits outside
`blog/`, so it is never published.

`tags` are optional and free-form. Each one generates a static archive at
`/blog/tags/<tag>/` and feeds the filter on `/blog`. No registry to keep
up to date.

To publish from a phone or another machine, use GitHub's web editor:
`github.com/BentoOre0/personal-site/new/master/src/content/blog`.

## Structure

```text
src/
├── data/profile.ts        all homepage content
├── pages/
│   ├── index.astro        the homepage
│   └── blog/              index, [...slug], tags/[tag]
├── layouts/BlogPost.astro post shell
├── components/            BaseHead, Header, Footer, Icon, TagList
├── content/blog/          posts
├── styles/global.css      tokens and shared primitives
└── assets/                images and self-hosted fonts
```

## Design

`DESIGN.md` holds the visual system — palette, type scale, spacing, and
the rules behind them. `.claude/skills/design/SKILL.md` is the pinned
brief those rules answer to. Read both before restyling anything.

`PRODUCT.md` holds product truth: who the site is for and what is
confirmed versus unfilled.

## Deploying

`git push` to `master` deploys. There is no confirmation step — Vercel
watches the branch, builds, and publishes. Nothing you do locally is
visible to anyone until you push.

## Gotchas

- **Editing `astro.config.mjs` needs a dev-server restart.** Hot reload
  does not cover it, and a stale server fails in confusing ways
  (undefined `Astro.site`, client scripts silently missing).
- **Page renders but nothing animates or responds?** Stale dev server.
  `npx astro dev stop && npx astro dev --background`.
- **If `npm run build` passes but the dev server misbehaves, it is the
  dev server.** The build compiles from scratch with no cached state.
