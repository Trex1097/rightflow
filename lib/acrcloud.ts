// ACRCloud integration for audio fingerprinting
// Detects songs in radio streams and public spaces

export interface ACRCloudResult {
  status: { msg: string; code: number }
  metadata?: {
    music?: Array<{
      title: string
      artists: Array<{ name: string }>
      isrc?: string
      duration_ms: number
      score: number
    }>
  }
}

export interface DetectionResult {
  matched: boolean
  title?: string
  artist?: string
  isrc?: string
  confidence?: number
  durationMs?: number
}

export async function identifyAudio(audioBuffer: Buffer): Promise<DetectionResult> {
  const accessKey = process.env.ACRCLOUD_ACCESS_KEY!
  const accessSecret = process.env.ACRCLOUD_ACCESS_SECRET!
  const host = process.env.ACRCLOUD_HOST!

  const timestamp = Math.floor(Date.now() / 1000)
  const stringToSign = ['POST', '/v1/identify', accessKey, 'audio', '1', timestamp].join('\n')

  // HMAC-SHA1 signature
  const crypto = await import('crypto')
  const signature = crypto
    .createHmac('sha1', accessSecret)
    .update(stringToSign)
    .digest('base64')

  const formData = new FormData()
  formData.append('sample', new Blob([audioBuffer]))
  formData.append('access_key', accessKey)
  formData.append('data_type', 'audio')
  formData.append('signature_version', '1')
  formData.append('signature', signature)
  formData.append('sample_bytes', audioBuffer.length.toString())
  formData.append('timestamp', timestamp.toString())

  try {
    const response = await fetch(`https://${host}/v1/identify`, {
      method: 'POST',
      body: formData,
    })
    const data: ACRCloudResult = await response.json()

    if (data.status.code !== 0 || !data.metadata?.music?.[0]) {
      return { matched: false }
    }

    const track = data.metadata.music[0]
    return {
      matched: true,
      title: track.title,
      artist: track.artists[0]?.name,
      isrc: track.isrc,
      confidence: track.score,
      durationMs: track.duration_ms,
    }
  } catch (error) {
    console.error('ACRCloud error:', error)
    return { matched: false }
  }
}

// Monitor a radio stream URL continuously
export async function monitorRadioStream(
  streamUrl: string,
  sourceId: string,
  onDetection: (result: DetectionResult, sourceId: string) => Promise<void>
): Promise<void> {
  console.log(`Starting monitoring for source ${sourceId}: ${streamUrl}`)

  // In production: use ffmpeg to capture 10s chunks every 30s
  // and pipe to identifyAudio()
  // This is a simplified version for illustration

  const INTERVAL_MS = 30_000
  const CHUNK_DURATION_MS = 10_000

  setInterval(async () => {
    try {
      // Capture audio chunk from stream
      // const chunk = await captureStreamChunk(streamUrl, CHUNK_DURATION_MS)
      // const result = await identifyAudio(chunk)
      // if (result.matched) await onDetection(result, sourceId)
      console.log(`Checking stream ${sourceId}...`)
    } catch (err) {
      console.error(`Stream monitoring error for ${sourceId}:`, err)
    }
  }, INTERVAL_MS)
}

// Match detection result to catalogue
export async function matchToWork(
  detection: DetectionResult,
  prismaClient: any
): Promise<string | null> {
  if (!detection.matched) return null

  // Try ISRC match first (most reliable)
  if (detection.isrc) {
    const work = await prismaClient.work.findUnique({
      where: { isrc: detection.isrc }
    })
    if (work) return work.id
  }

  // Fallback: title + artist fuzzy match
  if (detection.title && detection.artist) {
    const work = await prismaClient.work.findFirst({
      where: {
        title: { contains: detection.title, mode: 'insensitive' },
        OR: [
          { artist: { user: { name: { contains: detection.artist, mode: 'insensitive' } } } },
        ]
      }
    })
    if (work) return work.id
  }

  return null
}
