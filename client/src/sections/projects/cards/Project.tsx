import React from 'react'
import { Card, Button, Typography } from 'antd'
import styled from 'styled-components'
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons'
import { useAppSelector } from '../../../hooks/useRedux'
import { getUser } from '../../../store/auth/authSlice'
import { USER_ACTIONS } from '../../../constants/constants'
import { CrudOperations } from '../../../constants/enums'

const StyledProjectCard = styled(Card)`
  width: 350px;
  height: 200px;
`

const StyledProjectContentContainer = styled.div`
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
    type: CrudOperations.UPDATE,
    Icon: EditOutlined,
  },
  {
    type: CrudOperations.READ,
    Icon: EyeOutlined,
  },
  {
    type: CrudOperations.DELETE,
    Icon: DeleteOutlined,
  },
]

type ProjectType = {
  id: string
  name: string
}

const Project: React.FC<ProjectType> = ({ id, name }) => {
  const user = useAppSelector(getUser)

  return (
    <StyledProjectCard title={null} bodyStyle={{ height: '100%' }}>
      <StyledProjectContentContainer>
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
      </StyledProjectContentContainer>
    </StyledProjectCard>
  )
}

export default Project
