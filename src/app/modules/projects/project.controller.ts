import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { ProjectService } from './project.service'
import { sendSuccessResponse } from '../../../shared/customResponse'
import httpStatus from 'http-status'
import { IProjects } from './project.interface'

const singleProject = catchAsync(async (req: Request, res: Response) => {
  const { projectId } = req.params
  const result = await ProjectService.singleProjectService(projectId)
  sendSuccessResponse<IProjects>(res, {
    statusCode: httpStatus.OK,
    message: 'A Project retrieved successfully',
    data: result,
  })
})

const getAllProject = catchAsync(async (req: Request, res: Response) => {
  const result = await ProjectService.getAllProjectService()
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Project retrieved successfully',
    data: result,
  })
})

const createProject = catchAsync(async (req: Request, res: Response) => {
  const projectData = req.body
  const result = await ProjectService.createProjectService(projectData)
  sendSuccessResponse<IProjects>(res, {
    statusCode: httpStatus.OK,
    message: 'New Project created successfully',
    data: result,
  })
})

const updateProject = catchAsync(async (req: Request, res: Response) => {
  const { projectId } = req.params
  const updateData = req.body
  const result = await ProjectService.updateProjectService(
    projectId,
    updateData,
  )
  sendSuccessResponse<IProjects>(res, {
    statusCode: httpStatus.OK,
    message: 'Project updated successfully',
  })
})

const deleteProject = catchAsync(async (req: Request, res: Response) => {
  const { projectId } = req.params
  const result = await ProjectService.deleteProjectService(projectId)
  sendSuccessResponse<IProjects>(res, {
    statusCode: httpStatus.OK,
    message: 'Project deleted successfully',
  })
})

export const ProjectController = {
  getAllProject,
  createProject,
  updateProject,
  deleteProject,
  singleProject,
}
