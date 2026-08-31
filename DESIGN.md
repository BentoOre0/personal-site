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
| `--accent` | `#1b4f9c` | links only (7.9:1 on paper) |

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
chips at 14px, muted until hover.

## Placeholder discipline

The document is stamped `PRELIMINARY` with a revision number while
content is incomplete, and unfilled values read `TBD` — both native to
the format, so honesty costs the design nothing. All page content lives
in `src/data/profile.ts`, with every placeholder marked. The only
confirmed credential currently on the page is IOI Camp Philippines,
top 4 nationally. Nothing on this site may be invented to fill a gap.
