'use client'

import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/me')
      .then(res => res.ok)
      .then(ok => setIsAuth(ok))
      .finally(() => setLoading(false))
  }, [])

  return (
    <AuthContext.Provider value={{ isAuth, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
