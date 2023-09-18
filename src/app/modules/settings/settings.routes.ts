import { Router } from 'express'
import { SettingsController } from './settings.controller'

const router = Router()

// **Update Website Name
router.patch('/website-name/:websiteId', SettingsController.updateWebsiteName)

// **Get website Name
router.get('/website-name', SettingsController.getWebsiteName)

export const SettingRoute = router
