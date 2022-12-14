import { object, string, TypeOf, array } from 'zod'

export const createTeamSchema = object({
  projectId: string({ required_error: 'Project id is required' }),
  name: string({ required_error: 'Team name is required' }),
  members: array(string()),
})

export const getProjectTeamsSchema = object({
  projectId: string({ required_error: 'Project id is required' }),
})

export type GetProjectTeamsInput = TypeOf<typeof getProjectTeamsSchema>
export type CreateTeamInput = TypeOf<typeof createTeamSchema>
