# personal-site

Hey! This is my personal website.

I built it partly because I needed a portfolio and partly because I wanted to
learn agentic development properly rather than just reading about it. So the
site is the artifact, and the way it was built is the other half of the point:
[Claude Code](https://claude.com/claude-code) as the agent, MCP servers for
reaching outside the repo, and skills for pinning taste and process in place.
The site itself is [Astro](https://astro.build), static, on Vercel.

**Live:** https://jeremyaidanhernandezyu.vercel.app

## My involvement

I directed this project rather than typed it. The agent wrote most of the
code; my job was deciding what the site should be and refusing the parts that
were not good enough.

**Design.** Every visual decision here is mine. The ordering of the projects,
putting the figure directly under each project title instead of beside it, the
typographic hierarchy, and the choice to keep the blog off the homepage. Where
the site breaks its own pinned design brief, I asked for the exception and the
reasoning is recorded in `DESIGN.md`.

**Code review.** I read what the agent reported back and pushed on it. Asking
why there were useless fields that no code had ever read, in any commit; they
are gone now. Finding section numbers typed in by hand where they should have
been derived. I pointed at the useless or badly built parts and had them
changed.

**AI development literacy.** I needed to learn how to use these new tools in
modern software development. I personally think it's akin to learning how to
use the internet.

## How it is built

### The stack

Astro with static output, deployed on Vercel from `master`. No database, no
backend, no auth. Every page is HTML generated at build time. Content and
appearance never share a file: what the homepage *says* lives in
`src/data/profile.ts`, how it *looks* lives in `src/pages/index.astro`.

| Piece | What it does here |
|---|---|
| [Astro](https://astro.build) 7, static output | The whole site. Components, routing, and the build |
| Content collections, typed with Zod | The blog. `src/content.config.ts` is the schema, so a bad `pubDate` fails the build instead of the page |
| `@astrojs/mdx` | Lets a post use components. One demo post uses it |
| `@astrojs/sitemap`, `@astrojs/rss` | `sitemap-0.xml` and `rss.xml`, both generated |
| `sharp` | Image processing at build time. Every photo comes out as sized WebP |
| Geist and Geist Mono | Self-hosted variable fonts, `fontProviders.local()`, no Google Fonts request |
| TypeScript | `profile.ts`, `posts.ts`, the schema |
| Vercel | Watches GitHub. Push is the deploy |

**Five runtime dependencies, and no framework on the client.** No React, no
Tailwind, no CSS library. `src/styles/global.css` is hand-written tokens. The
whole site ships one 16KB bundle, Astro's `ClientRouter` for view transitions,
plus a handful of inlined scripts for the things that actually move: the typed
tagline, the loader, the cycling figures, the quote bar. Everything else is
HTML and CSS, including the blog's tag filtering, which is static pages rather
than a script.

### The agentic setup

Four different mechanisms, and they are not interchangeable. Working out what
each one is actually for was most of the learning.

**Skills** are instructions the model loads when the task calls for them.

- **`design`** is a pinned design brief, local to this repo and committed.
  Type scale, palette, spacing. A restyle answers to a written standard
  instead of whatever the model felt like that day, which is the entire
  point of pinning it. Where the site deliberately breaks it, the exception
  is recorded in `DESIGN.md` with the reasoning.
- **`impeccable`** is a large local skill for design critique, typography and
  layout passes, and accessibility and responsive audits.
- **`grill-me`** was installed from a public repo, `mattpocock/skills`, and is
  tracked in `skills-lock.json` with a content hash. Worth naming honestly:
  it is broken. Its `SKILL.md` forwards to a `grilling` skill that is not
  installed, so the interrogation happened in conversation instead. **A skill
  that installs cleanly is not a skill that works.**
- **`code-review`** is built in, not something I installed. Run before
  shipping a branch.

**A plugin** is a bundle from a marketplace rather than a file in the repo.
Exactly one is enabled: **`frontend-design`** from the official Claude plugin
marketplace, for visual direction.

**MCP servers** are how the agent reaches things a repo cannot see by itself.
One is connected, scoped to this project: **`vercel`**. It reads the live
project, the deployment list and each deployment's state, which is how a
push gets confirmed as actually built and live rather than assumed to be.
It is read-only in practice here; the deploy itself is still `git push`.

**Hooks** are the one piece that is not the model deciding anything. They are
commands the harness runs on its own, configured in
`.claude/settings.local.json`. This project runs the impeccable design
detector twice: after every `Edit` or `Write` to a UI file, and again when the
agent stops. A hook fires whether or not the model thought to check.

`.claude/settings.local.json` also holds a small permissions allowlist, so
routine commands stop asking.

**Two documents do the rest of the work**, and they matter more than any of
the above:

- **`CLAUDE.md`** (a symlink to `AGENTS.md`) is the standing instruction file.
  Content structure, static only, the build must pass, no em dashes or
  emojis. Rules to work inside rather than rediscover each session.
- **`HANDOFF.md`** carries state between sessions: what was just done, what is
  still open, and which decisions are settled and should not be reopened.
  Without it every session re-argues the same three things.

### The workflow

```
read HANDOFF.md → branch → edit → npm run build → screenshot
  → bump the rev → commit → push → look at the preview → merge
```

- **`HANDOFF.md` first, every time.** It is the first thing in `CLAUDE.md` for
  a reason.
- **Never work on `master`.** `master` is production; the moment something
  lands there it is live.
- **`npm run build` must pass before any commit.** `dev` is forgiving and
  `build` is strict, and a site that works in one can fail the other.
- **Screenshot before judging anything visual.** `./scripts/shots.sh` captures
  every page at 390, 768 and 1440 using the system Chrome. This exists because
  a critique, a polish, a harden and an adapt pass all missed defects I found
  in ten seconds on my phone: reasoning about CSS is not looking at the page.
- **Bump `REVISION.rev` in the same commit.** One tenth per commit, wrapping
  0.9 to 1.0, with `REVISION.updated` set to the commit date. The footer
  prints both, so a rev that lags is a printed untruth.
- **Push, then look at the preview.** Any branch that is not `master` gets a
  full Vercel deployment at its own URL. That is the safest way to check a
  change on a real phone before it is public.
- **Review before merging.** `/code-review` on the branch, fix what it finds,
  then merge.

**What that discipline is for.** The interesting failures were not bad code.
They were an agent confidently reasoning about CSS it had never looked at, and
link rot nothing was checking. Both are written up in `HANDOFF.md` and
`docs/build-and-ship.md`, because being specific about how the tooling failed
is more useful than saying it worked.

## Start with `docs/`

**[`docs/`](docs/README.md) is the manual for this site.** It is written to be
read start to finish, and it is where the real detail lives.

| I want to… | Read |
|---|---|
| Add or edit a project, its links, its photo | [docs/adding-a-project.md](docs/adding-a-project.md) |
| Change my credentials or the details table | [docs/credentials-and-details.md](docs/credentials-and-details.md) |
| Write a blog post | [docs/writing-a-post.md](docs/writing-a-post.md) |
| Add a whole new section to the homepage | [docs/adding-a-section.md](docs/adding-a-section.md) |
| Run it locally, check it, put it live | [docs/build-and-ship.md](docs/build-and-ship.md) |

Everything below this line is orientation. The detail, including the gotchas
that have actually cost time on this project, is in those five files. When the
two disagree, `docs/` is right and this file needs fixing.

## Quick start

```sh
npm install
npm run dev        # http://localhost:4321
npm run build      # must pass before any commit
npm run preview    # serve ./dist/ exactly as Vercel will
```

`npx astro dev --background` runs the same server detached, managed with
`npx astro dev stop`, `status` and `logs`.

## Structure

```text
src/
├── data/profile.ts        all homepage content
├── lib/posts.ts           post sorting, tag counting, and the draft gate
├── pages/
│   ├── index.astro        the homepage, layout and its CSS together
│   ├── 404.astro
│   ├── rss.xml.js         the feed
│   └── blog/              index, [...slug], tags/[tag]
├── layouts/BlogPost.astro post shell
├── components/            BaseHead, Figure, Footer, FormattedDate,
│                          Header, HeaderLink, Icon, Loader, PersonLd,
│                          PostList, QuoteBar, SectionHead, TagFilter,
│                          TagList
├── content/blog/          posts, one .md file each. The Astro demo
│                          posts live here as `draft: true`, hidden but
│                          kept as a working template
├── styles/global.css      tokens and shared primitives
└── assets/                images and self-hosted fonts

docs/                      the maintenance manual
scripts/shots.sh           screenshot every page at 390 / 768 / 1440
```

Things that number themselves, and must never be typed by hand: the `P1`, `P2`
project designators, the `Fig. N` figure numbers, and the `§1`, `§2` section
marks. All three derive from position. See
[docs/README.md](docs/README.md#things-that-number-themselves).

## The other documents at the root

- **`CLAUDE.md`** (a symlink to `AGENTS.md`) holds the rules: content
  structure, static only, the build must pass, no em dashes or emojis.
- **`DESIGN.md`** holds the visual system: palette, type scale, spacing, and
  the reasoning behind each. `.claude/skills/design/SKILL.md` is the pinned
  brief those rules answer to. Read both before restyling anything.
- **`PRODUCT.md`** holds product truth: who the site is for, and what is
  confirmed versus unfilled.
- **`HANDOFF.md`** holds the current state: what was just done, what is still
  open, and what not to relitigate.

## Deploying

`git push` to `master` deploys. There is no confirmation step; Vercel watches
the branch, builds, and publishes. Nothing you do locally is visible to anyone
until you push.

Pushing any other branch gives you a preview deployment at its own URL, which
is the safest way to check a change on a real phone before it is public.
Details in [docs/build-and-ship.md](docs/build-and-ship.md).
