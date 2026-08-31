# Handoff — 1 Sep 2026

State of the site after the redesign session of 31 Aug / 1 Sep 2026.
Read this with `PRODUCT.md` (product truth) and `DESIGN.md` (visual
system). This file records what happened and what is left; those two
record what is true.

## Where things stand

The site is **live and public** at
https://jeremyaidanhernandezyu.vercel.app, deployed from `master` at
commit `69dc3dd`. `npm run build` passes, 11 pages.

The Astro starter is entirely gone. The site is a **component-datasheet**:
title block, credentials as a features list, a details table, projects as
numbered figures, and a revision stamp. That world was chosen because it
holds heterogeneous evidence — robotics, avionics, ML research,
competitive programming — as one specified record rather than as
unrelated categories. Breadth reads as range, which was the owner's
stated worry about his own profile.

Homepage sections: **§1 Credentials · §2 Details · §3 Projects.** The
page ends there. Blog is its own route, reached from the nav.

## What is real and what is not

**Real, taken from the résumé of 25 Aug 2026** (`~/Downloads/JEREMY
TOSEND RESUME AUGUST 25 2026.pdf`): name, all five credentials, the
details table, all five projects, GitHub, LinkedIn, email.

**Still unfilled:**

1. **The résumé link** — `IDENTITY.resume.href` in `src/data/profile.ts`
   is `'#'`. It is the only dead link on the site and plausibly the
   highest-intent click a recruiter makes. Owner intended a Google Drive
   share link. If instead the PDF goes in `public/`, note the repo is
   public and git history is permanent.
2. **Four figures.** P1 architecture diagram, P2 accuracy chart, P3
   avionics photo, P4 segmentation output. Every empty slot renders the
   exact shot it needs — aspect ratio, view, lighting — so they can be
   produced to spec. Owner's hardware photos exist but are unedited;
   there is a Drive folder linked from P3.
3. `REVISION.status` still reads `PRELIMINARY`. Drop it to `1.0` /
   remove the stamp once the above are done.

**Never invent anything to fill these.** That rule has held all session.

## Decisions worth not relitigating

- **Accent `#e51b23`** is sampled from the red X in the owner's own
  sketch (`#ec1c24`), darkened the minimum needed to clear 4.5:1 on
  white. Red marks the rotating term, contact icons, the revision stamp,
  and every link. It is the only saturated colour on the page.
- **Light only.** The world is printed paper read in daylight. A dark
  theme would be a deliberate reversal, not an addition.
- **Two documented exceptions to the pinned `design` skill**, both at the
  owner's explicit request: the name uses a display step above the
  14/16/20/28/40 scale, and the typed tagline overrides the ban on
  typewriter text. Both are recorded in `DESIGN.md`.
- **Rules are structural only.** Row dividers were removed; rows reveal
  on hover with a grey wash. Every hairline is inset to the sheet's
  content box so they all begin and end on the same two vertical lines.
  Section headings own their rule: `§N`, heading, then the line runs to
  the right edge as one unit.
- **Project titles link to the project's primary URL.** A hover state on
  non-interactive text promises something it cannot deliver. P1 has no
  link on purpose — the SEAOIL system is internal and there is nothing
  public to verify it with.
- **The résumé gets a word, not a glyph.** GitHub/LinkedIn/email are
  learned symbols; a document icon would need decoding.
- **Nav labels are plain** (`Home`, `Blog`). The datasheet framing lives
  in the structure, not in labels a visitor must decode. An earlier
  "Application notes" naming was dropped for exactly this reason.
- **A "grill-me" skill exists but is broken** — its `SKILL.md` forwards
  to a `grilling` skill that is not installed. Do not retry it; answer
  directly.

## Gotchas that cost time this session

- **Long-lived dev servers go bad.** After a compile error, the server
  can keep serving a page whose client script is silently missing —
  everything renders, nothing animates. `status` still reports "running".
  Diagnose with `npx astro dev logs`, and remember: **if `npm run build`
  passes but the dev server misbehaves, it is the dev server.**
- **`astro.config.mjs` edits need a restart.** A stale server left
  `Astro.site` undefined and took the whole site down with an
  `Invalid URL` throw. `BaseHead.astro` now guards that, but restart anyway.
- **Astro's `<Image>` is not a literal `<img>` in source**, so impeccable's
  live picker cannot scaffold it. Pick plain HTML elements; handle image
  changes in chat.
- **Vercel had two separate blockers** to being publicly reachable, both
  since resolved: Vercel Authentication (SSO) was on by default, and
  renaming the project did not attach the short `.vercel.app` domain
  until it was added manually under Settings → Domains.

## To do — owner's list, 1 Sep

Owner's own three, in his words, with what each needs before it can start:

1. **Update the look of the blog.** Direction needed. The blog currently
   inherits the homepage language — labelled-rule heading, hover-wash
   rows, red tags and filter chips, and the face drawing in the header.
   Ask what specifically feels wrong before restyling; "update the look"
   has been ambiguous every time this session and the useful answers came
   from asking which element bothered him.
2. **Write one post.** *His to write, not the assistant's.* Drafting a
   post in his voice would be inventing content, which is the one rule
   this project holds hardest. Offer to edit, structure, or set up the
   file — never to author it. `src/content/_post-template.md` is the
   starting point.
3. **Put more information onto the site.** Scope needed. Candidates the
   résumé supports but the site does not yet carry: the SEAOIL
   internship as employment rather than only as a project, the
   self-taught languages line, the Extended Essay abstract, more detail
   on the UBC Rocket work. Ask which, and remember the content-structure
   rule in AGENTS.md — the homepage is Credentials, Details, Projects,
   and adding a section is a real change to that spec.

## Also outstanding

1. Fill the résumé link (`IDENTITY.resume.href`).
2. Produce the four figures to the specs the page prints.
3. `og:image` is still the Astro placeholder `blog-placeholder-1.jpg`,
   so sharing the link on LinkedIn or Slack shows a stock photo.
4. Drop the `PRELIMINARY` stamp and bump the revision once the above land.
5. Delete the four leftover Astro demo posts (`first-post`,
   `second-post`, `third-post`, `using-mdx`). `markdown-style-guide.md`
   is worth keeping as a syntax reference until the owner is comfortable.
