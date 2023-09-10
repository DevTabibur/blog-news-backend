import { Router } from 'express'
import { TeamController } from './team.controller'
import uploader from '../../middlewares/uploader'
import authGuard from '../../middlewares/authGuard'
import { USER_ROLE } from '../user/user.constant'

const router = Router()

// **get single team member by id**
router.get('/:memberId', TeamController.getSingleMember)

// **get all Team Members**
router.get('/', TeamController.getAllTeam)

// **create team member**
router.post(
  '/',
  uploader.single('memberImage'),
  authGuard(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
  TeamController.createTeamMember,
)

// **update a team member**
router.patch(
  '/:memberId',
  authGuard(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
  TeamController.updateTeamMember,
)

// **delete a team member**
router.delete(
  '/:memberId',
  authGuard(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
  TeamController.deleteTeamMember,
)

export const TeamRoute = router
