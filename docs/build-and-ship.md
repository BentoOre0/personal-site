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
edit → look at it in dev → npm run build → screenshot → commit
```

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
