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
world was viable at all, the alternative directions had no grammar for
a photograph.

Most photographs are unshot at time of writing, so each empty figure slot
states the shot it needs: aspect ratio, view, and lighting. The plate is
a spec, not a grey box.

Fig. 1 is filled and is the exception that proves the grammar holds: it is
a 1:1 poster on kraft paper, not a 16:9 screenshot, and it is the only
warm ground anywhere on the site. A figure is allowed its own colour
because it is evidence rather than chrome; the four-colour rule governs
the page around it, not what a photograph happens to contain.

**A figure carries the number of the row it documents.** Fig. 4 sits in P4.
The count used to be its own sequential counter that only incremented on
rows which actually had a figure, so the printed numbers never skipped;
that bought contiguity and paid in desynchronisation. P3 has no figure, so
P4 read "Fig. 3", P5 read "Fig. 4", and by P7 the two handles were two
apart with nothing on the page to explain why. The drift grows with every
figure-less row added above.

A gap explains itself and a desync does not. No Fig. 3 says "P3 has no
picture", which is true and visible one row up. Two numbering systems
became one, and panels letter off it: Fig. 4(a), Fig. 4(b).

A figure can hold more than one panel. Two or more sit side by side where
there is room and stack where there is not, sharing the figure's `ratio`
so a collage of mismatched crops is not possible by accident. Panels are
lettered from position, `Fig. 5(a)`, like every other designator here.

`cycle` shows one panel at a time instead, and the choice between the two
is legibility, not taste. In a 30rem figure a two-panel collage gives each
about 232px, which is fine for a poster and useless for a field of specks.

`wide` lets a figure run to the full sheet, and is for diagrams only. A
diagram carries type of its own, and type inside a picture does not
reflow: the SEAOIL state machine's fourteen labelled boxes land at about
five pixels each at 30rem, at which point the figure is decoration. A
photograph never needs this, having no small type to lose.

### A figure buys words back

**A row that shows something says less.** The picture is the evidence, so
the prose stops at what the picture cannot say: what the thing is, and
which part of it is his. Everything past that is depth, and depth lives in
the repository the title already links to. The site shows; GitHub tells.

Concretely, a row with `plates` gets **two sentences**. A row whose figure
is still a `spec`, or is `null`, carries the whole claim in prose and may
run longer, because nothing else in the row is carrying it.

The `params` table is not prose and does not count against the two. It
already names the stack, so a summary that also names the stack is saying
it twice. Clifford's summary ran six sentences listing the Teensy, the
Nano, the config header and the bit-banged PS2 protocol while its own
Stack row printed all four a few lines below; it is two sentences now.
GravSim opened "in Python and Pygame" against a Stack row reading
"Python · Pygame · NumPy", and closed by describing the live quadtree that
Fig. 5(a) is *literally animating* beside it.

**One exception, at the owner's request: SEAOIL.** It needs none under the
rule as written, having no figure at all, but it is worth naming: the
deployed system is internal, so there is no artifact to photograph and
nothing public to click through to. Prose is the only evidence that row
has, and it keeps its three sentences.

Applied across §3 this cut the eight summaries from 2,646 characters to
1,639, a 38% cut, with no sentence rewritten. Every remaining word is the
owner's own; the edit was deletion, never paraphrase.

## Palette

Four colors, per the pinned brief. Nothing else is declared; rules and
washes are derived from `--muted` with `color-mix` so the count holds.

| Token | Value | Role |
|---|---|---|
| `--paper` | `#ffffff` | ground; the page is printed paper |
| `--ink` | `#101418` | foreground, near-black, never pure black |
| `--muted` | `#6f757d` | secondary text, labels, rules (4.65:1 on paper) |
| `--accent` | `#e51b23` | links, marks, and tags (4.65:1 on paper) |

The accent is sampled from the red X in the owner's own sketch
(`#ec1c24`), darkened the minimum needed to clear 4.5:1 on white. It
clears AA for text and nothing more: it must never carry a hairline or
a control boundary on its own, which needs 3:1 and the 35%-tinted chip
border does not reach.

**The base rule is `a { color: var(--accent) }` in `global.css`.** Red is
what you can click, and almost every red mark on the site is red by
inheriting that. It is *links-first*, not links-only: four things carry it
deliberately without being links, and each one is a control or a stamp,
never running prose.

- the rotating term and its caret
- the contact glyphs and the revision stamp
- the disclosure arrow on a foldable credential, `\25B8` / `\25BE`
- `P1`'s designator, and only P1's

Counted from the built CSS, that is **28 resting marks** on the homepage.

**Three things were tried in the accent on 3 Sep and taken back out**, and
the reasons are worth keeping because each is a different failure:

- **Figure captions and panel labels.** Six captions and three labels put a
  red block under every figure in §3, and a caption sits directly above the
  summary, so the two competed. Too much of it.
- **All eight project designators.** One mark is enough to stop §3 reading
  flat, and on P1 it agrees with the emphasis the type scale and the figure
  grade already give that row. Eight was noise, one is a landmark.
- **The credential notes, and this is the instructive one.** It inverted
  the site's own colour rule. "Top 20 nationally for three consecutive
  years" is not a label or a handle, it is the substantive supporting fact,
  and it sat in the same red as every link while the credential title above
  it, which *is* a link, sat in black. Seven red non-links over five black
  links. A reader who learned "red means clickable" from the nav and the
  contact row was being taught the opposite by §1.
- **The section-head rules.** Legal (the accent is 4.65:1, past the 3:1 a
  non-text boundary needs) and still wrong: a hairline running the full
  width of the sheet is the largest mark on the page by area, and it pulled
  rank over the headings it was carrying.

The test that survives all four: **the accent marks what you can click, plus
a small closed set of stamps and controls.** Anything else that wants to be
red is prose, and prose does not get it.

### Links are underlined at rest

On every pointer type, at `color-mix(in srgb, var(--accent) 45%,
transparent)`, going to full accent on hover and focus.

This replaced a 0%-to-100% gradient sweep that lived inside
`@media (hover: hover)`, so a phone drew every underline and a laptop drew
none. Five credential titles and seven project titles were plain black text
with no cue at all, and clicking through to verify a claim is the
conversion this site exists for. Hover confirms now instead of discovering,
which is the right job for it. The sweep also ran 260ms against a doctrine
that allows 120ms colour and underline changes, and was invisible to
exactly the readers who most needed the cue.

It has a second effect worth naming: a credential without an `href` now
looks different from one with it. Teaching Assistant and the IB Diploma
carry no underline, and that is information rather than an oversight.

Light only, committed. The use scene is a recruiter skimming on a laptop
in daylight, and the world is a printed document. No dark theme; if that
is ever wanted it is a deliberate reversal, not an addition.

## Type

One superfamily: **Geist** and **Geist Mono**, self-hosted variable
woff2 (`400 700`) via Astro's local font provider. The mono is the sans's
sibling, not a second family, so the one-typeface rule survives.

Geist Mono carries measured and specified values only, project titles,
spec tables, labels, designators, tags. It is never a costume for
"technical" applied to running prose.

Scale is `14 / 16 / 20 / 28 / 40`, no intermediate sizes, plus one
display step above it for the name alone:

- `--t-display` `clamp(40px, 7vw, 72px)`, the name, once per page.
  This extends the pinned scale at the owner's request; nothing else on
  the site may use it.


- `--t-xl` 40, the name, once per page
- `--t-lg` 28, the tagline and the lead project title
- `--t-md` 20, section headings, lead paragraphs, project titles
- `--t-base` 16, body, 1.6 line height
- `--t-xs` 14, labels, tables, figure captions, metadata

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

The credential list leads with one step above the rest: the first entry
is set at 28px, the others at 20px. The list is ordered most-impressive
first, so the lead entry is the hook PRODUCT.md names; it had been set
identically to the last credential.

The project list compresses as it descends: the lead entry is set at 28px
with full-strength body copy, the middle entries at 20px in muted, the
last at 16px. Impact order is visible in the typography itself, so the
list does not shout uniformly. Ordering is by impact, per CLAUDE.md,
never grouped by discipline, never by date.

**Figures grade with the type.** Every figure was 30rem, so P1's square and
P2's square were identical and the second row shouted exactly as loudly as
the lead, which is the one thing the descent exists to prevent. The lead
figure keeps 30rem; every figure below it steps back to 24rem. Above 60rem
the figure moves into a fixed track and the pair becomes 22rem and 18rem,
see "Text left, artifact right". Not applied
below 52rem: the figure is already capped at 20rem there, and on a phone
you never see two of them at once, so the clash does not exist and
shrinking further would only cost legibility. `wide` is excluded, since a
wide figure is wide to keep its own type readable, which has nothing to do
with rank.

### Text left, artifact right

Above 60rem a project row is three columns: the designator in its gutter,
the text, and the figure on the right. Below that it collapses to the
single stacked column, unchanged.

§3 was eight blocks hard against the left edge with about 370px of the
960px sheet left white down the whole section, and the hero already puts
the sketch on the right, so the projects were the one part of the page not
using the width it had.

**This was built once before as a float and reverted, for a real reason.**
A float put the figure after the summary, params and links in source
order, so on a phone the picture landed at the bottom of the block it was
there to introduce. Grid placement has none of that cost: the DOM order is
untouched, still title, figure, summary, params, links, which is what a
screen reader announces and what a phone renders. Only the painted
position moves, and only where there is room for it.

Two details that are load-bearing:

- **The figure track is a fixed 22rem on every row, including rows with no
  figure.** Sized `auto` it took the figure's own max-width and squeezed
  P1's summary to about 35 characters; omitted on figure-less rows it let
  P3 and P8 run the full 914px while their neighbours sat at 300, and §3
  came out ragged down the right. Fixed and always present, every row's
  text column is 530px, near the 60ch the summary is capped at anyway.
- **The span is `1 / span 12`, not `1 / -1`.** There is no
  `grid-template-rows` here, so `-1` resolves against an explicit grid that
  does not exist, the figure collapses into the title's row and stretches
  it.

`.params` runs to 38rem rather than 24rem in the same pass. The key column
is `width: 1%` and `nowrap`, so every extra rem goes to the value, and at
24rem a value as short as "Sole developer · direction and review" wrapped
to two lines for the sake of a few characters. It costs nothing on a
phone: 24rem is 384px and the content column at 390px is already narrower,
so the cap was inoperative there, and below 30rem the row stacks key over
value regardless.

### A row is a smaller break than a section

`.section` carries `padding-block: var(--s-6)`, so two sections sit 96px
apart. `.project` carried `--s-6` as well, so two rows *inside one list*
sat 96px apart too, and §3 stopped reading as a list of eight things and
started reading as eight loose sections. The row is `--s-4` now, 48px
between rows against 96px between sections, and the hierarchy is the right
way up again.

Shortening the summaries is what made the old value indefensible rather
than merely generous: the same air around 38% less text reads as sparse,
not as calm. The tail rule at `:nth-child(n + 7)` moved from `--s-4` to
`--s-3` for the same reason, since `--s-4` had become the base and the rule
had quietly stopped doing anything.

### The typed tagline

The tagline is two rows: a fixed stem ("Engineering physics student
building") above a typed line that cycles through the terms in
`IDENTITY.rotating`. Each term types in at ~62ms per character, rests
1.9s with the caret blinking, erases at ~34ms, beats, then the next.
The caret is solid while characters move and blinks only at rest.

Splitting stem from typed line does **not** prevent reflow; they share
one line box and wrap together. Measured with Geist, every term fills
three lines from 1440px down to 320px, but the half-typed states are
shorter, so the block grew and shrank a line every couple of seconds
and moved the whole page with it. `.tagline` now reserves `min-height:
3.75em`. Because the settled state is three lines at every width, the
reserve costs nothing. `prefers-reduced-motion` disables the
cycle and the blink, leaving the first term static; with JavaScript off
the first term is server-rendered, so the line is never empty.

This overrides the pinned ban on typewriter text, at the owner's explicit
request. It is the only autonomous motion on the site. An earlier
hover-to-type effect on project titles was built and removed as too
noisy; project titles are now plain.

### Project rows hang from their designator

`.project-body` is a two-column grid: the `P1`–`P5` designator sits in a
gutter and the title, summary, parameter table and links all share the
content column's left edge. The title used to be a flex sibling of the
designator, which indented it ~50px while everything beneath it stayed
flush left, invisible at desktop width where the title fits one line,
and obvious on a phone where it wraps to three. The `.spec` inset is
zeroed inside a project for the same reason.

Below 52rem the gutter is dropped and the designator takes its own line:
full measure matters more than the hanging indent at 342px, and
everything still shares one edge.

### Section marks

`§1`–`§4` sit *after* their headings as permalink anchors, not as eyebrow
kickers above them. They are cross-reference handles that actually
resolve; if they ever stop linking, delete them.

## Components

- `.legend`, tracked uppercase 14px label naming a field, column, or figure.
- `.designator`, reference handles (`P1`, `AN-003`, `§2`, `Fig. 1`).
- `.spec`, the parameter table: hairline rows, tabular figures, uppercase
  row headers in muted.
- `.sheet` / `.column`, the 960 and 720 measures.
- `.plate`, an unshot figure slot printing its own shot spec.

## Motion

Nothing moves without user input, a pinned rule and a hard constraint.
Four documented exceptions carry autonomous motion, each at the owner's
request: the typed tagline; the loading screen (`Loader.astro`), where an
indicator that does not move is not an indicator; the closing note at the
foot of `/blog` (`QuoteBar.astro`), one quote at a time on a 7s hold and a
400ms cross-fade; and project figures (`Figure.astro`), which may hold an
animation and may cycle between panels on an 8s hold.

All four are off under `prefers-reduced-motion`. The figures are the only
one where the browser does it rather than a script: an animated panel is a
`<picture>` whose animated `<source>` carries
`media="(prefers-reduced-motion: no-preference)"`, so a reader who has
asked for less motion is served the still and never downloads the
animation at all. The loader runs three layers on separate
clocks, the figure trots at 660ms, the notes bob at 900ms, the Z's
jitter at 420ms on `steps()` so they snap rather than glide, and exits
by sliding the whole sheet up, never by fading. Both are off entirely
under `prefers-reduced-motion`, and the overlay carries a 6s CSS
failsafe so a dead script cannot seal the page shut.
The only transitions are 120ms ease-out color and underline changes on
hover and focus. `prefers-reduced-motion` is honoured globally.

### Evidence folds, it is not spent

A credential may carry verbatim passages from the bodies that run the
things it names. The note itself becomes the control, with a small arrow
after it in the accent, `\25B8` closed and `\25BE` open.

The reasoning is proportion. The quotations are longer than the credential
they support, so left open they invert the weight of §1 and the list stops
being skimmable. Folded, they cost the reader an arrow.

Putting the arrow on the note rather than on a labelled row of its own is
what keeps the cost that low: the disclosure takes no extra line, and the
target is a whole line of text instead of a glyph. The summary carries
`padding-block` for touch with an equal negative margin, so a credential
with a disclosure sits exactly where one without it does.

The marker is drawn rather than the platform triangle, and swapped rather
than rotated, because a glyph change reads as a state change without
motion. The summary is `width: fit-content`; a summary is
`display: list-item` and would otherwise span the column, so a stray click
anywhere on the row would toggle it.

`<details>` carries no script, and opening on a click is user input, so
this adds no further exception to the motion rule.

### The closing note

A quote at the foot of `/blog`, centred, at `--t-base` in the muted
colour, with no rule above it and no label. It is the quietest block on
the site on purpose: it follows the post list and must not compete with
it, so the separation is `--s-8` of space rather than a line.

Every quote occupies the same CSS grid cell, so the block is as tall as
the longest of them and cycling cannot move the page. This is the same
problem the typed tagline solves with a measured `min-height`, solved
without the measurement, so it holds at any width and survives an edit to
the quotes.

The author sits inside the quote and fades with it, so a second author's
words bring their own name. Hidden quotes are `visibility: hidden`, not
merely transparent, which keeps them out of the accessibility tree and out
of a text selection. The first quote carries its `is-on` class from the
server, so with no JavaScript, or under `prefers-reduced-motion` where the
script deliberately never starts, the note is a static blockquote rather
than an empty box.

## Browser surfaces

Themed from the palette rather than left to defaults: selection, caret,
focus ring (2px accent, 2px offset), scrollbar, underline offset and
thickness, and tabular numerals in all data.

### The title block

Name and tagline sit left; the sketch is anchored top-right at a fixed
200px and does not move as the text grows. Beneath both, one row holds
the contact links on the left and the revision stamp on the right, set
as a single quiet mono line at 14px. The stamp was originally a
three-row block beside the sketch and was reduced; it is reference
metadata, not a headline, and the footer carries it in full.

### One title, two roles

`/blog` sets its `h1` in the sans; a tag archive sets its `h1` in the
mono. That is not drift. The word "Blog" is a section name, and a tag
is a literal value, and mono carries measured and specified values.

### The blog masthead

The avatar sits left at a fixed 96px (72px under 40rem), vertically
centred against `Blog` and its one-line subtext to the right. There is
no rule beneath it: a hairline there cut the title off from the list it
introduces, and the drawing had nothing to attach to.

It does not resize on scroll. A scroll-linked shrink was built and
removed, scroll is user input, so it did not break the motion rule,
but at masthead scale the drawing overpowered a 40px title and the
movement bought nothing the fixed size does not already give.

## Touch

Screen width does not tell you input method, so touch adaptations key
off `pointer`/`hover`, never a width breakpoint.

- Every hover rule sits inside `@media (hover: hover)`. `:active` must
  stay **outside** it: a tap has no hover to fall back on, and burying
  `:active` there leaves a touch device with no feedback at all.
- Chips get a 44px hit area from a transparent `::after`, not from
  `min-height`. Painting a 44px box around 14px type reads as a button
  and leaves the label adrift.
- Links that announce themselves only on hover are invisible on a phone.
  Credential and project-title links draw their underline permanently
  under `@media (hover: none)`.
- Below 30rem the `.spec` table stacks key over value. Two columns pin
  the key at 38% of the row and collapse the value to ~14 characters.

## Naming

Headings use plain language matching the content structure in CLAUDE.md:
**Credentials, Details, Projects, Blog**. The datasheet framing survives
in the document's structure, features column, spec tables, numbered
figures, revision block; not in its labels. Earlier drafts called the
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

### The foot of the page, on a phone

Below 40rem the revision block collapses from a three-row `.spec` table to
one line: `Rev 0.2 · PRELIMINARY · 2026-09-01`. The table is
`display: none`, so it leaves the accessibility tree rather than being read
twice.

It was 325px of metadata, half a phone viewport, spelling over four
labelled rows the same Rev and date the hero already carries. `max-width:
26rem` is inoperative at 342px and the component had no media queries at
all, so after eight viewports of §3 the last thing a reader saw was a
version number, at length.

The end of the page is still metadata rather than an invitation. Collapsing
it is the cheap half; the other half is a closing contact line, and that is
not built.

## Placeholder discipline

The document is stamped `PRELIMINARY` with a revision number while
content is incomplete, and unfilled values read `TBD`; both native to
the format, so honesty costs the design nothing. All page content lives
in `src/data/profile.ts`, with every placeholder marked. All five
credentials on the page are now confirmed and sourced from the résumé
of 25 Aug 2026; `IDENTITY.resume.href` is the one field still unfilled.
Nothing on this site may be invented to fill a gap.

The blog is the one surface where that rule is currently broken, and
not by the design: `src/content/blog/` still holds four Astro demo
posts whose bodies are Lorem ipsum and whose tags, `embedded`,
`robotics`, `algorithms`, are invented. They are live and syndicated
through `rss.xml`.
