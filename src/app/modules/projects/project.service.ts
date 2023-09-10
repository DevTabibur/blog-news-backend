import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { IProjects } from './project.interface'
import projectModel from './project.model'
import { Types } from 'mongoose'

const getAllProjectService = async () => {
  return await projectModel.find()
}

const createProjectService = async (
  projectData: IProjects,
): Promise<IProjects> => {
  const data = await projectModel.create(projectData)
  if (!data) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'New project creation failed')
  }
  return data
}

const updateProjectService = async (
  projectId: string,
  updateData: Partial<IProjects>,
): Promise<IProjects> => {
  if (!Types.ObjectId.isValid(projectId)) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Project is not found')
  }
  const data = await projectModel.findByIdAndUpdate(
    { _id: projectId },
    updateData,
    { new: true },
  )
  if (!data) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Project update failed')
  }
  return data
}

const deleteProjectService = async (projectId: string): Promise<IProjects> => {
  if (!Types.ObjectId.isValid(projectId)) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Project is not found')
  }
  const data = await projectModel.findByIdAndDelete(projectId)
  if (!data) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Project delete failed')
  }
  return data
}

const singleProjectService = async (projectId: string): Promise<IProjects> => {
  if (!Types.ObjectId.isValid(projectId)) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Project is not found')
  }
  const data = await projectModel.findById(projectId)
  if (!data) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Project getting failed')
  }
  return data
}

export const ProjectService = {
  getAllProjectService,
  createProjectService,
  updateProjectService,
  deleteProjectService,
  singleProjectService,
}
