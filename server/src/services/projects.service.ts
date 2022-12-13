import mongoose, { FilterQuery, QueryOptions } from 'mongoose'
import projectsModel, { Projects } from '../models/projects.model'

// CreateProject service
export const addProject = (input: Projects) => {
  return projectsModel.create(input)
}

// Find Project by Id
export const findProjectById = async (id: string) => {
  return projectsModel.findById(id).populate({ path: 'members' })
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

export const removeProject = async (id: string) => {
  return projectsModel.deleteOne({ _id: new mongoose.Types.ObjectId(id) })
}
