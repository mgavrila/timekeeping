import { TRPCError } from '@trpc/server'
import { CreateTeamInput, GetProjectTeamsInput } from '../schemas/team.schema'
import { findTeam, addTeam, findAllTeams } from '../services/teams.service'
import { findProjectById } from '../services/projects.service'
import { findUsersByIds } from '../services/user.service'
import { sanitize } from '../utils/converter'

export const createTeam = async ({ input }: { input: CreateTeamInput }) => {
  try {
    const project = await findProjectById(input.projectId, false)

    if (!project) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'The project does not exist !',
      })
    }

    const existingTeam = await findTeam({ name: input.name, project })

    if (existingTeam) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'The team already exist !',
      })
    }

    const users = await findUsersByIds(input.members)
    const team = await addTeam({ name: input.name, members: users, project })

    return {
      status: 'success',
      team: sanitize(team),
    }
  } catch (err: any) {
    throw err
  }
}

export const getAllTeams = async ({
  input,
}: {
  input: GetProjectTeamsInput
}) => {
  try {
    const teams = await findAllTeams(input.projectId)

    return {
      status: 'success',
      teams: sanitize(teams),
    }
  } catch (err: any) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: err.message,
    })
  }
}
