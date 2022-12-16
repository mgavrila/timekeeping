import { ApplicationRoles, CrudOperations } from './enums'

export const USER_ACTIONS = {
  projects: {
    [CrudOperations.CREATE]: [ApplicationRoles.ADMIN],
    [CrudOperations.READ]: Object.values(ApplicationRoles),
    [CrudOperations.UPDATE]: [ApplicationRoles.ADMIN],
    [CrudOperations.DELETE]: [ApplicationRoles.ADMIN],
  },
}
