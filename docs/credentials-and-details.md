# Editing Credentials and Details

Both live in **`src/data/profile.ts`**, the same file as your projects. They are
§1 and §2 on the homepage, the two things a recruiter reads before they reach
your work.

---

# §1 Credentials

Find `export const CREDENTIALS`. It is an array; each entry is one line on the
page.

```ts
{
  text: 'National Olympiad in Informatics, 4th in the Philippines (2024)',
  note: 'Top 20 nationally for three consecutive years, 2023–2025',
  href: 'https://noi.ph/2024-national-eliminations/',
  confirmed: true,
},
```

| Field | What it does |
|---|---|
| `text` | The credential itself. The big line. |
| `note` | The small grey line beneath it, context, dates, detail. |
| `href` | Optional. If set, `text` becomes a link. `null` if there is nothing to point at. |
| `confirmed` | `false` visibly demotes the entry. See below. |
| `sources` | Optional. One or more passages in somebody else's words, folded behind an arrow on the note. See below. |

The array is typed as `Credential[]`, declared just above it, so every entry
must carry `text`, `note`, `href` and `confirmed`, and may carry `sources`.
Get a field name wrong and the build tells you, by name.

## Four behaviours to know

**1. The first credential is set larger than the rest.** Entry one renders at
28px; every entry below it at 20px. The list is ordered most-impressive-first,
so position one is your hook, the single fact you most want read. Right now
that is the NOI placing, and it is doing real work up there.

Reordering this array is therefore a design decision, exactly like reordering
projects. Whatever goes first gets the size.

**2. A link opens in a new tab.** When `href` is set, the rendered link carries
`target="_blank" rel="noopener noreferrer"`. That is deliberate, a recruiter
verifying a credential should not lose your page to do it.

`href` is plain: a URL string, or `null`. It used to need an
`as string | null` annotation on the first entry as TypeScript bookkeeping;
the explicit `Credential` type replaced that, so if you are copying an older
example, drop the annotation.

**3. `confirmed: false` demotes the entry, and it works.** Setting it drops the
text from 20px to 16px and greys it to the muted colour. It is the honest way to
list something you cannot yet prove, visibly lighter than the verified entries
around it, without being hidden.

All seven current credentials are `confirmed: true`. Five come from the résumé
of 25 Aug 2026; the TREK scholarship and the UBC Computer Science TA
appointment came from the owner directly on 2 Sep, so the résumé is behind the
site by two entries.

**4. `sources` folds somebody else's words behind the note.** Add it and the
note grows a small red arrow. Click the note and it opens to the quoted
passages, each indented under a rule with a link to the page it came from.
Closed on every page load.

```ts
sources: [
  {
    text: 'The IOI is one of five international science olympiads. …',
    source: 'International Olympiad in Informatics',
    href: 'https://ioinformatics.org/',
  },
  {
    text: 'The In-House training will be held for a few days between the APIO and the IOI. …',
    source: 'NOI.PH contest rules, section VII',
    href: 'https://noi.ph/rules/',
  },
],
```

It is an array, so one credential can explain more than one thing. The IOI
camp entry carries two, because it names two things a reader outside
competitive programming has never heard of: the IOI, and the camp.

**Why it folds.** The quotations are longer than the credential they support.
Left open they invert the weight of §1 and the list stops being skimmable, so
the reader spends an arrow on them and opens them only if the claim needs
settling. There is no JavaScript in it; it is a plain `<details>` element, so
it works with scripts blocked, and since it only opens on a click it is not
another exception to the site's "nothing moves without user input" rule.

Use it where a word in the note is load-bearing and a stranger has no way to
weigh it. APIO carries one because "Invited" is doing all the work in that
entry. Most credentials need none, and a credential that explains itself
should not have one.

Three rules. **Quote verbatim.** If you cut, **mark the cut with an ellipsis**
rather than closing the sentence up. And **point `href` at a page that actually
contains the sentence**, so a sceptical reader can find it. Check the last one
by hand: `ioinformatics.org/page/regional-olympiads/` returns HTTP 200 and is a
soft 404 that says the link no longer exists, which a link checker will pass.

## What belongs here rather than in Projects

Per `CLAUDE.md`: **competitive programming results are a credential, not a
project.** More generally, this section is for *standings, awards, roles and
qualifications*, things conferred on you. Projects are things you built.

A scholarship, a ranking, a degree, a teaching assistantship: credential.
A robot, a website, a paper you wrote: project.

When in doubt, ask which noun the entry is. If it names an achievement, it goes
here. If it names an artifact, it goes in Projects.

---

# §2 Details

Find `export const SPECS`. Simpler, a flat list of key/value pairs rendered as
the specification table.

```ts
export const SPECS = [
  { key: 'Focus', value: 'Software engineering · machine learning · avionics hardware' },
  { key: 'Based in', value: 'Vancouver, BC' },
  { key: 'Languages', value: 'C++ · C · Python · JavaScript / TypeScript' },
  { key: 'Availability', value: 'Open to 2026 and 2027 opportunities' },
];
```

`key` renders as the uppercase label on the left, `value` as the content on the
right. Add, remove or reorder rows freely; nothing derives from position here,
and there is no size curve.

## Notes

**`TBD` renders differently.** A `value` of exactly `TBD` (case-sensitive) is
drawn in muted grey with wider letter-spacing, marking it as a deliberate blank.
Same convention as project params.

**The separator is `·`, not a comma.** A middle dot, used throughout the site
for lists inside a value. Copy it from an existing row rather than typing a
bullet or a hyphen.

**Below 30rem the table stacks**, putting each `key` on its own line above its
`value`. Two columns at 342px pinned the key at 38% of the row and squeezed the
value to about fourteen characters. So a long `value` is safe on a phone; it
gets the full width, but a long `key` is still a label and should stay short.

**Watch for values that date themselves.** `'Open to 2026 and 2027
opportunities'` reads as current today and reads as neglect in 2028. Anything
with a year in it is a maintenance obligation you are taking on. Worth a glance
whenever you touch this file.

---

## Checklist

- [ ] Most impressive credential is first; it gets the 28px step
- [ ] Every `href` actually resolves (click it)
- [ ] `confirmed: false` on anything you cannot yet prove
- [ ] Any `sources` entry is verbatim, marks its cuts, and its `href` really contains the sentence
- [ ] Nothing invented; every entry traceable to a real document
- [ ] Achievements in Credentials, artifacts in Projects
- [ ] `npm run build` passes
