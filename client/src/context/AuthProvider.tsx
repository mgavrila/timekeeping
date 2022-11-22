import React, { useState, createContext, useContext, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext({ user: false })

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState(false)
  const navigate = useNavigate()

  // call this function when you want to authenticate the user
  const login = async (data: any) => {
    setUser(data)
    navigate('/profile')
  }

  // call this function to sign out logged in user
  const logout = () => {
    setUser(false)
    navigate('/', { replace: true })
  }

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  )
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
