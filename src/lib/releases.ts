import { isoReleasesApi } from "../data/site"

export type IsoRelease = {
  version: string
  name: string
  url: string
  size: number
  published: string
  digest: string | null
  machineUrl: string | null
}

type GhAsset = {
  name?: unknown
  browser_download_url?: unknown
  size?: unknown
  digest?: unknown
}

type GhRelease = {
  tag_name?: unknown
  published_at?: unknown
  assets?: unknown
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null

const asString = (value: unknown): string | null =>
  typeof value === "string" && value.length > 0 ? value : null

const parseAsset = (release: GhRelease, asset: GhAsset): IsoRelease | null => {
  const name = asString(asset.name)
  const url = asString(asset.browser_download_url)
  const version = asString(release.tag_name)
  const published = asString(release.published_at)
  if (!name || !url || !version || !published) return null
  if (!name.toLowerCase().endsWith(".iso")) return null
  const size = typeof asset.size === "number" ? asset.size : 0
  const rawDigest = asString(asset.digest)
  const digest = rawDigest?.startsWith("sha256:") ? rawDigest.slice(7) : rawDigest
  return { version, name, url, size, published, digest, machineUrl: null }
}

export const formatBytes = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`
  const units = ["KB", "MB", "GB", "TB"]
  let value = bytes / 1024
  let unit = 0
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024
    unit += 1
  }
  return `${value.toFixed(value >= 10 ? 0 : 1)} ${units[unit]}`
}

export const formatReleaseDate = (iso: string): string =>
  new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso))

export const loadIsoReleases = async (): Promise<IsoRelease[]> => {
  const response = await fetch(isoReleasesApi, {
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "aegis-web",
      "X-GitHub-Api-Version": "2022-11-28",
    },
  })
  if (!response.ok) throw new Error(`GitHub releases returned ${response.status}`)
  const body: unknown = await response.json()
  if (!Array.isArray(body)) return []
  return body.flatMap((entry) => {
    if (!isRecord(entry)) return []
    const release = entry as GhRelease
    if (!Array.isArray(release.assets)) return []
    const records = release.assets.filter(isRecord)
    const machineUrl = records
      .map((asset) => ({
        name: asString(asset.name),
        url: asString(asset.browser_download_url),
      }))
      .find((asset) => asset.name === "Aegis-OS-VirtualBox.zip")?.url ?? null
    return records.flatMap((asset) => {
      const parsed = parseAsset(release, asset)
      return parsed ? [{ ...parsed, machineUrl }] : []
    })
  })
}
