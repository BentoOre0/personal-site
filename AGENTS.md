# personal-site

**Start here: read `HANDOFF.md` before doing anything.** It carries the
current state, the decisions behind it, and what is still unfilled.
`PRODUCT.md` holds product truth; `DESIGN.md` holds the visual system.

Personal portfolio and blog. Astro, deployed on Vercel.

## Content structure
Flat. No Software/Hardware split. Order sections by what is most
impressive first.

1. Name, one-line description, links (GitHub, LinkedIn, email)
2. Credentials as a short list. Competitive programming results belong
   here, as a credential, not as a project.
3. Projects, flat list, ordered by impact.

The blog is its own route at /blog, reached from the nav. It is
deliberately not a section on the homepage.

## Scope

**This repository only.** Work here is limited to the personal site. The
owner's other repositories are handled separately and their state is not
yours to correct.

- Read them freely when a link or a fact needs checking. Never edit them, and
  do not open issues or pull requests against them.
- Their READMEs are the owner's own writing and are legitimate source material
  for site copy. Quoting or condensing them is sourcing, not inventing.
  Writing new prose in his voice is still off limits.
- Links pointing at other repositories can move without warning. If one
  breaks, repoint it here; do not go and fix the other repository.
- If something over there looks wrong, say so and leave it.

## Rules
- No database, no backend, no auth. Static only.
- `npm run build` must pass before any commit.
- Do not add dependencies without asking.
- **Never use em dashes or emojis.** The em dash is U+2014, the long dash.
  This applies everywhere: page content, blog posts, documentation, code
  comments, and commit messages. Use a comma, a colon, a semicolon, or a
  full stop instead. The en dash U+2013, used in number and date ranges
  such as `2023–2025`, is a different character and is correct; leave
  those alone.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
