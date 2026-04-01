'use client'
import { useState } from 'react'
import AppShell from '@/components/layout/AppShell'
import clsx from 'clsx'

const WORKS = [
  { id: 'ila', title: 'Ila Meta', artist: 'Saad Lamjarred', tags: ['DA','DV','Stream','Radio','Public'], isrc: 'MA-Z03-24-00142', territories: 'MA·DZ·TN', ytd: '12 840', status: 'active', streams: '124 800', radio: '38', hash: '0x3f8a…d92c', verif: '14 mars 2025', splits: [['Auteur-compositeur',45,'var(--rf-green)'],['Label (UMG Morocco)',35,'var(--rf-blue)'],['Éditeur',15,'var(--rf-amber)'],['RightFlow (frais)',5,'#333']] },
  { id: 'weld', title: 'Weld El Ghaba', artist: 'Dj Van', tags: ['DV','Stream','Radio'], isrc: 'MA-Z03-23-00891', territories: 'MA·DZ', ytd: '8 320', status: 'active', streams: '98 400', radio: '21', hash: '0x7c1e…a340', verif: '2 jan. 2025', splits: [['Auteur-compositeur',50,'var(--rf-green)'],['Label',35,'var(--rf-blue)'],['Co-auteur',10,'var(--rf-amber)'],['RightFlow (frais)',5,'#333']] },
  { id: 'zina', title: 'Zina', artist: 'Maher Zain', tags: ['DA','DV','Stream','Radio','Public','Synchro'], isrc: 'MA-Z03-20-00091', territories: 'MA·DZ·TN', ytd: '18 100', status: 'active', streams: '312 000', radio: '67', hash: '0x6e9a…1f52', verif: '3 mars 2025', splits: [['Auteur-compositeur',40,'var(--rf-green)'],['Producteur',20,'var(--rf-purple)'],['Label',30,'var(--rf-blue)'],['RightFlow (frais)',5,'#333']] },
  { id: 'ghalt', title: 'Ghaltana', artist: 'RedOne ft. Faydee', tags: ['DA','Public','Synchro'], isrc: 'MA-Z03-22-00447', territories: 'MA·TN', ytd: '5 960', status: 'partial', streams: '—', radio: '—', hash: '0x9b2d…f018', verif: '18 fév. 2025', splits: [['Auteur (RedOne)',40,'var(--rf-green)'],['Auteur (Faydee)',25,'var(--rf-blue)'],['Label',30,'var(--rf-amber)'],['RightFlow (frais)',5,'#333']] },
  { id: 'bghit', title: 'Bghit Nebki', artist: 'Douzi', tags: ['DA','DV','Radio','Synchro'], isrc: 'MA-Z03-21-00220', territories: 'MA', ytd: '4 480', status: 'active', streams: '41 200', radio: '14', hash: '0x2a5c…8b74', verif: '7 nov. 2024', splits: [['Auteur-compositeur',55,'var(--rf-green)'],['Label',40,'var(--rf-blue)'],['RightFlow (frais)',5,'#333']] },
]

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
      <div className="p-4 md:p-5 space-y-3">
        {/* Header */}
        <div className="flex items-center gap-3">
          <h1 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>Catalogue</h1>
          <span className="badge-dark">47 oeuvres</span>
          <div className="relative ml-auto max-w-xs w-full">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs" style={{ color: 'var(--text-muted)' }}>🔍</span>
            <input
              style={{ width: '100%', paddingLeft: 28, paddingRight: 12, paddingTop: 7, paddingBottom: 7, fontSize: 12, background: 'var(--input-bg)', border: '1px solid var(--input-border)', borderRadius: 10, outline: 'none', color: 'var(--text-primary)', fontFamily: 'var(--font-syne), sans-serif' }}
              placeholder="Titre, artiste, ISRC..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <button className="rf-btn-green" style={{ fontSize: 12, padding: '7px 14px', whiteSpace: 'nowrap' }}>+ Enregistrer</button>
        </div>

        {/* Table header */}
        <div className="hidden md:grid grid-cols-[2fr_1.2fr_.9fr_.8fr_.9fr_.5fr] gap-3 px-3"
          style={{ fontSize: 9, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)' }}>
          <span>Oeuvre</span><span>Droits couverts</span><span>ISRC</span><span>Territoire</span><span>Revenus YTD</span><span>Statut</span>
        </div>

        {/* Rows */}
        <div className="space-y-1.5">
          {filtered.map(work => (
            <div key={work.id} onClick={() => setSelected(work)}
              className="md:grid md:grid-cols-[2fr_1.2fr_.9fr_.8fr_.9fr_.5fr] flex flex-col gap-2 md:gap-3 px-3 py-3 rounded-xl items-center cursor-pointer transition-all"
              style={{
                background: selected.id === work.id ? 'rgba(29,185,116,0.05)' : 'var(--card-bg)',
                border: `1px solid ${selected.id === work.id ? 'rgba(29,185,116,0.25)' : 'var(--card-border)'}`,
              }}>
              <div className="flex items-center gap-2.5 w-full md:w-auto">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
                  style={{ background: 'var(--input-bg)', border: '1px solid var(--card-border)' }}>🎵</div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>{work.title}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{work.artist}</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-1">
                {work.tags.map(t => (
                  <span key={t} className={t === 'DA' ? 'tag-da' : t === 'DV' ? 'tag-dv' : 'badge-dark'}>{t}</span>
                ))}
              </div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-dm-mono), monospace' }}>{work.isrc}</div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-dm-mono), monospace' }}>{work.territories}</div>
              <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--rf-green)', fontFamily: 'var(--font-dm-mono), monospace' }}>{work.ytd !== '—' ? `${work.ytd} MAD` : '—'}</div>
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
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{selected.title}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 3 }}>{selected.artist} · ISRC : {selected.isrc}</div>
              </div>
              <span className="pill-active">Actif</span>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {[['Streams ce mois', selected.streams, 'var(--rf-green)'], ['Passages radio', selected.radio, 'var(--rf-orange)'], ['Revenus YTD', selected.ytd !== '—' ? `${selected.ytd} MAD` : '—', 'var(--text-primary)']].map(([label, val, color]) => (
                <div key={label as string} style={{ padding: '10px 12px', borderRadius: 10, background: 'var(--input-bg)', border: '1px solid var(--card-border)' }}>
                  <div style={{ fontSize: 9, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{label as string}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, fontFamily: 'var(--font-dm-mono), monospace', color: color as string }}>{val as string}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 9, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: 10 }}>Répartition smart contract</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {selected.splits.map(([name, pct, color]) => (
                <div key={name as string} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 11, color: 'var(--text-secondary)', width: 140, flexShrink: 0 }}>{name as string}</span>
                  <div style={{ flex: 1, height: 4, borderRadius: 99, background: 'var(--bar-bg)' }}>
                    <div style={{ height: '100%', borderRadius: 99, width: `${pct}%`, background: color as string }} />
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 600, width: 28, textAlign: 'right', fontFamily: 'var(--font-dm-mono), monospace', color: 'var(--text-primary)' }}>{pct}%</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 8, fontSize: 10, background: 'var(--input-bg)', border: '1px solid var(--card-border)', borderRadius: 10, padding: '8px 12px', fontFamily: 'var(--font-dm-mono), monospace' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--rf-purple)', flexShrink: 0, display: 'inline-block' }} />
              <span style={{ color: 'var(--text-muted)' }}>Blockchain · {selected.hash} · Vérifié {selected.verif}</span>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  )
}
