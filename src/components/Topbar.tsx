import React from 'react'
import { useAuth } from '../context/AuthContext'

export default function Topbar({ onUpload }: { onUpload?: () => void }) {
  const auth = useAuth()
  const user = auth?.user
  const logout = auth?.logout
  return (
    <header className="flex items-center justify-between bg-white p-4 border-b">
      <div className="flex items-center gap-4">
        <button className="md:hidden">☰</button>
        <div className="text-lg font-semibold">Dashboard</div>
      </div>
      <div className="flex items-center gap-4">
        {onUpload && (
          <button onClick={onUpload} className="py-1 px-3 bg-sky-600 text-white rounded">Upload</button>
        )}
        <div className="flex items-center gap-2">
          <div className="text-sm">{user?.username}</div>
          <button onClick={logout} className="text-sm text-red-600">Sign out</button>
        </div>
      </div>
    </header>
  )
}
