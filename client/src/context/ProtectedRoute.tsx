import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth()

  if (!user) {
    // user is not authenticated
    return <Navigate to="login" />
  }

  return <>{children}</>
}
