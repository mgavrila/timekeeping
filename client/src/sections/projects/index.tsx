import React from 'react'
import NewProject from './cards/NewProject'
import styled from 'styled-components'
import Project from './cards/Project'

const StyledProjectsContainer = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`

const DUMMY_PROJECTS = [
  {
    id: '1',
    name: 'Test project 1',
  },
  {
    id: '2',
    name: 'Test project 2',
  },
  {
    id: '3',
    name: 'Test project 3',
  },
]

const Projects: React.FC = () => {
  return (
    <StyledProjectsContainer>
      <NewProject />

      {DUMMY_PROJECTS.map((project) => (
        <Project key={project.id} id={project.id} name={project.name} />
      ))}
    </StyledProjectsContainer>
  )
}

export default Projects
