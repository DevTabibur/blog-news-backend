import { Router } from 'express'
import { UserController } from './user.controller'
import authGuard from '../../middlewares/authGuard'
import { USER_ROLE } from './user.constant'

const router = Router()

// just simple checking authGuard is working or not
router.get('/', authGuard(USER_ROLE.USER), UserController.getAllUser)

router.get('/:userId', UserController.getSingleUser)

export const UserRoute = router
