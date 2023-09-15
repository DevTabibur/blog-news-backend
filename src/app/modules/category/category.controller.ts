import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { CategoryService } from './category.service'
import { sendSuccessResponse } from '../../../shared/customResponse'
import httpStatus from 'http-status'

const getAllCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.getAllCategory()
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message:"successfully retrieved all category lists",
    data: result
  })
})

export const CategoryController = {
  getAllCategory,
}
