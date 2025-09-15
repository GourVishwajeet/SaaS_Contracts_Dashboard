import React from 'react'

interface PaginationProps {
  page: number
  setPage: (p: number) => void
  pages: number
}

export default function Pagination({ page, setPage, pages }: PaginationProps) {
  function goto(p: number) {
    if (p < 1) p = 1
    if (p > pages) p = pages
    setPage(p)
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => goto(page - 1)}
        disabled={page === 1}
        className="px-2 py-1 border rounded disabled:opacity-50"
      >
        Prev
      </button>
      <div className="px-3 py-1 border rounded">{page} / {pages}</div>
      <button
        onClick={() => goto(page + 1)}
        disabled={page === pages}
        className="px-2 py-1 border rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  )
}
