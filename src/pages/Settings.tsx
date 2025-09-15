import React from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'

export default function Settings() {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="p-6">
          <h1 className="text-2xl font-semibold mb-4">Settings</h1>
          <p className="text-slate-700">This is the Settings page.</p>
        </main>
      </div>
    </div>
  )
}
