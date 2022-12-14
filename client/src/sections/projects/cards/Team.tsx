import React, { useEffect } from 'react'
import { Card, Button, Typography } from 'antd'
import styled from 'styled-components'
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

import { useAppSelector } from '../../../hooks/useRedux'
import { getUser } from '../../../store/auth/authSlice'
import { USER_ACTIONS } from '../../../constants/constants'
import { CrudOperations } from '../../../constants/enums'
import { trpc } from '../../../trpc'
import { confirm } from '../../../core/dialogs/ConfirmModal'

const StyledTeamCard = styled(Card)`
  width: 350px;
  height: 200px;
`

const StyledTeamContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
`

const StyledActionButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  position: relative;
  position: absolute;
  bottom: 0;
  gap: 6px;
`

const StyledEditButton = styled(Button)`
  width: 100%;
`

const StyledText = styled(Typography)`
  position: absolute;
  text-align: center;
  top: 25%;
  width: 100%;
`

const ACTION_BUTTON = [
  {
    type: CrudOperations.READ,
    Icon: EyeOutlined,
  },
  {
    type: CrudOperations.DELETE,
    Icon: DeleteOutlined,
  },
]

type TeamType = {
  id: string
  name: string
  refetchTeams: () => void
}

const Team: React.FC<TeamType> = ({ id, name, refetchTeams }) => {
  const navigate = useNavigate()

  const user = useAppSelector(getUser)

  return (
    <StyledTeamCard title={null} bodyStyle={{ height: '100%' }}>
      <StyledTeamContentContainer>
        <StyledText>{name}</StyledText>

        <StyledActionButtonsContainer>
          {ACTION_BUTTON.map(({ type, Icon }) => {
            const hasAccess = USER_ACTIONS.projects[type].includes(user.role)

            if (hasAccess)
              return (
                <StyledEditButton key={type}>
                  <Icon />
                </StyledEditButton>
              )

            return null
          })}
        </StyledActionButtonsContainer>
      </StyledTeamContentContainer>
    </StyledTeamCard>
  )
}

export default Team
