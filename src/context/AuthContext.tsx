import React, { createContext, useContext, useEffect, useState } from 'react'

interface User {
  username: string
  token: string
}

interface AuthContextType {
  user: User | null
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
  open?: boolean
  setOpen?: (v: boolean) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true)

  // to get form localStorage if already logged in
  useEffect(() => {
    const stored = localStorage.getItem('authUser')
    if (stored) {
      setUser(JSON.parse(stored))
    }
  }, [])

  async function login(username: string, password: string) {
    // mock auth
    if (password !== 'test123') return false
    const fakeToken = 'mock-jwt-token'
    const loggedUser = { username, token: fakeToken }
    setUser(loggedUser)
    localStorage.setItem('authUser', JSON.stringify(loggedUser))
    return true
  }

  function logout() {
    setUser(null)
    localStorage.removeItem('authUser')
  }


useEffect(() => {
  const stored = localStorage.getItem('authUser')
  if (stored) setUser(JSON.parse(stored))
  setLoading(false)
}, [])

  return (
   <AuthContext.Provider value={{ user, login, logout, open, setOpen }}>
    {!loading && children}
  </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
