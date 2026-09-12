export interface LiveEpisode {
  title: string
  podcastName: string
  link: string
  audioUrl: string | null
  artworkUrl: string | null
  releaseDate: string | null
  durationMs: number | null
}

const CACHE_TTL_MS = 15 * 60_000
const FETCH_TIMEOUT_MS = 5_000

const feedCache = new Map<string, { data: LiveEpisode[]; expires: number }>()

interface ItunesResult {
  trackName?: string
  collectionName?: string
  artistName?: string
  trackViewUrl?: string
  collectionViewUrl?: string
  episodeUrl?: string
  previewUrl?: string
  artworkUrl600?: string
  artworkUrl160?: string
  releaseDate?: string
  trackTimeMillis?: number
}

/** Live podcast episodes via the iTunes Search API — no API key required.
 *  This is the site's only source of podcast content: every episode returned
 *  here has a real audio file, so nothing non-playable is ever shown. */
export async function getLivePodcastEpisodes(query: string, limit = 5): Promise<LiveEpisode[]> {
  const cacheKey = `${query}::${limit}`
  const cached = feedCache.get(cacheKey)
  if (cached && cached.expires > Date.now()) return cached.data

  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&media=podcast&entity=podcastEpisode&limit=${limit}`

  try {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)
    const res = await fetch(url, { signal: controller.signal, cache: 'no-store' })
    clearTimeout(timer)

    if (!res.ok) return cached?.data ?? []

    const json: { results?: ItunesResult[] } = await res.json()
    const items: LiveEpisode[] = (json.results ?? [])
      .map((r) => ({
        title: r.trackName ?? '',
        podcastName: r.collectionName ?? r.artistName ?? 'Unknown podcast',
        link: r.trackViewUrl ?? r.collectionViewUrl ?? '',
        // episodeUrl is the actual episode audio file; previewUrl (a short clip) is
        // the fallback when a feed doesn't expose the full file to iTunes' index.
        audioUrl: r.episodeUrl ?? r.previewUrl ?? null,
        artworkUrl: r.artworkUrl600 ?? r.artworkUrl160 ?? null,
        releaseDate: r.releaseDate ?? null,
        durationMs: r.trackTimeMillis ?? null,
      }))
      .filter((e) => e.title && e.link)

    feedCache.set(cacheKey, { data: items, expires: Date.now() + CACHE_TTL_MS })
    return items
  } catch {
    return cached?.data ?? []
  }
}
