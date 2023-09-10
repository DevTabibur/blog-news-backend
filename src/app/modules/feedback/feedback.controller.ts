import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { FeedbackService } from './feedback.service'
import { sendSuccessResponse } from '../../../shared/customResponse'
import httpStatus from 'http-status'
import { IFeedback } from './feedback.interface'

const getSingleFeedback = catchAsync(async (req: Request, res: Response) => {
  const { feedbackId } = req.params
  const result = await FeedbackService.getSingleFeedbackService(feedbackId)
  sendSuccessResponse<IFeedback>(res, {
    statusCode: httpStatus.OK,
    message: 'A Feedback retrieved successfully',
    data: result,
  })
})

const getAllFeedback = catchAsync(async (req: Request, res: Response) => {
  const result = await FeedbackService.getAllFeedbackService()
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Feedback retrieved successfully',
    data: result,
  })
})

const createFeedback = catchAsync(async (req: Request, res: Response) => {
  const feedbackData = req.body
  const feedbackFile = req.file
  const feedback = {
    name: {
      firstName: feedbackData?.firstName as string,
      lastName: feedbackData?.lastName as string,
    },
    positionName: feedbackData?.positionName as string,
    feedbackDescription: feedbackData?.feedbackDescription as string,
    manImage: feedbackFile?.filename as string,
  }
  // console.log('feedback', feedback);

  const result = await FeedbackService.createFeedbackService(feedback)

  sendSuccessResponse<IFeedback>(res, {
    statusCode: httpStatus.OK,
    message: 'Feedback created successfully',
    data: result,
  })
})

const updateFeedback = catchAsync(async (req: Request, res: Response) => {
  const { feedbackId } = req.params
  const feedbackData = req.body
  const result = await FeedbackService.updateFeedbackService(
    feedbackId,
    feedbackData,
  )
  sendSuccessResponse<IFeedback>(res, {
    statusCode: httpStatus.OK,
    message: 'Feedback updated successfully',
  })
})
const deleteFeedback = catchAsync(async (req: Request, res: Response) => {
  const { feedbackId } = req.params
  const result = await FeedbackService.deleteFeedbackService(feedbackId)
  sendSuccessResponse<IFeedback>(res, {
    statusCode: httpStatus.OK,
    message: 'Feedback deleted successfully',
  })
})

export const FeedbackController = {
  getAllFeedback,
  createFeedback,
  updateFeedback,
  deleteFeedback,
  getSingleFeedback,
}
