import { object, string, TypeOf, array } from 'zod'

export const createProjectSchema = object({
  name: string({ required_error: 'Project name is required' }),
  members: array(string()),
})

export type CreateProjectInput = TypeOf<typeof createProjectSchema>
