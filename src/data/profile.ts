/*
  All page content lives here so placeholders are filled in one place.

  Anything marked PLACEHOLDER is illustrative structure, not fact.
  Replace it before the site is published. The only confirmed
  credential on this page is the IOI Camp entry.
*/

export const REVISION = {
	rev: '0.1',
	status: 'PRELIMINARY',
	updated: '2026-08-31',
};

export const IDENTITY = {
	name: 'Jeremy Aidan Hernandez Yu',
	/* Used for the page title and meta description. */
	tagline:
		'Engineering physics student building embedded systems, robotics, and the software that drives them.',
	/* The tagline's fixed half. */
	taglinePrefix: 'Engineering physics student building',
	/* Rotates through these, one at a time. Add or remove freely —
	   the timing adapts. Keep them all true. */
	rotating: [
		'websites. ',
		'robots |0_x|. ',
		'rockets. ',
		'automation solutions. ',
		'fast algorithms. ',
	],
	links: [
		/* PLACEHOLDER */ { label: 'GitHub', href: '#', icon: 'github' },
		/* PLACEHOLDER */ { label: 'LinkedIn', href: '#', icon: 'linkedin' },
		/* PLACEHOLDER */ { label: 'Email', href: '#', icon: 'email' },
	],
	/* The highest-intent click on the page, so it gets a word rather than
	   a glyph. PLACEHOLDER — paste the Google Drive share link here. */
	resume: { label: 'Résumé', href: '#' },
};

/* Credentials. Ordered most impressive first. */
export const CREDENTIALS = [
	{
		/* CONFIRMED */
		text: 'IOI Camp Philippines — ranked top 4 nationally',
		note: 'International Olympiad in Informatics national training camp',
		href: null as string | null,
		confirmed: true,
	},
	{
		/* PLACEHOLDER */
		text: 'Competitive programming rating — TBD',
		note: 'Codeforces / USACO division, with a profile link',
		href: null as string | null,
		confirmed: false,
	},
	{
		/* PLACEHOLDER */
		text: 'Education — TBD',
		note: 'Institution and programme',
		href: null as string | null,
		confirmed: false,
	},
];

export const SPECS = [
	{ key: 'Focus', value: 'Software engineering · embedded · robotics' },
	{ /* PLACEHOLDER */ key: 'Location', value: 'TBD' },
	{ /* PLACEHOLDER */ key: 'Languages', value: 'TBD' },
	{ /* PLACEHOLDER */ key: 'Availability', value: 'TBD' },
];

export type Project = {
	id: string;
	title: string;
	summary: string;
	params: { key: string; value: string }[];
	figure: { caption: string; spec: string; ratio: string } | null;
	links: { label: string; href: string }[];
	placeholder: boolean;
};

/*
  PLACEHOLDER ENTRIES.
  Structure and figure specs are real; every string is illustrative.
  Ordered by impact, per CLAUDE.md — not grouped by discipline.
*/
export const PROJECTS: Project[] = [
	{
		id: 'P1',
		title: 'Project title',
		summary:
			'One sentence on what it does and why it was hard. The strongest project goes here and is set at full size; the list compresses as it descends.',
		params: [
			{ key: 'Role', value: 'TBD' },
			{ key: 'Stack', value: 'TBD' },
			{ key: 'Year', value: 'TBD' },
		],
		figure: {
			caption: 'The built system, whole, in frame.',
			spec: '4:3 · plan view · even diffuse light · plain ground',
			ratio: '4 / 3',
		},
		links: [
			{ label: 'Repository', href: '#' },
			{ label: 'Write-up', href: '#' },
		],
		placeholder: true,
	},
	{
		id: 'P2',
		title: 'Project title',
		summary:
			'A hardware build. The photograph carries the proof, so the figure spec below states the shot it needs.',
		params: [
			{ key: 'Role', value: 'TBD' },
			{ key: 'Stack', value: 'TBD' },
			{ key: 'Year', value: 'TBD' },
		],
		figure: {
			caption: 'Board detail, populated.',
			spec: '4:3 · overhead · raking light to raise the silkscreen',
			ratio: '4 / 3',
		},
		links: [{ label: 'Repository', href: '#' }],
		placeholder: true,
	},
	{
		id: 'P3',
		title: 'Project title',
		summary:
			'A software project. Where a hardware entry shows a photograph, this one shows its chart or architecture diagram in the same figure slot.',
		params: [
			{ key: 'Role', value: 'TBD' },
			{ key: 'Stack', value: 'TBD' },
			{ key: 'Year', value: 'TBD' },
		],
		figure: {
			caption: 'System diagram.',
			spec: '16:9 · vector · same four colours as this page',
			ratio: '16 / 9',
		},
		links: [
			{ label: 'Repository', href: '#' },
			{ label: 'Live', href: '#' },
		],
		placeholder: true,
	},
	{
		id: 'P4',
		title: 'Project title',
		summary: 'A fourth entry, set quieter. Cutting a weak project strengthens the page more than adding one.',
		params: [
			{ key: 'Role', value: 'TBD' },
			{ key: 'Year', value: 'TBD' },
		],
		figure: null,
		links: [{ label: 'Repository', href: '#' }],
		placeholder: true,
	},
];
