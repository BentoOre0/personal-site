# Design

The visual world for this site. PRODUCT.md owns product truth; this file
owns durable visual decisions. The project's `design` skill is the pinned
brief and outranks everything here.

## World

**The Datasheet.** The site is a component datasheet: title block, a
features column, a specifications table, numbered figures with captions,
and a revision block at the foot.

It was chosen because it is the one document format that holds
heterogeneous evidence without apologising for it. Robotics, PCB work,
CAD, an AI automation MVP, and a national competitive-programming rank
have nothing in common as disciplines and sit together naturally as
*specified facts about one part*. Breadth reads as range, not as scatter.

It is also the audience's native document. A recruiter screening for
software roles, and any engineer they forward the page to, has read a
thousand of these.

### What this world is not

- **Not a joke.** No "absolute maximum ratings" applied to a person, no
  pin diagrams of a human being. The grammar is borrowed; the facts are
  real. The format wears thin the instant it winks.
- **Not circuit-board decoration.** No trace artwork, no PCB wallpaper,
  no component clip-art. Every mark on the page labels something real
  or it is deleted.

### Figures carry the evidence

Datasheets have numbered figures, so photographs have a native home:
`Fig. N` with a caption and a parameter table. Hardware entries show a
photograph; software entries show a chart or architecture diagram in the
same slot, at the same size, under the same numbering. This is why the
world was viable at all — the alternative directions had no grammar for
a photograph.

Photographs are unshot at time of writing, so each empty figure slot
states the shot it needs: aspect ratio, view, and lighting. The plate is
a spec, not a grey box.

## Palette

Four colors, per the pinned brief. Nothing else is declared; rules and
washes are derived from `--muted` with `color-mix` so the count holds.

| Token | Value | Role |
|---|---|---|
| `--paper` | `#ffffff` | ground — the page is printed paper |
| `--ink` | `#101418` | foreground, near-black, never pure black |
| `--muted` | `#6f757d` | secondary text, labels, rules (4.65:1 on paper) |
| `--accent` | `#e51b23` | links, marks, and tags (4.65:1 on paper) |

The accent is sampled from the red X in the owner's own sketch
(`#ec1c24`), darkened the minimum needed to clear 4.5:1 on white. It
clears AA for text and nothing more: it must never carry a hairline or
a control boundary on its own, which needs 3:1 and the 35%-tinted chip
border does not reach.

It is **not** links-only, despite what earlier drafts of this file said.
It also paints the rotating term, the caret, the contact glyphs, the
revision stamp, and every tag chip. What keeps that from becoming
confetti is rank, not restraint: the homepage's accent spans 28px and
14px, so the small marks sit under a large one. Any surface that uses
the accent only at 14px reads as speckle — the blog index currently
does, with eleven resting accent marks against the homepage's eight.

Light only, committed. The use scene is a recruiter skimming on a laptop
in daylight, and the world is a printed document. No dark theme; if that
is ever wanted it is a deliberate reversal, not an addition.

## Type

One superfamily: **Geist** and **Geist Mono**, self-hosted variable
woff2 (`400 700`) via Astro's local font provider. The mono is the sans's
sibling, not a second family, so the one-typeface rule survives.

Geist Mono carries measured and specified values only — project titles,
spec tables, labels, designators, tags. It is never a costume for
"technical" applied to running prose.

Scale is `14 / 16 / 20 / 28 / 40`, no intermediate sizes, plus one
display step above it for the name alone:

- `--t-display` `clamp(40px, 7vw, 72px)` — the name, once per page.
  This extends the pinned scale at the owner's request; nothing else on
  the site may use it.


- `--t-xl` 40 — the name, once per page
- `--t-lg` 28 — the tagline and the lead project title
- `--t-md` 20 — section headings, lead paragraphs, project titles
- `--t-base` 16 — body, 1.6 line height
- `--t-xs` 14 — labels, tables, figure captions, metadata

Body measure caps at 68ch; summaries at 60ch.

## Structure

- One uniform hairline (`1px`, `--rule`) divides everything. There is no
  second border weight anywhere on the site.
- Depth comes from overlap and flat value steps. **No shadows and no
  gradients**, anywhere, including cards and images.
- Spacing is a 4px grid (`--s-1` … `--s-8`); sections are separated by
  48px or more.
- `--measure` 720px for text, `--wide` 960px for the sheet and project
  rows. Single column. Mobile is the default case.

### Graded legibility

The project list compresses as it descends: the lead entry is set at 28px
with full-strength body copy, the middle entries at 20px in muted, the
last at 16px. Impact order is visible in the typography itself, so the
list does not shout uniformly. Ordering is by impact, per CLAUDE.md —
never grouped by discipline, never by date.

### The typed tagline

The tagline is two rows: a fixed stem ("Engineering physics student
building") above a typed line that cycles through the terms in
`IDENTITY.rotating`. Each term types in at ~62ms per character, rests
1.9s with the caret blinking, erases at ~34ms, beats, then the next.
The caret is solid while characters move and blinks only at rest.

Splitting stem from typed line means the block never reflows as
characters are added and removed. `prefers-reduced-motion` disables the
cycle and the blink, leaving the first term static; with JavaScript off
the first term is server-rendered, so the line is never empty.

This overrides the pinned ban on typewriter text, at the owner's explicit
request. It is the only autonomous motion on the site. An earlier
hover-to-type effect on project titles was built and removed as too
noisy; project titles are now plain.

### Section marks

`§1`–`§4` sit *after* their headings as permalink anchors, not as eyebrow
kickers above them. They are cross-reference handles that actually
resolve; if they ever stop linking, delete them.

## Components

- `.legend` — tracked uppercase 14px label naming a field, column, or figure.
- `.designator` — reference handles (`P1`, `AN-003`, `§2`, `Fig. 1`).
- `.spec` — the parameter table: hairline rows, tabular figures, uppercase
  row headers in muted.
- `.sheet` / `.column` — the 960 and 720 measures.
- `.plate` — an unshot figure slot printing its own shot spec.

## Motion

Nothing moves without user input — a pinned rule and a hard constraint.
Two documented exceptions carry autonomous motion: the typed tagline,
and the loading screen (`Loader.astro`), where an indicator that does
not move is not an indicator. The loader runs three layers on separate
clocks — the figure trots at 660ms, the notes bob at 900ms, the Z's
jitter at 420ms on `steps()` so they snap rather than glide — and exits
by sliding the whole sheet up, never by fading. Both are off entirely
under `prefers-reduced-motion`, and the overlay carries a 6s CSS
failsafe so a dead script cannot seal the page shut.
The only transitions are 120ms ease-out color and underline changes on
hover and focus. `prefers-reduced-motion` is honoured globally.

## Browser surfaces

Themed from the palette rather than left to defaults: selection, caret,
focus ring (2px accent, 2px offset), scrollbar, underline offset and
thickness, and tabular numerals in all data.

### The title block

Name and tagline sit left; the sketch is anchored top-right at a fixed
200px and does not move as the text grows. Beneath both, one row holds
the contact links on the left and the revision stamp on the right, set
as a single quiet mono line at 14px. The stamp was originally a
three-row block beside the sketch and was reduced — it is reference
metadata, not a headline, and the footer carries it in full.

### One title, two roles

`/blog` sets its `h1` in the sans; a tag archive sets its `h1` in the
mono. That is not drift. The word "Blog" is a section name, and a tag
is a literal value — and mono carries measured and specified values.

### The blog masthead

The avatar sits left at a fixed 96px (72px under 40rem), vertically
centred against `Blog` and its one-line subtext to the right. There is
no rule beneath it: a hairline there cut the title off from the list it
introduces, and the drawing had nothing to attach to.

It does not resize on scroll. A scroll-linked shrink was built and
removed — scroll is user input, so it did not break the motion rule,
but at masthead scale the drawing overpowered a 40px title and the
movement bought nothing the fixed size does not already give.

## Naming

Headings use plain language matching the content structure in CLAUDE.md:
**Credentials, Details, Projects, Blog**. The datasheet framing survives
in the document's structure — features column, spec tables, numbered
figures, revision block — not in its labels. Earlier drafts called the
blog "Application notes"; it was dropped because the reference did not
land, and wayfinding must never be a puzzle for someone with eight
seconds.

## Tags

Posts carry optional `tags` in frontmatter. Each tag gets a static
archive at `/blog/tags/<tag>/`. Tags render as hairline-outlined mono
chips at 14px in the accent, filling solid when current.

**Filtering is navigation, not state.** `TagFilter.astro` renders the
bar on both `/blog` and every tag archive, and every chip is a plain
link to a page that already exists. There is no client-side filter: an
earlier one set `hidden` on the rows, which an author-origin
`display: grid` silently overrode, so the chips lit up and the list
never changed. Worse, it `pushState`d a tag URL onto the index's own
DOM, so the same address rendered two different pages depending on how
you reached it. `ClientRouter` already makes these navigations
client-side, so the links cost nothing and cannot disagree with the URL.

`.chip` is one primitive in `global.css`, shared by the filter bar and
by a post's own tag list. It replaced two near-identical components
with different padding, radius, and hover. Measured on paper:

| State | Value | Ratio |
|---|---|---|
| label, rest | `--accent` | 4.65:1 |
| label, hover | `accent 72% + black` on `--accent-wash` | 6.60:1 |
| border | `accent 65%` | 3.01:1 |
| current (`.is-on`) | `--paper` on `--accent` | 4.65:1 |

The border sits at 65% because a control boundary needs 3:1; the
earlier 35% measured 1.80:1 and drew nothing. Hover darkens the label
rather than holding the accent, which measured 4.16:1 against its own
wash and failed AA.

## Placeholder discipline

The document is stamped `PRELIMINARY` with a revision number while
content is incomplete, and unfilled values read `TBD` — both native to
the format, so honesty costs the design nothing. All page content lives
in `src/data/profile.ts`, with every placeholder marked. All five
credentials on the page are now confirmed and sourced from the résumé
of 25 Aug 2026; `IDENTITY.resume.href` is the one field still unfilled.
Nothing on this site may be invented to fill a gap.

The blog is the one surface where that rule is currently broken, and
not by the design: `src/content/blog/` still holds four Astro demo
posts whose bodies are Lorem ipsum and whose tags — `embedded`,
`robotics`, `algorithms` — are invented. They are live and syndicated
through `rss.xml`.
