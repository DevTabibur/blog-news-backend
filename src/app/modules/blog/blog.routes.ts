import { Router } from 'express'
import { BlogController } from './blog.controller'
import authGuard from '../../middlewares/authGuard'
import { USER_ROLE } from '../user/user.constant'
import uploader from '../../middlewares/uploader'

const router = Router()

// **get all blog posts**
router.get('/', BlogController.getAllBlog)

// **to create / posted blogs**
router.post('/', uploader.single("cover"), BlogController.postBlog)

// **Get Single Blog By ID / SLUG**
router.get('/:blogId',  BlogController.getSingleBlog)


export const BlogRoute = router
