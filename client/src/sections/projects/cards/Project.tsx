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
  refetchProjects: () => void
}

const Project: React.FC<ProjectType> = ({ id, name, refetchProjects }) => {
  const navigate = useNavigate()
  const deleteProjectMutation = trpc.deleteProject.useMutation()

  const user = useAppSelector(getUser)

  useEffect(() => {
    if (deleteProjectMutation?.status === 'success') {
      deleteProjectMutation.reset()
      refetchProjects()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteProjectMutation])

  const handleClick = (actionType: CrudOperations) => {
    if (actionType === CrudOperations.DELETE) {
      confirm({
        onOk: () => {
          deleteProjectMutation.mutate({ projectId: id })
        },
      })
      return
    }

    navigate(`/projects/${id}`)
  }

  return (
    <StyledProjectCard title={null} bodyStyle={{ height: '100%' }}>
      <StyledProjectContentContainer>
        <StyledText>{name}</StyledText>

        <StyledActionButtonsContainer>
          {ACTION_BUTTON.map(({ type, Icon }) => {
            const hasAccess = USER_ACTIONS.projects[type].includes(user.role)

            if (hasAccess)
              return (
                <StyledEditButton key={type} onClick={() => handleClick(type)}>
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
