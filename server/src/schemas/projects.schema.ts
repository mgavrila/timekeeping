import { object, string, TypeOf } from 'zod'

export const createProjectSchema = object({
  name: string({ required_error: 'Project name is required' }),
})

export type CreateProjectInput = TypeOf<typeof createProjectSchema>
