import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { IFeatured } from './featued.interface'
import featuredModel from './featured.model'
import { Types } from 'mongoose'

const getSingleFeaturedService = async (
  featuredId: string,
): Promise<IFeatured> => {
  if (!Types.ObjectId.isValid(featuredId)) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Featured is not found')
  }
  const data = await featuredModel.findById({ _id: featuredId })
  if (!data) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Single Featured getting failed')
  }
  return data
}
const getAllFeaturedService = async () => {
  const data = await featuredModel.find()
  return data
}

const createFeaturedService = async (
  featuredData: IFeatured,
): Promise<IFeatured> => {
  const data = await featuredModel.create(featuredData)
  if (!data) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Featured creation filed')
  }
  return data
}

const updateFeaturedService = async (
  featuredId: string,
  featuredData: Partial<IFeatured>,
): Promise<IFeatured> => {
  if (!Types.ObjectId.isValid(featuredId)) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Featured is not found')
  }
  const data = await featuredModel.findByIdAndUpdate(
    { _id: featuredId },
    featuredData,
    { new: true },
  )
  if (!data) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Featured update failed')
  }
  return data
}

const deleteFeaturedService = async (
  featuredId: string,
): Promise<IFeatured> => {
  if (!Types.ObjectId.isValid(featuredId)) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Featured is not found')
  }
  const data = await featuredModel.findByIdAndDelete(featuredId)
  if (!data) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Featured delete failed')
  }
  return data
}

export const FeaturedService = {
  createFeaturedService,
  getAllFeaturedService,
  updateFeaturedService,
  deleteFeaturedService,
  getSingleFeaturedService,
}
