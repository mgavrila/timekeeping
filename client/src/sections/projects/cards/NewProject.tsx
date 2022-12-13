import React, { useEffect, useState } from 'react'
import { Button, Card } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { toast } from 'react-toastify'
import styled from 'styled-components'

import { trpc } from '../../../trpc'
import { ToastTypes } from '../../../constants/enums'
import { AddProjectFieldsInterface } from '../../../types/interfaces'
import AddNewProject from '../dialogs/AddNewProject'

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
  const [isVisible, setIsVisible] = useState(false)
  const [fields, setFields] = useState<AddProjectFieldsInterface>({
    projectName: '',
    members: [],
  })
  const createProjectMutation = trpc.createProject.useMutation()

  useEffect(() => {
    if (createProjectMutation.error) {
      toast(createProjectMutation.error.message, { type: ToastTypes.ERROR })
      createProjectMutation.reset()
      return
    }

    if (createProjectMutation.data) {
      refetchProjects()
      createProjectMutation.reset()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createProjectMutation])

  const onAddProject = () => {
    if (fields.projectName.trim() !== '' && fields.members.length > 0) {
      setIsVisible(false)
      setFields({
        projectName: '',
        members: [],
      })
      createProjectMutation.mutate({
        name: fields.projectName,
        members: fields.members,
      })
    }
  }

  return (
    <StyledAddProjectCard title={null} bodyStyle={{ height: '100%' }}>
      <StyledAddProjectBtn onClick={() => setIsVisible(true)}>
        <PlusOutlined />
      </StyledAddProjectBtn>

      {isVisible && (
        <AddNewProject
          setIsVisible={setIsVisible}
          isVisible={isVisible}
          fields={fields}
          setFields={setFields}
          onAddProject={onAddProject}
          isLoading={createProjectMutation.isLoading}
        />
      )}
    </StyledAddProjectCard>
  )
}

export default NewProject
