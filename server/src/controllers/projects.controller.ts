import { TRPCError } from '@trpc/server'
import { CreateProjectInput } from '../schemas/projects.schema'
import {
  findProject,
  addProject,
  findAllProjects,
} from '../services/projects.service'
import { sanitize } from '../utils/converter'

export const createProject = async ({
  input,
}: {
  input: CreateProjectInput
}) => {
  try {
    const existingProject = await findProject({ name: input.name })

    if (existingProject) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'The project already exist !',
      })
    }

    const project = await addProject(input)

    return {
      status: 'success',
      project: sanitize(project),
    }
  } catch (err: any) {
    throw err
  }
}

export const getAllProjects = async () => {
  try {
    const projects = await findAllProjects()

    return {
      status: 'success',
      projects: sanitize(projects),
    }
  } catch (err: any) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: err.message,
    })
  }
}
