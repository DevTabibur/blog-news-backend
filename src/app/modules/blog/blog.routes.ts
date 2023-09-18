import { Router } from 'express'
import { BlogController } from './blog.controller'
import authGuard from '../../middlewares/authGuard'
import { USER_ROLE } from '../user/user.constant'
import uploader from '../../middlewares/uploader'
import trackViews from '../../middlewares/trackViews'
import trackShares from '../../middlewares/trackShares'

const router = Router()

// **get all blog posts**
router.get('/', BlogController.getAllBlog)

// **to create / posted blogs**
router.post('/', uploader.single('cover'), BlogController.postBlog)

// **Get Single Blog By ID / SLUG**
router.get('/:articleId', trackViews, BlogController.getSingleBlog)

// **Delete a blog article
router.delete('/:articleId', BlogController.deleteArticle)

// **update a ARTICLE
router.patch('/:articleId', uploader.single('cover'), BlogController.updateArticle)

export const BlogRoute = router
