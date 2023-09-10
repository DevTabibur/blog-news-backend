import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { JobService } from './job.service'
import { sendSuccessResponse } from '../../../shared/customResponse'
import httpStatus from 'http-status'
import { IJob } from './job.interface'

const getAllJob = catchAsync(async (req: Request, res: Response) => {
  const result = await JobService.getAllJobService()
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Job Applied list retrieved successfully',
    data: result,
  })
})

const createJob = catchAsync(async (req: Request, res: Response) => {
  const jobData = req.body
  const result = await JobService.createJobService(jobData)
  sendSuccessResponse<IJob>(res, {
    statusCode: httpStatus.OK,
    message: 'Job Applied successfully',
    data: result,
  })
})

const updateJob = catchAsync(async (req: Request, res: Response) => {
  const { jobId } = req.params
  const jobData = req.body
  const result = await JobService.updateJobService(jobId, jobData)
  sendSuccessResponse<IJob>(res, {
    statusCode: httpStatus.OK,
    message: 'Job Application updated successfully',
  })
})

const deleteJob = catchAsync(async (req: Request, res: Response) => {
  const { jobId } = req.params
  const result = await JobService.deleteJobService(jobId)
  sendSuccessResponse<IJob>(res, {
    statusCode: httpStatus.OK,
    message: 'Job Application deleted successfully',
  })
})

const getSingleJob = catchAsync(async (req: Request, res: Response) => {
  const { jobId } = req.params
  const result = await JobService.getSingleJobService(jobId)
  sendSuccessResponse<IJob>(res, {
    statusCode: httpStatus.OK,
    message: 'A Job Application retrieved successfully',
    data: result,
  })
})

export const JobController = {
  getSingleJob,
  getAllJob,
  createJob,
  updateJob,
  deleteJob,
}
