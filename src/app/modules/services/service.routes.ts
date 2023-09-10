import { Router } from 'express'
import { ServiceController } from './service.controller'
import uploader from '../../middlewares/uploader'
import authGuard from '../../middlewares/authGuard'
import { USER_ROLE } from '../user/user.constant'

const router = Router()

// **get a single service**
router.get('/:serviceId', ServiceController.getSingleService)

// **Get all services list**
router.get('/', ServiceController.getAllService)

// **Create Service**
router.post(
  '/',
  uploader.single('serviceImage'),
  authGuard(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
  ServiceController.createService,
)

// **Update A Service**
router.patch(
  '/:serviceId',
  authGuard(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
  ServiceController.updateService,
)

// **Delete a service**
router.delete(
  '/:serviceId',
  authGuard(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
  ServiceController.deleteService,
)

export const ServiceRoute = router
