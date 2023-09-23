import { Router } from 'express'
import { SettingsController } from './settings.controller'
import uploader from '../../middlewares/uploader'

const router = Router()

// **Create Website Name
router.post('/website-name', SettingsController.createWebsiteName)

// **Get website Name
router.get('/website-name', SettingsController.getWebsiteName)

// **Create Logo
router.post(
  '/upload-logo',
  uploader.single('logo'),
  SettingsController.uploadLogo,
)

// **Get logo
router.get('/get-logo', SettingsController.getLogo)

// **Upload FavIcon
router.post(
  '/upload-fav',
  uploader.single('favIcon'),
  SettingsController.uploadFavIcon,
)

export const SettingRoute = router
