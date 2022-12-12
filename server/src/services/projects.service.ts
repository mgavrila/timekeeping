import { FilterQuery, QueryOptions } from 'mongoose'
import projectsModel, { Projects } from '../models/projects.model'

// CreateProject service
export const addProject = (input: Partial<Projects>) => {
  return projectsModel.create(input)
}

// Find Project by Id
export const findProjectById = async (id: string) => {
  return projectsModel.findById(id).lean()
}

// Find All projects
export const findAllProjects = async () => {
  return projectsModel.find().lean()
}

// Find one project by any fields
export const findProject = async (
  query: FilterQuery<Projects>,
  options: QueryOptions = {}
) => {
  return projectsModel.findOne(query, {}, options)
}
