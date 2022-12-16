import React, { useEffect, useState } from 'react'
import styled, { useTheme } from 'styled-components'
import { Typography, Spin } from 'antd'
import NewTeam from '../cards/NewTeam'

import { ThemeConfig } from '../../../configs/theme'
import { trpc } from '../../../trpc'
import MainContainer from '../../../styled-components/MainContainer'
import Team from '../cards/Team'
import { USER_ACTIONS } from '../../../constants/constants'
import { useAppSelector } from '../../../hooks/useRedux'
import { getUser } from '../../../store/auth/authSlice'

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex-wrap: wrap;
  margin-top: 60px;
`

const StyledTeamsContainer = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`

type TeamType = {
  createdAt: string
  id: string
  name: string
  members: string[]
  project: string
  updatedAt: string
}

const Teams: React.FC<{ projectId: string }> = ({ projectId }) => {
  const user = useAppSelector(getUser)
  const theme = useTheme() as ThemeConfig
  const teamsQuery = trpc.getAllTeams.useQuery({
    projectId,
  })
  const [teams, setTeams] = useState<TeamType[]>([])

  useEffect(() => {
    if (teamsQuery.isSuccess && teamsQuery.data) {
      setTeams(teamsQuery.data.teams)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamsQuery])

  if (teamsQuery.isLoading) {
    return (
      <MainContainer>
        <Spin size="large" />
      </MainContainer>
    )
  }

  const hasAddAccess = USER_ACTIONS.teams.add.includes(user.role)

  return (
    <StyledContainer>
      <Typography.Title
        style={{
          color: theme.dark.text,
          marginBottom: '6px',
        }}
        level={3}
      >
        Teams
      </Typography.Title>

      <StyledTeamsContainer>
        {hasAddAccess && (
          <NewTeam refetchTeams={teamsQuery.refetch} projectId={projectId} />
        )}

        {teams?.map((team) => (
          <Team
            key={team.id}
            id={team.id}
            name={team.name}
            refetchTeams={teamsQuery.refetch}
            projectId={projectId}
          />
        ))}
      </StyledTeamsContainer>
    </StyledContainer>
  )
}

export default Teams
