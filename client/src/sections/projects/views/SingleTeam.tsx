import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Navigate } from 'react-router-dom'
import { Spin, Typography, Button } from 'antd'
import styled, { useTheme } from 'styled-components'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'

import Content from '../../../styled-components/Content'
import { trpc } from '../../../trpc'
import MainContainer from '../../../styled-components/MainContainer'
import { UserInterface } from '../../../types/interfaces'
import { ThemeConfig } from '../../../configs/theme'

const StyledHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

type ProjectType = {
  name: string
  id: string
  createdAt: string
  updatedAt: string
  members: UserInterface[]
}

const SingleTeam: React.FC = () => {
  const params = useParams()
  const navigate = useNavigate()
  const theme = useTheme() as ThemeConfig
  const [teamData, setTeamData] = useState<Partial<ProjectType>>({})

  const getTeamQuery = trpc.getTeam.useQuery({
    projectId: params.projectId ?? '',
    teamId: params.teamId ?? '',
  })

  useEffect(() => {
    if (getTeamQuery.isSuccess && getTeamQuery.data) {
      setTeamData(getTeamQuery.data.team)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getTeamQuery.isSuccess])

  if (!params.teamId || !params.projectId) {
    return <Navigate to="/projects" replace={true} />
  }

  if (getTeamQuery.isLoading) {
    return (
      <MainContainer>
        <Spin size="large" />
      </MainContainer>
    )
  }

  const { name } = teamData
  return (
    <Content>
      <StyledContainer>
        <StyledHeaderContainer>
          <Typography.Title
            style={{
              color: theme.dark.text,
              textAlign: 'center',
              marginBottom: '6px',
            }}
            level={2}
          >
            {name}
          </Typography.Title>
          <Button
            style={{ color: theme.dark.text }}
            type="link"
            onClick={() => navigate(-1)}
          >
            <LeftOutlined />
            Go back
            <RightOutlined />
          </Button>
        </StyledHeaderContainer>
      </StyledContainer>
    </Content>
  )
}

export default SingleTeam
