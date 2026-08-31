// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

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
	integrations: [mdx(), sitemap()],
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
