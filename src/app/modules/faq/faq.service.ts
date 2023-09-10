import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { IFaq } from './faq.interface'
import faqModel from './faq.model'
import { Types } from 'mongoose'

const getAllFaqService = async () => {
  const data = await faqModel.find()
  return data
}

const createFaqService = async (faqData: IFaq): Promise<IFaq> => {
  const data = await faqModel.create(faqData)
  if (!data) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'FAQ creation failed')
  }
  return data
}

const updateFaqService = async (
  faqId: string,
  faqData: Partial<IFaq>,
): Promise<IFaq> => {
  if (!Types.ObjectId.isValid(faqId)) {
    throw new ApiError(httpStatus.NOT_FOUND, 'FAQ is not found')
  }
  const data = await faqModel.findByIdAndUpdate({ _id: faqId }, faqData, {
    new: true,
  })
  if (!data) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'FAQ creation failed')
  }
  return data
}

const deleteFaqService = async (faqId: string): Promise<IFaq> => {
  if (!Types.ObjectId.isValid(faqId)) {
    throw new ApiError(httpStatus.NOT_FOUND, 'FAQ is not found')
  }
  const data = await faqModel.findByIdAndDelete(faqId)
  if (!data) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'FAQ deleted failed')
  }
  return data
}

const getSingleFaqService = async (faqId: string): Promise<IFaq> => {
  if (!Types.ObjectId.isValid(faqId)) {
    throw new ApiError(httpStatus.NOT_FOUND, 'FAQ is not found')
  }
  const data = await faqModel.findById(faqId)
  if (!data) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'FAQ get failed')
  }
  return data
}

export const FaqService = {
  getAllFaqService,
  createFaqService,
  updateFaqService,
  deleteFaqService,
  getSingleFaqService,
}
