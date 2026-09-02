# Adding a new homepage section

This is the biggest change in these guides. Credentials, Details and Projects
are all *data*; you edit an array and the page redraws itself. A new section is
*structure*: you are adding to the document, and the document's shape is written
down in `CLAUDE.md` as a rule.

So this guide has two halves: whether to do it, and how.

---

## First: should it be a section at all?

`CLAUDE.md` fixes the homepage at three sections, Credentials, Details,
Projects, with the blog on its own route. `PRODUCT.md` calls that structure
"flat and fixed". Those are not accidents. A recruiter gives this page roughly
thirty seconds, and every new heading spends some of it.

Before adding one, check the cheaper options:

| Instead of a section | Consider |
|---|---|
| A role, award, standing, or qualification | A **credential**, §1 already holds these |
| A fact about you (location, stack, availability) | A **details row**, §2 is a list of exactly this |
| A thing you built | A **project**, §3, which already scales to any length |
| A long explanation of something | A **blog post**, linked from the thing it explains |

A new section earns its place only when the content is a genuinely different
*kind* of thing from all three; not a longer version of one of them.

The honest test: if you cannot name what the section contains in one word that
is not already on the page, it is probably a project or a credential.

---

## Anatomy of a section

Every section on the homepage is this shape:

```astro
<section class="sheet section" aria-labelledby="work">
  <SectionHead {...section('work')} />

  <!-- the section's content -->
</section>
```

Three things are doing work:

- **`class="sheet section"`**, `sheet` sets the 960px max width and the safe
  gutters; `section` sets the vertical padding. Both always.
- **`<SectionHead>`** draws the `§N` designator, the `<h2>`, and the hairline
  that runs out to the right edge. You never write that markup or that rule
  yourself. It lives in `src/components/SectionHead.astro`.
- **`aria-labelledby` must match the `id`** in the `SECTIONS` list. The
  component puts that `id` on the `<h2>`, so the two agree and a screen reader
  announces the section by its heading.

---

## Section numbers count themselves

`§1`, `§2`, `§3` are **derived from one ordered list** in `index.astro`:

```ts
const SECTIONS = [
  { id: 'features', title: 'Credentials' },
  { id: 'specs',    title: 'Details' },
  { id: 'work',     title: 'Projects' },
] as const;
```

A section's number is its position in that array. Insert one in the middle and
everything after it renumbers itself; there is nothing to update by hand.

> This used to be literal text typed into the markup three times. Inserting a
> section in the middle meant renumbering every one after it manually, and a
> miss produced a page with two `§3`s, a green build, and no warning. It works
> the same way the `P1`–`P8` project designators and the `Fig. N` figure
> numbers do: position is the source of truth.

`id`s are permalink targets and are historical, `features` renders as
"Credentials", `specs` as "Details", `work` as "Projects". Do not rename them;
someone may have saved a link.

---

## How to add one

### 1. Put the content in `profile.ts`

Never hard-code words into `index.astro`. Content lives in
`src/data/profile.ts` so it stays in one place:

```ts
/* §4 Experience. Employment, as distinct from the projects in §3. */
export const EXPERIENCE = [
  {
    role: 'AI & Automation Engineering Intern',
    org: 'SEAOIL / SEAGAS',
    period: 'May 2025 – Sept 2025',
    note: 'Manila, Philippines',
  },
];
```

Shape it however the content needs; it is your data.

### 2. Import it

At the top of `src/pages/index.astro`, add it to the existing import:

```ts
import { CREDENTIALS, EXPERIENCE, IDENTITY, PROJECTS, REVISION, SPECS } from '../data/profile';
```

### 3. Register the section

Add it to `SECTIONS` in `index.astro`, **in the position it should appear**:

```ts
const SECTIONS = [
  { id: 'features',   title: 'Credentials' },
  { id: 'specs',      title: 'Details' },
  { id: 'experience', title: 'Experience' },   // new, becomes §3
  { id: 'work',       title: 'Projects' },     // silently becomes §4
] as const;
```

### 4. Add the markup

Place the `<section>` where it belongs in the page body. The heading comes from
the `SectionHead` component, which draws the designator, the title and the
hairline rule:

```astro
<section class="sheet section" aria-labelledby="experience">
  <SectionHead {...section('experience')} />

  <table class="spec">
    <tbody>
      {EXPERIENCE.map((e) => (
        <tr>
          <th scope="row">{e.period}</th>
          <td>{e.role} · {e.org}</td>
        </tr>
      ))}
    </tbody>
  </table>
</section>
```

`section('experience')` looks the entry up in `SECTIONS` and returns its `id`,
`title` and computed number. TypeScript will reject an id that is not in the
list, so a typo fails the build rather than rendering a blank heading.

**Reuse an existing component before inventing one.** `.spec` gives you the
parameter table for free, already responsive and already stacking below 30rem.
`.features` gives you the credential list shape. `DESIGN.md` lists the whole
set under *Components*. A new section that borrows existing primitives will
look like it belongs; one with fresh CSS usually will not.

### 5. Update the written rules

This is the step that gets forgotten, and it is the one that matters most for
future-you:

- **`CLAUDE.md`**; its *Content structure* list is the spec. Add your section
  to it. If the file still says three sections and the page has four, the next
  person to read it (including you in six months) is working from a lie.
- **`PRODUCT.md`**, only if the section changes what the site is *for*.
- **`DESIGN.md`**, only if you introduced a new visual pattern rather than
  reusing an existing one.

### 6. Verify

```bash
npm run build          # must pass
./scripts/shots.sh     # then LOOK at the 390px capture
```

Check specifically: section numbers ascend with no repeats and no gaps, the
heading rule reaches the right edge, and the new section's spacing matches its
neighbours.

---

## Checklist

- [ ] Confirmed it is not really a credential, a details row, a project, or a post
- [ ] Content lives in `profile.ts`, not typed into `index.astro`
- [ ] `aria-labelledby` on the `<section>` matches the `id` in `SECTIONS`
- [ ] `class="sheet section"` on the `<section>`
- [ ] Registered in `SECTIONS` at the right position (the number follows)
- [ ] Reused `.spec` / `.features` / existing components where possible
- [ ] **`CLAUDE.md` content structure updated**
- [ ] `npm run build` passes
- [ ] Looked at the phone screenshot
