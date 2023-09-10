import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { FaqService } from './faq.service'
import { sendSuccessResponse } from '../../../shared/customResponse'
import { IFaq } from './faq.interface'
import httpStatus from 'http-status'

const getAllFaq = catchAsync(async (req: Request, res: Response) => {
  const result = await FaqService.getAllFaqService()
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'FAQ retrieved successfully',
    data: result,
  })
})

const createFaq = catchAsync(async (req: Request, res: Response) => {
  const faqData = req.body
  const result = await FaqService.createFaqService(faqData)
  sendSuccessResponse<IFaq>(res, {
    statusCode: httpStatus.OK,
    message: 'FAQ created successfully',
    data: result,
  })
})

const updateFaq = catchAsync(async (req: Request, res: Response) => {
  const { faqId } = req.params
  const faqData = req.body
  const result = await FaqService.updateFaqService(faqId, faqData)
  sendSuccessResponse<IFaq>(res, {
    statusCode: httpStatus.OK,
    message: 'FAQ updated successfully',
  })
})

const deleteFaq = catchAsync(async (req: Request, res: Response) => {
  const { faqId } = req.params
  const result = await FaqService.deleteFaqService(faqId)
  sendSuccessResponse<IFaq>(res, {
    statusCode: httpStatus.OK,
    message: 'FAQ deleted successfully',
  })
})

const getSingleFaq = catchAsync(async (req: Request, res: Response) => {
  const { faqId } = req.params
  const result = await FaqService.getSingleFaqService(faqId)
  sendSuccessResponse<IFaq>(res, {
    statusCode: httpStatus.OK,
    message: 'A FAQ retrieved successfully',
    data: result,
  })
})

export const FaqController = {
  getAllFaq,
  createFaq,
  updateFaq,
  deleteFaq,
  getSingleFaq,
}
