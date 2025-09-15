import React from 'react'

interface Clause {
  title: string
  summary: string
  confidence: number
}

export default function ClauseCard({ clause }: { clause: Clause }) {
  const pct = Math.round(clause.confidence * 100)
  return (
    <div className="p-4 border rounded bg-white">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{clause.title}</h3>
        <div className="text-sm text-slate-600">{pct}%</div>
      </div>
      <p className="text-sm text-slate-700 mt-2">{clause.summary}</p>
    </div>
  )
}
