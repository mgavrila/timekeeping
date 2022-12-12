import React, { useEffect } from 'react'
import { Button, Card } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { toast } from 'react-toastify'
import styled from 'styled-components'

import { trpc } from '../../../trpc'
import { ToastTypes } from '../../../constants/enums'

const StyledAddProjectBtn = styled(Button)`
  width: 100%;
  height: 100%;
`

const StyledAddProjectCard = styled(Card)`
  width: 350px;
  height: 200px;
`

const NewProject: React.FC<{ refetchProjects: () => void }> = ({
  refetchProjects,
}) => {
  const createProjectMutation = trpc.createProject.useMutation()

  useEffect(() => {
    if (createProjectMutation.error) {
      toast(createProjectMutation.error.message, { type: ToastTypes.ERROR })
      return
    }

    if (createProjectMutation.data) {
      refetchProjects()
      createProjectMutation.reset()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createProjectMutation])

  const onAddProject = () => {
    createProjectMutation.mutate({ name: 'Mockup Project' })
  }

  return (
    <StyledAddProjectCard title={null} bodyStyle={{ height: '100%' }}>
      <StyledAddProjectBtn onClick={onAddProject}>
        <PlusOutlined />
      </StyledAddProjectBtn>
    </StyledAddProjectCard>
  )
}

export default NewProject
