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
what a field was actually for turned up a `placeholder` boolean that no code
had ever read, in any commit, since the day it was written; it is gone now.
Asking for a sweep of poor practice turned up a post list duplicated across two
pages that had already silently drifted apart, section numbers typed in by hand
where they should have been derived, and an RSS feed that was never sorted.
I pointed at the useless or badly built parts and then had them changed.

**The lesson.** An agent will produce something that builds, passes, and looks
finished while still containing code that does nothing and duplication that is
already broken. It does not volunteer that. You have to ask, and then you have
to actually check the answer.

## How it is built

**The site.** Astro with static output, deployed on Vercel from `master`. No
database, no backend, no auth. Every page is HTML generated at build time.
Content and appearance never share a file: what the homepage *says* lives in
`src/data/profile.ts`, how it *looks* lives in `src/pages/index.astro`.

**The agentic part.** A few pieces, each doing a different job:

- **`CLAUDE.md`** (a symlink to `AGENTS.md`) is the standing instruction file.
  Content structure, static-only, the build must pass, no em dashes or emojis.
  Rules the agent has to work inside rather than rediscover each session.
- **`.claude/skills/design/`** is a pinned design brief, committed to the repo.
  It holds the type scale, palette and spacing rules, so a restyle answers to a
  written standard instead of whatever the model felt like that day. Where the
  site deliberately breaks it, the exception is recorded in `DESIGN.md` with
  the reasoning.
- **`impeccable`**, a local skill for design critique, typography and layout
  passes, and accessibility and responsive audits. Used throughout.
- **The `frontend-design` plugin** from the official Claude plugin
  marketplace, for visual direction.
- **`grill-me`**, a local skill meant to interrogate a plan before building it.
  Worth naming honestly: it is currently broken, since its `SKILL.md` forwards
  to a `grilling` skill that is not installed, so the interrogation happened
  in conversation instead.
- **MCP servers** for the things a repo cannot see by itself, such as reading
  the live Vercel project configuration to confirm how deploys are actually
  wired.
- **`HANDOFF.md`** carries state between sessions: what was just done, what is
  still open, and which decisions are settled and should not be reopened.

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
├── lib/posts.ts           shared post sorting and tag counting
├── pages/
│   ├── index.astro        the homepage, layout and its CSS together
│   ├── 404.astro
│   ├── rss.xml.js         the feed
│   └── blog/              index, [...slug], tags/[tag]
├── layouts/BlogPost.astro post shell
├── components/            BaseHead, Footer, FormattedDate, Header,
│                          HeaderLink, Icon, Loader, PostList,
│                          SectionHead, TagFilter, TagList
├── content/blog/          posts, one .md file each
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
