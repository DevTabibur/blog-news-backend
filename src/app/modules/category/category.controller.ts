import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { CategoryService } from './category.service'
import { sendSuccessResponse } from '../../../shared/customResponse'
import httpStatus from 'http-status'

const getAllCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.getAllCategory()
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'successfully retrieved all category lists',
    data: result,
  })
})

const postCategory = catchAsync(async (req: Request, res: Response) => {
  const categoryData = req.body
  const result = await CategoryService.postCategoryService(categoryData)
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'New Category created successfully',
    data: result,
  })
})

const deleteCategory = catchAsync(async (req: Request, res: Response) => {
  const { categoryId } = req.params
  const result = await CategoryService.deleteCategoryService(categoryId)
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Category DELETED successfully',
    data: result,
  })
})

const updateCategory = catchAsync(async (req: Request, res: Response) => {
  const { categoryId } = req.params
  const updateData = req.body
  const result = await CategoryService.updateCategoryService(categoryId, updateData)
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Category UPDATED successfully',
    data: result,
  })
})

export const CategoryController = {
  getAllCategory,
  postCategory,
  deleteCategory,
  updateCategory,
}
