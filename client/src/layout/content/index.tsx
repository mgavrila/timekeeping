import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

import Login from '../../sections/auth/Login'
import Register from '../../sections/auth/Register'
import Dashboard from '../../sections/dashboard'
import TimeSheet from '../../sections/timesheet'
import Projects from '../../sections/projects'
import ProtectedRoute from '../../utils/ProtectedRoute'
import Content from '../../styled-components/Content'
import SingleProject from '../../sections/projects/views/SingleProject'
import SingleTeam from '../../sections/projects/views/SingleTeam'

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
  { path: 'projects/:id', component: SingleProject, auth: true },
  {
    path: 'projects/:projectId/team/:teamId',
    component: SingleTeam,
    auth: true,
  },
]

const AppContent: React.FC = () => {
  return (
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
                  <Content>
                    <RouteComponent />
                  </Content>
                )
              }
            />
          )
        })}
      </Routes>
    </Suspense>
  )
}

export default AppContent
