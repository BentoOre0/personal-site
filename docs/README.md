# Maintaining this site

Read this one first; it is the map. The rest are task guides you open when you
need them.

| I want to… | Open |
|---|---|
| Add or edit a project, its links, its photo | [adding-a-project.md](adding-a-project.md) |
| Change my credentials or the details table | [credentials-and-details.md](credentials-and-details.md) |
| Write a blog post | [writing-a-post.md](writing-a-post.md) |
| Add a whole new section to the homepage | [adding-a-section.md](adding-a-section.md) |
| Run it locally, check it, put it live | [build-and-ship.md](build-and-ship.md) |
| Get the site to show up on Google | [search-visibility.md](search-visibility.md) |

Roughly in order of how often you will need them. The first three are editing
data in one file; the fourth changes the shape of the document and is the only
one that also asks you to update the rules in `CLAUDE.md`.

There are three other files at the repo root that these guides defer to:

- **`CLAUDE.md`**, the rules. Content structure, what is allowed.
- **`PRODUCT.md`**, who the site is for and what it is trying to do.
- **`DESIGN.md`**, the visual system: type scale, colours, spacing.
- **`HANDOFF.md`**, what state the site is in right now and what is unfinished.

---

## The one idea that explains the whole repo

**All the words on the homepage live in one file: `src/data/profile.ts`.**

Not in the HTML. Not scattered across components. One TypeScript file holding
plain data, your name, your credentials, the details table, every project.
`src/pages/index.astro` reads that file and draws the page from it.

This means:

- To change what the homepage *says*, you edit `profile.ts` and nothing else.
- To change how the homepage *looks*, you edit `index.astro` and nothing else.

Those two jobs never touch the same file. That separation is the single most
useful thing to know about this codebase.

The blog is different; each post is its own Markdown file in
`src/content/blog/`. That is covered in [writing-a-post.md](writing-a-post.md).

---

## Where everything lives

```
src/
├── data/
│   └── profile.ts          ← ALL homepage content. Start here.
├── pages/
│   ├── index.astro         ← the homepage: layout + all its CSS
│   ├── 404.astro
│   ├── rss.xml.js          ← the blog's RSS feed
│   └── blog/
│       ├── index.astro     ← the post list at /blog
│       ├── [...slug].astro ← renders one post; the [...] means "any post"
│       └── tags/[tag].astro← one page per tag, generated automatically
├── content/
│   ├── blog/               ← YOUR POSTS GO HERE, one .md file each
│   └── _post-template.md   ← copy this to start a new post
├── content.config.ts       ← the rules a post's frontmatter must follow
├── lib/
│   └── posts.ts            ← shared post sorting and tag counting
├── layouts/
│   └── BlogPost.astro      ← the frame every post is drawn inside
├── components/             ← header, footer, loader, PostList, SectionHead…
├── styles/
│   └── global.css          ← colours, type scale, spacing tokens
└── assets/                 ← images and fonts that the build optimises

scripts/
└── shots.sh                ← screenshot the site at phone/tablet/desktop
```

**The leading underscore in `_post-template.md` matters.** Astro ignores files
starting with `_`, which is why the template is not published as a blog post.

---

## The rules that are not negotiable

1. **`npm run build` must pass before you commit.** This is in `CLAUDE.md`.
   The build catches broken frontmatter, bad imports, and missing images.
2. **Never invent content.** If you do not have a real fact, the placeholder
   stays `TBD` and the figure slot stays empty. A convincing-sounding
   fabrication is worse than an obvious blank. This has held for the whole
   life of the project.
3. **No new dependencies without deciding deliberately.** Everything here runs
   on Astro and four small official plugins. Keep it that way.
4. **Static only.** No database, no backend, no login. The whole site is
   HTML files generated at build time.

---

## Things that number themselves

Four things on this site are computed from position, never typed by hand. If
you find yourself writing one of these out, something is wrong:

| What | Derived from |
|---|---|
| `P1`, `P2`, `P3`… project designators | position in `PROJECTS` |
| `Fig. 1`, `Fig. 2`… figure numbers | the project's own number, so `Fig. 4` sits in P4 |
| `§1`, `§2`, `§3` section numbers | position in the `SECTIONS` list in `index.astro` |
| Which project title is largest | position in `PROJECTS`, the list compresses as it descends |

Reorder the data and the numbers follow. This matters because the alternative,
typing them in, fails silently: the build passes, the page looks fine, and you
have two `§3`s, or a caption pointing at the picture above it.

A figure number matching its row is also why the sequence has gaps. P3 and P8
carry no figure, so there is no `Fig. 3` and no `Fig. 8`. That is correct: a
missing number says "that row has no picture", which is visible one row up. It
used to be a separate running count with no gaps, and the cost was that P4 read
`Fig. 3` and P7 read `Fig. 6`, drifting further apart with every figure-less
row added above.

The same principle covers anything two pages both need:

- **`src/lib/posts.ts`** holds the one definition of "newest first" and of how
  tags are counted, shared by `/blog`, every tag archive, and the RSS feed, so
  the filter bar cannot sort one way on one page and differently on another.
- **`src/components/PostList.astro`** holds the post list itself, markup and
  styles, used by both `/blog` and every tag archive. These were duplicated and
  had already drifted: below 40rem one placed the date differently from the
  other, so the same list stacked two ways depending on how you got there.
