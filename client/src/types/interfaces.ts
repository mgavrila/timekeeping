import { UserRoles } from '../constants/enums'

export interface UserInterface {
  createdAt: string | null
  email: string | null
  id: string | null
  name: string | null
  role: UserRoles
  updatedAt: string | null
}

export interface AddProjectFieldsInterface {
  projectName: string
  members: Array<string | never>
}
