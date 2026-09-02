# Handoff, 1 Sep 2026

State of the site after the redesign session of 31 Aug and the blog /
mobile session of 1 Sep. Read with `PRODUCT.md` (product truth) and
`DESIGN.md` (visual system). This file records what happened and what is
left; those two record what is true.

Rewritten from scratch on 1 Sep, the previous version had five appended
session logs and no longer read as a handoff.

## Where things stand

**Live at https://jeremyaidanhernandezyu.vercel.app**, deployed from
`master` at `db43178`. `npm run build` passes, **12 pages**.

The site is a **component datasheet**: title block, credentials as a
features list, a details table, projects as numbered figures, a revision
block. Homepage is **§1 Credentials · §2 Details · §3 Projects**. The
blog is its own route at `/blog`, with static tag archives and a 404.

A **loading screen** (`Loader.astro`) plays for 1.4s on every full page
load and slides away. Clicking the wordmark reloads and replays it.

## You can see the site now, do this before judging any design change

`/usr/bin/google-chrome` is installed. `./scripts/shots.sh` captures
every page at 390 / 768 / 1440 with no dependency:

```
./scripts/shots.sh                      # dev server
./scripts/shots.sh https://jeremyaidanhernandezyu.vercel.app
```

**Every design pass before 1 Sep was blind**, findings were computed
from CSS and never looked at. That is precisely why a critique, a polish,
a harden, an optimize *and* an adapt pass all missed visible defects the
owner then found in ten seconds on his phone. Take a screenshot.

Three capture rules, each learned the hard way:

- `--virtual-time-budget` must exceed the loader's 1.4s hold. 4000 is not
  enough and silently captures the loading screen; 12000 works.
- Virtual time **freezes the typed tagline**, so two captures can never
  show two different rotator terms. Screenshots cannot prove anything
  about the rotator.
- Capture at `--force-device-scale-factor=3`. A 1x capture made the
  DISCIPLINE sketch look illegible; the owner checked his actual iPhone
  and it is fine. **A headless capture is evidence, not proof.**

## What is real and what is not

**Real, from the résumé of 25 Aug 2026** (`~/Downloads/JEREMY TOSEND
RESUME AUGUST 25 2026.pdf`): name, all five credentials, the details
table, all five projects, GitHub, LinkedIn, email. All page content lives
in `src/data/profile.ts`.

**Not real:** the four Astro demo posts in `src/content/blog/` are Lorem
ipsum with invented tags, live and RSS-syndicated. **This is deliberate,
see Decisions.**

**Still unfilled:**

1. **The résumé link.** `IDENTITY.resume.href` is `'#'`. The only dead
   link on the site and plausibly the highest-intent recruiter click.
   Owner intended a Google Drive share link; if the PDF goes in
   `public/` instead, note the repo is public and history is permanent.
2. **Four figures.** P1 architecture diagram, P2 accuracy chart, P3
   avionics photo, P4 segmentation output. Every empty slot prints the
   exact shot it needs, so they can be produced to spec. Owner's hardware
   photos exist but are unedited; a Drive folder is linked from P3.
3. **`og:image`** is still `blog-placeholder-1.jpg`, so sharing any link
   shows Astro stock art.
4. `REVISION.status` still reads `PRELIMINARY`.

**Never invent anything to fill these.** That rule has held throughout.

## Decisions worth not relitigating

- **The demo posts stay. The owner wants a template blog.** He said so
  directly ("i want a template blog why did you kill it") after a test
  briefly made them 404. The critique rated them the site's biggest
  problem and that assessment stands on the merits, but it is decided.
  Do not propose deleting them again. `/blog` has a real empty state if
  he ever does clear them.
- **Accent `#e51b23`**, sampled from the red X in the owner's sketch and
  darkened to clear 4.5:1. It is 4.65:1 on paper and paints links, the
  rotating term, contact glyphs, the revision stamp and every tag chip,
  *not* links-only, whatever older notes said.
- **Light only.** Printed paper in daylight. A dark theme would be a
  reversal, not an addition. The loading screen is the one dark surface.
- **Three documented exceptions to the pinned `design` skill**, all at
  the owner's request: the display step for the name, the typed tagline,
  and the loading screen's motion. All recorded in `DESIGN.md`.
- **No client-side tag filtering.** An earlier one set `hidden` on rows,
  which an author-origin `display: grid` silently overrode, and it
  `pushState`d a tag URL onto the index's own DOM. Chips are plain links
  to static archives. Reasoning is in `DESIGN.md` under Tags.
- **Project titles link to the project's primary URL.** P1 has no link
  on purpose, the SEAOIL system is internal with nothing public to
  verify it against.
- **The sketch is fine on mobile.** It looks illegible in a 1x capture
  and is not. Owner confirmed on device.
- **A "grill-me" skill exists but is broken**; its `SKILL.md` forwards
  to a `grilling` skill that is not installed. Answer directly instead.

## Gotchas that cost real time

- **The content index lives at `node_modules/.astro/data-store.json`,
  not `.astro/`.** Clearing it while a dev server runs makes every post
  404 while the files sit untouched on disk. It looks exactly like
  deleted content and is not. Restart the server. This happened three
  times in one session and alarmed the owner once.
- **`astro dev stop` can report "No dev server is running" while an
  orphan still holds port 4321.** Find it with
  `ss -lptn 'sport = :4321'` and kill it, or the next start silently
  moves to 4322.
- **Long-lived dev servers go bad.** After a compile error the server can
  keep serving a page whose client script is missing while `status`
  reports "running". If `npm run build` passes but the dev server
  misbehaves, it is the dev server.
- **`astro.config.mjs` edits need a restart.** A stale server left
  `Astro.site` undefined and took the site down with `Invalid URL`.
  `BaseHead.astro` guards it now; restart anyway.
- **Astro's `<Image>` is not a literal `<img>` in source**, so
  impeccable's live picker cannot scaffold it.
- **Vercel** had two separate blockers to being publicly reachable, both
  resolved: SSO was on by default, and renaming the project did not
  attach the short `.vercel.app` domain until added under Settings →
  Domains.

## To do, the owner's list

1. **Update the look of the blog.** Substantially done. Header reworked,
   dead filter removed, chips fixed. Still open is amplitude: the blog
   carries zero designators and zero spec tables against the homepage's
   16 and 6. Note the pattern that works; he answers precisely when
   asked about a *named element*, and not at all when asked "how should
   it look".
2. **Write one post.** *His to write, not the assistant's.* Drafting in
   his voice would be inventing content. Offer to edit, structure, or set
   up the file, never to author it. `src/content/_post-template.md` is
   the starting point.
3. **Put more information onto the site.** Scope needed. Candidates the
   résumé supports: the SEAOIL internship as employment rather than only
   a project, the self-taught languages line, the Extended Essay
   abstract, more UBC Rocket detail. Adding a homepage section is a real
   change to the content spec in CLAUDE.md, ask first.

## Open findings, measured, not yet addressed

From a quantitative mobile audit at 390px. Ranked by what the reader
loses:

1. **§3 Projects is 64% of the document.** Every project row except P5
   is taller than one phone viewport. P1's summary alone is a 300px
   unbroken 20px paragraph, the opposite of "skim first, depth second".
2. **The footer is 325px of duplicated metadata** at the bottom of every
   page, half a phone screen, printing the same Rev/date already in
   the hero. `max-width: 26rem` is inoperative at 342px and it has no
   media queries at all.
3. **`--t-display` never leaves its 40px floor below a 571px viewport**,
   so on every phone the name renders the same size as the word "Blog".
   The one gesture above the pinned scale does not happen on mobile.
4. **The blog masthead avatar** spends 26% of the width and squeezes the
   lede to 25 characters per line.
5. **`/blog` spends 43% of its height on non-posts**, 435px of
   header/masthead/filter plus a 325px footer around five entries.
6. **The blog index is uniformly weighted.** Every post title is 20px
   with no lead. `DESIGN.md` documents graded legibility for projects and
   for credentials; the blog never got it.
7. **Breakpoints are desktop-first** (`max-width`), against the pinned
   brief's "mobile is the default case". Inverting five files is churn
   with no visual change, worth doing only alongside other work there.
8. **`/404` is the best-composed mobile page on the site**, almost
   exactly one viewport tall. Worth studying as a target for the others.

## What shipped on 1 Sep

Three commits, all live and verified against the deployed CSS.

`4cc6807`, the loading screen; the tag filter rewritten as plain links
to static archives; blog masthead; email as text on the homepage; nav
hover in the accent; `.chip` promoted to one primitive (hover 4.16:1 ->
6.60:1, border 1.80:1 -> 3.01:1); post rows made real click targets; tag
hrefs URL-encoded; a 404 page; an empty state; loader art requantised to
32-colour palette PNGs (46.2KB -> 11.7KB, ~34KB off every page load); all
20 hover rules guarded; safe-area insets; a 320px overflow fixed.

`8e2b4f5`, `scripts/shots.sh`; chips slimmed back to printed density
(the 44px target is now an invisible `::after`, not a painted box); the
typed tagline stopped moving the page (`min-height: 3.75em`, measured,
all six terms settle at three lines from 1440px to 320px, so it costs
nothing); `:active` restored on touch after the adapt pass buried it
inside `@media (hover: hover)` and killed all nav tap feedback; the hero
tightened so the NOI credential clears the fold; the lead credential
takes the 28px step; `.spec` stacks key over value below 30rem; touch
users get permanent underlines on credential and project-title links.

`db43178`, project rows aligned to one left edge. There were three: the
title indented ~50px as a flex sibling of its designator, the summary
flush left, the params table inset 8px. `.project-body` is a grid with
the designator in a gutter; below 40rem the gutter collapses.

Two of these were owner-reported from his phone, and one, the `:active`
regression, was introduced by an earlier pass in this same session.
Both facts argue the same thing: screenshot it, and let him look.
