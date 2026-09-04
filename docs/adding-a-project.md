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

### Linked titles are underlined at rest, everywhere

A project title with a `titleHref` draws a faint underline at 45% accent on
every device, going to full red on hover and keyboard focus. A title without
one draws nothing. **The underline is how a reader tells the two apart**, so
whether you give a row a `titleHref` is a visible decision, not just a
behavioural one.

This used to appear only on hover, with a `@media (hover: none)` rule adding it
back for touch. The effect was that a phone showed every underline and a laptop
showed none: on a desktop, every project title was plain black text with no cue
that it went anywhere. Clicking through to a repository is the thing this page
is trying to cause, so it is now drawn at rest and hover only confirms it.

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

### The two kinds of movement, and how they combine

A figure can move in two completely independent ways. Mixing them up is the
usual source of confusion, so: **one is a panel that is itself animated, the
other is the figure swapping between panels.** A figure can do either, both, or
neither.

| | What moves | Set by | Runs on |
|---|---|---|---|
| **An animated panel** | the picture itself | `motion` on a plate | nothing; the browser plays the file |
| **A cycling window** | which panel is showing | `cycle: true` on the figure | a small script, 8s hold, 500ms fade |

**Fig. 2 (Clifford) uses both at once.** Panel (a) is an animated WebP of a
camera circling the robot, panel (b) is a still bench photograph, and the figure
cycles between them every 8 seconds. So panel (a) is playing its own animation
*while* the window is counting down to swap it out.

#### An animated panel

```ts
{
  still: cliffordWalkStill,           // imported from src/assets
  motion: '/clifford/walk.webp',      // URL into public/
  alt: '…',
}
```

This renders a `<picture>` with two sources:

```html
<picture>
  <source media="(prefers-reduced-motion: no-preference)" srcset="/clifford/walk.webp">
  <img src="…still…" alt="…" loading="lazy">
</picture>
```

Three things follow from that shape, and all three are the point:

- **The browser chooses, not a script.** A reader who has asked for less motion
  matches the `<source>`'s media query never, so they get the `<img>`, the
  still. There is no JavaScript in this path at all.
- **They never download the animation.** The `<source>` is not selected, so the
  bytes are never fetched. This is why `still` is required rather than a
  nicety: leave it out and a reduced-motion reader gets nothing.
- **It is lazy.** `loading="lazy"` on the `<img>` governs the whole `<picture>`,
  so a figure far down the page costs nothing until someone scrolls to it. The
  animations are the heaviest things on the site, and most readers never fetch
  them.

#### A cycling window

```ts
figure: {
  plates: [ {...}, {...} ],
  ratio: '1 / 1',
  cycle: true,
}
```

Without `cycle`, two or more plates is a **collage**: side by side where there
is room, stacked where there is not. With `cycle`, it is a **window**: one at a
time, swapping every 8 seconds with a 500ms cross-fade.

- **Every panel sits in the same grid cell**, so the figure is as tall as its
  tallest panel and a swap cannot move the page.
- **Panel (a) carries `is-on` from the server**, so with no JavaScript, or
  under `prefers-reduced-motion` where the script deliberately never starts,
  the figure is a plain static picture rather than an empty box.
- **Panels letter off the figure number**: `Fig. 2(a)`, `Fig. 2(b)`, derived
  from position like everything else.

Choose window over collage by **how much each picture needs to be seen**. In a
30rem figure a two-panel collage gives each about 232px. That is fine for a
poster and useless for anything dense, which is why GravSim's two simulations
are a window: a field of specks at 232px is texture, not a simulation.

#### What a reader with reduced motion actually gets

Both mechanisms stop, by different routes, and the result is a completely
static figure showing panel (a)'s still:

- the animation, because the `<source>`'s media query does not match
- the cycling, because the script checks
  `matchMedia('(prefers-reduced-motion: reduce)')` and returns before starting

To confirm it, capture twice at different `--virtual-time-budget` values with
`--force-prefers-reduced-motion` and check the two files are identical. See
[build-and-ship.md](build-and-ship.md).

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

### From a phone video

**There is no ffmpeg on this machine**, and adding one is a dependency
decision. GStreamer is installed and decodes an iPhone `.MOV` (HEVC) fine, so
the path from a clip to a figure is: decode to PNG frames, fix the frames in
Pillow, then let sharp join them.

```bash
# 1. Frames. videorate picks the output rate; scale here, not later.
gst-launch-1.0 -q filesrc location="clip.MOV" ! qtdemux name=d d.video_0 \
  ! queue ! h265parse ! avdec_h265 ! videoconvert ! videoscale \
  ! video/x-raw,width=1280,height=960 ! videorate \
  ! video/x-raw,framerate=12/1 ! pngenc ! multifilesink location="raw/r_%04d.png"
```

`gst-discoverer-1.0 clip.MOV` prints the duration, the real dimensions and the
codec. It does not print rotation, and a phone clip is almost always rotated:
the frames come out of GStreamer in **storage** orientation, with the display
rotation left in the container's `tkhd` matrix. Read it before assuming the
video is landscape.

```bash
python3 - <<'EOF'
import struct
d = open('clip.MOV','rb').read()
i = d.find(b'tkhd')
print([x / 65536 for x in struct.unpack('>9i', d[i+44:i+80])[:8]])
EOF
```

A matrix of `[0, 1, 0, -1, 0, 0, ...]` is 90 degrees clockwise, which is what
`Image.rotate(-90, expand=True)` undoes. Rotate, crop to the figure's `ratio`,
and resize every frame in Pillow before sharp ever sees them.

**Do not call `.resize()` on a joined frame list.** Resizing a decoded animated
file is safe, because the input carries `pageHeight` through the pipeline:

```js
sharp('in.webp', { animated: true }).resize({ width: 640 })   // 31 frames, fine
sharp(files, { join: { animated: true } }).resize({ width: 640 })  // 1 frame
```

The second silently drops every frame but the first, exactly like the sharp
trap above, and the only symptom is a suspiciously small file. Size the PNG
frames instead. Check `ANMF` afterwards either way.

**Video is heavier than a rendered animation.** Handheld footage changes every
pixel of every frame, so inter-frame compression has almost nothing to work
with. Clifford's walkaround is 641KB for 5.8 seconds at 384px and 10fps,
against GravSim's 478KB for four seconds of a sparse simulation. Cut the clip
to the seconds that carry the point, drop the frame rate to 10 or 12, and check
the size before committing it.

**Resolution is the cheapest thing to give up on video.** Clifford's clip
started at 480px square and came to 865KB. At 384px, which still covers the
288px slot at 1.33x, the same frames cost 641KB. The source is a phone GIF that
has already been through 256-colour quantisation, so there was no detail at
480px to protect.

**A pan does not loop; make it bounce.** A gait cycle ends where it began, so a
walk can be cut anywhere and looped. A camera orbit ends somewhere else
entirely, and looping it puts a hard cut between the closest frame and the
widest one every few seconds. Writing the frames out forward and then backward
costs roughly double the bytes and removes the cut:

```python
seq = list(range(0, 30)) + list(range(28, 0, -1))
```

Both endpoints are dropped from the return leg, or they play twice and the
bounce stutters.

### Wide figures, for diagrams only

`wide: true` lets a figure run to the full sheet instead of 30rem.

Use it for diagrams and nothing else. A diagram carries type of its own, and
**type inside a picture does not reflow**: the SEAOIL state machine has fourteen
labelled boxes, which at 30rem land at about five pixels each. The figure is
then decoration and the reader learns nothing. A photograph never needs this,
because it has no small type to lose.

**Being a diagram is necessary, not sufficient.** Nothing on the page uses
`wide` today. Fig. 7 shipped with it and lost it the same hour: the legend was
readable at full sheet and illegible at 18rem, and it still came out too big.
A wide figure takes `grid-row: auto`, so it spans the sheet under the title and
pushes the summary below it, which breaks the text-left artifact-right rhythm
every other row keeps and leaves the right half of the row empty. It also made
the largest figure on the page belong to P7. Before reaching for `wide`, ask
whether the row deserves the width, not just whether the labels are small.

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

Figure numbers, like designators, count themselves, and **a figure carries the
number of the row it sits in**: `Fig. 4` is in P4. You never write one by hand.

So the sequence has gaps wherever a project has no figure. P3 and P8 have none,
so the page runs `Fig. 1, 2, 4, 5, 6, 7`. That is deliberate. It used to be a
separate count that skipped the gaps and stayed contiguous, which meant P4 was
labelled `Fig. 3` and P7 was labelled `Fig. 6`, drifting one further apart with
every figure-less row inserted above. A gap explains itself, because the row
with no picture is right there; a mismatch between `P4` and `Fig. 3` does not.

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
