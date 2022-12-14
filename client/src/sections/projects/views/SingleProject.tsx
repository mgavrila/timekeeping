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
import Teams from './Teams'

type ProjectType = {
  name: string
  id: string
  createdAt: string
  updatedAt: string
  members: UserInterface[]
}

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

const ViewProject: React.FC = () => {
  const params = useParams()
  const navigate = useNavigate()
  const theme = useTheme() as ThemeConfig
  const [projectData, setProjectData] = useState<Partial<ProjectType>>({})

  const getProjectQuery = trpc.getProject.useQuery({
    projectId: params.id ?? '',
  })

  useEffect(() => {
    if (getProjectQuery.isSuccess && getProjectQuery.data) {
      setProjectData(getProjectQuery.data.project)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getProjectQuery.isSuccess])

  if (!params.id) {
    return <Navigate to="/projects" replace={true} />
  }

  if (getProjectQuery.isLoading) {
    return (
      <MainContainer>
        <Spin size="large" />
      </MainContainer>
    )
  }

  const { name } = projectData

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

        <Teams projectId={params.id} />
      </StyledContainer>
    </Content>
  )
}

export default ViewProject
