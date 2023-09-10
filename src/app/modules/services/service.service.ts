import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { IService } from './service.interface'
import serviceModel from './service.model'
import { Types } from 'mongoose'

const getSingleService = async (serviceId: string): Promise<IService> => {
  const data = await serviceModel.findById(serviceId)
  if (!data) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'service get failed')
  }
  return data
}

const getAllService = async () => {
  const data = await serviceModel.find()
  return data
}

const createService = async (service: IService): Promise<IService> => {
  const data = await serviceModel.create(service)
  if (!data) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Service creation is failed')
  }
  return data
}

const updateService = async (
  serviceId: string,
  updateData: Partial<IService>,
): Promise<IService> => {
  if (!Types.ObjectId.isValid(serviceId)) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Service is not found')
  }
  const data = await serviceModel.findByIdAndUpdate(
    { _id: serviceId },
    updateData,
    { new: true },
  )
  if (!data) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Service upgrade is failed')
  }
  return data
}

const deleteService = async (serviceId: string): Promise<IService> => {
  if (!Types.ObjectId.isValid(serviceId)) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Service is not found')
  }
  const data = await serviceModel.findByIdAndDelete(serviceId)
  if (!data) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Service delete is failed')
  }
  return data
}

export const Service = {
  getSingleService,
  getAllService,
  createService,
  updateService,
  deleteService,
}
