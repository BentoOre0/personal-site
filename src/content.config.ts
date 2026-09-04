import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			// Optional. e.g. tags: ['embedded', 'robotics']
			tags: z.array(z.string()).default([]),
			/* Keep the post off search engines. It stays published, listed on
			   /blog and reachable by its URL; only the index drops it. Set on
			   the Astro demo posts, which are Lorem ipsum shipped with the
			   template and byte-identical on thousands of other sites, so
			   indexing them would have Google judge this site on them.
			   A real post leaves this out. */
			noindex: z.boolean().default(false),
			/* Keep the post out of the site entirely. It is not listed on
			   /blog, not in any tag archive, not in the RSS feed, and its
			   page is not built, so its URL 404s. The file stays where it
			   is and the flag is one line to remove.

			   This is the stronger of the two flags and they are
			   independent. `noindex` publishes a post and hides it from
			   Google; `draft` does not publish it at all, which makes
			   `noindex` moot on the same post. Set on the Astro demo posts,
			   which are kept as a working template rather than deleted. */
			draft: z.boolean().default(false),
			heroImage: z.optional(image()),
		}),
});

export const collections = { blog };
