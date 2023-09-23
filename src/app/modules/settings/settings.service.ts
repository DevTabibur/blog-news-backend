import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { IFavIcon, ISettingsUploadLogo, ISettingsWebsiteName } from './settings.interface'
import { SettingsModel } from './settings.model'

const createWebsiteNameService = async (
  websiteName: ISettingsWebsiteName,
): Promise<ISettingsWebsiteName> => {
  const existingWebsiteName = await SettingsModel.WebsiteNameModel.findOne({})

  if (existingWebsiteName) {
    // Replace the existing website name with the new one
    existingWebsiteName.websiteName = websiteName?.websiteName
    await existingWebsiteName.save()
    return existingWebsiteName
  } else {
    // Insert the new website name if it doesn't exist
    const newName = await SettingsModel.WebsiteNameModel.create(websiteName)
    return newName
  }
}

const getWebsiteNameService = async () => {
  const res = await SettingsModel.WebsiteNameModel.find({})
  return res
}

const uploadLogoService = async (
  logo: ISettingsUploadLogo,
): Promise<ISettingsUploadLogo> => {
  const existingLogo = await SettingsModel.UploadLogoModel.findOne({})
  if (existingLogo) {
    existingLogo.logo = logo?.logo
    await existingLogo.save()
    return existingLogo
  } else {
    const newLogo = await SettingsModel.UploadLogoModel.create(logo)
    return newLogo
  }
}
const uploadFavIconService = async (
  favIcon: IFavIcon,
): Promise<IFavIcon> => {
  const existingFavIcon= await SettingsModel.UploadFavIconModel.findOne({})
  if (existingFavIcon) {
    existingFavIcon.favIcon = favIcon?.favIcon
    await existingFavIcon.save()
    return existingFavIcon
  } else {
    const newFavIcon = await SettingsModel.UploadFavIconModel.create(favIcon)
    return newFavIcon
  }
}

const getLogoService = async () => {
  const result = await SettingsModel.UploadLogoModel.find({})
  return result
}

export const SettingsService = {
  createWebsiteNameService,
  getWebsiteNameService,
  uploadLogoService,
  getLogoService,
  uploadFavIconService
}
