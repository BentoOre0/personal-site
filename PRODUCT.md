# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: **technical recruiters and hiring managers screening for software
engineering roles.** They arrive from a resume link, LinkedIn, or an
application, and they skim. The first screen decides whether they keep
reading. They are looking for a fast, verifiable reason to believe this
candidate can build.

Secondary readers exist (peers, mentors) but no design decision is made for
them. When their needs conflict with the recruiter skim, the recruiter wins.

## Product Purpose

A personal portfolio and blog that converts a 30-second recruiter skim into
a real read, and a real read into contact. Success is a recruiter reaching
the projects section still interested, and leaving with the sense that the
work is genuinely this person's.

## Positioning

The owner is broad across disciplines and reads that breadth as a weakness.
It is the opposite, and the site's job is to make that legible: **proven
algorithmic ability at national-selection level, combined with hardware that
physically works and software that shipped.** Concretely, the intersection is:

- National Olympiad in Informatics, 4th in the Philippines (2024), plus
  IOI national-team selection candidacy 2023–2025 — nationally ranked,
  externally verifiable credentials very few software applicants hold;
- hardware projects spanning robotics/mechatronics, mechanical CAD and
  fabrication, and PCB/embedded systems, with physical results photographed;
- software work including an MVP and AI automation engineering.

A neighboring portfolio can copy the layout. It cannot copy that combination.
Breadth is presented as **range** — evidence of a builder who crosses domains —
never as a catalog of everything ever attempted.

## Operating Context

- Discovery is almost always a link from elsewhere (resume, LinkedIn,
  application form), not organic search. There is no funnel to design; the
  visitor arrives already mid-evaluation.
- The skim is short and often on a phone. Mobile is not a fallback layout.
- Recruiters verify by clicking through to repos. Every project claim should
  have something clickable behind it.

## Capabilities and Constraints

- Astro, deployed on Vercel. Static only: no database, no backend, no auth.
- `npm run build` must pass before any commit.
- No new dependencies without explicit approval.
- Content structure is flat and fixed (see CLAUDE.md): identity and links →
  credentials → projects ordered by impact → blog. **No Software/Hardware
  split**; a single flat project list ordered by impact, which is how breadth
  becomes range instead of two thin columns.
- Competitive programming results are a credential, not a project.
- The Astro starter is gone. `src/pages`, `src/consts.ts` and
  `src/data/profile.ts` now carry real content, sourced from the résumé of
  25 Aug 2026. **`src/content/blog/` is the exception and is still starter
  output**: four demo posts with Lorem ipsum bodies and invented tags,
  live at the public URL and syndicated through `rss.xml`.

**Still unfilled:** `IDENTITY.resume.href` in `src/data/profile.ts` is `'#'`,
the four project figures are unshot, and `og:image` is still the Astro
placeholder. These ship as visibly marked placeholders. They are never
invented, never approximated, and never filled with plausible-sounding
text.

## Evidence on Hand

Real material the owner holds today:

- **Competitive programming:** National Olympiad in Informatics, **4th in
  the Philippines (2024)**; top 20 nationally three years running, 2023–2025;
  IOI selection candidate on the Philippine national team 2023–2025; APIO
  2023–2024. Confirmed and dated, from the résumé of 25 Aug 2026.
- **Hardware projects:** robotics/mechatronics, mechanical CAD and
  fabrication, PCB/embedded, and combined electronics+software builds. Backed
  by **photographs and good repositories**.
- **Software:** an MVP, plus AI automation engineering work with supporting
  **diagrams**. Additional software projects with **charts**.

Photo state: the project photos exist on the owner's machine and are
**unedited raw shots**. They are not yet cropped, framed consistently, or
sized. Any project layout must therefore specify its own aspect ratio and
crop discipline and survive photos of uneven quality, rather than assuming
art-directed imagery.

Charts and diagrams are first-class evidence, not decoration — for the
software and AI automation work they carry the same proof burden that photos
carry for the hardware.

**Does not exist and must not be fabricated:** testimonials, employer names,
metrics, awards, rankings, dates, deployment or user-count claims, and any
credential not listed above.

## Product Principles

1. **The credential is the hook.** The strongest externally verifiable fact
   (NOI, 4th in the Philippines, 2024) does the work in the first screen. It is stated
   plainly, never buried under narrative.
2. **Breadth is range, not a catalog.** Every project earns its slot on
   impact. Cutting a weak project strengthens the site more than adding one.
3. **Show the artifact.** Hardware is proved by photographs, software by
   charts, diagrams, and repos. A project with nothing to look at and nothing
   to click ranks below one that has both.
4. **Skim first, depth second.** A recruiter must be able to extract the whole
   story from headings and images alone, and then find substance if they stay.
5. **Never invent content.** Unknown strings stay visibly marked as
   placeholders. A convincing-sounding fabrication is worse than an obvious
   blank.
