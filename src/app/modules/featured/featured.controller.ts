import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import { sendSuccessResponse } from '../../../shared/customResponse'
import { IFeatured } from './featued.interface'
import { FeaturedService } from './featured.service'
import { Request, Response } from 'express'

const getSingleFeatured = catchAsync(async (req: Request, res: Response) => {
  const { featuredId } = req.params
  const result = await FeaturedService.getSingleFeaturedService(featuredId)
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'successfully retrieved single featured list',
    data: result,
  })
})

const getAllFeatured = catchAsync(async (req: Request, res: Response) => {
  const result = await FeaturedService.getAllFeaturedService()
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'successfully retrieved featured list',
    data: result,
  })
})

const createFeatured = catchAsync(async (req: Request, res: Response) => {
  const featuredData = req.body
  const result = await FeaturedService.createFeaturedService(featuredData)
  sendSuccessResponse<IFeatured>(res, {
    statusCode: httpStatus.OK,
    message: 'Featured created successfully',
    data: result,
  })
})

const updateFeatured = catchAsync(async (req: Request, res: Response) => {
  const { featuredId } = req.params
  const featuredData = req.body
  const result = await FeaturedService.updateFeaturedService(
    featuredId,
    featuredData,
  )
  sendSuccessResponse<IFeatured>(res, {
    statusCode: httpStatus.OK,
    message: 'Featured updated successfully',
  })
})

const deleteFeatured = catchAsync(async (req: Request, res: Response) => {
  const { featuredId } = req.params
  const result = await FeaturedService.deleteFeaturedService(featuredId)
  sendSuccessResponse<IFeatured>(res, {
    statusCode: httpStatus.OK,
    message: 'Featured deleted successfully',
  })
})

export const FeaturedController = {
  getSingleFeatured,
  getAllFeatured,
  createFeatured,
  updateFeatured,
  deleteFeatured,
}
