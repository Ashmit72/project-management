type Member = { name: string; image: string };

type RawProject = {
  id?: string;
  name: string;
  description: string;
  createdAt: string;
  members: Member[];
};

const rawProjects: RawProject[] = [
  {
    id: 'project-id-1',
    name: 'Project – Uber Eats',
    description: 'Mobile app development for the Uber Eats delivery platform.',
    createdAt: 'Dec 2, 2024',
    members: [
      { name: 'Noah Brooks', image: 'https://avatar.iran.liara.run/public/18' },
      { name: 'Liam Reed', image: 'https://avatar.iran.liara.run/public/32' },
      { name: 'Ethan Cole', image: 'https://avatar.iran.liara.run/public/25' },
    ],
  },
  {
    id: 'project-id-2',
    name: 'Project – Slack Redesign',
    description:
      'UI overhaul and performance tuning for Slack’s workspace client.',
    createdAt: 'Jan 14, 2025',
    members: [
      { name: 'Ava Morgan', image: 'https://avatar.iran.liara.run/public/12' },
      { name: 'Leo Carter', image: 'https://avatar.iran.liara.run/public/7' },
      { name: 'Mia Turner', image: 'https://avatar.iran.liara.run/public/49' },
    ],
  },
  {
    id: 'project-id-3',
    name: 'Project – Netflix Admin',
    description: 'Internal admin dashboard for managing content and analytics.',
    createdAt: 'Feb 9, 2025',
    members: [
      { name: 'Henry Gray', image: 'https://avatar.iran.liara.run/public/5' },
      { name: 'Ella Stone', image: 'https://avatar.iran.liara.run/public/41' },
      { name: 'Owen Perry', image: 'https://avatar.iran.liara.run/public/22' },
    ],
  },
  {
    id: 'project-id-4',
    name: 'Project – AirBnB Insights',
    description: 'Analytics suite for tracking occupancy and seasonal trends.',
    createdAt: 'Nov 3, 2024',
    members: [
      { name: 'Sophia Hall', image: 'https://avatar.iran.liara.run/public/1' },
      { name: 'James Ellis', image: 'https://avatar.iran.liara.run/public/29' },
      { name: 'Lucas Shaw', image: 'https://avatar.iran.liara.run/public/9' },
    ],
  },
  {
    id: 'project-id-5',
    name: 'Project – Stripe Billing',
    description:
      'Custom billing workflows and subscription management features.',
    createdAt: 'Aug 21, 2024',
    members: [
      {
        name: 'Isabella Ross',
        image: 'https://avatar.iran.liara.run/public/14',
      },
      { name: 'Daniel Webb', image: 'https://avatar.iran.liara.run/public/44' },
      { name: 'Emily King', image: 'https://avatar.iran.liara.run/public/33' },
    ],
  },
  {
    id: 'project-id-1',
    name: 'Project – Spotify Social',
    description:
      'Experimental social layer for shared playlists and live rooms.',
    createdAt: 'Sep 11, 2024',
    members: [
      { name: 'Jack Hayes', image: 'https://avatar.iran.liara.run/public/27' },
      { name: 'Aria Brooks', image: 'https://avatar.iran.liara.run/public/38' },
      { name: 'Ryan Kim', image: 'https://avatar.iran.liara.run/public/3' },
    ],
  },
  {
    id: 'project-id-1',
    name: 'Project – Zoom Scheduler',
    description: 'Smart scheduling system integrated with Zoom meetings.',
    createdAt: 'Oct 6, 2024',
    members: [
      { name: 'Chloe Reed', image: 'https://avatar.iran.liara.run/public/13' },
      { name: 'Evan Lee', image: 'https://avatar.iran.liara.run/public/35' },
      {
        name: 'Michael Hart',
        image: 'https://avatar.iran.liara.run/public/23',
      },
    ],
  },
  {
    id: 'project-id-1',
    name: 'Project – GitHub Deployments',
    description:
      'Unified deployments dashboard tracking multiple environments.',
    createdAt: 'Jul 29, 2024',
    members: [
      {
        name: 'Harper Wells',
        image: 'https://avatar.iran.liara.run/public/16',
      },
      {
        name: 'Oliver Grant',
        image: 'https://avatar.iran.liara.run/public/11',
      },
      {
        name: 'Aiden Brooks',
        image: 'https://avatar.iran.liara.run/public/46',
      },
    ],
  },
  {
    id: 'project-id-1',
    name: 'Project – Notion AI Notes',
    description: 'AI-powered note enhancement and summarization module.',
    createdAt: 'May 19, 2024',
    members: [
      { name: 'Grace Hill', image: 'https://avatar.iran.liara.run/public/47' },
      { name: 'Adam Blake', image: 'https://avatar.iran.liara.run/public/24' },
      { name: 'Nora James', image: 'https://avatar.iran.liara.run/public/50' },
    ],
  },
  {
    id: 'project-id-1',
    name: 'Project – Trello Mobile',
    description: 'Mobile-first enhancements for Trello’s Kanban experience.',
    createdAt: 'Jun 2, 2024',
    members: [
      { name: 'Mason Ford', image: 'https://avatar.iran.liara.run/public/36' },
      {
        name: 'Scarlett Owen',
        image: 'https://avatar.iran.liara.run/public/45',
      },
      { name: 'Theo Price', image: 'https://avatar.iran.liara.run/public/26' },
    ],
  },
  {
    id: 'project-id-1',
    name: 'Project – Figma Assets',
    description: 'Cloud render engine for exporting design assets at scale.',
    createdAt: 'Dec 18, 2024',
    members: [
      { name: 'Avery Scott', image: 'https://avatar.iran.liara.run/public/17' },
      { name: 'Caleb Wood', image: 'https://avatar.iran.liara.run/public/34' },
      { name: 'Luna Baker', image: 'https://avatar.iran.liara.run/public/40' },
    ],
  },
  {
    id: 'project-id-1',
    name: 'Project – Shopify POS',
    description: 'Point-of-sale extensions for retail stores on Shopify.',
    createdAt: 'Jan 5, 2025',
    members: [
      { name: 'Wyatt Cruz', image: 'https://avatar.iran.liara.run/public/19' },
      {
        name: 'Elena Harper',
        image: 'https://avatar.iran.liara.run/public/20',
      },
      {
        name: 'Miles Carter',
        image: 'https://avatar.iran.liara.run/public/31',
      },
    ],
  },
  {
    id: 'project-id-1',
    name: 'Project – Discord Moderation',
    description: 'Automated moderation and server insights toolkit.',
    createdAt: 'Mar 14, 2024',
    members: [
      { name: 'Stella Diaz', image: 'https://avatar.iran.liara.run/public/10' },
      { name: 'Jude Nelson', image: 'https://avatar.iran.liara.run/public/48' },
      { name: 'Kai Roberts', image: 'https://avatar.iran.liara.run/public/4' },
    ],
  },
  {
    id: 'project-id-1',
    name: 'Project – Facebook Ads Hub',
    description: 'Unified ad analytics dashboard for different ad sets.',
    createdAt: 'Apr 26, 2024',
    members: [
      { name: 'Riley Hunt', image: 'https://avatar.iran.liara.run/public/39' },
      { name: 'Nathan Cook', image: 'https://avatar.iran.liara.run/public/2' },
      { name: 'Leah Brooks', image: 'https://avatar.iran.liara.run/public/8' },
    ],
  },
  {
    id: 'project-id-1',
    name: 'Project – YouTube Studio Mobile',
    description: 'Creator-focused features for YouTube Studio’s mobile app.',
    createdAt: 'Aug 14, 2024',
    members: [
      {
        name: 'Paige Summers',
        image: 'https://avatar.iran.liara.run/public/6',
      },
      { name: 'Finn Carter', image: 'https://avatar.iran.liara.run/public/15' },
      { name: 'Zoe Parker', image: 'https://avatar.iran.liara.run/public/28' },
    ],
  },
  {
    id: 'project-id-1',
    name: 'Project – LinkedIn Talent Match',
    description: 'AI recommendations for matching candidates at scale.',
    createdAt: 'Nov 20, 2024',
    members: [
      { name: 'Alex Rivera', image: 'https://avatar.iran.liara.run/public/21' },
      { name: 'Blake Hayes', image: 'https://avatar.iran.liara.run/public/43' },
      { name: 'Maya Brooks', image: 'https://avatar.iran.liara.run/public/37' },
    ],
  },
  {
    id: 'project-id-1',
    name: 'Project – DoorDash Routing',
    description: 'Smart routing engine for minimizing delivery delays.',
    createdAt: 'Sep 3, 2024',
    members: [
      {
        name: 'Jaxon Miller',
        image: 'https://avatar.iran.liara.run/public/30',
      },
      { name: 'Olivia Chen', image: 'https://avatar.iran.liara.run/public/42' },
      { name: 'Eli Torres', image: 'https://avatar.iran.liara.run/public/52' },
    ],
  },
  {
    id: 'project-id-1',
    name: 'Project – Canva Pro Assets',
    description: 'Asset management improvements for Canva Pro editors.',
    createdAt: 'Jul 17, 2024',
    members: [
      {
        name: 'Sienna Brooks',
        image: 'https://avatar.iran.liara.run/public/53',
      },
      { name: 'Gavin West', image: 'https://avatar.iran.liara.run/public/54' },
      { name: 'Ada Lane', image: 'https://avatar.iran.liara.run/public/55' },
    ],
  },
  {
    id: 'project-id-1',
    name: 'Project – Pinterest Trends',
    description:
      'Trend forecasting and creator analytics for Pinterest boards.',
    createdAt: 'Oct 11, 2024',
    members: [
      { name: 'Isla Perry', image: 'https://avatar.iran.liara.run/public/56' },
      { name: 'Roman Hayes', image: 'https://avatar.iran.liara.run/public/57' },
      { name: 'Tessa Reid', image: 'https://avatar.iran.liara.run/public/58' },
    ],
  },
  {
    id: 'project-id-1',
    name: 'Project – Twitch Highlights',
    description: 'Automatic highlight and clip generator for streamers.',
    createdAt: 'Jan 22, 2025',
    members: [
      {
        name: 'Callie Brooks',
        image: 'https://avatar.iran.liara.run/public/59',
      },
      {
        name: 'Dylan Foster',
        image: 'https://avatar.iran.liara.run/public/60',
      },
      { name: 'Ivy Rhodes', image: 'https://avatar.iran.liara.run/public/61' },
    ],
  },
];

function generateId(index: number, mode: 'increment' | 'random') {
  if (mode === 'increment') return `project-${index + 1}`;

  // random: prefer crypto.randomUUID if available in the environment,
  // fallback to a compact random string
  // Note: crypto.randomUUID is supported in modern browsers & Node 18+.

  const anyCrypto = typeof crypto !== 'undefined' ? (crypto as any) : undefined;
  if (anyCrypto && typeof anyCrypto.randomUUID === 'function') {
    return String(anyCrypto.randomUUID());
  }

  return `project-${Math.random().toString(36).slice(2, 9)}`;
}

export function getDummyProjects(mode: 'increment' | 'random' = 'increment') {
  return rawProjects.map((p, i) => ({ ...p, id: generateId(i, mode) }));
}

export const dummyProjects = getDummyProjects();
