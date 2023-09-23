import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { SettingsService } from './settings.service'
import { sendSuccessResponse } from '../../../shared/customResponse'
import httpStatus from 'http-status'

const createWebsiteName = catchAsync(async (req: Request, res: Response) => {
  const websiteName = req.body
  const result = await SettingsService.createWebsiteNameService(websiteName)
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Website name created successfully',
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

const uploadLogo = catchAsync(async (req: Request, res: Response) => {
  const file = req.file
  const logo = {
    logo: file?.filename as string,
  }
  const result = await SettingsService.uploadLogoService(logo)
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Logo uploaded successfully',
    data: result,
  })
})

const uploadFavIcon = catchAsync(async (req: Request, res: Response) => {
  const file = req.file
  const favIcon = {
    favIcon: file?.filename as string,
  }
  const result = await SettingsService.uploadFavIconService(favIcon)
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Fav Icon uploaded successfully',
    data: result,
  })
})

const getLogo = catchAsync(async (req: Request, res: Response) => {
  const result = await SettingsService.getLogoService()
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'logo retrieved successfully',
    data: result,
  })
})

export const SettingsController = {
  createWebsiteName,
  getWebsiteName,
  uploadLogo,
  getLogo,
  uploadFavIcon
}
