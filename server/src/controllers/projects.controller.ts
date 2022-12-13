import { TRPCError } from '@trpc/server'
import {
  CreateProjectInput,
  DeleteProjectInput,
  GetProjectInput,
} from '../schemas/projects.schema'
import {
  findProject,
  addProject,
  findAllProjects,
  removeProject,
  findProjectById,
} from '../services/projects.service'
import { findUsersByIds } from '../services/user.service'
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

    const users = await findUsersByIds(input.members)

    const project = await addProject({ name: input.name, members: users })

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

export const deleteProject = async ({
  input,
}: {
  input: DeleteProjectInput
}) => {
  try {
    const removedProject = await removeProject(input.projectId)

    return {
      status: 'success',
      removedProject,
    }
  } catch (err: any) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: err.message,
    })
  }
}

export const getProject = async ({ input }: { input: GetProjectInput }) => {
  try {
    if (input?.projectId) {
      const project = await findProjectById(input.projectId)

      return {
        status: 'success',
        project: sanitize(project),
      }
    }
  } catch (err: any) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: err.message,
    })
  }
}
