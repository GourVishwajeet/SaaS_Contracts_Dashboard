import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Sidebar() {
  return (
    <aside className="w-60 bg-white border-r hidden md:block">
      <div className="p-4 border-b">
        <h3 className="font-bold">Contracts App</h3>
      </div>
      <nav className="p-4 space-y-2">
        <NavLink to="/" className={({isActive}) => `block p-2 rounded ${isActive ? 'bg-sky-50' : 'hover:bg-gray-50'}`} end>Contracts</NavLink>
        <NavLink to="/insights" className={({isActive}) => `block p-2 rounded ${isActive ? 'bg-sky-50' : 'hover:bg-gray-50'}`} end>Insights</NavLink>
        <NavLink to="/reports" className={({isActive}) => `block p-2 rounded ${isActive ? 'bg-sky-50' : 'hover:bg-gray-50'}`} end>Reports</NavLink>
        <NavLink to="/settings" className={({isActive}) => `block p-2 rounded ${isActive ? 'bg-sky-50' : 'hover:bg-gray-50'}`} end>Settings</NavLink>

      </nav>
    </aside>
  )
}
