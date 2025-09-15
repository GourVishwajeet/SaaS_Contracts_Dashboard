import React from 'react'
import { useAuth } from '../context/AuthContext'

export default function Topbar({ onUpload }: { onUpload?: () => void }) {
  const auth = useAuth()
  const user = auth?.user
  const logout = auth?.logout
  const setOpen = auth?.setOpen
  const open = auth?.open
  return (
<header className="flex w-full fixed items-center justify-between bg-white p-4 border-b z-20 lg:-ml-60">
      <div className="flex items-center gap-4">
      <button
        className="lg:hidden  items-center justify-center top-3 left-4 z-50 p-2 bg-white border rounded shadow"
        onClick={() => setOpen && setOpen(true)}
        aria-label="Open sidebar"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
        <div className="text-lg lg:ml-60 font-semibold">Dashboard</div>
      </div>
      <div className="flex  items-center gap-4">
        {onUpload && (
          <button onClick={onUpload} className="py-1 px-3 bg-sky-600 text-white rounded">Upload</button>
        )}
      <div className="flex items-center gap-2">
  <span className="inline-flex items-center gap-1">
    <span className="sr-only">Profile</span>
    <span className="bg-sky-100 text-sky-700 rounded-full w-8 h-8 flex items-center justify-center font-bold text-base">
      {user?.username?.[0]?.toUpperCase() || "U"}
    </span>
    <span className="text-sm">{user?.username}</span>
  </span>
  <button onClick={logout} className="text-sm text-red-600">Sign out</button>
</div>
      </div>
      
    </header>
  )
}
