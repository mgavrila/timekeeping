import React, { Suspense } from 'react'
import { Layout } from 'antd'
import Login from '../../sections/auth/Login'
import Register from '../../sections/auth/Register'
import { Routes, Route } from 'react-router-dom'
import Dashboard from '../../sections/dashboard'
import TimeSheet from '../../sections/timesheet'
import Projects from '../../sections/projects'
import { ProtectedRoute } from '../../utils/ProtectedRoute'
import styled from 'styled-components'

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
  { path: 'timesheet', component: TimeSheet, auth: true },
  { path: 'projects', component: Projects, auth: true },
]

const StyledContent = styled(Content)`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 20px;
`

const AppContent: React.FC = () => {
  return (
    <StyledContent>
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
    </StyledContent>
  )
}

export default AppContent
