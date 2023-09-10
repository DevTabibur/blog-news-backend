import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { IFeedback } from './feedback.interface'
import feedbackModel from './feedback.model'
import { Types } from 'mongoose'

const getSingleFeedbackService = async (
  feedbackId: string,
): Promise<IFeedback> => {
  if (!Types.ObjectId.isValid(feedbackId)) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Feedback is not found')
  }
  const data = await feedbackModel.findById(feedbackId)
  if (!data) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Feedback get failed')
  }
  return data
}

const getAllFeedbackService = async () => {
  const data = await feedbackModel.find()
  return data
}

const createFeedbackService = async (
  feedback: IFeedback,
): Promise<IFeedback> => {
  const data = await feedbackModel.create(feedback)
  if (!data) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Feedback creation failed')
  }
  return data
}

const updateFeedbackService = async (
  feedbackId: string,
  feedbackData: Partial<IFeedback>,
): Promise<IFeedback> => {
  if (!Types.ObjectId.isValid(feedbackId)) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Feedback is not found')
  }
  const data = await feedbackModel.findByIdAndUpdate(
    { _id: feedbackId },
    feedbackData,
    { new: true },
  )
  if (!data) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Feedback update failed')
  }
  return data
}

const deleteFeedbackService = async (
  feedbackId: string,
): Promise<IFeedback> => {
  if (!Types.ObjectId.isValid(feedbackId)) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Feedback is not found')
  }
  const data = await feedbackModel.findByIdAndDelete(feedbackId)
  if (!data) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Feedback delete failed')
  }
  return data
}

export const FeedbackService = {
  getAllFeedbackService,
  createFeedbackService,
  updateFeedbackService,
  deleteFeedbackService,
  getSingleFeedbackService,
}
