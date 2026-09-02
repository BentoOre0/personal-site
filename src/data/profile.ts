/*
  All page content lives here so placeholders are filled in one place.

  Every entry below is taken from the résumé of 25 Aug 2026.
  Nothing here may be invented.

  Project photographs are imported here, at the top, and referenced by the
  imported name in a project's `figure.src`. See docs/adding-a-project.md.
*/

import type { ImageMetadata } from 'astro';

export const REVISION = {
	rev: '0.2',
	status: 'PRELIMINARY',
	updated: '2026-09-01',
};

export const IDENTITY = {
	name: 'Jeremy Aidan Hernandez Yu',
	/* Used for the page title and meta description. */
	tagline:
		'Engineering physics student building embedded systems, robotics, and the software that drives them.',
	/* The tagline's fixed half. */
	taglinePrefix: 'Engineering physics student building',
	/* Rotates through these, one at a time. Add or remove freely;
	   the timing adapts. Keep them all true. */
	rotating: [
		'AI Slop ಠಿ_ಠ...? ',
		'websites. ',
		'robots [^3^]. ',
		'rockets. ',
		'automation solutions. ',
		'fast algorithms. ',
	],
	/* A contact is either a glyph (`icon`) or the literal string (`text`). */
	links: [
		{ label: 'GitHub', href: 'https://github.com/BentoOre0', icon: 'github' },
		{
			label: 'LinkedIn',
			href: 'https://www.linkedin.com/in/jeremy-aidan-hernandez-yu-a583542b1/',
			icon: 'linkedin',
		},
		/* Spelled out rather than iconised: an address a recruiter can read,
		   copy, or paste into a client that isn't their default one. */
		{
			label: 'Email',
			href: 'mailto:jahysocials@gmail.com',
			text: 'jahysocials@gmail.com',
		},
	] as { label: string; href: string; icon?: string; text?: string }[],
	/* The highest-intent click on the page, so it gets a word rather than
	   a glyph. PLACEHOLDER: paste the Google Drive share link here. */
	resume: { label: 'Résumé', href: 'https://drive.google.com/file/d/1qZHO1-FigBvVqjX_2j_Ja9cjZkH7-hRZ/view?usp=sharing' },
};

/* Credentials. Ordered most impressive first. */
export const CREDENTIALS = [
	{
		text: 'National Olympiad in Informatics: 4th in the Philippines (2024)',
		note: 'Top 20 nationally for three consecutive years, 2023–2025',
		href: 'https://noi.ph/2024-national-eliminations/' as string | null,
		confirmed: true,
	},
	{
		text: 'IOI selection candidate, Philippine National Team (2023–2025)',
		note: 'Advanced to final team selection, one rank from representing the Philippines',
		href: 'https://ioinformatics.org/' as string | null,
		confirmed: true,
	},
	{
		text: 'Asia-Pacific Informatics Olympiad (2023–2024)',
		note: 'Invited; regional IOI-level contest against 30+ Asia-Pacific countries',
		href: null as string | null,
		confirmed: true,
	},
	{
		text: 'BASc Engineering Physics, University of British Columbia',
		note: '2025–present · 92.3%',
		href: null as string | null,
		confirmed: true,
	},
	{
		text: 'IB Diploma 42/45, British School Manila',
		note: 'HL Mathematics AA 7/7, Physics 7/7, Chemistry 7/7',
		href: null as string | null,
		confirmed: true,
	},
];

export const SPECS = [
	{ key: 'Focus', value: 'Software engineering · machine learning · avionics hardware' },
	{ key: 'Based in', value: 'Vancouver, BC' },
	{ key: 'Languages', value: 'C++ · C · Python · JavaScript / TypeScript' },
	{ key: 'Availability', value: 'Open to 2026 and 2027 opportunities' },
];

export type Project = {
	title: string;
	summary: string;
	params: { key: string; value: string }[];
	/* A figure is either a real image or a specification for one not yet
	   shot. Give it `src` once the photo exists; give it `spec` until then.
	   `ratio` applies to both, so a slot does not change size when the
	   photograph finally lands in it. */
	figure: {
		caption: string;
		ratio: string;
		/* Import the image at the top of this file, never a string path.
		   The import is what lets Astro optimise it, and what turns a typo
		   into a build error instead of a broken image on the live site. */
		src?: ImageMetadata;
		/* Describes the image for a screen reader. Leave it out when the
		   caption already says what the picture shows: the caption sits in
		   the <figcaption> and is announced anyway, so repeating it here
		   makes a screen reader say the same sentence twice. */
		alt?: string;
		/* The shot still to be taken: aspect, view, lighting. Printed inside
		   the empty plate so the slot states its own requirement. Ignored
		   once `src` is set. */
		spec?: string;
	} | null;
	/* Where the project's title points. Optional: omit it and the title is
	   plain text. Independent of `links` below, so the title can go to a
	   write-up or a blog post while the row underneath lists the repository
	   and the paper.

	   This used to be `links[0].href`, which meant the first link silently
	   did two jobs: its `label` was ignored for the title, it still appeared
	   in the row below, and a project could not have links without also
	   having a linked title. */
	titleHref?: string;
	/* The row of labelled links under the summary. Independent of the title.
	   `[]` for none. */
	links: { label: string; href: string }[];
};

/* Flat list, ordered by impact, not grouped by discipline, per CLAUDE.md. */
export const PROJECTS: Project[] = [
	{
		title: 'Dispatch and fulfilment control system',
		summary:
			"A dispatching and fulfilment control system for SEAOIL and SEAGAS delivery operations, built and shipped as sole developer 60 days ahead of schedule. Automated rider messaging and order confirmation through the Viber API, deployed on AWS serverless infrastructure, with a Google Apps Script MVP so ground staff could use it before the full system landed.",
		params: [
			{ key: 'Role', value: 'Sole developer · AI & Automation Engineering intern' },
			{ key: 'Stack', value: 'Node.js · NestJS · AWS serverless · Viber API' },
			{ key: 'Year', value: '2025' },
		],
		figure: {
			caption: 'System architecture.',
			spec: '16:9 · vector · same four colours as this page',
			ratio: '16 / 9',
		},
		links: [],
	},
	{
		title: 'Baybayin script recognition: CNN vs. SVC',
		summary:
			"Research comparing convolutional neural networks against support vector classifiers at recognising Baybayin script under rotation and noise. CNNs proved more resilient to distortion; SVCs were more accurate on clean data, where the script's diacritics carry the distinction.",
		params: [
			{ key: 'Role', value: 'Sole author · IB Extended Essay' },
			{ key: 'Stack', value: 'Python · CNN · SVC' },
			{ key: 'Year', value: '2024–2025' },
		],
		titleHref: 'https://github.com/BentoOre0/Portfolio/tree/main/SVCvsCNNEXTENDED',
		figure: {
			caption: 'Accuracy across rotation and noise levels.',
			spec: '16:9 · vector · same four colours as this page',
			ratio: '16 / 9',
		},
		links: [
			{ label: 'Code', href: 'https://github.com/BentoOre0/Portfolio/tree/main/SVCvsCNNEXTENDED' },
			{
				label: 'Paper',
				href: 'https://drive.google.com/file/d/1Tz5_n4KKLvXJk2pD9c-VNwKGnvGy7cFN/view',
			},
		],
	},
	{
		title: 'UBC Rocket: avionics hardware',
		summary:
			"Avionics hardware on UBC Rocket's test rocket subteam, working across recovery, internals and composites. Integrated avionics for separation tests firing black powder charges through web-app-triggered e-matches, with microscope-assisted soldering and continuity testing. Also built a personal certification rocket for a Class H motor.",
		params: [
			{ key: 'Role', value: 'Avionics hardware · test rocket subteam' },
			{ key: 'Stack', value: 'CAD · 3D printing · wet layup composites · lathe and mill' },
			{ key: 'Year', value: '2025–present' },
		],
		titleHref: 'https://drive.google.com/drive/folders/1QTmTV7L_z7bfXIQ4lazjrTeh2V993nZ6',
		figure: {
			caption: 'Avionics bay, assembled.',
			spec: '4:3 · overhead · raking light on a plain ground',
			ratio: '4 / 3',
		},
		links: [
			{
				label: 'Hardware',
				href: 'https://drive.google.com/drive/folders/1QTmTV7L_z7bfXIQ4lazjrTeh2V993nZ6',
			},
		],
	},
	{
		title: 'Automated colour analysis for percentage coverage',
		summary:
			'An image-segmentation algorithm measuring percentage colour coverage, cited by the judging panel as the key contribution in a first-place school science competition entry.',
		params: [
			{ key: 'Role', value: 'Sole developer' },
			{ key: 'Stack', value: 'Python · image segmentation' },
			{ key: 'Year', value: '2024' },
		],
		titleHref: 'https://github.com/BentoOre0/Portfolio/tree/main/ColorSegmentationAlgoPercentageCoverage',
		figure: {
			caption: 'Segmentation output against the source image.',
			spec: '16:9 · screenshot or vector',
			ratio: '16 / 9',
		},
		links: [
			{
				label: 'Repository',
				href: 'https://github.com/BentoOre0/Portfolio/tree/main/ColorSegmentationAlgoPercentageCoverage',
			},
		],
	},
	{
		title: 'BSM Programming Varsity',
		summary:
			'Co-founded and ran a competitive programming club of 20+ members: biweekly in-house contests, curricula and lectures on Python, algorithms and data structures. Two members qualified for nationals; one joined the national team.',
		params: [
			{ key: 'Role', value: 'Co-founder · coach' },
			{ key: 'Year', value: '2023–2025' },
		],
		figure: null,
		links: [],
	},
];
