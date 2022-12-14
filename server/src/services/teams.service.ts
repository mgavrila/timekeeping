import { FilterQuery, QueryOptions } from 'mongoose'
import teamsModel, { Teams } from '../models/teams.model'
import { findProjectById } from './projects.service'

// Create team service
export const addTeam = (input: Teams) => {
  return teamsModel.create(input)
}

// Find one team by any fields
export const findTeam = async (
  query: FilterQuery<Teams>,
  options: QueryOptions = {}
) => {
  return teamsModel.findOne(query, {}, options)
}

// Find all teams based on a project id
export const findAllTeams = async (projectId: string) => {
  const project = await findProjectById(projectId, false)

  return teamsModel.find({ project }).lean()
}
