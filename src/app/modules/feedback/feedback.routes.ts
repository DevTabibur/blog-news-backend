import { Router } from 'express'
import { FeedbackController } from './feedback.controller'
import authGuard from '../../middlewares/authGuard'
import { USER_ROLE } from '../user/user.constant'
import uploader from '../../middlewares/uploader'

const router = Router()

// const upload = uploader.fields([
//   { manImage: "galleryImage", maxCount: 1 },
//   { name: "thumbnailImage", maxCount: 1 },
//   { name: "productDescriptionFile", maxCount: 1 },
// ]);

// ** get single feedback**
router.get('/:feedbackId', FeedbackController.getSingleFeedback)

// **get all feedback**
router.get('/', FeedbackController.getAllFeedback)

// **create feedback**
router.post(
  '/',
  uploader.single('manImage'),
  authGuard(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
  FeedbackController.createFeedback,
)

// **update feedback**
router.patch(
  '/:feedbackId',
  authGuard(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
  FeedbackController.updateFeedback,
)

// **delete feedback**
router.delete(
  '/:feedbackId',
  authGuard(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
  FeedbackController.deleteFeedback,
)

export const FeedbackRoute = router
