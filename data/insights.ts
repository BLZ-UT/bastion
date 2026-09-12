import { SectorId } from './companies'

export interface Insight {
  id: string
  title: string
  excerpt: string
  content: string[]
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
    title: "The Nuclear Renaissance: Why Hyperscalers Are Going Atomic",
    excerpt: "Microsoft, Google, and Amazon have all signed landmark nuclear power agreements in the past 18 months. The convergence of AI power demand and carbon commitments is reshaping the energy landscape around dormant and new nuclear assets.",
    content: [
      "Three of the largest cloud platforms have now signed nuclear power purchase agreements in rapid succession: Microsoft's deal to restart Three Mile Island Unit 1 with Constellation Energy, Amazon's agreement with Talen Energy tied directly to the Susquehanna plant powering its adjacent data center campus, and Google's early-stage commitment to Kairos Power's small modular reactors. None of this is coincidental — it is the clearest signal yet that AI-driven power demand has outrun what hyperscalers are willing to source from the spot grid.",
      "The appeal of nuclear specifically, rather than incremental renewables, comes down to duration and certainty. A data center campus that needs to run at near-100% utilization for a decade cannot be matched against intermittent wind and solar without heavy storage buildouts. Nuclear offers carbon-free baseload with output that does not depend on weather, and a PPA structure that lets both sides underwrite a multi-decade capital commitment with a known counterparty and a known price.",
      "The market has re-rated the exposed names accordingly. Constellation, sitting on the largest fleet of carbon-free generation in the country, is up over 125% on a trailing-year basis as investors price in demand visibility most utilities have never had. Talen — a much smaller, more levered independent power producer — moved even more sharply on the Amazon news, since a single contract at Susquehanna effectively de-risks a large share of its existing capacity.",
      "The risk to this thesis is execution, not demand. Restarting a shuttered reactor like Three Mile Island involves regulatory review, recommissioning work, and a timeline measured in years, not quarters. The SMR side of the trade — Oklo, NuScale, Kairos — is earlier still: pre-revenue, pre-commercial, and dependent on first-of-a-kind projects clearing NRC licensing on schedule. We think the operating nuclear fleet is the highest-conviction way to play this theme today; the SMR names are a call option on 2030s power demand that requires patience most public-market investors don't have.",
    ],
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
    excerpt: "Palantir's \"bootcamp\" model—immersive 5-day AI implementation sessions—has compressed enterprise sales cycles from 18 months to weeks. We examine the mechanics, retention data, and what this means for the competitive landscape.",
    content: [
      "Traditional enterprise software sales for a platform like Palantir's would run through a procurement gauntlet: security review, a multi-quarter pilot, executive sign-off, and only then a phased rollout — an 18-month cycle was typical. The AIP bootcamp model inverts that sequence. Palantir brings a customer's own data and use case into a five-day working session, builds a functioning application against it live, and asks for a purchase decision at the end of the week rather than the end of the fiscal year.",
      "The mechanism works because it collapses the two things that normally stall enterprise AI deals — proving the technology works on the customer's actual data, and proving someone inside the customer can maintain what gets built — into the same five days. By the time the bootcamp ends, there is a working prototype and a trained internal team, which is a fundamentally different pitch than a slide deck and a promised pilot.",
      "The results show up in the numbers: revenue growth has accelerated to roughly 30% year-over-year on a base that is no longer small, with commercial (non-government) revenue growing faster than the historical core government business. Gross margins above 80% suggest this is scaling as a software business rather than a services one, even though the bootcamps themselves look services-heavy on the surface.",
      "The obvious question is valuation. Palantir trades at a multiple of revenue and EBITDA that assumes this growth rate — and the GTM efficiency behind it — persists for years, which is a high bar for any enterprise software company to clear. The bootcamp model is also easier to describe than to replicate: it depends on Palantir's forward-deployed engineering culture, which is expensive to build and not something a competitor can bolt on with a press release. We think the model is real and the moat is real; whether the current price already reflects more of that moat than is prudent is the actual debate.",
    ],
    sector: 'defense',
    date: 'May 10, 2025',
    readTime: '6 min read',
    author: 'Research Team',
    tags: ['PLTR', 'AI', 'Enterprise Software', 'GTM'],
    featured: true,
  },
  {
    id: 'coreweave-infrastructure-moat',
    title: "CoreWeave and the Infrastructure Moat: Are GPU Clouds Defensible?",
    excerpt: "CoreWeave's IPO revealed a business growing 7x year-over-year with Microsoft as its anchor customer. But with AWS, Google, and Azure all expanding GPU capacity, we examine whether hyperspecialization is a durable advantage or a temporary arb.",
    content: [
      "CoreWeave's S-1 disclosed a business that was, at the time, doubling and redoubling on itself: revenue up roughly 7x year-over-year, built almost entirely on NVIDIA GPU clusters rented out to a small number of very large customers, with Microsoft as the anchor. That concentration is the whole bull and bear case in one sentence — it is both how CoreWeave got here and the single biggest risk to the story.",
      "The bull case is architectural specialization: CoreWeave built its stack around GPU workloads from day one — bare-metal provisioning, InfiniBand networking, and a scheduler tuned for large training runs — while the hyperscalers retrofit that capability onto clouds designed for general-purpose compute. In a supply-constrained GPU market, being first in line with NVIDIA and easier to deploy against than a hyperscaler's slower internal process is a real, if temporary, edge.",
      "The bear case is that this is an arbitrage on GPU scarcity, not a durable moat. AWS, Google Cloud, and Azure are all expanding dedicated AI infrastructure capacity, and they have balance sheets, existing enterprise relationships, and captive demand from their own AI products that CoreWeave does not. Once GPU supply catches up with demand, the pricing power that comes from being one of the only places to get H100 or Blackwell capacity at scale should compress.",
      "Our read: CoreWeave's moat is real for as long as the GPU shortage persists and gets more fragile every quarter that hyperscaler capacity comes online. The customer concentration is the more immediate risk — losing or renegotiating a single anchor contract would move the model far more than any competitive dynamic. This is a name where the thesis has a shelf life, not a multi-decade compounder story.",
    ],
    sector: 'ai-infrastructure',
    date: 'May 6, 2025',
    readTime: '9 min read',
    author: 'Research Team',
    tags: ['CRWV', 'GPU', 'Cloud', 'Hyperscalers', 'NVDA'],
  },
  {
    id: 'rocket-lab-neutron-thesis',
    title: "Rocket Lab's Neutron: Can a Small-Sat Company Win Medium Launch?",
    excerpt: "Rocket Lab has quietly become one of the most important space infrastructure companies in the world. With Neutron targeting medium-lift in 2026, we assess whether they can challenge SpaceX's dominance in the $10B+ medium launch market.",
    content: [
      "Rocket Lab built its public reputation on Electron, a small-lift vehicle that has flown enough missions to become the second most frequently launched US rocket after SpaceX's Falcon 9. That track record — reliability, cadence, a real customer base — is the foundation for a much bigger bet: Neutron, a medium-lift, partially reusable rocket aimed squarely at the market SpaceX has owned almost by default since retiring the competition.",
      "The medium-lift market is worth competing for precisely because there is effectively one credible supplier today. Government and commercial customers alike have been vocal about wanting a second source for national-security and large commercial payloads, not out of preference but out of risk management — nobody wants their entire launch manifest dependent on a single company's manifest and schedule.",
      "Rocket Lab's edge, to the extent it has one, is that it is not just a launch company. Its space systems division — solar arrays, satellite components, spacecraft manufacturing — already generates meaningful revenue and gives it a second leg that Electron-only or Neutron-only peers don't have, plus vertical integration that should help Neutron's unit economics once it flies.",
      "The financial reality is that this is still a story about a company burning cash to build a rocket that hasn't flown commercially yet, against a growing revenue base but negative EBITDA margins. Neutron slipping from its targeted timeline would not be surprising — new launch vehicles almost always do — and the stock's run has already priced in a fair amount of execution success. We like the strategic logic of a second medium-lift supplier existing; we're more cautious about underwriting the exact timeline the market currently assumes.",
    ],
    sector: 'space',
    date: 'Apr 30, 2025',
    readTime: '7 min read',
    author: 'Research Team',
    tags: ['RKLB', 'Launch', 'SpaceX', 'Neutron'],
  },
  {
    id: 'crowdstrike-recovery-thesis',
    title: "CrowdStrike One Year After the Outage: Damaged Moat or Buying Opportunity?",
    excerpt: "The July 2024 software update that took down 8.5 million Windows machines was the most visible IT failure in years. Twelve months later, we examine churn data, net retention, and whether Falcon's platform advantage has survived.",
    content: [
      "The July 2024 content update that crashed 8.5 million Windows machines was, by any measure, the most consequential outage a cybersecurity vendor has caused in the industry's history — grounded flights, disrupted hospitals, and a very public reminder that endpoint agents run with kernel-level privileges for a reason, and that the blast radius of a bad update is proportional to how deeply trusted the vendor is.",
      "A year on, the question is whether that trust has been rebuilt. Customer retention data suggests most enterprise customers stayed: switching an endpoint security platform is expensive and disruptive in its own right, and CrowdStrike moved quickly on remediation, credits, and process changes to its update pipeline. Net new business, however, has been slower to recover than renewals — the outage shows up more in slower growth than in outright churn.",
      "The stock reflects that split verdict: essentially flat to slightly down on a trailing-year basis, a meaningfully worse result than cybersecurity peers like Palo Alto Networks put up over the same period, even as CrowdStrike's underlying revenue growth and gross margins have stayed intact. The market is pricing in a company that didn't break, but that lost some of the \"obvious default choice\" status that justified its premium multiple.",
      "Our take is that Falcon's platform breadth — endpoint, identity, cloud, and now SIEM — is still a real advantage, and one bad update, however painful, doesn't erase years of product execution. The stock's underperformance relative to peers looks more like a re-rating of trust than a re-rating of the business, which is the kind of gap that closes as each subsequent clean renewal cycle passes without incident.",
    ],
    sector: 'cybersecurity',
    date: 'Apr 24, 2025',
    readTime: '8 min read',
    author: 'Research Team',
    tags: ['CRWD', 'Security', 'Platform', 'Recovery'],
  },
  {
    id: 'defense-tech-funding-surge',
    title: "The $40B Defense Tech Wave: From Anduril to the Public Markets",
    excerpt: "Defense technology funding has tripled since Russia's invasion of Ukraine. We map the private-to-public pipeline—Anduril, Shield AI, Sarcos, Joby—and assess valuation expectations as these companies mature toward IPO.",
    content: [
      "Venture funding into defense-focused startups has roughly tripled since Russia's invasion of Ukraine, as the war provided a very public, very concrete demonstration of what autonomous systems, drones, and software-defined warfare actually look like in practice. Capital that spent a decade avoiding defense as a category — for reputational as much as financial reasons — has largely reversed course.",
      "The pipeline this has built is unusually deep for the sector: Anduril has become the reference name for vertically integrated autonomous systems and is widely discussed as the most likely near-term defense-tech IPO candidate, alongside earlier-stage but well-funded peers like Shield AI in autonomy and Joby in defense-adjacent advanced air mobility. None have gone public yet, which means the public market's only current exposure to this theme runs through incumbents and adjacent names.",
      "That is showing up in how existing public defense-technology names trade. Palantir's AI platform business, Kratos's drone and hypersonics work, and Mercury Systems's embedded processing have all been repriced partly in sympathy with the private market's enthusiasm for the category, even where the public companies' own government contract mix hasn't changed much. Public investors are, in effect, underwriting the private thesis through the closest available proxies.",
      "The valuation question for the eventual IPOs is real: private defense-tech rounds have been priced at multiples that assume procurement reform actually accelerates, and the Pentagon's adoption cycle for new vendors remains one of the slowest in any large market. We think the underlying thesis — software and autonomy displacing traditional prime-contractor hardware cycles — is directionally right; we'd want to see actual production contracts, not just pilot programs, before underwriting the valuations private markets have already assigned.",
    ],
    sector: 'defense',
    date: 'Apr 18, 2025',
    readTime: '10 min read',
    author: 'Research Team',
    tags: ['Defense', 'Anduril', 'VC', 'Autonomy', 'IPO'],
    featured: true,
  },
  {
    id: 'grid-infrastructure-bottleneck',
    title: "The Grid as Bottleneck: Why Transmission Is the Rate Limiter for AI",
    excerpt: "Data center demand is growing faster than transmission infrastructure can handle. We examine the critical path—transformers, interconnection queues, grid operators—and identify the infrastructure companies positioned to benefit.",
    content: [
      "The binding constraint on AI infrastructure buildouts is increasingly not chip supply but grid capacity. New data center campuses need hundreds of megawatts of firm power, and getting that power to a site requires transmission upgrades and interconnection approvals that routinely take longer than the data center itself takes to build — a reversal of the usual bottleneck.",
      "The interconnection queue is the clearest evidence of this: projects across the country are waiting years, not months, for grid operators to study and approve new connections, and the queue has grown faster than utilities' ability to process it. Transformers — a component that used to be a commodity, multi-week lead-time item — now have lead times measured in years for the largest units, because a handful of manufacturers serve the entire global market.",
      "This bottleneck creates a specific set of winners. Grid equipment makers like GE Vernova sit directly on the critical path — turbines, transformers, and grid software all see demand pull-forward as utilities race to expand capacity. Utilities with existing generation and transmission footprints near data center demand centers, like NextEra, benefit from being able to offer capacity faster than a new entrant could build it from scratch.",
      "The risk to this thesis is timing, not direction: grid buildouts are lumpy, and equipment makers' backlogs can convert to revenue on a slower or faster cadence than the market currently expects. GE Vernova in particular trades at a valuation that already assumes strong execution on converting its order book. We think the structural bottleneck is real and multi-year, but the individual stocks will move on quarterly conversion of backlog to revenue more than on the macro thesis itself.",
    ],
    sector: 'energy',
    date: 'Apr 12, 2025',
    readTime: '7 min read',
    author: 'Research Team',
    tags: ['Grid', 'Transmission', 'GEV', 'NEE', 'AI Power Demand'],
  },
  {
    id: 'zero-trust-market-map',
    title: "Zero Trust Market Map 2025: Who Wins as Legacy VPN Finally Dies?",
    excerpt: "The zero trust market is approaching $60B as enterprise transformation accelerates post-COVID and post-regulation. We map the ZTNA competitive landscape across network, identity, endpoint, and cloud security.",
    content: [
      "The pitch for zero trust network access has been the same for years — stop trusting anything by default, verify every request regardless of network location — but the shift away from legacy VPN architectures has accelerated as remote and hybrid work made the old perimeter-based model obviously insufficient, and as compliance regimes increasingly assume a zero-trust posture is table stakes rather than best practice.",
      "The competitive map splits along where each vendor entered the market. Zscaler built its business on network-layer ZTNA and secure web gateway, replacing the VPN and firewall stack directly. Okta owns the identity layer that any zero-trust architecture depends on for authentication and authorization. Palo Alto Networks has taken the platform-consolidation route, bundling network, cloud, and security operations into a single suite rather than competing point-product to point-product.",
      "That difference in strategy shows up in growth and margin profiles: Zscaler and Okta both grow revenue in the high-teens to high-20s percent range as focused, best-of-breed vendors, while Palo Alto's platform bundling trades slightly slower organic growth for higher account stickiness and cross-sell. Neither approach has decisively won yet — enterprise buyers are still split between wanting fewer vendors and wanting the best point solution in each category.",
      "Our view is that consolidation is the medium-term winner: security budgets are under the same scrutiny as every other IT line item, and a platform that can plausibly replace three vendor relationships has a real pricing and renewal advantage over any one point product. That said, best-of-breed vendors that own a critical layer — Okta's identity graph is the clearest example — have a defensibility that's harder to consolidate away than a company might assume.",
    ],
    sector: 'cybersecurity',
    date: 'Apr 6, 2025',
    readTime: '9 min read',
    author: 'Research Team',
    tags: ['Zero Trust', 'ZS', 'OKTA', 'PANW', 'Identity'],
  },
]
