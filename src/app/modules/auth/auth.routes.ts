import { Router } from 'express'
import { AuthController } from './auth.controller'
import validateRequest from '../../middlewares/validateRequest'
import { AuthValidation } from './auth.validation'
import authGuard from '../../middlewares/authGuard'
import { USER_ROLE } from '../user/user.constant'

const router = Router()

// **Get Me**
router.get('/me', AuthController.loggedInUser)

// **Register New User**
router.post(
  '/register',
  validateRequest(AuthValidation.registerUserZodSchema),
  AuthController.registerUser,
)
// **Login a User**
router.post(
  '/login',
  validateRequest(AuthValidation.loginZodSchema),
  AuthController.loginUser,
)
// **Regenerate Token**
router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenZodSchema),
  AuthController.regenerateToken,
)

// **Change Password**
router.post(
  '/change-password',
  validateRequest(AuthValidation.changePasswordZodSchema),
  authGuard(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN, USER_ROLE.USER),
  AuthController.changePassword,
)

// **log out user**
router.post('/log-out/:userId', AuthController.logOut)


// **reset password**
router.post('/reset-password', AuthController.resetPassword)

export const AuthRoute = router
