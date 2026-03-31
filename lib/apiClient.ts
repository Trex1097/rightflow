import axios from 'axios'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3000'

export const api = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
})

// ── Dashboard ─────────────────────────────────────────────────────────────────
export const getDashboardStats = () => api.get('/dashboard').then(r => r.data)

// ── Detections ────────────────────────────────────────────────────────────────
export const getDetections = (params?: { sourceId?: string; limit?: number }) =>
  api.get('/detections', { params }).then(r => r.data)

export const postDetection = (data: {
  sourceId: string
  isrc?: string
  rawTitle?: string
  rawArtist?: string
  durationSeconds?: number
  confidence?: number
}) => api.post('/detections', data).then(r => r.data)

// ── Works ─────────────────────────────────────────────────────────────────────
export const getWorks = (params?: { search?: string; territory?: string; status?: string }) =>
  api.get('/works', { params }).then(r => r.data)

export const createWork = (data: any) => api.post('/works', data).then(r => r.data)

// ── Cycles ────────────────────────────────────────────────────────────────────
export const getCycles = () => api.get('/cycles').then(r => r.data)

export const processCycle = (cycleId: string) =>
  api.post('/cycles', { cycleId }).then(r => r.data)

// ── Reserve ───────────────────────────────────────────────────────────────────
export const getReserveFund = (status?: string) =>
  api.get('/reserve', { params: { status } }).then(r => r.data)

export const notifyUnregistered = () =>
  api.post('/reserve', { action: 'notify' }).then(r => r.data)

export const redistributeReserve = () =>
  api.post('/reserve', { action: 'redistribute' }).then(r => r.data)

// ── Auth ──────────────────────────────────────────────────────────────────────
export const register = (data: {
  name: string; email: string; password: string
  role: 'ARTIST' | 'LABEL'; stageName?: string; labelName?: string
  country?: string; iban?: string; mobileMoneyNumber?: string
}) => api.post('/auth/register', data).then(r => r.data)
