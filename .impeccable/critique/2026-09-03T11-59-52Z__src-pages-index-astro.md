---
target: homepage
total_score: 22
max_score: 32
na_heuristics: 7,10
p0_count: 2
p1_count: 2
timestamp: 2026-09-03T11-59-52Z
slug: src-pages-index-astro
---
Method: dual-agent (A: design review, Opus; B: detector + browser evidence, Sonnet), isolated and parallel.
Caveat: B returned before A, so synthesis saw detector output first. A ran isolated and unanchored.
Caveat: both launched before the section-rule revert and the has-figure change; A flagged both itself.

## Design Health Score: 22/32 (Acceptable, 69%). H7 and H10 n/a on a Persuade surface.

1 Visibility 3 - cycling figure gives no sign a second panel exists.
2 Match real world 3 - Rev 0.2 PRELIMINARY reads as a draft to a hiring manager.
3 User control 2 - three autonomous motions, no pause. WCAG 2.2.2 unmet.
4 Consistency 2 - red means link except in S1, where 7 red notes are not links and 5 links are black.
5 Error prevention 3 - numbering derived from position; but links: [] is legal and P8 has nothing clickable.
6 Recognition 2 - titles have no underline at rest on hover-capable devices.
7 Flexibility n/a - Persuade surface, one linear read.
8 Aesthetic 3 - disciplined; two dashed plates print internal shot specs to the audience.
9 Error recovery 4 - /404 is the best-composed page on the site.
10 Help n/a - no task to document.

## Design specificity: the conceit pays, and pays for the wrong content.
Datasheet is not a skin (figure numbering, section permalinks, params tables have nothing to attach to
on a generic portfolio). But the page leads with a 1.9s splash, a tagline reading "AI Slop", and a P1
slot spent on the site itself with an AI-made poster. DESIGN.md's own guardrail is "not a joke".

Deterministic scan: 0 findings on src/pages/index.astro and src/components. Exit 0 both.
Visual overlays: unavailable, no mutation-capable browser in session. Injection skipped, not faked.

## Cognitive load: 5 of 8 fail (critical)
Fail: single focus, chunking, visual hierarchy, one thing at a time, working memory.
Pass: grouping, minimal choices, progressive disclosure.

## Priority issues

[P0] rotating[0] is 'AI Slop kaomoji...?' (profile.ts:38). Server-rendered first paint, what a
JS-blocked reader sees, what crawlers and unfurls read, and PERMANENT under prefers-reduced-motion.
Kaomoji is Kannada letters, pronounced by screen readers. Index 2 carries a stray [^3^] artifact.
Fix: make rotating[0] load-bearing, keep the joke at index 3+, delete [^3^]. -> /impeccable clarify

[P0] S3 order contradicts impact. P1 holds the only 28px title, ink-black summary, accent designator
and largest figure, for "This website". SEAOIL (sole dev, shipped 60 days early, in production) is
third, grey, 16px, figure-less. Violates PRODUCT.md principle 2.
Fix: SEAOIL to P1, this website to the tail, give SEAOIL a diagram. -> /impeccable layout

[P1] Mobile shape inverted. S3 is 73.4% of the document at 390px, UP from the prior audit's 64%; the
summary cut was more than eaten by the new figures. NOI hook below the 844px fold. Page ends in ~365px
of revision metadata with no contact and no media queries. -> /impeccable adapt

[P1] Verification path invisible at rest on hover-capable devices. Underlines only inside
@media (hover: hover) on :hover. Phone shows every link, laptop shows none. 5 credential titles and
7 project titles are plain black. Clicking through to a repo is the named conversion.
Fix: underline at rest at ~40% accent on all pointer types. -> /impeccable polish

[P2] Cycling figures print their number twice, adjacently. Fig. 2(b) label then Fig. 2 caption, both
starting "Fig. 2", the caption describing a panel not currently visible. Reads as a duplication bug.
Fix: when cycle is set, figcaption carries the bare Fig. N handle only. Add panel indicator + pause.
-> /impeccable harden

## Persona red flags
Dana (recruiter): 1.9s black splash; "building AI Slop" under the name; NOI below fold; first project
is the site itself credited to ChatGPT and Claude; og:image is still blog-placeholder-1.jpg; PRELIMINARY
stamped twice.
Sam (screen reader/keyboard): kaomoji announced as Kannada letters; 8s auto-swap with no pause;
placeholder plates announce figures describing curves that do not exist; focus-visible buried inside
@media (hover: hover).
Casey (mobile): 9,300px scroll; rows 2/4/5 each taller than a viewport; two dashed boxes print internal
production notes; P8 has no image and no link.

## Minor
- DESIGN.md describes a page that does not exist: three stale claims from the same session (captions
  and all designators accented, gutter at 40rem, figures 30/24rem).
- PRODUCT.md and HANDOFF.md still list resume.href as unfilled; it holds a real Drive link.
- Accent recount: B measured 28 resting marks from built CSS; A said ~30 desktop / ~42 mobile, the
  delta being underlines forced on by @media (hover: none). Driver is a { color: var(--accent) } as the
  site-wide base. Both agents independently condemned the credential notes.
- Credential notes are the incoherent block: 7 red non-links against 5 black links, exactly inverted.
- has-figure change: A calls it a mild regression (P3/P8 params now wider than neighbours); says the
  right lever is a diagram, not removing the track.
- The two-sentence rule keys off a figure's presence, not its evidentiary value. P4's figure is a team
  portrait; profile.ts concedes the avionics-bay shot would say more.
- The 832-960px band keeps the old ragged layout. iPad Pro portrait is 834px.
- Contrast claims verified true: muted 4.6496:1, accent 4.6536:1.
- Page weight 3.96 MiB across 38 files; top five assets all lazy; 1.7MB of it is animation.
- Breakpoints: 12 max-width vs 1 min-width.
