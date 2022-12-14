import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Input, Select } from 'antd'

import AsyncModal from '../../../core/dialogs/AsyncModal'
import { trpc } from '../../../trpc'
import {
  UserInterface,
  NewTeamFieldsInterface,
} from '../../../types/interfaces'

type AddNewTeamType = {
  projectId: string
  fields: NewTeamFieldsInterface
  isLoading: boolean
  isVisible: boolean
  setFields: React.Dispatch<React.SetStateAction<NewTeamFieldsInterface>>
  setIsVisible: (newState: boolean) => void
  onAddProject: () => void
}

const StyledContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 32px 0px;
  gap: 12px;
`

const AddNewTeam: React.FC<AddNewTeamType> = ({
  projectId,
  fields,
  isLoading,
  isVisible,
  setFields,
  setIsVisible,
  onAddProject,
}) => {
  const [projectMembers, setProjectMembers] = useState([])
  const allUsersQuery = trpc.getAllProjectUsers.useQuery({ projectId })

  useEffect(() => {
    if (allUsersQuery.isSuccess && allUsersQuery.data) {
      const usersOptions = allUsersQuery.data.projectMembers.map(
        (user: UserInterface) => ({
          label: user.name,
          value: user.id,
        })
      )
      setProjectMembers(usersOptions)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allUsersQuery.isSuccess])

  const onSelectMembers = (value: string[]) => {
    setFields((prevState) => ({ ...prevState, members: value }))
  }

  const onChangeProjectName = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setFields((prevState) => ({
      ...prevState,
      [evt.target.name]: evt.target.value,
    }))
  }

  const onCancelDialog = () => {
    setIsVisible(false)
    setFields({ teamName: '', members: [] })
  }

  return (
    <AsyncModal
      title="Add new team"
      okText="Add"
      isLoading={isLoading}
      isVisible={isVisible}
      onCancel={onCancelDialog}
      onOk={onAddProject}
    >
      <StyledContentContainer>
        <Input
          placeholder="Write text here"
          addonBefore="Team  Name"
          name="teamName"
          onChange={onChangeProjectName}
          value={fields.teamName}
        />

        <Select
          mode="multiple"
          allowClear
          style={{ width: '100%' }}
          placeholder="Please select one or more members"
          onChange={onSelectMembers}
          options={projectMembers}
          filterOption={(input, option: any) =>
            (option?.label.toLowerCase() ?? '').includes(input.toLowerCase())
          }
          value={fields.members}
        />
      </StyledContentContainer>
    </AsyncModal>
  )
}

export default AddNewTeam
