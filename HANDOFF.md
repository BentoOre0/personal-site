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
RESUME AUGUST 25 2026.pdf`): name, five of the seven credentials, the
details table, all five projects, GitHub, LinkedIn, email. All page
content lives in `src/data/profile.ts`.

**Real, but from the owner directly on 2 Sep, not from that résumé:** the
TREK Excellence Scholarship and the UBC Computer Science TA appointment.
He gave both facts and the September 2026 start date; nothing else about
them was assumed. The TREK note describes the award rather than him, and
links UBC's own page for it, so the "top 5%" is checkable. **The résumé
is now behind the site by two credentials.**

**Not real:** the four Astro demo posts in `src/content/blog/` are Lorem
ipsum with invented tags, live and RSS-syndicated. **This is deliberate,
see Decisions.**

**Still unfilled:**

1. **The résumé link.** `IDENTITY.resume.href` is `'#'`. The only dead
   link on the site and plausibly the highest-intent recruiter click.
   Owner intended a Google Drive share link; if the PDF goes in
   `public/` instead, note the repo is public and history is permanent.
2. **Two figures.** P6 Baybayin and P7 colour analysis. Every empty slot
   prints the exact shot it needs, so they can be produced to spec. Owner's
   hardware photos exist but are unedited; a Drive folder is linked from the
   UBC Rocket row.
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
