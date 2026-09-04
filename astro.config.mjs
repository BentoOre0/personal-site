// @ts-check

import { readFileSync, readdirSync } from 'node:fs';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

/*
  URLs that carry `noindex` must not be listed in the sitemap. The two are
  contradictory instructions, and Search Console reports the pair as an
  error ("Submitted URL marked noindex") rather than quietly preferring one.

  Content collections are not available inside this file, so the frontmatter
  is read straight off disk. A post's URL is /blog/<filename without
  extension>/, which is what `[...slug].astro` builds from `post.id`; if that
  route ever stops using the file id, this has to follow it.
*/
const BLOG_DIR = new URL('./src/content/blog/', import.meta.url);

const noindexedPostPaths = readdirSync(BLOG_DIR)
	.filter((file) => /\.(md|mdx)$/.test(file))
	.filter((file) => {
		const source = readFileSync(new URL(file, BLOG_DIR), 'utf-8');
		const frontmatter = source.split('---')[1] ?? '';
		/* A draft builds no page, so it can never appear in the sitemap and
		   listing it here would be filtering something that is not there. The
		   two flags are independent and `draft` is the stronger one. */
		if (/^draft:\s*true\s*$/m.test(frontmatter)) return false;
		return /^noindex:\s*true\s*$/m.test(frontmatter);
	})
	.map((file) => `/blog/${file.replace(/\.(md|mdx)$/, '')}/`);

const sansFallbacks = [
	'ui-sans-serif',
	'system-ui',
	'-apple-system',
	'Segoe UI',
	'Roboto',
	'Helvetica Neue',
	'sans-serif',
];

const monoFallbacks = [
	'ui-monospace',
	'SFMono-Regular',
	'Menlo',
	'Consolas',
	'Liberation Mono',
	'monospace',
];

// https://astro.build/config
export default defineConfig({
	site: 'https://jeremyaidanhernandezyu.vercel.app',
	integrations: [
		mdx(),
		sitemap({
			filter: (page) => !noindexedPostPaths.includes(new URL(page).pathname),
		}),
	],
	fonts: [
		{
			provider: fontProviders.local(),
			name: 'Geist',
			cssVariable: '--font-geist',
			fallbacks: sansFallbacks,
			options: {
				variants: [
					{
						src: ['./src/assets/fonts/geist-variable.woff2'],
						weight: '400 700',
						style: 'normal',
						display: 'swap',
					},
				],
			},
		},
		{
			provider: fontProviders.local(),
			name: 'Geist Mono',
			cssVariable: '--font-geist-mono',
			fallbacks: monoFallbacks,
			options: {
				variants: [
					{
						src: ['./src/assets/fonts/geist-mono-variable.woff2'],
						weight: '400 700',
						style: 'normal',
						display: 'swap',
					},
				],
			},
		},
	],
});
