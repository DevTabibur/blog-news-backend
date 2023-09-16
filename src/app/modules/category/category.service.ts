import { Types } from 'mongoose'
import { validateAndFormatInput } from '../../helpers/validateAndFormatInput'
import { ICategory } from './category.interface'
import CategoryModel from './category.model'
import ApiError from '../../../errors/ApiError'
import httpStatus from 'http-status'

const getAllCategory = async () => {
  const category = await CategoryModel.find({})
  return category
}

const postCategoryService = async (
  categoryData: ICategory,
): Promise<ICategory | undefined> => {
  const formattedResult = validateAndFormatInput(categoryData?.categoryLink)
  if (formattedResult !== null) {
    // console.log(formattedResult) // Output: "entertainment-books"
    const validateData = {
      categoryName: categoryData?.categoryName,
      categoryLink: formattedResult, // Use formattedResult here
    }
    const blog = await CategoryModel.create(validateData)
    return blog
  } else {
    console.log('Invalid input')
  }
}

const deleteCategoryService = async (
  categoryId: string,
): Promise<ICategory> => {
  if (!Types.ObjectId.isValid(categoryId)) {
    throw new ApiError(httpStatus.NOT_FOUND, 'CATEGORY is not found')
  }
  const data = await CategoryModel.findByIdAndDelete(categoryId)
  if (!data) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'CATEGORY deleted failed')
  }
  return data
}


const updateCategoryService = async (
  categoryId: string,
  updateData: ICategory
): Promise<ICategory> => {
  if (!Types.ObjectId.isValid(categoryId)) {
    throw new ApiError(httpStatus.NOT_FOUND, 'CATEGORY is not found')
  }
  const data = await CategoryModel.findByIdAndUpdate({ _id: categoryId }, updateData, {
    new: true,
  })
  if (!data) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'CATEGORY update failed')
  }
  return data
}

export const CategoryService = {
  getAllCategory,
  postCategoryService,
  deleteCategoryService,
  updateCategoryService,
}
