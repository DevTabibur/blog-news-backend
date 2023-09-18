import { Schema, model } from 'mongoose'
import { ISettingsWebsiteName } from './settings.interface'

const settingsWebsiteNameSchema = new Schema<ISettingsWebsiteName>({
  websiteName: {
    type: String,
    required: true,
  },
})

const WebsiteNameModel = model<ISettingsWebsiteName>(
  'WebsiteNameModel',
  settingsWebsiteNameSchema,
)

export const SettingsModel = {
  WebsiteNameModel,
}
