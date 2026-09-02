import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';
import { getSortedPosts } from '../lib/posts';

export async function GET(context) {
	// Newest first, matching /blog. This feed was previously unsorted.
	const posts = await getSortedPosts();
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: posts.map((post) => ({
			...post.data,
			link: `/blog/${post.id}/`,
		})),
	});
}
