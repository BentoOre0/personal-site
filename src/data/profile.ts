/*
  All page content lives here so placeholders are filled in one place.

  Every entry below is taken from the résumé of 25 Aug 2026.
  Nothing here may be invented.

  Project photographs are imported here, at the top, and referenced by the
  imported name in a project's `figure.src`. See docs/adding-a-project.md.
*/

import type { ImageMetadata } from 'astro';

/* Project figures. Imported here, at the top, and referenced by the
   imported name in a project's `figure.src`. */
import anthRopic from '../assets/anth-ropic.png';
import baybayinGlyph from '../assets/baybayin-glyph.png';
import cliffordBench from '../assets/clifford-bench.jpg';
import cliffordWalkStill from '../assets/clifford-walk-still.jpg';
import colourClusters from '../assets/colour-clusters.png';
import galaxyStill from '../assets/galaxy-formation-still.png';
import quadtreeStill from '../assets/quadtree-subdivision-still.png';
import ubcRocketTeam from '../assets/ubc-rocket-team.jpg';

/* The revision block at the foot of every page.

   `rev` steps one tenth on every commit, and the tenths wrap: 0.9 is
   followed by 1.0, not 0.10. `updated` moves to the commit's own date at
   the same time, because the footer prints it as "Last revised".

   Bump both in the same commit as the change they describe, never as a
   follow-up commit of their own. A rev that lags the site is worse than
   no rev at all: the block is the one place the document dates itself. */
export const REVISION = {
	rev: '1.8',
	/* `PRELIMINARY` until 4 Sep, which on a datasheet means the spec may
	   still change. It stopped being true: the credentials are confirmed
	   and sourced, the résumé link is real, no row prints a shot spec and
	   no project figure is an empty slot. `DEPLOYED` at the owner's
	   request. */
	status: 'DEPLOYED',
	updated: '2026-09-04',
};

export const IDENTITY = {
	name: 'Jeremy Aidan Hernandez Yu',
	/* Used for the page title and meta description. */
	tagline:
		'Engineering physics student with a background in competitive programming. I want to build things.',
	/* The tagline's fixed half. */
	taglinePrefix: 'Engineering physics student building',
	/* Rotates through these, one at a time. Add or remove freely;
	   the timing adapts. Keep them all true. */
	rotating: [
		'AI Slop ಠಿ_ಠ...? ',
		'websites. ',
		'physical and digital ideas. ',
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
	   a glyph. Filled: a Google Drive share link. Replace the href when the
	   document is re-uploaded; Drive mints a new file id each time. */
	resume: { label: 'Résumé', href: 'https://drive.google.com/file/d/1qZHO1-FigBvVqjX_2j_Ja9cjZkH7-hRZ/view?usp=sharing' },
};

/*
  Search engine metadata. Not page content: these are the few things a
  crawler needs that are true but are not written anywhere on the page.

  Everything here must already be true elsewhere in this file. Structured
  data that disagrees with the visible page is worse than none at all;
  Google treats the mismatch as a reason to distrust both.
*/
export const SEO = {
	/* Google Search Console, Add property, then the HTML tag method, gives a
	   token. Paste only the `content="..."` value here, not the whole tag.
	   While this is empty the meta tag is not rendered at all, so an empty
	   string is a correct state, not a broken one.

	   The token is not a secret. It proves ownership of this domain to one
	   Google account and does nothing else; it is public in the page source
	   of every site that uses this method. */
	googleSiteVerification: '',

	/* schema.org Person, rendered as JSON-LD on the homepage. This is how a
	   search engine tells this Jeremy Yu from every other one: the name plus
	   a set of profiles that already point back here. */
	person: {
		/* The fixed half of the tagline, said as a title. */
		jobTitle: 'Engineering physics student',
		/* From the BASc credential in §1. */
		affiliation: {
			name: 'University of British Columbia',
			url: 'https://www.ubc.ca/',
		},
	},
};

/*
  Credentials. Ordered most impressive first; the list is rendered in this
  order and the first entry gets the large type step, so reordering the
  array is how you reorder the page.

  Each entry is `text`, `note`, `href`, `confirmed`, and optionally
  `quote`.

  `text` is the claim, at 20px. `note` is the supporting line under it, at
  14px and muted: the evidence, the dates, or what the thing actually is
  for a reader who has never heard of it. `href` is a link on the claim, or
  `null`; it should point at something that lets a stranger verify the
  claim rather than at a homepage.

  `confirmed` is a display switch, not data. `false` adds the `unconfirmed`
  class in `index.astro`, which drops the claim from 20px to 16px and greys
  it to the muted colour, so it reads visibly lighter than the entries
  around it. It exists so something true but not yet provable can be listed
  honestly, demoted rather than hidden, instead of sitting at full weight
  next to five things that are sourced. Everything here is currently
  `true`, so today the switch changes nothing on the page. Set it to
  `false` the moment you add something you cannot point at.

  `sources` is optional: one or more passages in somebody else's words,
  verbatim, each with the page it came from. The note turns into a
  disclosure and they fold away behind an arrow, so they cost a reader
  nothing until they want them.

  `href` is optional. Give it whenever the words are on a page, so a
  sceptical reader can check them; leave it out for a source that is not
  on the web, such as a person, and the name renders as plain text.

  Use it where a word in the note is load-bearing and a stranger has no way
  to weigh it. APIO carries the NOI.PH rule on who gets invited, because
  "Invited" is doing all the work in that entry. The IOI camp carries two,
  one saying what the IOI is and one saying what the camp is, because the
  credential names two things a reader outside competitive programming has
  never heard of.
*/

export type Credential = {
	text: string;
	note: string;
	href: string | null;
	confirmed: boolean;
	sources?: { text: string; source: string; href?: string }[];
};
export const CREDENTIALS: Credential[] = [
	{
		text: 'BASc Engineering Physics, University of British Columbia',
		note: '2025–present · 92.3%',
		/* Most readers do not know what engineering physics is. This is the
		   program's own site, which says it plainly. */
		href: 'https://www.engphys.ubc.ca/',
		/* The faculty sentence is official and names the actual content of
		   the degree. The second one does the work no brochure can, and
		   is somebody else's line rather than a boast, which is the only
		   reason it can be on the page at all. It is attributed to a person
		   with standing and a date, so a reader can weigh it as what it is:
		   an alumnus's gloss, not a course description. */
		sources: [
			{
				text: 'EngPhys students build a solid foundation in applied physics and a blend of electrical and mechanical engineering, while gaining extensive engineering design experience.',
				source: 'UBC Applied Science',
				href: 'https://engineering.ubc.ca/programs/undergraduate/engineering-physics',
			},
			{
				text: 'Basically a triple major of engineering, physics and cs',
				source: 'My uncle, UBC Engineering Physics 1999',
			},
		],
		confirmed: true,
	},
	{
		text: 'National Olympiad in Informatics: 4th in the Philippines (2024)',
		note: 'Top 20 nationally for three consecutive years, 2023–2025',
		href: 'https://noi.ph/2024-national-eliminations/',
		/* "National Olympiad in Informatics" means nothing to a reader who
		   has not competed. NOI.PH's own about page says what it is and what
		   placing in it leads to, in one sentence each. */
		sources: [
			{
				text: 'The National Olympiad in Informatics – Philippines (NOI.PH) is an annual programming contest for Filipino high school students held by the non-government organization of the same name. Top scorers of this competition will be among the training pool of the Philippines for the International Olympiad in Informatics.',
				source: 'NOI.PH',
				href: 'https://noi.ph/about/',
			},
		],
		confirmed: true,
	},
	{
		text: 'IOI camp, selection candidate (2023–2025)',
		note: 'Advanced to final team selection',
		href: 'https://ioinformatics.org/',
		/* Two things in one credential that a reader outside competitive
		   programming has never heard of: the IOI, and the camp. One source
		   each, both verbatim from the body that runs the thing. */
		sources: [
			{
				text: 'The IOI is one of five international science olympiads. The primary goal of the IOI is to stimulate interest in informatics (computing science) and information technology.',
				source: 'International Olympiad in Informatics',
				href: 'https://ioinformatics.org/',
			},
			{
				text: 'The In-House training will be held for a few days between the APIO and the IOI. Participants are to stay in-house for the whole duration.',
				source: 'NOI.PH contest rules, section VII',
				href: 'https://noi.ph/rules/',
			},
		],
		confirmed: true,
	},
	{
		text: 'Asia-Pacific Informatics Olympiad (2023–2024)',
		note: 'Invited; regional IOI-level contest against 30+ Asia-Pacific countries',
		/* APIO has no permanent homepage and no Wikipedia article. It is
		   hosted by a different country every year, the old
		   apio-olympiad.org no longer resolves, and en.wikipedia.org has no
		   page under any spelling of the name, checked against the search
		   API rather than guessed. This is NOI.PH's rules, section VI, which
		   is the page that explains what being invited to the APIO from the
		   Philippines actually means. */
		href: 'https://noi.ph/rules/',
		/* Truncated from a longer sentence, which continues "and the
		   In-House Training Camp." The ellipsis marks the cut; do not
		   silently close it up. */
		sources: [
			{
				text: 'At most fifteen (15) active trainees, including shortlisted finalists and observers, in the pre-selection training sessions will be invited to join the APIO …',
				source: 'NOI.PH contest rules, section V',
				href: 'https://noi.ph/rules/',
			},
		],
		confirmed: true,
	},
	{
		text: 'TREK Excellence Scholarship, University of British Columbia',
		/* The note says what the award is, not what it says about him, in the
		   same way the APIO note describes the contest. The href is UBC's own
		   page for the scholarship, so the "top 5%" is checkable rather than
		   claimed.

		   "Cash award", because "Awarded 2026" read as a title conferred and
		   this is a paid award.

		   **The value is deliberately not recorded, here or anywhere in this
		   repo**, at the owner's request. Do not add it, in the note, in a
		   quotation, or in a comment. The `href` goes to UBC's page, which
		   states it, so a reader who wants the figure gets it from UBC.

		   That is also why this row has no `sources` block, unlike the four
		   competition credentials: UBC's one quotable sentence is built
		   around the value, and cutting the value out of it would misquote
		   them rather than trim them. A link is the honest way to carry a
		   fact we are choosing not to print.

		   "and school" is UBC's own third term and was missing. */
		note: 'Cash award, 2026 · top 5% of each undergraduate year, faculty and school',
		href: 'https://students.ubc.ca/finances/awards-scholarships-bursaries/trek-excellence-scholarship/',
		confirmed: true,
	},
	{
		text: 'Teaching Assistant, UBC Computer Science',
		note: 'September 2026–present',
		href: null,
		confirmed: true,
	},
	{
		text: 'IB Diploma 42/45, British School Manila',
		note: 'HL Mathematics AA 7/7, Physics 7/7, Chemistry 7/7 · Extended Essay in CS',
		href: null,
		confirmed: true,
	},
];

export const SPECS = [
	{ key: 'Interest', value: 'software · hardware · robotics · anything high leverage' },
	{ key: 'Based in', value: 'Vancouver, BC' },
	{ key: 'Languages', value: 'C++ · C · Python · JavaScript / TypeScript' },
	{
		key: 'Availability',
		value:
			'Open to 2026 and 2027 opportunities · will relocate to North America, Europe, or Southeast Asia',
	},
];

/*
  The closing note at the foot of /blog. One quote at a time, cycling.

  These are not the owner's words, so they are verbatim and attributed. Do
  not trim, reword or modernise a quote to make it fit the layout; change
  the layout. "They're" is Naval's contraction, not a typo.

  The author travels with the quote rather than sitting under the bar as a
  fixed line, so adding somebody else's words here needs no further work:
  the name changes when the quote does.

  `href` is optional. Give it a page that carries the quote, so the
  attribution is checkable; leave it out and the name renders as plain
  text. The three below are from Naval Ravikant's 2018 tweetstorm "How to
  Get Rich (Without Getting Lucky)", transcribed in full at nav.al/rich.

  The bar is as tall as the longest entry at every width, so a much longer
  quote makes the whole block taller on every screen.
*/
export const QUOTES: { text: string; author: string; href?: string }[] = [
	{
		text: "Code and media are permissionless leverage ... You can create software and media that works for you while you sleep.",
		author: 'Naval Ravikant',
		href: 'https://nav.al/rich',
	},
	{
		text: 'Specific knowledge is knowledge that you cannot be trained for. If society can train you, it can train someone else, and replace you.',
		author: 'Naval Ravikant',
		href: 'https://nav.al/rich',
	},
	{
		text: 'Play long-term games with long-term people.',
		author: 'Naval Ravikant',
		href: 'https://nav.al/rich',
	},
];

/*
  One panel of a figure.

  **Animation cannot go through `still`.** Astro runs imported images
  through sharp, which takes the first frame of an animated file and throws
  the rest away, silently: the build passes and the page shows a frozen
  picture. So an animated file lives in `public/`, which Astro copies
  verbatim, and is named here by URL in `motion`.

  A `motion` panel still needs its `still`, and not as a nicety. It is what
  a reader gets under `prefers-reduced-motion`, chosen by the browser with
  no script, and it is what shows if the animation fails to arrive.
*/
export type Plate = {
	/* Imported at the top of this file, never a string path. The import is
	   what lets Astro optimise it, and what turns a typo into a build error
	   rather than a broken image on the live site. */
	still: ImageMetadata;
	/* Optional. An absolute URL into `public/`, e.g. '/gravsim/x.webp'. */
	motion?: string;
	/* For a screen reader. Required, because a panel of a collage is not
	   described by the figure's one caption. */
	alt: string;
	/* One line under this panel. In a collage it is prefixed with the
	   panel's letter, Fig. 5(a), which is derived from position. */
	label?: string;
};

export type Project = {
	title: string;
	summary: string;
	/* `strong` marks the one value in a row that is the row's claim rather
	   than its description, such as a status that says the thing is live.
	   At most one per row; the mark stops meaning anything if every row
	   has one. */
	params: { key: string; value: string; strong?: boolean }[];
	/* A figure is either real panels or a specification for a shot not yet
	   taken. Give it `plates` once the images exist; give it `spec` until
	   then. `ratio` applies to both, so a slot does not change size when the
	   photograph finally lands in it, and every panel of a collage shares
	   it, so a collage of mismatched crops is not possible by accident. */
	figure: {
		caption: string;
		ratio: string;
		/* One panel is a plain figure. Two or more is a collage by default:
		   they sit side by side where there is room and stack where there
		   is not. Set `cycle` to show one at a time instead. */
		plates?: Plate[];
		/* Show one panel at a time, swapping every 8s, rather than all of
		   them at once. For panels worth seeing large, where a collage
		   would shrink each one to half the width and neither would read. */
		cycle?: boolean;
		/* The shot still to be taken: aspect, view, lighting. Printed inside
		   the empty plate so the slot states its own requirement. Ignored
		   once `plates` is set. */
		spec?: string;
		/* Let the figure run to the full sheet instead of the usual 30rem.
		   For diagrams only, and only for one reason: a diagram carries
		   type of its own, and type inside a picture does not reflow. The
		   SEAOIL state machine has fourteen labelled boxes, which land at
		   about five pixels each at the normal figure width, which is to
		   say the figure is decorative and the reader learns nothing.
		   A photograph never needs this; it has no small type to lose. */
		wide?: boolean;
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
		title: 'This website',
		summary:
			'A portfolio website since I also needed to be more well-versed about new agentic technologies.',
		params: [
			{ key: 'Role', value: 'Sole developer · direction and review' },
			{ key: 'Stack', value: 'Astro · TypeScript · Vercel · Claude Code (Skills, Plugins, MCP)' },
			{ key: 'Year', value: '2026' },
		],
		titleHref: 'https://github.com/BentoOre0/personal-site',
		figure: {
			caption: 'The two authors of this webpage (GPT was used for only making this photo.).',
			/* The slot used to specify a 1440px screenshot of this homepage.
			   A picture of the page you are already reading tells the reader
			   nothing; this row is about the collaboration, so the figure is
			   too. */
			plates: [
				{
					still: anthRopic,
					alt: 'A kraft-paper gig poster, "An evening with Anth, Ropic", showing a line-drawn face in round glasses beside a pixel-art figure, billed as Jeremy and Clawd.',
				},
			],
			ratio: '1 / 1',
		},
		links: [{ label: 'Repository', href: 'https://github.com/BentoOre0/personal-site' }],
	},
	{
		title: 'Clifford: A Mutated Spot Micro',
		/* Condensed from the owner's own README at Modded-Nova-SM3, which is
		   the source of record for what is his and what is Chris Locke's.

		   **The old summary had the attribution backwards on the one thing
		   the project is about.** It read "The mechanical design, gait
		   development and servo motion engine are his; mine is the firmware
		   and the physical build". The README says the opposite about the
		   mechanical side: the DS3218 the design is drawn around was not
		   sourceable, the RDS3218 he could buy hangs in a U-bracket instead
		   of bolting through, and so the coax, femur and tibia were redrawn
		   from scratch around a different way of holding a servo. That
		   redesign is the project, in his words "not a build of someone
		   else's kit, and not a design of my own from nothing, but the
		   engineering in between".

		   **The summary's job is to get the repository opened, not to explain
		   the robot.** That is the site's own rule, "the site shows and
		   GitHub tells", and this row had stopped following it: the first
		   attempt at a correct summary ran 441 characters against a median
		   of 226, spending the U-bracket, the servo horn and the full
		   attribution list on a reader who has not clicked anything yet.

		   What survives is the hook: a real constraint, a place, and a
		   consequence big enough to be worth reading about. The bracket, the
		   horn, the joint axis and the attribution table are all in the
		   README, told better and at length. Sending someone there is the
		   point.

		   Gaits, the servo motion engine and the master/slave architecture
		   are Chris Locke's. Naming him here plus `open-source fork` in the
		   role is the credit this length allows; the README carries the
		   full division of work. */
		summary:
			'A quadruped forked from Chris Locke\'s open-source Nova SM3. The servos it is designed around were not sourceable in the Philippines, so every leg part was redrawn from scratch around the ones that were.',
		params: [
			/* "Open-source fork", not "fork of an open-source design": same two
			   facts in half the words, and it puts "open source" where a
			   reader scanning the params column will hit it. The summary
			   names Chris Locke and the licence position in full, so this
			   line only has to flag it. */
			{ key: 'Role', value: 'Builder and modder · open-source fork' },
			{ key: 'Stack', value: 'C++ · Teensy 4.0, Arduino Nano, Raspberry Pi (for testing), MPU-6050 IMU · I2C, PWM, bit-banged PS2 remote control · PCB soldering and testing · 3D printing' },
			{ key: 'Status', value: 'Ongoing' },
			{ key: 'Year', value: '2026–present' },
		],
		titleHref: 'https://github.com/BentoOre0/Modded-Nova-SM3',
		figure: {
			caption: 'Clifford, the red robot dog.',
			/* The slot asked for a still side view. One angle cannot carry a
			   machine this cluttered, so panel (a) is the owner's own
			   walkaround, cropped square from a portrait phone clip: the
			   camera circles the standing robot and every side gets a turn.
			   It runs forward then back, which costs about 300KB over a
			   one-way cut but spares the reader a jump from the closest
			   frame to the widest every few seconds. Panel (b) is the row's
			   other half: the shell comes off and the boards show.

			   The caption names the subject and stops there, at the owner's
			   direction. It read "Clifford assembled, and on the bench with
			   its shell off", which described the two panels and got them
			   wrong. The per-panel detail is the panel labels' job and they
			   already do it, so a caption repeating them is both redundant
			   and a second place for the description to drift out of true. */
			plates: [
				{
					still: cliffordWalkStill,
					motion: '/clifford/walk.webp',
					alt: 'A red, blue and white 3D-printed quadruped robot standing on a desk, filmed from a camera circling it. Servos sit at each leg joint, a small numeric display faces out of the red body, and wiring loops between the panels.',
					label: 'Circled once, shell on',
				},
				{
					still: cliffordBench,
					alt: 'The same quadruped on a workbench with its top shell removed, held up on a blue printed stand. Its grey internal frame carries several circuit boards and a loom of wiring, a servo sits at each leg joint, and a pair of calipers and a screwdriver bit set lie on the mat beside it.',
					label: 'The same machine with its shell off',
				},
			],
			ratio: '1 / 1',
			/* A window, not a collage. Side by side each panel lands at about
			   232px, and the boards in (b) are the point of that panel. */
			cycle: true,
		},
		links: [{ label: 'Repository', href: 'https://github.com/BentoOre0/Modded-Nova-SM3' }],
	},
	{
		title: 'SEAOIL: Dispatch and Fulfilment Control System',
		summary:
			"Built and shipped as sole developer on an internship, 60 days ahead of schedule, and running in production against SEAOIL and SEAGAS delivery operations. Automates rider messaging and order confirmation through the Viber API on AWS Lambda. A Google Apps Script MVP put the process in ground staff's hands.",
		params: [
			{ key: 'Role', value: 'Sole developer · AI & Automation Engineering intern' },
			{ key: 'Stack', value: 'Node.js · NestJS · AWS Lambda · Viber API' },
			{ key: 'Status', value: 'DEPLOYED IN PRODUCTION', strong: true },
			{ key: 'Year', value: '2025' },
		],
		titleHref: 'https://github.com/BentoOre0/JAHY-Seaoil-Work',
		figure: null,
		links: [{ label: 'Repository', href: 'https://github.com/BentoOre0/JAHY-Seaoil-Work' }],
	},
	{
		title: 'UBC Rocket: Test Rocket Subteam',
		summary:
			"Integrated avionics for separation tests firing black powder charges through web-app-triggered e-matches. Also built a personal certification rocket for a Class H motor.",
		params: [
			{ key: 'Role', value: 'Avionics hardware · test rocket subteam' },
			/* `Build`, not `Stack`, on this row alone. Every other project
			   uses `Stack` and should keep it, but this row is CAD, filament,
			   composites and machine tools, and "stack" is a software word
			   doing a poor job of covering a lathe. The params table is
			   per-project by design, `Status` appears on two rows of eight,
			   so a key that fits the row is the pattern rather than a break
			   from it. Flip it back to `Stack` if the scannable column
			   matters more than the precise word.

			   Grouped by layer like Clifford's stack line, not listed flat,
			   so design, printing, composites and machining each read as one
			   slot. "Basic" is the owner's own word for the CNC training and
			   stays.

			   The PHAS machine shop is named because it is where the lathe,
			   mill and drill press work happened, not because it is a
			   separate affiliation: it is associated with UBC Rocket, and
			   this whole row is UBC Rocket. The CNC training is the team's
			   own and needs no attribution for the same reason. An earlier
			   version read "basic CNC training at the PHAS machine shop",
			   which put the training in the wrong place.

			   The separation-test electronics are deliberately not repeated
			   here: they are the Role and the summary's first sentence. */
			{
				key: 'Build',
				value:
					'SOLIDWORKS · Bambu Lab FDM in PA6-GF and PA6-CF · wet layup carbon fibre and fibreglass · lathe, mill and drill press at the PHAS machine shop · basic CNC training',
			},
			{ key: 'Year', value: '2025–present' },
		],
		titleHref: 'https://github.com/BentoOre0/2025-2026-UBC-ROCKET-work/tree/main',
		figure: {
			caption: 'The team at the launch site.',
			/* 1920x1440, exactly 4:3, so the plate crops nothing.

			   The source is 4284x5712 portrait, which at the 30rem figure
			   would render 480x640, taller than anything else on the page.
			   A portrait photograph cannot be shortened by declaring a
			   landscape ratio: the plate is `object-fit: cover`, so the
			   slot would take a centre band and cut the subjects off at the
			   shins. It is therefore cropped here instead, to the full
			   source width and the tallest 4:3 band that band allows, placed
			   to keep all three of them from headroom to feet.

			   This slot previously asked for a shot that was never taken,
			   '4:3 · overhead · raking light on a plain ground', of the
			   assembled avionics bay. That photograph would still say more
			   about the actual work than a team portrait does, so it is
			   worth taking; this figure is not a reason to close that out. */
			plates: [
				{
					still: ubcRocketTeam,
					alt: 'Three team members standing shoulder to shoulder in a flat grass field under a broad, overcast sky, together holding a blue rocket horizontally at waist height. White block lettering runs the length of its body.',
				},
			],
			ratio: '4 / 3',
		},
		links: [
			{
				label: 'Repository',
				href: 'https://github.com/BentoOre0/2025-2026-UBC-ROCKET-work/tree/main',
			},
		],
	},
	{
		title: 'GravSim: Barnes-Hut N-body simulator',
		summary:
			'A 2D N-body gravity simulator. Force computation uses the Barnes-Hut approximation over a dynamically built quadtree, taking the algorithm from O(n^2) to O(n log n).',
		params: [
			{ key: 'Role', value: 'Sole developer' },
			/* "Physics" is spelled out rather than left implicit in "N-body"
			   and "gravity". It is the discipline word a reader scans for,
			   the same reason P6 and P7 say "computer vision", and it is the
			   one term on this row that ties the project to the degree
			   leading §1. */
			{ key: 'Stack', value: 'Python · physics simulation · Pygame · NumPy' },
			{ key: 'Year', value: '2024' },
		],
		titleHref: 'https://github.com/BentoOre0/GravSim',
		figure: {
			caption: 'The simulation running.',
			/* Both renders are 640x400 at source, so 8:5 exactly, and the
			   pair needs no cropping. Produced by the project's own
			   simulation code; see the media folder's README. */
			plates: [
				{
					still: quadtreeStill,
					motion: '/gravsim/quadtree-subdivision.webp',
					alt: 'An animated view of the quadtree re-subdividing every frame as a galaxy of specks collapses, the cell boundaries growing dense around the core.',
					label: 'Quadtree subdivision, rebuilt every frame',
				},
				{
					still: galaxyStill,
					motion: '/gravsim/galaxy-formation.webp',
					alt: 'An animated view of a rotating galaxy of coloured specks coalescing into a handful of larger planets, drawn with motion trails.',
					label: 'Bodies merging under gravity, with motion trails',
				},
			],
			ratio: '8 / 5',
			/* A window rather than a collage: side by side these land at
			   about 232px each, and a field of specks at 232px is texture,
			   not a simulation. */
			cycle: true,
		},
		links: [{ label: 'Repository', href: 'https://github.com/BentoOre0/GravSim' }],
	},
	{
		title: 'Baybayin script recognition: CNN vs. SVC',
		summary:
			"Research comparing convolutional neural networks against support vector classifiers at recognising Baybayin script under rotation and noise. CNNs proved more resilient to distortion; SVCs were more accurate on clean data, where the script's diacritics carry the distinction.",
		params: [
			{ key: 'Role', value: 'Sole author · IB Extended Essay' },
			/* The libraries, not the two model families: "CNN vs. SVC" is
			   already the title and the summary compares them, so repeating
			   them here spent a row saying nothing new. "Computer vision" is
			   the discipline term a reader scans for and the page never said
			   it anywhere. */
			{
				key: 'Stack',
				value:
					'Python · computer vision · TensorFlow/Keras · scikit-learn · NumPy · Pandas · Pillow · Matplotlib',
			},
			{ key: 'Year', value: '2024–2025' },
		],
		titleHref: 'https://github.com/BentoOre0/Portfolio/tree/main/SVCvsCNNEXTENDED',
		figure: {
			caption: 'The Baybayin "Ba", broken into pixels for computer vision.',
			/* The slot specified an accuracy chart, 16:9, and this is not that:
			   it is an illustration of the problem, not a result. The caption
			   names the character and what is being done to it, at the owner's
			   direction; it said "dissolving into noise", which the picture
			   does not show. What it shows is a glyph breaking into a grid of
			   squares, which is pixelation, and pixelation is the step before
			   a model sees anything. The row's claim about CNNs and SVCs is
			   still carried by the summary and by the linked paper; this
			   figure adds a subject, not evidence.

			   Square, so `ratio` follows the artwork rather than cropping a
			   centred glyph to a letterbox. */
			plates: [
				{
					still: baybayinGlyph,
					alt: 'The Baybayin character "Ba", a single heavy black letterform on off-white, its right-hand side breaking up into a grid of small squares that scatters and thins toward the edge of the frame.',
				},
			],
			ratio: '1 / 1',
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
		title: 'Automated colour analysis for percentage coverage',
		/* Two revisions, and the second undid half the first. The original
		   said "an image-segmentation algorithm measuring percentage colour
		   coverage", which is the category rather than the method. Naming
		   every step fixed that and overshot: 414 characters against a
		   median of 214, the whole pipeline spent on a reader who has not
		   clicked anything.

		   What is left is the one step that is not obvious, pulling each
		   pixel toward a reference colour before clustering, which is what
		   makes K-means converge on clean groups. The blur, the resize, the
		   dropped background cluster and the final ratio are all in the
		   repository. **The summary exists to get that repository opened.**

		   The reference colours are still not named. The owner's account of
		   the pull step and the labels that used to be on the figure did not
		   use the same third colour, so "three reference colours" is what
		   can be said without guessing at which is right. */
		summary:
			'Measures what percentage of a sample has browned, by K-means clustering pixels pulled toward three reference colours. Cited by the judging panel as the key contribution in a first-place school science competition entry.',
		params: [
			{ key: 'Role', value: 'Sole developer' },
			{ key: 'Stack', value: 'Python · computer vision · image segmentation · K-means clustering' },
			{ key: 'Year', value: '2024' },
		],
		titleHref: 'https://github.com/BentoOre0/ColorSegmentationAlgoPercentageCoverage',
		figure: {
			/* The legend was painted out of the source PNG at the owner's
			   request: it labelled the three clusters "White (background)",
			   "Yellow (fresh)" and "Brown (browned)", and the picture makes
			   the point without it. The clusters are drawn in their own
			   colours, so the naming was redundant, and the labels were the
			   one part of this figure that went illegible when it shrank.

			   That also settles `wide` for this row. The legend's small type
			   was the only argument ever made for it; there is no small type
			   left. */
			caption:
				'The three colour classes the algorithm separates, drawn as clusters in colour space.',
			plates: [
				{
					still: colourClusters,
					alt: 'A dark three-dimensional plot of a colour space holding three separated clusters of dots, each ringed by an outline in its own colour: one white, one yellow, one brown. Leader lines run from all three clusters to a photograph of a spotted banana in the corner.',
				},
			],
			ratio: '966 / 627',
		},
		links: [
			{
				label: 'Repository',
				href: 'https://github.com/BentoOre0/ColorSegmentationAlgoPercentageCoverage',
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
