import { Router } from 'express'
import { BlogController } from './blog.controller'
import authGuard from '../../middlewares/authGuard'
import { USER_ROLE } from '../user/user.constant'

const router = Router()

// **get all blog posts**
router.get('/', BlogController.getAllBlog)

// **to create / posted blogs**
router.post('/', authGuard(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN), BlogController.postBlog)

// **Get Single Blog By ID / SLUG**
router.get('/:blogId', BlogController.getSingleBlog)

// **Add Comment to Blog Post**
router.post('/:blogId/comments', BlogController.AddCommentToBlog)

// **Update Comment to Blog Post**
// router.patch('/:blogId/comments/:commentId', BlogController.updateComment)

// **Like a Comment**
router.post('/:blogId/comments/:commentId/like', BlogController.likeAComment)

// // see how many comments have a blog
// // router.get

// // Add a Reply to a Comment:
// router.post('/:blogId/comments/:commentId/replies', BlogController.AddReplyToComment)

export const BlogRoute = router
