import { SectorId } from './companies'

export interface Episode {
  id: string
  title: string
  guest: string
  guestTitle: string
  excerpt: string
  sector: SectorId | 'cross-sector'
  date: string
  duration: string
  episodeNumber: number
  topics: string[]
  featured?: boolean
}

export const episodes: Episode[] = [
  {
    id: 'ep12-nuclear-data-center-deals',
    title: 'The Nuclear Power Purchase Agreement: Inside the Constellation-Microsoft Deal',
    guest: 'Joe Dominguez',
    guestTitle: 'CEO, Constellation Energy',
    excerpt: 'How Constellation structured the first nuclear PPA for AI data centers, the economics of restarting Three Mile Island, and why they see demand exceeding supply for clean baseload power through 2035.',
    sector: 'energy',
    date: 'May 12, 2025',
    duration: '58 min',
    episodeNumber: 12,
    topics: ['Nuclear', 'PPA', 'Data Centers', 'Microsoft', 'Three Mile Island'],
    featured: true,
  },
  {
    id: 'ep11-palantir-government-ai',
    title: 'AI at the Speed of Relevance: Deploying LLMs in Defense',
    guest: 'Shyam Sankar',
    guestTitle: 'CTO, Palantir Technologies',
    excerpt: 'The gap between commercial AI advancement and defense deployment timelines, how AIP changes that calculus, and why Palantir views itself as the operating system for the AI-enabled military.',
    sector: 'defense',
    date: 'Apr 28, 2025',
    duration: '62 min',
    episodeNumber: 11,
    topics: ['AI', 'Defense', 'LLMs', 'AIP', 'Government'],
    featured: true,
  },
  {
    id: 'ep10-coreweave-gpu-cloud',
    title: 'Building the AI Supercloud: CoreWeave\'s Infrastructure Bet',
    guest: 'Michael Intrator',
    guestTitle: 'CEO & Co-founder, CoreWeave',
    excerpt: 'Why CoreWeave bet everything on NVIDIA GPUs in 2017, the decision to go from crypto mining to AI cloud, their IPO journey, and the infrastructure capex required to serve the next wave of AI model training.',
    sector: 'ai-infrastructure',
    date: 'Apr 14, 2025',
    duration: '54 min',
    episodeNumber: 10,
    topics: ['GPU Cloud', 'NVIDIA', 'Hyperscale', 'IPO', 'Infrastructure'],
  },
  {
    id: 'ep09-rocket-lab-beck',
    title: 'From 0 to Orbit: Rocket Lab\'s Path to Reusable Medium Launch',
    guest: 'Peter Beck',
    guestTitle: 'CEO & Founder, Rocket Lab',
    excerpt: 'Starting Rocket Lab in a New Zealand garage, the decision to build Neutron for medium-lift competition with SpaceX, the economics of reusable launch, and why vertical integration is the only path to sustainable space infrastructure.',
    sector: 'space',
    date: 'Apr 2, 2025',
    duration: '66 min',
    episodeNumber: 9,
    topics: ['Launch', 'Neutron', 'Reusability', 'Space Infrastructure', 'New Zealand'],
  },
  {
    id: 'ep08-crowdstrike-recovery',
    title: 'Crisis to Comeback: CrowdStrike\'s Playbook After the Outage',
    guest: 'George Kurtz',
    guestTitle: 'CEO & Co-founder, CrowdStrike',
    excerpt: 'The 24 hours after the July 2024 outage, the technical post-mortem, customer retention decisions, and how CrowdStrike is using the experience to rebuild trust and deepen platform consolidation.',
    sector: 'cybersecurity',
    date: 'Mar 18, 2025',
    duration: '71 min',
    episodeNumber: 8,
    topics: ['CrowdStrike', 'Outage', 'Incident Response', 'Platform', 'Recovery'],
  },
  {
    id: 'ep07-defense-ai-autonomy',
    title: 'Autonomous Systems at Scale: The Pentagon\'s AI Moment',
    guest: 'Lauren Knausenberger',
    guestTitle: 'Former Chief Information Officer, US Air Force',
    excerpt: 'How the DoD\'s technology adoption is changing, the Replicator drone initiative, procurement reform under pressure, and which commercial technologies are actually making it into the force.',
    sector: 'defense',
    date: 'Mar 4, 2025',
    duration: '58 min',
    episodeNumber: 7,
    topics: ['DoD', 'Autonomy', 'Drones', 'AI', 'Procurement'],
  },
  {
    id: 'ep06-power-ai-infrastructure',
    title: 'Powering the AI Supercycle: Grid, Nuclear, and What Comes Next',
    guest: 'Chris Wright',
    guestTitle: 'Secretary of Energy (Former CEO, Liberty Energy)',
    excerpt: 'The energy math behind AI infrastructure, America\'s competitive position in power generation, the case for an all-of-the-above energy strategy, and the infrastructure investment required to sustain AI-led economic growth.',
    sector: 'cross-sector',
    date: 'Feb 18, 2025',
    duration: '64 min',
    episodeNumber: 6,
    topics: ['Energy Policy', 'Grid', 'Nuclear', 'AI Infrastructure', 'Geopolitics'],
    featured: true,
  },
]
