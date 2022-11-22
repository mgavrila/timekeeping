import React, { Suspense } from 'react'
import { Layout } from 'antd'
import Login from '../../sections/auth/Login'
import Register from '../../sections/auth/Register'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Dashboard from '../../sections/dashboard'
import { ProtectedRoute } from '../../context/ProtectedRoute'
import { AuthProvider } from '../../context/AuthProvider'

const { Content } = Layout

const ROUTES = [
  {
    path: 'login',
    component: Login,
    auth: false,
  },
  {
    path: 'register',
    component: Register,
    auth: false,
  },
  { path: '/', component: Dashboard, auth: true },
]

const AppContent: React.FC = () => {
  return (
    <Content
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Suspense fallback={null}>
        <Routes>
          {ROUTES.map((route) => {
            const { component: RouteComponent, path, auth } = route

            return (
              <Route
                key={path}
                path={path}
                element={
                  auth ? (
                    <ProtectedRoute>
                      <RouteComponent />
                    </ProtectedRoute>
                  ) : (
                    <RouteComponent />
                  )
                }
              />
            )
          })}
        </Routes>
      </Suspense>
    </Content>
  )
}

export default AppContent
