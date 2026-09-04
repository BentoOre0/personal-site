# Writing a blog post

A post is one Markdown file in `src/content/blog/`. Adding the file *is*
publishing the post; there is no list to register it in, no index to update.
Astro finds it, builds the page, adds it to `/blog`, and puts it in the RSS
feed.

---

## The fastest path

```bash
cp src/content/_post-template.md src/content/blog/my-new-post.md
```

Then open it and write. That is the whole workflow.

**The filename becomes the URL.** `my-new-post.md` publishes at
`/blog/my-new-post/`. Use lowercase words separated by hyphens. Renaming the
file later changes the URL and breaks any link anyone saved, so pick a name you
can live with.

---

### Writing from a phone or another machine

You do not need this repo checked out. GitHub's web editor will create the file
directly on a branch:

```
github.com/BentoOre0/personal-site/new/master/src/content/blog
```

Committing there triggers the same build and deploy as pushing from your
laptop. Commit to a branch rather than straight to `master` if you want to read
the preview deployment before it is public.

---

## Frontmatter

The block between the `---` lines at the top is *frontmatter*, settings for
the post, not content. It is checked at build time by
`src/content.config.ts`, so a mistake here fails the build with a clear message
rather than shipping broken.

```yaml
---
title: 'Dispatching 200 deliveries a day out of a Google Sheet'
description: 'One sentence. Shows on the blog index and in Google results.'
pubDate: 'Sep 02 2026'
tags: ['embedded', 'automation']
heroImage: '../../assets/avionics-bay.jpg'
updatedDate: 'Sep 10 2026'
---
```

| Field | Required | Notes |
|---|---|---|
| `title` | **yes** | The `h1` on the post and the link text on `/blog`. |
| `description` | **yes** | One sentence. Appears on the index, in search results, and in the RSS feed. Worth real effort; it is what decides whether anyone clicks. |
| `pubDate` | **yes** | Any format a date parser accepts. `'Sep 02 2026'` matches the existing posts. |
| `tags` | no | Defaults to `[]`. See below. |
| `heroImage` | no | A path to an image. See below. |
| `updatedDate` | no | Only if you edit the post after publishing. |
| `noindex` | no | Defaults to `false`. `true` keeps the post off Google while leaving it published and listed on `/blog`. See [search-visibility.md](search-visibility.md). |
| `draft` | no | Defaults to `false`. `true` keeps the post off the site entirely: not listed, not in the feed, page not built. Set on the Astro demo posts. See below. |

Quote the strings. If a title contains an apostrophe, use double quotes around
it: `title: "The rocket's avionics bay"`.

---

## Tags

```yaml
tags: ['embedded', 'automation']
```

Tags are free text; you invent them as you go. Each one automatically gets its
own archive page at `/blog/tags/<tag>/` listing every post carrying it, and
appears as a chip on the blog index.

You do not create those pages. `src/pages/blog/tags/[tag].astro` generates one
per tag it finds across all posts, at build time. Add a tag nobody has used
before and its archive exists the moment you build.

Keep the vocabulary small. Two posts sharing a tag is useful; eight tags used
once each is noise.

---

## Images

Unlike project figures, **blog images work today.**

1. Put the image in `src/assets/`.
2. Point `heroImage` at it with a path relative to your post file:

```yaml
heroImage: '../../assets/avionics-bay.jpg'
```

`../../` because the post sits in `src/content/blog/` and needs to climb two
levels to reach `src/assets/`.

Astro processes it through `sharp` at build time, resizing, converting to
modern formats, and generating the right markup. That is why it goes in
`src/assets/` and not `public/`: files in `public/` are copied verbatim with no
optimisation.

The hero renders at the top of the post, captioned `Fig. 1` with the post title.
There is currently one hero image per post; images inside the body are ordinary
Markdown and are *not* optimised the same way.

---

## Writing the body

Everything below the closing `---` is plain Markdown: headings with `##`,
`**bold**`, `*italic*`, `[links](https://example.com)`, `-` lists, and fenced
code blocks with a language tag.

If you want a React or interactive component inside a post, name the file
`.mdx` instead of `.md`, MDX is installed. You almost certainly do not need
this.

---

## Keeping a post unfinished

```yaml
draft: true
```

A draft is off the site completely: not on `/blog`, not in any tag archive,
not in the RSS feed, and **its page is not built**, so its URL 404s. Write
in the open without publishing, and delete the line to ship.

This is set on the five Astro demo posts. They are the template this blog is
built on, kept in `src/content/blog/` so the markup, the tags, the hero
images and the MDX example all stay available to copy from, but hidden so
nobody reads Lorem ipsum on the live site. `markdown-style-guide.md` is the
one worth opening before you write; it is a working sample of every piece of
Markdown this site renders.

**`draft` and `noindex` are different jobs.** `noindex` publishes a post and
hides it from Google. `draft` does not publish it at all, which makes
`noindex` moot on the same file. The demo posts carry both, from before
`draft` existed.

---

## Checklist

- [ ] Filename is lowercase-with-hyphens and is a URL you can live with
- [ ] `title`, `description` and `pubDate` are all present
- [ ] `description` is one real sentence, not a placeholder
- [ ] Tags reuse existing vocabulary where they can
- [ ] `npm run build` passes
- [ ] Read the post at `/blog/<slug>/` before shipping
- [ ] No `noindex: true` left in the frontmatter, unless you meant it
- [ ] **No `draft: true` left in the frontmatter**, or the post does not ship

---

## When a post mysteriously 404s

**It is almost never your file.** Astro keeps its content index at
`node_modules/.astro/data-store.json`. If that cache is cleared while the dev
server is running, every post 404s while the Markdown sits untouched on disk.
It looks exactly like deleted content and is not.

**Fix:** stop the dev server and start it again. This has caused a genuine
panic on this project more than once.
