# Adding a project

Everything on the homepage, including every project, lives in
**`src/data/profile.ts`**. You will not touch any other file to add a project.

Open it and scroll to `export const PROJECTS`. It is an ordinary array. Each
entry is one row on the page.

---

## The shape of a project

```ts
{
  title: 'Dispatch and fulfilment control system',
  summary:
    'Two to four sentences. What it is, what you did, what came out of it.',
  params: [
    { key: 'Role',  value: 'Sole developer' },
    { key: 'Stack', value: 'Node.js · NestJS · AWS serverless' },
    { key: 'Year',  value: '2025' },
  ],
  figure: {
    caption: 'System architecture.',
    spec: '16:9 · vector · same four colours as this page',
    ratio: '16 / 9',
  },
  links: [
    { label: 'Code', href: 'https://github.com/…' },
  ],
}
```

Field by field:

| Field | What it does |
|---|---|
| `title` | The heading. Set in Geist Mono. |
| `summary` | The paragraph under the figure. |
| `params` | The little spec table, `key` on the left, `value` on the right. Any keys you like; `Role` / `Stack` / `Year` is the house pattern. |
| `figure` | The image slot. `null` if the project has no visual. See below. |
| `titleHref` | Optional. Where the title points. Omit it and the title is plain text. |
| `links` | The row of labelled links under the summary. Independent of the title. `[]` for none. |

**There is no `id` or `placeholder` field.** Both existed once and did
nothing. The `P1`, `P2`, `P3` designators are generated from
each project's position in the array. Move a project and its number follows
automatically; you never renumber anything by hand. `placeholder` was a
boolean meant to mark a row as unfinished; it was never wired to anything and
was removed. To mark a project unfinished, give its `params` values `TBD` and
its figure a `spec` rather than `plates`; both of which do show on the page.

---

## Three behaviours that are not obvious

**1. Position is emphasis.** The list is styled on a curve that gets quieter as
it descends. Row 1 gets a 28px title and full-strength body text; rows 2–4 get
20px and muted grey; rows 5 and beyond drop to 16px. So *where* you put a
project is a design decision, not just an ordering one. The most important work
goes first because the page physically shouts it louder.

**2. The title link and the link row are separate fields.** `titleHref` powers
the title; `links` powers the row underneath. Neither affects the other. Full
section below.

**3. A `params` value of exactly `TBD` renders differently.** It is drawn in
muted grey with wider letter-spacing, so an unfilled value reads as a
deliberate blank rather than an oversight. An honest gap beats a plausible
invention; this is the rule the whole project has held to. Use it:

```ts
params: [
  { key: 'Role',  value: 'TBD' },
  { key: 'Stack', value: 'TBD' },
],
```

The match is exact and case-sensitive: `TBD` works, `tbd` and `TBD.` do not.
It applies to `params` values only, a `summary` reading `TBD` is just text.

---

## How the title link and `links` work

Two independent fields.

```ts
titleHref: '/blog/dispatching-out-of-a-google-sheet/',
links: [
  { label: 'Code',  href: 'https://github.com/BentoOre0/…' },
  { label: 'Paper', href: 'https://drive.google.com/…' },
],
```

**`titleHref`** is where the project's title points. Optional. Leave it out and
the title is plain text.

**`links`** is the row of small labelled links at the bottom of the project, in
array order. Each entry is a `label` (the visible word) and an `href`.

They do not interact. All four combinations work:

| You want | Write |
|---|---|
| Plain title, no links | omit `titleHref`, `links: []` |
| Linked title, no link row | `titleHref: '…'`, `links: []` |
| Plain title, some links | omit `titleHref`, fill `links` |
| Linked title going somewhere different from every link below | both, independently |

### Why the title link is its own field

The title used to be powered by `links[0].href`, which meant the first entry
silently did two jobs. Its `label` was ignored for the title, it still appeared
in the row below, and a project could not have links without also having a
linked title. Position carried a meaning nothing announced.

Now the title can point at a write-up while the row below lists the repository
and the paper, which is the common case once a project has a post about it.

### On phones the title link is always underlined

Underlines that only appear on hover are invisible on a touch screen, so under
`@media (hover: none)` every project-title link draws its underline
permanently. That is why some titles look underlined on your phone and not on
your laptop. It is deliberate, so a thumb can tell which titles are tappable.

---

## Figures and photos

A figure slot is either **a real photograph** or **a specification for one you
have not taken yet**. Both use the same `figure` object and the same slot size,
so a row does not change shape when the photo finally lands in it.

### Adding a real photo

Two steps.

**1. Put the image in `src/assets/` and import it at the top of `profile.ts`:**

```ts
import avionicsBay from '../assets/avionics-bay.jpg';
```

**Import it, never write a string path.** The import is what lets Astro
optimise the file, and what turns a typo into a build error instead of a broken
image on the live site.

**2. Give the figure a `plates` list naming it:**

```ts
figure: {
  caption: 'Avionics bay, assembled.',
  ratio: '4 / 3',
  plates: [
    {
      still: avionicsBay,
      alt: 'A circuit board mounted in a machined aluminium sled.',
    },
  ],
},
```

| Field | Notes |
|---|---|
| `caption` | Printed under the whole figure, after `Fig. N`. |
| `ratio` | The slot's shape, `'16 / 9'`, `'4 / 3'`, `'1 / 1'`. Every panel shares it. |
| `plates` | The panels. One is a plain figure; more than one is a collage or a window. |
| `spec` | Instead of `plates`, for a shot not yet taken. See below. |
| `wide` | Optional. Diagrams only. See below. |
| `cycle` | Optional. Show one panel at a time. See below. |

And inside a plate:

| Field | Notes |
|---|---|
| `still` | The imported image. **Required**, even for an animation. |
| `alt` | **Required.** One caption cannot describe several panels. |
| `motion` | Optional. A URL into `public/` for an animated file. See below. |
| `label` | Optional. A line under this panel, prefixed `Fig. 5(a)`. |

Astro handles the rest: WebP, emitted at several widths with a `srcset` so a
phone never downloads a desktop-sized file, and lazy-loaded.

**The photo is cropped to `ratio`, not squashed.** `object-fit: cover` means the
slot keeps its declared shape and the image fills it, losing the edges if the
proportions disagree. That is deliberate, your photos are unedited raw shots of
uneven framing, and the page's rhythm cannot depend on them all agreeing. Check
that nothing important sits at the very edge of a shot.

**`alt` is required on a plate**, unlike the caption-only case it replaced. A
collage has one caption and several pictures, so the caption cannot be standing
in for all of them.

### More than one picture: collage or window

Put two or more plates in the list and you get a **collage**: side by side
where there is room, stacked where there is not. There is no breakpoint to
pick; the grid decides from the space actually available, so it stays right
inside a figure of any width.

Add `cycle: true` and you get a **window** instead: one panel at a time,
swapping every 8 seconds with a fade.

Choose by how much each picture needs to be seen. In a 30rem figure a two-panel
collage gives each about 232px. That is fine for a poster or a photograph and
useless for anything dense: GravSim's simulations are fields of specks, which at
232px are texture rather than a simulation, so that figure is a window.

Every panel of a window sits in the same grid cell, so the figure is as tall as
its tallest panel and the swap cannot move the page. Panel (a) is visible
without JavaScript.

### Animated GIFs

**A GIF cannot go in `src/assets/`.** Astro runs imported images through sharp,
which takes the first frame and throws the rest away *silently*: the build
passes and the page shows a frozen picture. Nothing warns you.

So convert it, put the animation in `public/`, and keep a still beside it:

```bash
# sharp is already a dependency; no new tooling. Run from the repo root.
node -e "
const sharp = require('sharp');
sharp('in.gif', { animated: true }).resize({ width: 640 })
  .webp({ quality: 50, effort: 6 }).toFile('public/gravsim/out.webp');
sharp('in.gif', { page: 0 }).resize({ width: 640 })
  .png({ palette: true }).toFile('src/assets/out-still.png');
"
```

```ts
{
  still: quadtreeStill,                        // imported, from src/assets
  motion: '/gravsim/quadtree-subdivision.webp', // URL, from public/
  alt: 'An animated view of the quadtree re-subdividing every frame …',
  label: 'Quadtree subdivision, rebuilt every frame',
}
```

**Convert, do not ship the GIF.** The two GravSim GIFs were 3.4MB and 3.1MB.
As animated WebP at 640px they are 478KB and 743KB, the same 44 and 60 frames.
That is a 78% cut, and it is still by far the heaviest thing on the site.

**`still` is not optional and not a nicety.** The page renders a `<picture>`
whose animated `<source>` is served only when the reader has *not* asked for
reduced motion. Under `prefers-reduced-motion` they get the still instead,
chosen by the browser with no JavaScript. It is also the fallback if the
animation fails to arrive. Leave it out and a reader who dislikes motion gets
nothing.

Check your work: an animated WebP contains an `ANIM` chunk and one `ANMF` per
frame.

```bash
python3 -c "b=open('public/gravsim/x.webp','rb').read(); print(b.count(b'ANMF'))"
```

Zero frames means sharp flattened it and you forgot `{ animated: true }`.

### Wide figures, for diagrams only

`wide: true` lets a figure run to the full sheet instead of 30rem.

Use it for diagrams and nothing else. A diagram carries type of its own, and
**type inside a picture does not reflow**: the SEAOIL state machine has fourteen
labelled boxes, which at 30rem land at about five pixels each. The figure is
then decoration and the reader learns nothing. A photograph never needs this,
because it has no small type to lose.

### If you want a dummy photo and want to see the size

Give it `spec` instead of `plates`:

```ts
figure: {
  caption: 'Avionics bay, assembled.',
  spec: '4:3 · overhead · raking light on a plain ground',
  ratio: '4 / 3',
},
```

The page draws a dashed empty plate printing that `spec` inside it, a slot
stating its own requirement. That is why the unfilled figures on the live site
read as deliberate rather than broken, and it means every empty slot tells you
exactly what shot to go take.

Once you have the photo, add `plates` and the plate becomes the image. You can
leave `spec` in place; it is ignored when `plates` is set.

A dashed border means unshot, a solid one means done. Real and specified figures
can sit side by side in the list with no problem.

Figure numbers, like designators, count themselves. `Fig. 1`, `Fig. 2` … are
assigned in order across the projects that *have* a figure, skipping the ones
that do not. You never write a figure number by hand.

---

## Worked example: adding a project

Say you finish a project called Robot Dog and it belongs third.

1. Open `src/data/profile.ts`, find `PROJECTS`.
2. Insert a new object **in the position you want it to appear**, third means
   third in the array. Everything below renumbers itself.

```ts
{
  title: 'Robot dog',
  summary: 'What it is. What you built. What it does now.',
  params: [
    { key: 'Role',  value: 'TBD' },
    { key: 'Stack', value: 'TBD' },
    { key: 'Year',  value: '2026–present' },
  ],
  figure: {
    caption: 'The assembled chassis.',
    spec: '4:3 · side view · plain ground',
    ratio: '4 / 3',
  },
  // titleHref: '…',   // add when there is somewhere for the title to go
  links: [],
},
```

3. Save. If the dev server is running the page updates instantly.
4. Run `npm run build` and confirm it passes.
5. Screenshot it: `./scripts/shots.sh`, then actually look at the phone
   capture, not just the desktop one.

---

## Checklist

- [ ] Placed at the position that matches how much it deserves to shout
- [ ] `summary` is 2–4 sentences, not a wall
- [ ] `titleHref` points where a reader clicking the title should land
- [ ] Every unknown is the literal string `TBD`, never a guess
- [ ] `npm run build` passes
- [ ] Looked at `.shots/home-390.png`, not only the desktop capture
