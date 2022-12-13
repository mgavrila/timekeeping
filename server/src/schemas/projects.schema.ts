import { object, string, TypeOf, array } from 'zod'

export const createProjectSchema = object({
  name: string({ required_error: 'Project name is required' }),
  members: array(string()),
})

export const deleteProjectSchema = object({
  projectId: string({ required_error: 'Project id is required' }),
})

export const getProjectSchema = object({
  projectId: string({ required_error: 'Project id is required' }),
})

export type GetProjectInput = TypeOf<typeof getProjectSchema>
export type DeleteProjectInput = TypeOf<typeof deleteProjectSchema>
export type CreateProjectInput = TypeOf<typeof createProjectSchema>
