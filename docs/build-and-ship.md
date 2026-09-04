# Building and shipping

Three commands do everything. You need Node 22.12 or newer.

```bash
npm install       # once, and after anyone changes package.json
npm run dev       # local site at http://localhost:4321, reloads as you type
npm run build     # produces dist/; this is what must pass before committing
npm run preview   # serves the built dist/ so you can check the real output
```

You will also see `npx astro dev --background` in `README.md` and `CLAUDE.md`.
It is the same dev server detached from your terminal, managed with
`npx astro dev stop`, `status` and `logs`. Useful when you want your prompt
back; `npm run dev` in its own terminal window is simpler when you are the one
watching it.

`npm run dev` is fast and forgiving. `npm run build` is strict. **A site that
works in `dev` can still fail `build`**, bad frontmatter, a missing image, a
broken import. That is the entire point of the rule in `CLAUDE.md`:

> `npm run build` must pass before any commit.

---

## The loop

```
edit → look at it in dev → npm run build → screenshot → bump the rev → commit
```

### Bump the rev on every commit

`REVISION` in `src/data/profile.ts` is printed at the foot of every page, and
it moves with the site:

```ts
export const REVISION = {
	rev: '2.8',
	status: 'DEPLOYED',
	updated: '2026-09-04',
};
```

- **`rev` steps one tenth per commit**, and the tenths wrap. `0.8`, `0.9`,
  `1.0`, `1.1`. Never `0.10`; it is a revision number, not a decimal.
- **`updated` becomes the date of the commit.** The footer labels it "Last
  revised", so a date that lags is a printed untruth.
- **Both go in the same commit as the change they describe**, not a tidying
  commit afterwards. A rev bumped on its own dates nothing.

`status` is separate and does not move with the rev. It read `PRELIMINARY`
while the page still carried placeholders and reads `DEPLOYED` now that it
does not. It is a claim about the document, so put it back to `PRELIMINARY`
if the page goes back to carrying `TBD`s.

**Screenshot before you judge any visual change:**

```bash
./scripts/shots.sh
```

This writes `.shots/<page>-<width>.png` at 390, 768 and 1440 pixels using your
installed Chrome. Nothing to install, and `.shots/` is gitignored.

**Look at the 390 capture.** Every design pass on this project before it existed
was done by reading CSS and reasoning about it, and a critique, a polish, a
harden *and* an adapt pass all missed defects that were obvious in ten seconds
on a real phone. Reasoning about CSS is not looking at the page.

Two things about these captures, both learned the hard way:

- They are taken at 3× scale on purpose. A 1× capture made the sketch look
  illegible when it is fine on a real device.
- **The typed tagline is frozen** in every capture. Screenshots can never tell
  you anything about the rotating word.

---

## Testing on localhost

Two local servers, and they are not interchangeable.

| | What it serves | Use it for |
|---|---|---|
| `npm run dev` | live, unbuilt, on `:4321` | editing; it reloads as you type |
| `npm run preview` | the real `dist/`, on `:4321` | **checking anything for real** |

**`npm run dev` injects the Astro dev toolbar**, a dark floating pill at the
bottom of the page. It is not in production, it is not in `dist/`, and it will
sit in the bottom of every screenshot you take against the dev server. Anything
you intend to *look at and judge* should be served from the build:

```bash
npm run build && npm run preview     # then open http://localhost:4321
```

If you want a plain static server with nothing injected at all, any will do:

```bash
cd dist && python3 -m http.server 8899     # then http://localhost:8899
```

Stop it with `pkill -f "http.server 8899"` when you are done. `dist/` is
gitignored, so nothing here can end up committed.

### Checking a specific viewport by hand

`./scripts/shots.sh` covers 390 / 768 / 1440. When you want one width, or a
width it does not cover, drive Chrome directly:

```bash
google-chrome --headless --disable-gpu --no-sandbox --hide-scrollbars \
  --force-device-scale-factor=2 --virtual-time-budget=25000 \
  --window-size=390,8000 --screenshot=/tmp/shot.png http://localhost:4321/
```

**Three things will silently give you a wrong picture.** Each of these has
already cost real time on this project:

1. **`--virtual-time-budget` under about 5000 captures the loading screen**,
   not the page. The loader holds 1400ms and slides for 480ms, but virtual
   time is consumed by everything on the page, so a tall window with many
   images needs far more than the wall-clock figure suggests. 25000 is safe.
   A capture that comes back as a near-black rectangle is this.
2. **Chrome clips a screenshot at 16384 device pixels.** At
   `--force-device-scale-factor=2` that is 8192 CSS pixels, and the homepage
   is taller than that on a phone. The capture is cut off with no warning and
   no error, and **the cut looks exactly like the end of the document**. If
   you are measuring page height or checking the footer, capture at scale
   factor 1.
3. **A tall `--window-size` inflates the page.** The viewport height is
   whatever you asked for, so anything sized against the viewport stretches
   to fill it, and "how tall is the page" becomes unanswerable from the
   image. Do not measure document height from a tall screenshot; it is only
   good for looking at things.

### Checking reduced motion

Four things on this site move on their own: the typed tagline, the loading
screen, the quote bar at the foot of `/blog`, and any figure that animates or
cycles. All four are supposed to stop under `prefers-reduced-motion`.

```bash
google-chrome --headless --force-prefers-reduced-motion ...
```

The way to prove a thing is *actually* still is to capture it twice at
different `--virtual-time-budget` values and compare the two files. If they are
byte-identical, nothing moved. This works for the quote bar and for cycling
figures. **It does not work for the typed tagline**, which virtual time freezes
either way, so a screenshot can never tell you anything about the rotator.

---

## Shipping

The repo is `github.com/BentoOre0/personal-site`. The Vercel project
`jeremyaidanhernandezyu` is connected to it, so **deploys are triggered by
pushing to GitHub.** There is no deploy button to press and no CLI step.

```bash
git checkout -b some-descriptive-branch   # never work directly on master
# …edit…
npm run build                             # must pass
git add -A
git commit -m "Say what changed and why"
git push -u origin some-descriptive-branch
```

**Pushing any branch that is not `master` gives you a preview URL**, a
complete, real deployment of that branch at its own address. This is the safest
way to look at a change on your actual phone before it is public. Vercel posts
the link on the commit in GitHub.

When you are happy, merge to `master`. **`master` is production**, the moment
it lands there, it is the live site.

---

## Before you push, every time

- [ ] `npm run build` passes
- [ ] You looked at the phone screenshot
- [ ] **`REVISION.rev` is bumped one tenth and `REVISION.updated` is today**
- [ ] **No secrets in the diff.** Read what you are committing:
      `git diff --staged`
- [ ] No real personal data that does not belong on a public site

That third one deserves emphasis. This repo is public and **git history is
permanent**, deleting a file in a later commit does not remove what it
contained, and anything pushed to a public repo should be assumed scraped
within minutes. API keys, passwords, tokens and connection strings go in
environment variables, never in a source file. If one is ever committed, the
only real fix is to rotate the credential itself; cleaning the history is
cleanup afterwards, not a remedy.

---

## When something breaks

**A post 404s but the file is right there.**
Astro's content index lives at `node_modules/.astro/data-store.json`, not in
`.astro/`. If it is cleared while the dev server runs, every post 404s with the
files untouched on disk. Restart the dev server.

**`npm run build` passes but the dev server behaves strangely.**
Then it is the dev server, not your code. Long-lived dev servers go bad, after
a compile error one can keep serving a page whose script is missing while still
reporting healthy. Stop it and start it again.

**You edited `astro.config.mjs` and things broke.**
Config changes need a full restart; the dev server does not pick them up. A
stale server here once took the whole site down with `Invalid URL`.

**The dev server says it started but the page is stale, or it moved to 4322.**
An orphaned process is still holding port 4321. Find and stop it:

```bash
ss -lptn 'sport = :4321'    # shows the PID holding the port
kill <pid>
```

**A link on the live site is dead and nothing warned you.**
Nothing checks them. This has happened twice: the résumé link pointed at Google
Drive's homepage instead of a shared file, and a project's code link pointed at
a folder that had been renamed. Both were invisible, the build passed and the
page looked correct. Until there is a link checker, click your own links after
changing them, especially any that point into a repo folder or a Drive file.

---

## What is where, when you are lost

| Symptom | File |
|---|---|
| Wrong words on the homepage | `src/data/profile.ts` |
| Homepage looks wrong | `src/pages/index.astro` (layout and its CSS together) |
| Colours, type sizes, spacing | `src/styles/global.css` |
| The list of posts looks wrong (on `/blog` *or* a tag page) | `src/components/PostList.astro` |
| The `/blog` masthead or filter bar looks wrong | `src/pages/blog/index.astro` |
| A single post looks wrong | `src/layouts/BlogPost.astro` |
| A section heading or its §N | `src/components/SectionHead.astro` |
| Header, footer, loading screen | `src/components/` |
| Site title, description, URL | `src/consts.ts` and `astro.config.mjs` |
