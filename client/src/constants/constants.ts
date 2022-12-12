import { UserRoles, CrudOperations } from './enums'

export const USER_ACTIONS = {
  projects: {
    [CrudOperations.CREATE]: [UserRoles.ADMIN, UserRoles.PROJECT_OWNER],
    [CrudOperations.READ]: Object.values(UserRoles),
    [CrudOperations.UPDATE]: [UserRoles.ADMIN, UserRoles.ADMIN],
    [CrudOperations.DELETE]: [UserRoles.ADMIN, UserRoles.PROJECT_OWNER],
  },
}
