import { Schema, model } from 'mongoose'
import {
  IFavIcon,
  ISettingsUploadLogo,
  ISettingsWebsiteName,
} from './settings.interface'

const settingsWebsiteNameSchema = new Schema<ISettingsWebsiteName>(
  {
    websiteName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

const settingsUploadLogoSchema = new Schema<ISettingsUploadLogo>(
  {
    logo: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

const settingsUploadFavIconSchema = new Schema<IFavIcon>(
  {
    favIcon: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

const WebsiteNameModel = model<ISettingsWebsiteName>(
  'WebsiteNameModel',
  settingsWebsiteNameSchema,
)
const UploadLogoModel = model<ISettingsUploadLogo>(
  'UploadLogoModel',
  settingsUploadLogoSchema,
)
const UploadFavIconModel = model<IFavIcon>(
  'UploadFavIconModel',
  settingsUploadFavIconSchema,
)

export const SettingsModel = {
  WebsiteNameModel,
  UploadLogoModel,
  UploadFavIconModel
}
