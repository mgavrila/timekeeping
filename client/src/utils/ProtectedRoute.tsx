import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'

import { useAppDispatch } from '../hooks/useRedux'
import { setUser } from '../store/auth/authSlice'
import { trpc } from '../trpc'
import { Spin } from 'antd'
import MainContainer from '../styled-components/MainContainer'
import Content from '../styled-components/Content'

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const userQuery = trpc.getMe.useQuery()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (userQuery.data) {
      dispatch(setUser(userQuery.data.user))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userQuery])

  if (userQuery.isLoading) {
    return (
      <Content>
        <MainContainer>
          <Spin size="large" />
        </MainContainer>
      </Content>
    )
  }

  if (!userQuery.data) {
    // user is not authenticated
    return <Navigate to="/login" replace={true} />
  }

  return <>{children}</>
}
