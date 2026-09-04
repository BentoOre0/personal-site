/*
  One definition of "newest first" and one of "how tags are counted and
  ordered", shared by /blog, every tag archive, and the RSS feed.

  These were copied by hand into `blog/index.astro` and `blog/tags/[tag].astro`,
  the same eight lines in both. Nothing kept them in step, so changing the
  ordering in one file left the filter bar sorted differently depending on
  which page you reached it from, with no error to tell you.
*/

import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

/**
 * Every published post, newest first. The site's one publication order, and
 * its one definition of "published".
 *
 * Drafts are dropped here rather than at each call site, so a post marked
 * `draft: true` is absent from /blog, from every tag archive, from the RSS
 * feed and from the built routes without any of them having to know the flag
 * exists. Every surface that lists or builds a post goes through this
 * function for exactly that reason; reaching for `getCollection('blog')`
 * directly is how a draft leaks back onto the site.
 */
export async function getSortedPosts(): Promise<Post[]> {
	return (await getCollection('blog', ({ data }) => !data.draft)).sort(
		(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
	);
}

/** Posts carrying `tag`, newest first. */
export function postsForTag(posts: Post[], tag: string): Post[] {
	return posts.filter((post) => post.data.tags.includes(tag));
}

/**
 * Every tag with how many posts carry it, most-used first and alphabetical
 * within a tie. Drives the filter bar, so the order must be identical on the
 * index and on every archive, otherwise the same bar reshuffles as you move
 * between pages.
 */
export function getTagCounts(posts: Post[]): [string, number][] {
	const counts = new Map<string, number>();
	for (const post of posts) {
		for (const tag of post.data.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
	}
	return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
}
