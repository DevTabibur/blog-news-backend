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

// **Create a new articles**
router.post('/', uploader.single('cover'), BlogController.postBlog)

// **Get Single Blog By ID**
router.get('/:articleId', trackViews, BlogController.getSingleBlog)


// **Get Single Blog By CATEGORY & SLUG**
// router.get('/:category/:slug', trackViews, BlogController.getArticleByCategoryAndSlug) // original before code
router.get('/:category/:slug', BlogController.getArticleByCategoryAndSlug)



// **Delete a blog article
router.delete('/:articleId', BlogController.deleteArticle)

// **update a ARTICLE
router.patch('/:articleId', uploader.single('cover'), BlogController.updateArticle)

export const BlogRoute = router
