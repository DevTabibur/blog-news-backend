import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { SettingsService } from './settings.service'
import { sendSuccessResponse } from '../../../shared/customResponse'
import httpStatus from 'http-status'

const updateWebsiteName = catchAsync(async (req: Request, res: Response) => {
  const { websiteId } = req.params
  const websiteName = req.body

  const result = await SettingsService.updateWebsiteNameService(
    websiteId,
    websiteName,
  )
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Website name updated successfully',
    data: result,
  })
})

const getWebsiteName = catchAsync(async (req: Request, res: Response) => {
  const result = await SettingsService.getWebsiteNameService()
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Website name retrieved successfully',
    data: result,
  })
})

export const SettingsController = {
  updateWebsiteName,
  getWebsiteName,
}
