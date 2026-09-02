/*
  robots.txt, generated rather than kept as a static file in `public/`.

  The one line in it that matters is the sitemap URL, and that has to be
  absolute. Hardcoding the host in `public/robots.txt` would put the domain
  in a second place, so moving the site would leave a robots.txt pointing
  at a sitemap that no longer exists, with a green build and no warning.
  Here the host comes from `site` in `astro.config.mjs`, the same source as
  every canonical URL on the site.

  Nothing is disallowed. The site is eleven static pages and there is
  nothing on it a crawler should not read. Pages that should stay out of
  the index carry `noindex` on the page itself, which is the directive
  that actually removes a URL; `Disallow` only stops the crawl, and a
  blocked URL can still be listed from someone else's link.
*/
import type { APIContext } from 'astro';

export function GET({ site }: APIContext) {
	const lines = ['User-agent: *', 'Allow: /'];

	if (site) {
		lines.push('', `Sitemap: ${new URL('sitemap-index.xml', site).href}`);
	}

	return new Response(lines.join('\n') + '\n', {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	});
}
