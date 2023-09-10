import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { IJob } from './job.interface'
import jobModel from './job.model'
import { Types } from 'mongoose'

const getAllJobService = async () => {
  const data = await jobModel.find()
  return data
}

const createJobService = async (jobData: IJob): Promise<IJob> => {
  const data = await jobModel.create(jobData)
  if (!data) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Job Apply failed')
  }
  return data
}

const updateJobService = async (
  jobId: string,
  jobData: Partial<IJob>,
): Promise<IJob> => {
  if (!Types.ObjectId.isValid(jobId)) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Job Application is not found')
  }
  const data = await jobModel.findByIdAndUpdate({ _id: jobId }, jobData, {
    new: true,
  })
  if (!data) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Job Application update failed')
  }
  return data
}

const deleteJobService = async (jobId: string): Promise<IJob> => {
  if (!Types.ObjectId.isValid(jobId)) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Job Application is not found')
  }
  const data = await jobModel.findByIdAndDelete(jobId)
  if (!data) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Job Application delete failed')
  }
  return data
}

const getSingleJobService = async (jobId: string): Promise<IJob> => {
  if (!Types.ObjectId.isValid(jobId)) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Job Application is not found')
  }
  const data = await jobModel.findById(jobId)
  if (!data) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Job Application retrieved failed',
    )
  }
  return data
}

export const JobService = {
  getSingleJobService,
  getAllJobService,
  createJobService,
  updateJobService,
  deleteJobService,
}
