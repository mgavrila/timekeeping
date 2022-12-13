import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Spin } from 'antd'

import NewProject from './cards/NewProject'
import Project from './cards/Project'
import { useAppSelector, useAppDispatch } from '../../hooks/useRedux'
import { setProjects, getProjects } from '../../store/projects/projectsSlice'
import { getUser } from '../../store/auth/authSlice'
import { USER_ACTIONS } from '../../constants/constants'
import MainContainer from '../../styled-components/MainContainer'
import Content from '../../styled-components/Content'

import { trpc } from '../../trpc'

const StyledProjectsContainer = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`

const Projects: React.FC = () => {
  const dispatch = useAppDispatch()
  const allProjectsQuery = trpc.getAllProjects.useQuery()

  const user = useAppSelector(getUser)
  const projects = useAppSelector(getProjects)

  const hasAddAccess = USER_ACTIONS.projects.add.includes(user.role)

  useEffect(() => {
    if (allProjectsQuery.data) {
      dispatch(setProjects(allProjectsQuery.data.projects))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allProjectsQuery])

  if (allProjectsQuery.isLoading) {
    return (
      <MainContainer>
        <Spin size="large" />
      </MainContainer>
    )
  }

  return (
    <Content>
      <StyledProjectsContainer>
        {hasAddAccess && (
          <NewProject refetchProjects={allProjectsQuery.refetch} />
        )}

        {projects?.map((project) => (
          <Project
            key={project.id}
            id={project.id}
            name={project.name}
            refetchProjects={allProjectsQuery.refetch}
          />
        ))}
      </StyledProjectsContainer>
    </Content>
  )
}

export default Projects
