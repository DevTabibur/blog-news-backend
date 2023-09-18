import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { ISettingsWebsiteName } from './settings.interface'
import { SettingsModel } from './settings.model'
import { Types } from 'mongoose'

const updateWebsiteNameService = async (
  websiteId: string,
  websiteName: Partial<ISettingsWebsiteName>,
): Promise<ISettingsWebsiteName> => {
  if (!Types.ObjectId.isValid(websiteId)) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Website Name is not found')
  }
  const data = await SettingsModel.WebsiteNameModel.findByIdAndUpdate(
    { _id: websiteId },
    websiteName,
    {
      new: true,
    },
  )
  if (!data) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'website name update failed')
  }
  return data
}

const getWebsiteNameService = async () => {
  const res = await SettingsModel.WebsiteNameModel.find({})
  return res
}

export const SettingsService = {
  updateWebsiteNameService,
  getWebsiteNameService,
}
