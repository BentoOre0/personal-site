# Handoff, 1 Sep 2026

State of the site after the redesign session of 31 Aug and the blog /
mobile session of 1 Sep. Read with `PRODUCT.md` (product truth) and
`DESIGN.md` (visual system). This file records what happened and what is
left; those two record what is true.

Rewritten from scratch on 1 Sep, the previous version had five appended
session logs and no longer read as a handoff.

## Where things stand

**Live at https://jeremyaidanhernandezyu.vercel.app**, deployed from
`master`, currently `38fc509`, which merged `feat/newlayoutandmedia` on
4 Sep. `npm run build` passes, **5 pages**.

**Everything in this file is live.** The 3 Sep work went up with PR #6 and
the whole of the 4 Sep work followed in that merge. There is no unmerged
branch and nothing described below is waiting.

**Five pages, not twelve**, and that is the intended state rather than a
regression: homepage, `/blog`, the one real post, its `about-me` tag
archive, and 404. The five Astro demo posts and their four tag archives
stopped being built when they became `draft: true`. Every one of those
pages returns the moment a real post carries the tag.

Verified on production after the merge: the six URLs that should be 200
are, the four hidden demo URLs are 404, `rss.xml` carries one item, and
`/googlefa2bccd6d59141b7.html` serves byte-exact with nothing injected
into it.

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
RESUME AUGUST 25 2026.pdf`): name, five of the seven credentials, the
details table, all five projects, GitHub, LinkedIn, email. All page
content lives in `src/data/profile.ts`.

**Real, but from the owner directly on 2 Sep, not from that résumé:** the
TREK Excellence Scholarship and the UBC Computer Science TA appointment.
He gave both facts and the September 2026 start date; nothing else about
them was assumed. The TREK note describes the award rather than him, and
links UBC's own page for it, so the "top 5%" is checkable. It reads "Cash
award" as of 4 Sep, because "Awarded 2026" read as a title conferred and
the thing is money. **The amount is deliberately not on the page**, at the
owner's request; UBC's page states it and the link goes there. **The résumé
is now behind the site by two credentials.**

**Not real, and no longer served:** the five Astro demo posts in
`src/content/blog/` are Lorem ipsum with invented tags. They are
`draft: true` as of 4 Sep, so they are unlisted, unfed and unbuilt. The
files stay. **See Decisions.**

**Still unfilled:**

1. **`og:image`** is still `blog-placeholder-1.jpg`, so sharing any link
   shows Astro stock art. This is the highest-value unfilled item on the
   list: discovery here is almost entirely a pasted link, and the unfurl
   card is a first impression the page never gets to correct.
2. **`REVISION` is no longer stale, and this item is closed.** `rev` and
   `updated` move on every commit from 4 Sep, the rev by one tenth with 0.9
   wrapping to 1.0. `status` was `PRELIMINARY` and is now `DEPLOYED`, at the
   owner's request: the credentials are confirmed, the résumé link is real,
   no row prints a shot spec and no figure is an empty slot, so the
   preliminary claim had stopped being true. See `docs/build-and-ship.md`.
3. **The résumé link is filled**, a real Google Drive share link. Drive mints
   a new file id on every re-upload, so it will need repointing whenever the
   PDF is replaced.

Two rows carry `figure: null` on purpose rather than an empty slot: SEAOIL
and BSM Varsity. SEAOIL is the one worth filling, being the strongest row on
the page and the only one with nothing to look at.

**Never invent anything to fill these.** That rule has held throughout.

## Decisions worth not relitigating

- **The demo post files stay. They are hidden, not deleted.** The owner
  asked on 4 Sep to "HIDE the template stuff on blog page", saying he was
  about to write a real post. They are `draft: true`: off `/blog`, off the
  tag archives, out of the feed, no page built, files untouched.
  This is the settled shape of an earlier decision, not a reversal of it.
  He had said "i want a template blog why did you kill it" after a test
  briefly made the posts 404, and what he wanted was the template kept.
  `draft` keeps it. **Do not delete the files**, and do not put them back
  on the site without being asked.
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
- **A scoped selector cannot reach into a component.** Moving the figure
  markup into `Figure.astro` silently broke
  `.project-body > :not(.designator) { grid-column: 2 }` in `index.astro`,
  because the `<figure>` now carries the component's scope id instead of
  the page's. The figure dropped into the designator's gutter column and
  squeezed the SEAOIL row to a one-character-wide sliver. The build passed.
  It reads as a grid bug and is a scoping one; the fix is
  `> :global(figure)`. Expect this from any future extraction, and take a
  screenshot after one.
- **Sharp silently flattens animated files.** An imported GIF or animated
  WebP comes out as frame one, with no warning. Animation has to live in
  `public/`. See `docs/adding-a-project.md`.
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
3. **Verify the site in Google Search Console.** The code side is done; see
   `docs/search-visibility.md`. Four steps, about fifteen minutes, and the
   last of them (linking to the site from GitHub and LinkedIn) is the one
   that actually decides whether Google finds it.
4. **Put more information onto the site.** Scope needed. Candidates the
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

## Scope

**This repo only.** The owner's other repositories are handled separately and
are not this project's concern. Read them if a link needs checking; never edit
them. The rule is in `CLAUDE.md` under Scope.

Links pointing at other repositories can move without warning. If one breaks,
repoint it here.

## 4 Sep

**Fig. 2's animated panel was replaced and P2 was renamed.** Both at the
owner's direction. The title is now `Clifford: A Mutated Spot Micro`, was
`Clifford Spot Micro: Robot Dog`.

The old panel (a) was three seconds of the robot walking, cut from
`Clifford demo.MOV`. The new one is `~/Downloads/clifford-walkaround.gif`, a
handheld orbit of the machine standing on a desk. **The subject changed, so the
words had to.** The caption, the panel label and the alt text all described a
gait that is no longer on screen, and the rationale comment in `profile.ts`
argued for showing a gait at all. All four were rewritten. If a clip is ever
swapped again, those four are the things to check, not just the file path.

**What was done to the source**, 480x640, 36 frames, 3.6s at 10fps:

- **Frames 30 to 35 dropped.** The camera pushes in until the machine stops
  being legible, and a hand enters at 34.
- **Cropped square at y=80**, the centre. y=0 cuts the legs off in the opening
  frames, y=160 cuts the head off in the middle ones.
- **Resized to 384px** from 480. See `docs/adding-a-project.md`; 865KB became
  641KB and the slot is 288px wide.
- **Bounced, 0 to 29 then 28 to 1.** An orbit has no natural loop point. 58
  frames, 5.8s.
- **The still is frame 24**, picked by ranking every kept frame on edge
  variance and then looking at the top few. It is the sharpest frame that is
  also a legible three-quarter view. Frame 0 scores badly and is visibly
  motion-blurred, which matters because the still is what reduced-motion
  readers get instead of the animation, not just a poster.

`public/clifford/walk.webp` is 641,434 bytes, 58 `ANMF` chunks, 384x384.
`src/assets/clifford-walk-still.jpg` is 51,835 bytes at 480x480.

**Page weight went up about 104KB** against the clip it replaced, for nearly
double the runtime and no loop cut. It was already on the open-findings list at
3.96 MiB and this does not help.

**Fig. 7 is filled.** The source is `~/Pictures/Screenshots/bananastuff.png`, a
colour-space plot with the three classes the algorithm separates, each cluster
hulled and labelled, with leader lines to a banana. It ships at its native
`966 / 627` rather than the `16:9` the old slot asked for, because the legend,
the axes and the banana each sit hard against a different edge and any crop
loses one.

**It was shipped `wide: true` and that was reverted within the hour.** The
argument for wide was the legend: in the 18rem column its text lands near 6px,
and the legend is the part that says what the three clusters mean. The argument
against, which won, is that it was simply too big. A `wide` figure takes
`grid-row: auto`, so it spans the sheet under the title and pushes the summary
below it, breaking the text-left artifact-right rhythm every other row keeps
and leaving the right half of the row empty. It also made P7 the largest figure
on the page, against the "most impressive first" ordering in `CLAUDE.md`.

**So `wide` still has no user on this page.** It remains built and documented.
The lesson is that legibility of a diagram's own labels is not enough reason on
its own; the row has to be worth the width. Anyone tempted to reach for it
should look at this reversal first.

Filling this slot also closed the open finding that P7 printed its internal
shot spec to visitors: no row carries `spec` any more.

**`params` entries take an optional `strong`.** Set on SEAOIL's
`DEPLOYED IN PRODUCTION` at the owner's request. It renders bold with an
underline, and the underline is **ink, not accent, on purpose**: the row's
`Repository` link sits four lines below it in red with a red underline, and an
accented underline in the same row reads as a link that does not click. Nothing
else in the params table is bold or underlined, so ink already separates it.
At most one per row; the mark stops meaning anything if every row has one.

**P4's stack row is now `Build`, and carries the real list.** It said "CAD ·
3D printing · wet layup composites · lathe and mill", which understated it.
It now names SOLIDWORKS, Bambu Lab FDM in PA6-GF and PA6-CF, wet layup carbon
fibre and fibreglass, lathe, mill and drill press at the PHAS machine shop,
and basic CNC training. All the owner's own words; "basic" is his and stays.

**PHAS is associated with UBC Rocket, not a separate affiliation.** The shop
is named because it is where the lathe, mill and drill press work happened,
and the whole row is UBC Rocket regardless. The CNC training is the team's own
and needs no attribution for the same reason. A first pass read "basic CNC
training at the PHAS machine shop", which put the training in the wrong place.

**The key changed on that row alone.** Every other project keeps `Stack`.
"Stack" is a software word and was doing a poor job of covering a lathe. The
params table is per-project by design, `Status` appears on two rows of eight,
so a key that fits the row is the pattern rather than a break from it. The
cost is that a reader scanning down the `Stack` column skips this row; flip it
back if that matters more. The separation-test electronics are not repeated in
`Build`: they are the Role and the summary's first sentence.

**Fig. 6's caption said something the picture does not show.** It read "A
Baybayin character dissolving into noise". The artwork is a glyph breaking
into a grid of squares, which is pixelation, not noise. It now reads 'The
Baybayin "Ba", broken into pixels for computer vision', naming the character
on the owner's say-so and the step the picture illustrates. The alt text was
updated with it, since it also said "scatter of small squares" without naming
the character.

**Fig. 2's caption described its two panels and got them wrong.** It read
"Clifford assembled, and on the bench with its shell off". At the owner's
direction it is now just "Clifford, the red robot dog." The panel labels
already carry the per-panel detail, so a caption repeating them was both
redundant and a second place for the description to drift out of true. Worth
generalising: **a caption names the subject, the panel labels say what each
panel shows.**

**P6 and P7 both say "computer vision" now**, asked for directly. The term
appeared nowhere on the site, and it is the discipline word a reader scans
for.

- P6's stack was "Python · CNN · SVC", which repeated the title. It is now
  the actual libraries, the owner's own list: Python, computer vision,
  TensorFlow/Keras, scikit-learn, NumPy, Pandas, Pillow, Matplotlib.
- P7's summary said "an image-segmentation algorithm measuring percentage
  colour coverage", which is the category rather than the method. It now
  names the steps, from the owner's own account of the pipeline: blur, pull
  each pixel toward the nearest reference colour, K-means into three, drop
  the cluster nearest white as dish and background, report the ratio of the
  two left. Its stack gained computer vision and K-means clustering.

**The blog has a real post.** `hello-im-jeremy.md`, at `/blog/hello-im-jeremy/`.
**The words are the owner's own, pasted in full and unedited**, minus the `#
Hello, I'm Jeremy` heading, which the layout already renders from the title.

Two things in it are not his and are his to change:

- **The `description`**, "Who I am, how I learn, and the gaps I am trying to
  close next." It is a one-sentence condensation of his own text, but he did
  not write that sentence. It shows on `/blog`, in search results and in the
  feed.
- **No `tags`.** Tags are free text and inventing categories for someone's
  own writing is the same rule as inventing anything else. With none, the
  filter bar does not render and no tag archives are built, which is correct
  rather than broken.

**The banner is `src/assets/hello-banner.png`**, made from his
`stuff for my blog.png`: the yellow sparkles recoloured to the site accent
`#e51b23`, the white margin trimmed, and the result padded to 2:1 on white,
which is the ratio `BlogPost.astro` builds a hero at. The recolour works off
the blue channel to get the stroke's coverage, so the antialiasing survives
and the black line art is untouched.

**It is laid out as a question and answer**, asked for after the first
version shipped as unbroken prose. Eight `h2`s, each one a question the
paragraph under it already answers; **his prose is byte-identical**, the
headings are inserted between paragraphs and nothing else moved. It closes
with "(The one and only) Jeremy Aidan Hernandez Yu", his line, set in italic
so it reads as a sign-off rather than another paragraph.

**The questions were accent red for about two minutes and are now ink.**
Asked for, then reversed on sight: "i dont linke the red for the questions
remove it". Recorded in `DESIGN.md` as the fifth thing tried in the accent
and taken back out, because the lesson is a real one. The heading passed
every check the credential note failed, being 20px, underline-free, alone on
its line and nowhere near a link, and it still was not worth doing. **A mark
that survives the argument can lose on sight.**

**Tagged `about-me`**, his tag, not an invented one. That is the first real
tag on the site, so `/blog` now renders the filter bar and
`/blog/tags/about-me/` is built. Five pages.

**"What are you trying to learn next?" and "What kind of work are you looking
for?" are one section**, "What are you looking for next?", at his request.
The knowledge gaps and the kind of work he wants were the same answer split
over two questions.

The build is back to four pages and the feed has one item. The demo posts
stay `draft: true`.

**One thing found and not changed:** `BlogPost.astro` renders the hero with
`loading="lazy"`, because that is Astro's default and nothing overrides it.
A hero at the very top of the page is the LCP element and should be eager;
the homepage avatar already sets `loading="eager"` for this reason. It is
one attribute. It also made a headless capture come back with an empty
frame where the banner should be, which is worth knowing before someone
reports it as a broken image.

**A seventh rotator term, "physical and digital ideas.", placed after
"websites."** Asked for. It is the longest term the tagline has carried and
it broke the height reserve on narrow phones, which is the bug that was
fixed on 1 Sep and is easy to reintroduce.

`.tagline` reserves `min-height: 3.75em`, exactly three lines, so the block
cannot change height as the rotator types. That holds while `max-width: 22ch`
is what decides the wrap. Below about 358px the viewport binds first, the
measure narrows, and this term takes a **fourth** line where the other six
still take three. On a 320px phone the hero grew about 35px every time the
rotator reached it.

Fixed with `@media (max-width: 22.4rem) { .tagline { min-height: 5em } }`,
four lines reserved exactly where four are needed. Above that width nothing
changes.

**Measured on the real page, not computed.** My arithmetic said the term
would break at every width and it was wrong; the font fits more than 22
characters into 22ch. 320 and 340 wrap to four lines; 360, 375 and 384 wrap
identically to each other and to 390, which is 22ch binding rather than the
viewport.

**The trick worth reusing:** the rotator script returns early at
`terms.length < 2`, so setting `rotating` to a single term makes the real
page render that term statically, and a screenshot can then show it. That
is the way around "the typed tagline is frozen in every capture". Proof the
reserve holds is two renders at 320px, one long term and one short, diffed:
they differ only in rows 429 to 485, the tagline's own text, and are
pixel-identical below it.

**Add another term and this has to be measured again.** Anything much past
21 characters will need the same check.

**Both long summaries were cut, and the rule behind it is worth keeping.**
The owner's words: "i want people to open the repo". P2 ran 441 characters
and P7 ran 414, against a median of 214. Both were correct and both were
doing the repository's job.

- P2 is now 202: a quadruped forked from Locke's Nova SM3, the servos were
  not sourceable in the Philippines, every leg part redrawn from scratch.
  The U-bracket, the servo horn, the joint axis and the attribution table
  are in his README, told better and at length.
- P7 is now 219: what it measures, and the one step that is not obvious,
  pulling each pixel toward a reference colour before clustering. The blur,
  the resize, the dropped background cluster and the final ratio are in the
  repository.

**The rule: a summary exists to get the repository opened, not to explain
the project.** That is "the site shows and GitHub tells" from 3 Sep applied
to prose rather than to pictures. Both rows had drifted off it in the course
of being made accurate, which is the failure mode to watch: correcting a
summary tends to lengthen it, and length is the thing that stops it working.

Longest is now SEAOIL at 305, which `DESIGN.md` already names as the one
row allowed three sentences. Median 210.

**P2's role is "Builder and modder", and its summary had the attribution
backwards.** The role change was asked for directly. The summary correction
was not, but the owner supplied the Modded-Nova-SM3 README as context and it
contradicts what the site was saying about the half of the project that
matters most.

The old summary: "The mechanical design, gait development and servo motion
engine are his; mine is the firmware and the physical build." The README says
the mechanical design is **his own**: the DS3218 the Nova SM3 is drawn around
was not sourceable in the Philippines, the RDS3218 he could buy hangs in a
U-bracket instead of bolting through four sets of holes, and so the coax,
femur and tibia were redrawn from scratch around a different way of holding a
servo. In his words, "not a build of someone else's kit, and not a design of
my own from nothing, but the engineering in between".

The site was crediting Chris Locke for the one thing that is not his and
underselling the owner accordingly. Gaits, the servo motion engine and the
master/slave architecture **are** Locke's and are still named as his.

**The README has more the row is not using yet**, and it is the owner's to
decide on:

- The servo specifications, 8x RDS3218 at 20 kg.cm and 4x RDS3235 at 35 kg.cm,
  all 270 degrees. The whole project turns on servos and the stack line does
  not mention one.
- The electronics work: the v5.2b wiring pictogram revised with a short
  corrected, and power distribution reworked from cascaded converters to
  parallel.
- The firmware v6.0 restructure: 6,390 lines in one file, 85 undocumented
  protocol strings, an 812-line function, two real bugs found.
- **Status is the honest question.** The row says "Ongoing". The README is
  blunter: walking does not work, because `NovaServos.h` still holds Locke's
  `servoHome[]` and `servoLimit[]` values byte-identical to v5.1, which are
  measurements of his servos in his geometry. "Ongoing" is not false, and
  going further is a judgement call about his own work, so it was left alone.

**Fig. 7's legend is painted out of the source PNG.** It labelled the three
clusters "White (background)", "Yellow (fresh)" and "Brown (browned)". Asked
for directly: the clusters are drawn in their own colours and the picture
carries the concept without naming them.

Done in `src/assets/colour-clusters.png` itself, not in CSS: the box sat over
plain ground in the top-right corner with no plot content behind it. The
ground is not flat, it has a gentle 2D gradient, so a flat fill would have
shown. The patch fits a plane to every background pixel in the image, then
per row interpolates a correction between clean strips either side of the box
and adds grain matched to the measured background noise, sd about 0.85. No
seam at 1:1. The original is in git; the file also got 59KB smaller.

**This settles `wide` for that row.** The legend's small type was the only
argument ever made for a wide figure on this site, and there is no small type
left. Recorded in `docs/adding-a-project.md`.

The alt text was rewritten with it, since it described the labels.

**The reference colours are deliberately not named in P7.** The owner's
account of the pull step and the labels on the figure do not agree on the
third colour, so "three reference colours" is what can be said without
guessing. Ask him before naming them.

**The TREK scholarship note says it is money.** "Awarded 2026 · top 5% of
each undergraduate year and faculty" read as a title conferred rather than a
paid award, which the owner flagged. It is now "Cash award, 2026 · top 5% of
each undergraduate year, faculty and school".

**The value stays off the page and out of this repo**, asked for directly and
then again after it had been written into a code comment and into this file.
Do not record it: not in the note, not as a quotation, not in a comment. The
credential already links to UBC's page, which states it, so a reader who wants
the figure gets it from UBC rather than from him.

That is also why the row has no `sources` block, unlike the four competition
credentials: UBC's one quotable sentence is built around the value, and
cutting the value out of it would misquote them rather than trim them. A link
is the honest way to carry a fact the page is choosing not to print. "and
school" is UBC's third term and had been missing.

**The Astro demo posts are hidden.** Asked for directly: "can you HIDE the
template stuff on blog page / I will write a blog post in a bit."

Done with a new `draft` frontmatter flag rather than by deleting anything,
because the standing decision is that the template stays. All five demo posts
carry `draft: true`. The files are otherwise untouched.

The filter lives in one place, `getSortedPosts()` in `src/lib/posts.ts`, which
was already the single definition of "every post" for `/blog`, the tag archives
and the feed. **`blog/[...slug].astro` was the one surface not going through
it**, calling `getCollection('blog')` directly, which would have left every
draft publicly reachable at its URL while it sat unlisted everywhere else. It
now uses the helper, so a draft has no page built and its URL 404s. That was
the only real trap in the change.

Everything else fell out for free, because the empty states already existed:
`TagFilter` renders nothing at zero tags, `/blog` already had a dashed "No
entries" plate, and `@astrojs/rss` emits a valid feed with no items. The one
fix needed was on the index, which rendered the plate *and* an empty `<ol>`;
it is now one or the other, since an empty list still announces itself to a
screen reader directly under a plate saying the section is unpopulated.

The build went from **12 pages to 3**: homepage, `/blog`, 404. Five post pages
and four tag archives stopped being built. The sitemap is down to two URLs and
`rss.xml` has no items. **All of that reverses the moment a real post lands**,
which is the point.

`scripts/shots.sh` captured `/blog/first-post/`, which now 404s. That line is
commented out with the slug to restore.

**Not done, and deliberately:** the empty-state copy was left alone. It reads
"This section is unpopulated. Entries appear here newest first, each with a
title, a one-line summary, its tags and a date," which is the format's own
voice and is true.

## 3 Sep, second half

Committed on `feat/newlayoutandmedia` as `cbff832`. All of it at the owner's
direction, in a fast back-and-forth; several of these reverse a decision taken
an hour earlier in the same session, and the reversals are the useful part.

**§3 was rebuilt around the idea that the site shows and GitHub tells.**

- **Summaries cut 38%**, 2,646 characters to 1,639, by deletion only, no
  sentence rewritten. The rule is recorded in `DESIGN.md`: a row with an image
  gets two sentences, a row without a figure may run longer because nothing
  else carries the claim. **SEAOIL is the named exception** and keeps its
  three.
- **Text left, artifact right above 60rem.** A three-column grid, designator
  gutter, text, figure. This was built once before as a float and reverted
  because a float put the figure after the summary in source order; grid
  placement has no such cost and the DOM order is untouched.
- **Figures grade like the type**, 22rem for the lead row and 18rem below it.
- **Row padding halved**, 48px to 24px. `.section` uses 48px, so two rows
  inside one list had been sitting exactly as far apart as two whole sections.
- **`.params` runs to 38rem** instead of 24rem. Free on a phone: the cap was
  already inoperative at 390px.
- **Figure numbers now equal project numbers.** See `docs/adding-a-project.md`.

**The accent was widened, then pulled most of the way back**, and the
end state is documented in `DESIGN.md` under Palette. Briefly it painted every
designator, every caption and panel label, every credential note, and the
section-head hairlines. Four things came back out, each for a different reason,
and the surviving test is: **the accent marks what you can click, plus a small
closed set of stamps and controls.** Prose never gets it.

The instructive failure was the credential notes. Seven red lines that are not
links, sitting directly under five credential titles that are, in black. A
reader who learned "red means clickable" from the nav was being taught the
opposite by §1.

**Links are underlined at rest now**, 45% accent, full on hover and focus. The
old treatment was a gradient sweep living inside `@media (hover: hover)`, so a
phone drew every underline and a laptop drew none. A side effect worth keeping:
credentials with no `href` now visibly differ from those with one.

**NOI is the lead credential**, promoted above the BASc entry, which puts it
above the 844px fold on a 390px phone. `PRODUCT.md` principle 1 names it as
the hook and it had been second.

**The mobile footer collapses** below 40rem to one line. It was 325px of
metadata with no media queries, spelling over four labelled rows the same Rev
and date the hero already carries.

**Three figures filled:** Fig. 2 (P2 Clifford) is a two-panel cycling window,
an animated WebP plus a bench photo with the shell off (the animated panel was
a walk clip on the day; it was replaced by a walkaround on 4 Sep);
Fig. 6 (P6 Baybayin) is a supplied glyph illustration. Note what Fig. 6 is
**not**: the slot specified an accuracy chart, and an illustration is a
subject, not evidence. The caption says only what the picture shows, and must
keep doing so. The row's claim is carried by the summary and the linked paper.

### An /impeccable critique ran against this state

Snapshot at `.impeccable/critique/2026-09-03T11-59-52Z__src-pages-index-astro.md`,
scored **22/32**. Detector: zero findings on the page and on `src/components`.
Contrast claims in `DESIGN.md` verified true. No browser overlay was available,
so that step was skipped rather than faked.

Open findings nobody has acted on:

1. **Cycling figures print `Fig. N` twice**, adjacently: the panel label then
   the caption, both starting "Fig. 2", the caption half-describing a panel
   that is not currently visible. It reads as a duplication bug. The fix is
   for `<figcaption>` to carry only the bare handle when `cycle` is set.
2. **No pause control** on the 8s panel swaps. `prefers-reduced-motion` is a
   preference, not the WCAG 2.2.2 mechanism.
3. **`rotating[2]` is `'robots [^3^]. '`** and renders literally in the hero.
   That bracket is a leaked citation marker, not a joke. The owner was told
   and has left it; do not change it without asking.
4. **P8 has nothing clickable**, `links: []` and no `titleHref`.
5. **P7's dashed plate prints its internal shot spec** to visitors.
6. **Breakpoints are 12 `max-width` against 1 `min-width`**, measured, against
   a pinned brief saying mobile is the default case.
7. **Page weight is 3.96 MiB** across 38 files, 1.7MB of it animation. All
   five largest assets are lazy, so first paint is far lighter, but the total
   is large for a phone skim.

The owner was asked about the two P0s the critique raised, the "AI Slop"
default tagline term and "This website" holding the P1 slot, and **said both
are deliberate. Do not re-raise them.**

## What shipped on 2 Sep

Uncommitted at time of writing, at the owner's instruction.

`§3 Projects` went from five rows to **eight**, in the order the owner chose:
this website, SEAOIL, Nova SM3, UBC Rocket, GravSim, Baybayin, colour
analysis, BSM Varsity. Three rows are new and every word in them is condensed
from the owner's own repository READMEs, not written fresh.

**Four credentials now carry folded sources**, NOI.PH, the IOI camp, APIO
and Engineering Physics. Every passage was checked against the live page,
not taken from a search summary. Two traps found doing it: `engphys.ubc.ca`
serves curl a bot-defence captcha, so it needs a real browser to verify;
and the UBC Academic Calendar needs JavaScript but does ship the text in
the HTML.

**The Engineering Physics entry carries a line from the owner's uncle**,
"Basically a triple major on math, engineering and physics", attributed to
"My uncle, UBC Engineering Physics 1999". It is the one source with no
`href`, which is why `href` is optional. It is on the page *because* it is
quoted and attributed: as the site's own prose it would be a boast, and as
an unattributed line it would read as an official description. Do not
unquote it, and do not drop the date, which is what tells a reader it is an
alumnus's gloss rather than a course description.

**Credentials can fold sources behind the note.** `CREDENTIALS` is typed
`Credential[]` now, which let the four `as string | null` annotations go, and
carries an optional `sources` array of `{ text, source, href }`. The note
grows an accent arrow and opens as a `<details>`, closed by default. APIO
carries the NOI.PH rule on who gets invited; the IOI camp carries two, what
the IOI is and what the camp is. No script, and opening on a click is user
input, so it is **not** a further exception to the motion rule.

APIO's link stays on `noi.ph/rules/`. **There is no Wikipedia article for
APIO**, checked against the Wikipedia API under three spellings plus a
full-text search, not guessed; and `apio-olympiad.org` no longer resolves.
Watch out for `ioinformatics.org/page/regional-olympiads/`, which returns
HTTP 200 and is a soft 404 saying the link no longer exists. A link checker
passes it.

**To photograph a `<details>` open**, copy `dist/index.html` with `open`
added to the tag, serve it beside `dist/_astro`, and shoot that. Headless
Chrome cannot click.

**A closing note at the foot of `/blog`** (`QuoteBar.astro`), three Naval
Ravikant quotes cycling on a 7s hold. The owner asked for it, chose the
blog over the homepage, and asked for it centred, quieter, with no rule
and no work title. Quotes live in `QUOTES` in `profile.ts` as
`{ text, author, href }`, so the author travels with the quote and a
second author's words need no further work.

All three lines are verbatim from Naval's 2018 tweetstorm and were checked
against nav.al/rich, which is what the attribution links to. **They are not
the owner's words, so they are not to be trimmed to fit a layout.**

**This is a fourth exception to the pinned "nothing moves without user
input" rule**, on top of the display step, the typed tagline and the
loader. Recorded in `DESIGN.md`. It is off entirely under
`prefers-reduced-motion`, verified with
`google-chrome --force-prefers-reduced-motion`: the first quote stays put
through 23s of virtual time. The cycle itself was verified the same way,
dumping the DOM at increasing `--virtual-time-budget` values, 3s / 9s /
16s / 23s, and confirming exactly one quote carries `is-on` and that the
order wraps. **That technique works here where it does not for the typed
tagline**, and is the only way to prove this component from a headless
capture.

**Search visibility.** The site was not in Google at all, and a search for
the deployed URL or for the owner's full name returned nothing. Nothing was
blocking it; the site was simply new, unlinked and never submitted. What
shipped here is the technical half:

- `src/pages/robots.txt.ts`, a generated `robots.txt`. There was none, a 404.
  Generated rather than static so the absolute sitemap URL comes from `site`
  in `astro.config.mjs` and cannot outlive a domain change.
- `src/components/PersonLd.astro`, schema.org `Person` as JSON-LD on the
  homepage, every field read from `profile.ts`. The point is identity, not
  ranking: `sameAs` names the GitHub and LinkedIn profiles as the same entity
  as this page.
- `SEO` in `profile.ts`, holding an empty `googleSiteVerification` and the two
  Person fields. Empty is a correct state; the meta tag renders only when the
  string is non-empty.
- `noindex` as a blog frontmatter flag, threaded through `content.config.ts`,
  `BlogPost.astro` and `BaseHead.astro`, and set on all five Astro demo posts.
  They stay published and listed on `/blog`; only Google drops them. The
  owner chose this over leaving them indexed, when told they are byte-
  identical boilerplate on thousands of sites. **This is not a reversal of
  "the demo posts stay."** They stay.
  **Superseded on 4 Sep**: the same posts are now `draft: true` as well, so
  they are not published at all and `noindex` is moot on them. `noindex`
  itself is unchanged and still the right flag for a real post that should
  be readable but not found.
- The sitemap now filters those out. `astro.config.mjs` reads the frontmatter
  off disk, because content collections are not available in that file.
  Listing a `noindex` URL in a sitemap is a contradiction Search Console
  reports as an error. Sitemap went from 11 URLs to 6.
- `docs/search-visibility.md`, the account work that is the owner's to do.

**The half that is not done is his and cannot be done from here:** verify the
property in Search Console and paste the token, submit the sitemap, request
indexing on the homepage, and put the URL in the GitHub and LinkedIn website
fields. That last one matters most; nothing on the internet currently links
here, which is the whole reason Google has not found it. Expect days to weeks,
not hours.

Worth knowing: `.vercel.app` is on the Public Suffix List, so the domain
carries no authority of its own. A custom domain is the one paid lever, and
changing `site` in `astro.config.mjs` carries the canonicals, sitemap and
robots.txt with it.

Earlier the same day: em dashes removed everywhere and banned in `CLAUDE.md`;
the project title link became its own `titleHref` field instead of being
`links[0]`; `placeholder` and `id` deleted as dead fields; the post list
extracted to `PostList.astro`; section numbers derived from a `SECTIONS` list;
RSS sorted for the first time; project figures taught to render real photos;
and `docs/` written as a five-file maintenance manual.

**Three figures are filled**, and the figure system was rebuilt to take
them. `figure.src`/`alt` became `figure.plates`, a list of `Plate`, so one
model covers a single image, a collage and a window. Rendering moved out of
`index.astro` into **`src/components/Figure.astro`**, because a timer and
its cleanup do not belong in a page that is otherwise layout.

- **Fig. 1, P1:** the owner's "An evening with Anth, Ropic" poster, 1:1, in
  place of the 1440px screenshot the slot specified. A picture of the
  homepage printed on the homepage tells the reader nothing.
- **Fig. 2, P2 SEAOIL:** the rider/order state machine, `wide: true`.
- **Fig. 5, P6 GravSim:** two animations, `cycle: true`.

**`wide` exists because of Fig. 2.** At the normal 30rem the diagram's
fourteen labelled boxes are about five pixels each. Type inside a picture
does not reflow, so the figure was decoration until it got the full sheet.
Diagrams only; a photograph has no small type to lose.

**GravSim cycles rather than collaging.** Side by side the two panels land
at about 232px, and a field of specks at 232px is texture, not a
simulation.

**Animated GIFs cannot go through `src/assets/`.** Astro's sharp pass takes
frame one and discards the rest *silently*, green build and a frozen
picture. The animations are converted to animated WebP and live in
`public/gravsim/`; the `Plate.still` beside each one is imported normally
and is what `prefers-reduced-motion` readers get, chosen by the browser
through `<source media>` with no script. **3.4MB and 3.1MB of GIF became
478KB and 743KB of WebP at 640px**, same 44 and 60 frames, a 78% cut, and
still the heaviest thing on the site. It is lazy-loaded and P6 is far down
the page, so most readers never fetch it. `sharp` did the conversion; there
is no new dependency and no ffmpeg on this box. The recipe is in
`docs/adding-a-project.md`.

**Still unfilled:** two of the eight projects have an empty figure. Two more
carry `figure: null` on purpose.

## What shipped on 3 Sep

**Fig. 2, P2 Clifford, is a two-panel window**, `cycle: true`, both panels the
owner's own material:

- **(a) three seconds of the demo video**, the quadruped stepping towards the
  camera, 31 frames at 10fps in a 640px square.
- **(b) the bench photograph**, the same machine with its top shell off, its
  boards, loom and leg servos exposed.

The slot had asked for a still side view. A gait is the thing this build either
does or does not do, so it is shown moving; but this is a firmware and hardware
row and the walk shows none of the hardware, which is what (b) is for.

The video source was `~/Downloads/Clifford demo.MOV`, 14.9s of handheld iPhone
HEVC at 1920x1440. **Only the first three seconds are usable.** The owner asked
for 2s to 13s; that range is not one shot. It is roughly four seconds of usable
footage spread across eleven: 2.0-3.1s is the head-on walk, 6.4-7.7s is a high
three-quarter view, 11.8-13.3s is the open chassis, and the rest is either an
out-of-focus close-up of red plastic or a hand reaching in. Encoded whole it
came to 1.67MB, three times what shipped and more than double GravSim, on a row
near the top of §3. He was shown the breakdown and the numbers and chose the
photograph instead, which covers the chassis far better than 12.0-13.3s does.

The clip is portrait, not landscape, and is cropped square so the whole animal
stays in frame as the camera approaches. The photograph is `cliffordphoto.jpg`,
1500x2000, cropped square at y=400 of 2000, which was the offset that kept the
whole machine and the calipers without leaving a dead band of desk.

**There is no ffmpeg on this box.** GStreamer is installed and decodes the MOV
fine, and the full recipe, rotation matrix included, is now in
`docs/adding-a-project.md` under "From a phone video". Three things cost time
and are written down there:

- **A phone clip carries its rotation in the container, not in the frames.**
  GStreamer hands you storage orientation, here landscape, and the `tkhd`
  matrix says to turn it 90 degrees clockwise. `gst-discoverer-1.0` does not
  report this.
- **`sharp(files, { join: … }).resize()` silently flattens the animation** to
  one frame, the same trap as an imported GIF, and the only symptom is a
  suspiciously small file. Resizing a decoded `{ animated: true }` input is
  safe; the joined-frames path is not. Size the PNG frames instead.
- **Video compresses far worse than a rendered simulation.** Handheld footage
  changes every pixel of every frame. 525KB buys three seconds here against
  GravSim's 478KB for four.

Both paths were verified in the browser, not assumed. Two captures at
`--virtual-time-budget` 12000 and 14500 differ across the whole figure, which
is what proves the animation actually advances; under
`--force-prefers-reduced-motion` the same two captures are pixel-identical,
which is what proves the still is being served instead. That is the
QuoteBar technique from 2 Sep, and it works here for the same reason.

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
