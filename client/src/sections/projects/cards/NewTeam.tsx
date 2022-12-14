import React, { useEffect, useState } from 'react'
import { Button, Card } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { toast } from 'react-toastify'
import styled from 'styled-components'

import { trpc } from '../../../trpc'
import { ToastTypes } from '../../../constants/enums'
import { NewTeamFieldsInterface } from '../../../types/interfaces'
import AddNewTeam from '../dialogs/AddNewTeam'

const StyledAddProjectBtn = styled(Button)`
  width: 100%;
  height: 100%;
`

const StyledAddProjectCard = styled(Card)`
  width: 350px;
  height: 200px;
`

const NewTeam: React.FC<{ refetchTeams: () => void; projectId: string }> = ({
  projectId,
  refetchTeams,
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [fields, setFields] = useState<NewTeamFieldsInterface>({
    teamName: '',
    members: [],
  })
  const createTeamMutation = trpc.createTeam.useMutation()

  useEffect(() => {
    if (createTeamMutation.error) {
      toast(createTeamMutation.error.message, { type: ToastTypes.ERROR })
      createTeamMutation.reset()
      return
    }

    if (createTeamMutation.data) {
      refetchTeams()
      createTeamMutation.reset()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createTeamMutation])

  const onAddProject = () => {
    if (fields.teamName.trim() !== '' && fields.members.length > 0) {
      setIsVisible(false)
      setFields({
        teamName: '',
        members: [],
      })
      createTeamMutation.mutate({
        name: fields.teamName,
        members: fields.members,
        projectId,
      })
    }
  }

  return (
    <StyledAddProjectCard title={null} bodyStyle={{ height: '100%' }}>
      <StyledAddProjectBtn onClick={() => setIsVisible(true)}>
        <PlusOutlined />
      </StyledAddProjectBtn>

      {isVisible && (
        <AddNewTeam
          projectId={projectId}
          setIsVisible={setIsVisible}
          isVisible={isVisible}
          fields={fields}
          setFields={setFields}
          onAddProject={onAddProject}
          isLoading={createTeamMutation.isLoading}
        />
      )}
    </StyledAddProjectCard>
  )
}

export default NewTeam
