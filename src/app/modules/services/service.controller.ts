import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { Service } from './service.service'
import { sendSuccessResponse } from '../../../shared/customResponse'
import httpStatus from 'http-status'
import { IService } from './service.interface'

const getSingleService = catchAsync(async (req: Request, res: Response) => {
  const { serviceId } = req.params
  const data = await Service.getSingleService(serviceId)
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Successfully retrieved a service',
    data: data,
  })
})

const getAllService = catchAsync(async (req: Request, res: Response) => {
  const data = await Service.getAllService()
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Successfully retrieved services list',
    data: data,
  })
})

const createService = catchAsync(async (req: Request, res: Response) => {
  const serviceData = req.body
  const serviceFile = req.file
  const service = {
    title: serviceData?.title as string,
    description: serviceData?.description as string,
    serviceImage: serviceFile?.filename as string,
  }
  const data = await Service.createService(service)
  sendSuccessResponse<IService>(res, {
    statusCode: httpStatus.OK,
    message: 'Service created successfully',
    data: data,
  })
})

const updateService = catchAsync(async (req: Request, res: Response) => {
  const { serviceId } = req.params
  const updateData = req.body
  const data = await Service.updateService(serviceId, updateData)
  sendSuccessResponse<IService>(res, {
    statusCode: httpStatus.OK,
    message: 'Service updated successfully',
  })
})

const deleteService = catchAsync(async (req: Request, res: Response) => {
  const { serviceId } = req.params
  const data = await Service.deleteService(serviceId)
  sendSuccessResponse<IService>(res, {
    statusCode: httpStatus.OK,
    message: 'Service deleted successfully',
  })
})

export const ServiceController = {
  getSingleService,
  getAllService,
  createService,
  updateService,
  deleteService,
}
