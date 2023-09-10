import { Router } from 'express'
import { FaqController } from './faq.controller'
import authGuard from '../../middlewares/authGuard'
import { USER_ROLE } from '../user/user.constant'

const router = Router()

// **get single faq list**
router.get('/:faqId', FaqController.getSingleFaq)

// **get all faq**
router.get('/', FaqController.getAllFaq)

// **create faq**
router.post(
  '/',
  authGuard(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
  FaqController.createFaq,
)

// **update faq**
router.patch(
  '/:faqId',
  authGuard(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
  FaqController.updateFaq,
)

// **delete faq**
router.delete(
  '/:faqId',
  authGuard(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
  FaqController.deleteFaq,
)

export const FaqRoute = router
