# Handoff — 1 Sep 2026

State of the site after the redesign session of 31 Aug / 1 Sep 2026,
updated after the blog session later on 1 Sep (see "Blog session" below).
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

1. **Update the look of the blog.** Partly done — see "Blog session".
   The header was reworked and the dead filter removed. Still open is the
   amplitude work the critique identified: the blog carries zero
   designators and zero spec tables against the homepage's 16 and 6.
   Note the pattern that worked: he answers precisely when asked about a
   named element, and not at all when asked "how should it look".
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


## Blog session — 1 Sep, later

`npm run build` passes, 11 pages. Nothing below is committed yet.

**Homepage.** The email contact is now the address as text
(`jahysocials@gmail.com`) rather than an envelope glyph; a contact is
either an `icon` or a `text` string in `IDENTITY.links`, and the unused
`email` path is gone from `Icon.astro`. Nav hover moved from `--ink` to
`--accent`, so Home/Blog go red on hover like the wordmark. One
consequence: hover and current-page now share a colour, and only the red
underline distinguishes "you are here".

**The tag filter was inert and is now deleted.** `item.hidden = true` did
nothing, because `.index li { display: grid }` at author origin overrides
the UA's `[hidden] { display: none }`. Chips lit up, the URL changed, the
list never moved. `TagFilter.astro` now renders the bar on both `/blog`
and every tag archive, as plain links to pages that already existed.
Deleting the script also removed a `popstate` handler that leaked on
every ClientRouter navigation. **Do not reintroduce client-side
filtering**; the reasoning is recorded in DESIGN.md under Tags.

**The blog masthead** is the avatar left at a fixed 96px, vertically
centred against `Blog` and its subtext to the right, no rule beneath.
Three layouts were tried and rejected on the way: avatar below the rule
(it belonged to the lede, not the heading), avatar centred above the
title, and a scroll-driven shrink from 300px. The shrink was legal —
scroll is user input, not autonomous motion — but the drawing overpowered
a 40px title. Note `avatar.png` is only 320x309, so anything above about
300px CSS is upscaled.

**An `/impeccable critique` ran on the blog** (dual-agent; detector clean,
zero findings on all five files; no browser automation available in the
session). Snapshot in `.impeccable/critique/`. Findings still open:

1. **The four demo posts stay — the owner wants a template blog.** He
   said so directly ("i want a template blog why did you kill it") after
   a test run made them briefly 404. Do not propose deleting them again.
   The critique rated them the site's biggest problem (Lorem ipsum, live
   at the public URL, RSS-syndicated, invented tags) and that assessment
   stands on the merits — but it is decided, and re-raising it wastes his
   time. If he ever does clear them, `/blog` now has a real empty state.
2. **The amplitude gap is furniture, not type size.** At 390px the
   homepage and blog `h1` are both 40px. The homepage carries 16
   designator marks and 6 spec tables; the blog carries none.
3. **The blog has more red than the homepage** — 11 resting accent marks
   against 8 — and all of it is 14px. It needs one accent mark *above*
   14px, not fewer marks.
4. `.chip` hover is 4.16:1 and fails AA; `TagList`'s equivalent is correct
   at 6.94:1. The two chip components should be one primitive.
5. `.head` and `.index` on `/blog` are uncapped, so text runs to ~880px
   against the 720px rule. `[tag].astro` already caps correctly.

**Docs corrected this session:** DESIGN.md's accent row said `#1b4f9c` at
7.9:1, "links only" — the shipped value is `#e51b23` at 4.65:1 and it
paints far more than links. PRODUCT.md described the repo as the
unmodified Astro starter and cited a superseded credential.

**Gotcha to add to the list:** a subagent stopped the dev server when it
finished measuring, which took localhost down mid-session. If localhost
dies for no apparent reason, check `npx astro dev status` before
debugging any code.


## Polish / harden / optimize — 1 Sep, later still

Three impeccable passes after the critique. `npm run build` passes,
12 pages.

**Polish.** `.chip` is now one primitive in `global.css` instead of two
near-identical components; hover went from 4.16:1 (failed AA) to
6.60:1, and the border from 1.80:1 to 3.01:1, the floor for a control
boundary. Post rows wash on hover and now genuinely are the click
target — the title's link is stretched over the row, with the tags
lifted above it. The loader lost its animated ellipsis: it animated the
`content` property, which Firefox does not animate, so those dots never
existed for a third of visitors.

**Harden.** Real bug fixed: tag hrefs were not URL-encoded, so any tag
containing a space or `+` would link to a page that does not exist.
Added a 404 page, an empty state for a postless `/blog` (uses `.plate`,
now promoted to `global.css`), table overflow scrolling inside the
measure, and a guard so an unknown icon name renders nothing rather
than a broken `<path>`.

**Optimize.** The loader PNGs were the largest asset on every route —
larger than either font or the JS bundle — and `public/` means Astro
never touches them. Requantised to 32-colour palette PNGs, verified
pixel-identical at 2x zoom:

| | before | after |
|---|---|---|
| loader art (3 files) | 46.2 KB | **11.7 KB** |
| `/` total | 181.0 KB | **146.6 KB** |
| `/blog` total | 143.3 KB | **108.8 KB** |
| a post | 162.7 KB | **128.2 KB** |

They stay PNG on purpose — the owner asked for PNG, and palette PNG beat
lossless WebP here anyway (9.0 KB vs 18.1 KB on the body layer). Fonts
were already optimal: preloaded, `font-display: swap`, with a
metric-matched Arial fallback carrying `size-adjust` and
`ascent-override`, so a font swap cannot shift layout. Every image
carries intrinsic dimensions.

**Gotcha, third time this session.** Astro's content index lives at
`node_modules/.astro/data-store.json`, not in `.astro/`. Clearing it
while a dev server is running makes every post 404 while the files sit
untouched on disk — it looks exactly like deleted content and is not.
Restart the dev server. Also: `astro dev stop` can report "No dev server
is running" while an orphan still holds port 4321; find it with
`ss -lptn 'sport = :4321'` and kill it.


## Adapt — responsive pass, 1 Sep

**Every hover rule is now guarded by `@media (hover: hover)`** — there
were 20 and none were. On a touch device a hover style latches after a
tap, so the post-row wash, chip hover, nav hover and project-title
hover all stuck until the next tap. The primary visitor skims on a
phone, so this was the worst of the responsive defects.

**Touch targets.** Chips were ~28px tall against a 44px floor. Bumped
under `@media (pointer: coarse)` rather than at a width breakpoint, so
the printed density survives on desktop and a touch laptop still gets
real targets. Screen width does not tell you the input method.

**Safe areas.** `viewport-fit=cover` is on, and the sheet gutters, the
loader, and the footer's bottom pad now take `max(token,
env(safe-area-inset-*))` so a notch in landscape and a home indicator
do not sit on top of content.

**The loader was clipped in landscape.** `.stage` was width-bounded
only, and the art is taller than it is wide, so on a 320px-tall
landscape phone it needed ~368px. Now `min(clamp(180px, 30vw, 260px),
47vh)`: worst case is 240px of 320px.

**320px overflow.** `.stamp` is 34 mono characters — about 286px against
a 272px content box — with `white-space: nowrap`, which forced the whole
page sideways. It wraps below 30rem now, as do the `.spec` row headers.

**Not done, deliberately.** The breakpoints are still desktop-first
(`max-width`), against the pinned brief's "mobile is the default case".
Inverting five files to `min-width` is redesign-scale churn for no
visual change and real regression risk; the cost is that mobile parses
a few rules it discards. Worth doing only alongside other work in those
files.

## Mobile composition pass — 1 Sep, last

**The site can be seen now.** `/usr/bin/google-chrome` is installed, so
`./scripts/shots.sh` captures every page at 390/768/1440 with no
dependency. Every earlier pass was blind — findings came from reading
CSS — which is exactly why visual defects survived four of them. Run it
before judging any design change.

Two capture gotchas, both cost time: `--virtual-time-budget` must exceed
the loader's 1400ms hold (4000 is not enough, 12000 works), and virtual
time **freezes the typed tagline**, so two captures can never show two
different rotator terms. Also capture at `--force-device-scale-factor=3`
— a 1× capture made the DISCIPLINE sketch look illegible and the owner
correctly pointed out it is fine on his actual iPhone.

**Owner-reported, both fixed:**

1. *"The tags in the blog part for mobile are a bit chunky, way too much
   negative space."* Correct — the previous pass gave `.chip` a
   `min-height: 44px`, so 14px type floated in a fat pill. The 44px
   target now comes from a transparent `::after`; the painted chip keeps
   its desktop density.
2. *"Add padding underneath the typing part because it causes the whole
   page to move up and down."* Real and worse than it looked — 35px,
   every ~2s, mid-word. `min-height: 3.75em` on `.tagline`. Measured
   with Geist: all six terms settle at three lines from 1440 to 320, so
   the reserve costs nothing and only the half-typed states were short.

**Regression I introduced and fixed:** the adapt pass wrapped
`nav a:hover, nav a:active` together inside `@media (hover: hover)`,
which silently killed tap feedback on the whole nav. `:active` now sits
outside the hover query. Worth checking for elsewhere.

**Also in this pass:** the hero fits contacts + email + résumé on one row
and drops the duplicated revision stamp, so the NOI credential is now
fully inside a 390x844 first screen (its first line was at y=767).
The lead credential takes the 28px step. `.spec` stacks key over value
below 30rem, where two columns collapsed the value to ~14 characters.
Credential and project-title links draw their underline permanently on
touch — two of them carry the externally verifiable sources and were
indistinguishable from plain text on a phone.

**Still open, from the audit, not addressed:**

- §3 Projects is 64% of the document; every project row except P5 is
  taller than one phone viewport, and P1's summary is a 300px unbroken
  20px paragraph.
- The footer is 325px of duplicated Rev/date metadata at the bottom of
  every page — half a phone screen. `max-width: 26rem` is inoperative at
  342px and it has no media queries.
- `--t-display` never leaves its 40px floor below a 571px viewport, so
  the name renders the same size as the word "Blog" on every phone.
- The blog masthead avatar spends 26% of the width and squeezes the lede
  to 25 characters per line.
- `/404` is the best-composed mobile page on the site — one viewport
  tall. Worth looking at as a target for the others.

**Alignment fix (owner-reported, from a phone screenshot).** Project rows
had three different left edges: the title indented ~50px as a flex
sibling of its designator, the summary flush left, and the params table
inset 8px by `.spec th:first-child`. `.project-body` is now a grid with
the designator in a gutter and everything else in one content column;
below 40rem the gutter collapses and the designator takes its own line.
Verified by measuring left edges in a capture — desktop now shows
exactly two (gutter, content), mobile exactly one.
