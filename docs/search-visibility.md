# Getting the site into Google

The site is technically ready for search engines. It is not *in* Google yet,
and no amount of further code will put it there. The remaining steps are
account work only you can do, and they take about fifteen minutes.

---

## What is already true

You do not need to touch any of this; it is here so you know what is covered.

| Thing | Where it comes from |
|---|---|
| `robots.txt` | `src/pages/robots.txt.ts`, generated so the sitemap URL follows `site` in `astro.config.mjs` and cannot go stale |
| `sitemap-index.xml` and `sitemap-0.xml` | the `@astrojs/sitemap` integration, rebuilt every deploy |
| A canonical URL on every page | `src/components/BaseHead.astro` |
| A title and a description on every page | same file, per page |
| Structured data identifying you as a person | `src/components/PersonLd.astro`, read from `profile.ts` |
| The Astro demo posts kept out of the index | `noindex: true` in their frontmatter |

Nothing is blocked. There is no `noindex` on the homepage, no `Disallow`, and
Vercel is not sending a `x-robots-tag` header. The site is simply new, and
Google does not know it exists.

---

## The part you have to do

### 1. Verify the site in Google Search Console

Go to [search.google.com/search-console](https://search.google.com/search-console),
add a property, choose **URL prefix**, and enter:

```
https://jeremyaidanhernandezyu.vercel.app
```

Pick the **HTML tag** verification method. Google shows a tag like:

```html
<meta name="google-site-verification" content="AbCdEf123..." />
```

Copy **only the `content` value**, not the whole tag, into `profile.ts`:

```ts
export const SEO = {
	googleSiteVerification: 'AbCdEf123...',
```

Then `npm run build`, commit, and push. Wait for Vercel to finish deploying,
then press **Verify** in Search Console. The tag renders only when that string
is non-empty, so an empty string is a correct state and not a broken one.

The token is not a secret. It proves ownership to one Google account and does
nothing else; every site using this method has it in public page source.

### 2. Submit the sitemap

In Search Console, **Sitemaps** in the left sidebar, enter `sitemap-index.xml`
and submit. This is the single action that tells Google the site exists.

### 3. Ask for the homepage specifically

**URL Inspection** at the top, paste the homepage URL, then **Request
Indexing**. This jumps the queue for one page. Use it on the homepage and
nothing else; it is rate limited and the sitemap covers the rest.

### 4. Link to the site from somewhere Google already crawls

This matters more than everything above. Google weighs pages by who links to
them, and right now nothing on the internet links here. Three places, in order
of how quickly they get crawled:

- **Your GitHub profile.** The Website field on your profile, and the About
  section of `personal-site` itself. GitHub is crawled constantly.
- **Your LinkedIn profile.** The Website field.
- **Your GitHub profile README**, if you have one.

These also close the loop on the structured data: `PersonLd.astro` tells Google
that this page, your GitHub and your LinkedIn are the same person. That claim
is worth much more when those two profiles point back.

---

## What to expect

**Days, not hours, and possibly two to three weeks.** A brand-new site with no
inbound links is the slowest case Google has. Search Console will show
"Discovered, currently not indexed" for a while; that is normal and not an
error.

The realistic first win is searching your own full name, which is distinctive
enough that there is little to compete with. Ranking for anything generic is
not a goal this site should have.

**Check progress** by searching `site:jeremyaidanhernandezyu.vercel.app` on
Google. Zero results means not yet indexed. It is the only honest test; the
Search Console coverage report lags.

---

## Two things worth knowing

**A custom domain would help, and is the one paid lever.** `.vercel.app` is on
the Public Suffix List, so your site inherits no credibility from the domain
and shares its reputation with nothing. A domain with your name on it is better
for search and considerably better on a résumé. If you buy one, point it at the
project in Vercel, change `site` in `astro.config.mjs`, and redo step 1; the
canonical URLs, sitemap and `robots.txt` all follow from that one line.

**The meta description is the grey line Google prints under your name.** It is
`IDENTITY.tagline` in `profile.ts`, and it is *not* the visible tagline on the
page; that one is `taglinePrefix` plus the rotating term. Nobody sees `tagline`
on the site, and everybody who finds you on Google sees it. Read it as a search
result before you decide it is finished.

---

## Keeping a page out of the index

A blog post stays off search engines with one frontmatter line:

```yaml
noindex: true
```

The post stays published, stays listed on `/blog`, and stays reachable by its
URL. Only search engines drop it. The build also leaves it out of the sitemap
automatically, because listing a `noindex` URL in a sitemap is a contradiction
that Search Console reports as an error.

This is set on the five Astro demo posts. They are Lorem ipsum shipped with the
template and byte-identical on thousands of other sites, so indexing them would
have Google judging this site on filler rather than on your homepage. Delete
the line when a post is real.
