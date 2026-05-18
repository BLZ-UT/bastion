import { SectorId } from './companies'

export interface Insight {
  id: string
  title: string
  excerpt: string
  sector: SectorId | 'cross-sector'
  date: string
  readTime: string
  author: string
  tags: string[]
  featured?: boolean
}

export const insights: Insight[] = [
  {
    id: 'nuclear-renaissance-data-centers',
    title: 'The Nuclear Renaissance: Why Hyperscalers Are Going Atomic',
    excerpt: 'Microsoft, Google, and Amazon have all signed landmark nuclear power agreements in the past 18 months. The convergence of AI power demand and carbon commitments is reshaping the energy landscape around dormant and new nuclear assets.',
    sector: 'energy',
    date: 'May 14, 2025',
    readTime: '8 min read',
    author: 'Research Team',
    tags: ['Nuclear', 'Data Centers', 'Hyperscalers', 'CEG', 'TLN'],
    featured: true,
  },
  {
    id: 'palantir-aip-bootcamp-effect',
    title: "Palantir's AIP Bootcamp: The Fastest GTM Motion in Enterprise Software",
    excerpt: 'Palantir\'s "bootcamp" model—immersive 5-day AI implementation sessions—has compressed enterprise sales cycles from 18 months to weeks. We examine the mechanics, retention data, and what this means for the competitive landscape.',
    sector: 'defense',
    date: 'May 10, 2025',
    readTime: '6 min read',
    author: 'Research Team',
    tags: ['PLTR', 'AI', 'Enterprise Software', 'GTM'],
    featured: true,
  },
  {
    id: 'coreweave-infrastructure-moat',
    title: 'CoreWeave and the Infrastructure Moat: Are GPU Clouds Defensible?',
    excerpt: 'CoreWeave\'s IPO revealed a business growing 7x year-over-year with Microsoft as its anchor customer. But with AWS, Google, and Azure all expanding GPU capacity, we examine whether hyperspecialization is a durable advantage or a temporary arb.',
    sector: 'ai-infrastructure',
    date: 'May 6, 2025',
    readTime: '9 min read',
    author: 'Research Team',
    tags: ['CRWV', 'GPU', 'Cloud', 'Hyperscalers', 'NVDA'],
  },
  {
    id: 'rocket-lab-neutron-thesis',
    title: 'Rocket Lab\'s Neutron: Can a Small-Sat Company Win Medium Launch?',
    excerpt: 'Rocket Lab has quietly become one of the most important space infrastructure companies in the world. With Neutron targeting medium-lift in 2026, we assess whether they can challenge SpaceX\'s dominance in the $10B+ medium launch market.',
    sector: 'space',
    date: 'Apr 30, 2025',
    readTime: '7 min read',
    author: 'Research Team',
    tags: ['RKLB', 'Launch', 'SpaceX', 'Neutron'],
  },
  {
    id: 'crowdstrike-recovery-thesis',
    title: 'CrowdStrike One Year After the Outage: Damaged Moat or Buying Opportunity?',
    excerpt: 'The July 2024 software update that took down 8.5 million Windows machines was the most visible IT failure in years. Twelve months later, we examine churn data, net retention, and whether Falcon\'s platform advantage has survived.',
    sector: 'cybersecurity',
    date: 'Apr 24, 2025',
    readTime: '8 min read',
    author: 'Research Team',
    tags: ['CRWD', 'Security', 'Platform', 'Recovery'],
  },
  {
    id: 'defense-tech-funding-surge',
    title: 'The $40B Defense Tech Wave: From Anduril to the Public Markets',
    excerpt: 'Defense technology funding has tripled since Russia\'s invasion of Ukraine. We map the private-to-public pipeline—Anduril, Shield AI, Sarcos, Joby—and assess valuation expectations as these companies mature toward IPO.',
    sector: 'defense',
    date: 'Apr 18, 2025',
    readTime: '10 min read',
    author: 'Research Team',
    tags: ['Defense', 'Anduril', 'VC', 'Autonomy', 'IPO'],
    featured: true,
  },
  {
    id: 'grid-infrastructure-bottleneck',
    title: 'The Grid as Bottleneck: Why Transmission Is the Rate Limiter for AI',
    excerpt: 'Data center demand is growing faster than transmission infrastructure can handle. We examine the critical path—transformers, interconnection queues, grid operators—and identify the infrastructure companies positioned to benefit.',
    sector: 'energy',
    date: 'Apr 12, 2025',
    readTime: '7 min read',
    author: 'Research Team',
    tags: ['Grid', 'Transmission', 'GEV', 'NEE', 'AI Power Demand'],
  },
  {
    id: 'zero-trust-market-map',
    title: 'Zero Trust Market Map 2025: Who Wins as Legacy VPN Finally Dies?',
    excerpt: 'The zero trust market is approaching $60B as enterprise transformation accelerates post-COVID and post-regulation. We map the ZTNA competitive landscape across network, identity, endpoint, and cloud security.',
    sector: 'cybersecurity',
    date: 'Apr 6, 2025',
    readTime: '9 min read',
    author: 'Research Team',
    tags: ['Zero Trust', 'ZS', 'OKTA', 'PANW', 'Identity'],
  },
]
