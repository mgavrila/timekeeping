import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Input, Select } from 'antd'

import AsyncModal from '../../../core/dialogs/AsyncModal'
import { trpc } from '../../../trpc'
import {
  UserInterface,
  AddProjectFieldsInterface,
} from '../../../types/interfaces'

type AddNewProjectType = {
  fields: AddProjectFieldsInterface
  isLoading: boolean
  isVisible: boolean
  setFields: React.Dispatch<React.SetStateAction<AddProjectFieldsInterface>>
  setIsVisible: (newState: boolean) => void
  onAddProject: () => void
}

const StyledContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 32px 0px;
  gap: 12px;
`

const AddNewProject: React.FC<AddNewProjectType> = ({
  fields,
  isLoading,
  isVisible,
  setFields,
  setIsVisible,
  onAddProject,
}) => {
  const [users, setUsers] = useState([])
  const allUsersQuery = trpc.getAllUsers.useQuery()

  useEffect(() => {
    if (allUsersQuery.isSuccess && allUsersQuery.data) {
      const usersOptions = allUsersQuery.data.users.map(
        (user: UserInterface) => ({
          label: user.name,
          value: user.id,
        })
      )
      setUsers(usersOptions)
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
    setFields({ projectName: '', members: [] })
  }

  return (
    <AsyncModal
      title="Add new project"
      isLoading={isLoading}
      isVisible={isVisible}
      onCancel={onCancelDialog}
      onOk={onAddProject}
    >
      <StyledContentContainer>
        <Input
          placeholder="Write text here"
          addonBefore="Project Name"
          name="projectName"
          onChange={onChangeProjectName}
          value={fields.projectName}
        />

        <Select
          mode="multiple"
          allowClear
          style={{ width: '100%' }}
          placeholder="Please select one or more members"
          onChange={onSelectMembers}
          options={users}
          filterOption={(input, option: any) =>
            (option?.label.toLowerCase() ?? '').includes(input.toLowerCase())
          }
          value={fields.members}
        />
      </StyledContentContainer>
    </AsyncModal>
  )
}

export default AddNewProject
