'use client'
import { useState } from 'react'
import AppShell from '@/components/layout/AppShell'
import clsx from 'clsx'

const WORKS = [
  { id: 'ila', emoji: '🎵', bg: 'var(--rf-green-light)', title: 'Ila Meta', artist: 'Saad Lamjarred', tags: ['DA','DV','Stream','Radio','Public'], isrc: 'MA-Z03-24-00142', territories: 'MA·DZ·TN', ytd: '12 840', status: 'active', streams: '124 800', radio: '38', hash: '0x3f8a…d92c', verif: '14 mars 2025', splits: [['Auteur-compositeur',45,'var(--rf-green)'],['Label (UMG Morocco)',35,'var(--rf-blue)'],['Éditeur',15,'var(--rf-amber)'],['RightFlow (frais)',5,'#d1d5db']] },
  { id: 'weld', emoji: '🎶', bg: 'var(--rf-amber-light)', title: 'Weld El Ghaba', artist: 'Dj Van', tags: ['DV','Stream','Radio'], isrc: 'MA-Z03-23-00891', territories: 'MA·DZ', ytd: '8 320', status: 'active', streams: '98 400', radio: '21', hash: '0x7c1e…a340', verif: '2 jan. 2025', splits: [['Auteur-compositeur',50,'var(--rf-green)'],['Label',35,'var(--rf-blue)'],['Co-auteur',10,'var(--rf-amber)'],['RightFlow (frais)',5,'#d1d5db']] },
  { id: 'zina', emoji: '🎼', bg: 'var(--rf-blue-light)', title: 'Zina', artist: 'Maher Zain', tags: ['DA','DV','Stream','Radio','Public','Synchro'], isrc: 'MA-Z03-20-00091', territories: 'MA·DZ·TN', ytd: '18 100', status: 'active', streams: '312 000', radio: '67', hash: '0x6e9a…1f52', verif: '3 mars 2025', splits: [['Auteur-compositeur',40,'var(--rf-green)'],['Producteur',20,'var(--rf-purple)'],['Label',30,'var(--rf-blue)'],['RightFlow (frais)',5,'#d1d5db']] },
  { id: 'ghalt', emoji: '🎸', bg: 'var(--rf-blue-light)', title: 'Ghaltana', artist: 'RedOne ft. Faydee', tags: ['DA','Public','Synchro'], isrc: 'MA-Z03-22-00447', territories: 'MA·TN', ytd: '5 960', status: 'partial', streams: '—', radio: '—', hash: '0x9b2d…f018', verif: '18 fév. 2025', splits: [['Auteur (RedOne)',40,'var(--rf-green)'],['Auteur (Faydee)',25,'var(--rf-blue)'],['Label',30,'var(--rf-amber)'],['RightFlow (frais)',5,'#d1d5db']] },
  { id: 'bghit', emoji: '🎤', bg: 'var(--rf-purple-light)', title: 'Bghit Nebki', artist: 'Douzi', tags: ['DA','DV','Radio','Synchro'], isrc: 'MA-Z03-21-00220', territories: 'MA', ytd: '4 480', status: 'active', streams: '41 200', radio: '14', hash: '0x2a5c…8b74', verif: '7 nov. 2024', splits: [['Auteur-compositeur',55,'var(--rf-green)'],['Label',40,'var(--rf-blue)'],['RightFlow (frais)',5,'#d1d5db']] },
]

const tagColors: Record<string, string> = { DA: 'tag-da', DV: 'tag-dv' }

export default function CataloguePage() {
  const [selected, setSelected] = useState(WORKS[0])
  const [search, setSearch] = useState('')

  const filtered = WORKS.filter(w =>
    w.title.toLowerCase().includes(search.toLowerCase()) ||
    w.artist.toLowerCase().includes(search.toLowerCase()) ||
    w.isrc.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <AppShell activePage="catalogue">
      <div className="p-5 space-y-3">
        <div className="flex items-center gap-3">
          <h1 className="text-sm font-bold">Catalogue</h1>
          <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full" style={{ fontFamily: 'var(--font-dm-mono), monospace' }}>47 oeuvres</span>
          <div className="relative ml-auto max-w-xs w-full">
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs">🔍</span>
            <input
              className="w-full pl-7 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-gray-300"
              placeholder="Rechercher titre, artiste, ISRC..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <button className="rf-btn-green text-xs">+ Enregistrer</button>
        </div>

        {/* Table header */}
        <div className="grid grid-cols-[2fr_1.2fr_.9fr_.8fr_.9fr_.5fr] gap-3 px-3 text-[9px] font-medium uppercase tracking-wider text-gray-400">
          <span>Oeuvre</span><span>Droits couverts</span><span>ISRC</span><span>Territoire</span><span>Revenus YTD</span><span>Statut</span>
        </div>

        {/* Rows */}
        <div className="space-y-1.5">
          {filtered.map(work => (
            <div key={work.id} onClick={() => setSelected(work)}
              className={clsx('grid grid-cols-[2fr_1.2fr_.9fr_.8fr_.9fr_.5fr] gap-3 bg-white border rounded-xl px-3 py-2.5 items-center cursor-pointer transition-colors hover:border-gray-200', selected.id === work.id ? 'border-[var(--rf-green)] border' : 'border-gray-100')}>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-md flex items-center justify-center text-sm flex-shrink-0" style={{ background: work.bg }}>{work.emoji}</div>
                <div>
                  <div className="text-xs font-medium">{work.title}</div>
                  <div className="text-[10px] text-gray-400">{work.artist}</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-1">
                {work.tags.map(t => (
                  <span key={t} className={clsx('text-[8px] px-1 py-0.5 rounded border border-gray-200 text-gray-500', tagColors[t])} style={{ fontFamily: 'var(--font-dm-mono), monospace' }}>{t}</span>
                ))}
              </div>
              <div className="text-[10px] text-gray-400" style={{ fontFamily: 'var(--font-dm-mono), monospace' }}>{work.isrc}</div>
              <div className="text-[10px] text-gray-400" style={{ fontFamily: 'var(--font-dm-mono), monospace' }}>{work.territories}</div>
              <div className="text-[11px] font-medium text-[var(--rf-green)]" style={{ fontFamily: 'var(--font-dm-mono), monospace' }}>{work.ytd !== '—' ? `${work.ytd} MAD` : '—'}</div>
              <div>
                <span className={work.status === 'active' ? 'pill-active' : work.status === 'partial' ? 'pill-partial' : 'pill-pending'}>
                  {work.status === 'active' ? 'Actif' : work.status === 'partial' ? 'Partiel' : 'En attente'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Detail panel */}
        {selected && (
          <div className="rf-card">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-sm font-bold">{selected.title}</div>
                <div className="text-xs text-gray-400 mt-0.5">{selected.artist} · ISRC : {selected.isrc}</div>
              </div>
              <span className="pill-active">Actif</span>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {[['Streams ce mois', selected.streams, 'var(--rf-green)'], ['Passages radio', selected.radio, 'var(--rf-orange)'], ['Revenus YTD', selected.ytd !== '—' ? `${selected.ytd} MAD` : '—', 'inherit']].map(([label, val, color]) => (
                <div key={label as string} className="bg-gray-50 rounded-lg p-2.5">
                  <div className="text-[9px] text-gray-400 uppercase tracking-wider mb-1">{label as string}</div>
                  <div className="text-base font-bold" style={{ fontFamily: 'var(--font-dm-mono), monospace', color: color as string }}>{val as string}</div>
                </div>
              ))}
            </div>
            <div className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-2">Répartition smart contract</div>
            <div className="space-y-2">
              {selected.splits.map(([name, pct, color]) => (
                <div key={name as string} className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 w-32 flex-shrink-0">{name as string}</span>
                  <div className="flex-1 h-1 bg-gray-100 rounded-full">
                    <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color as string }} />
                  </div>
                  <span className="text-xs font-medium w-8 text-right" style={{ fontFamily: 'var(--font-dm-mono), monospace' }}>{pct}%</span>
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-2 text-[10px] bg-gray-50 border border-gray-100 rounded-lg px-3 py-2" style={{ fontFamily: 'var(--font-dm-mono), monospace' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--rf-purple)] flex-shrink-0" />
              <span className="text-gray-500">Blockchain · {selected.hash} · Vérifié {selected.verif}</span>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  )
}
