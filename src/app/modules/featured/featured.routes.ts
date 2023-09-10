import { Router } from 'express'
import { FeaturedController } from './featured.controller'

const router = Router()

// **get single featured list**
router.get('/:featuredId', FeaturedController.getSingleFeatured)

// **get all featured lists**
router.get('/', FeaturedController.getAllFeatured)

// **create featured list**
router.post('/', FeaturedController.createFeatured)

// **update featured list**
router.patch('/:featuredId', FeaturedController.updateFeatured)

// **delete a featured list**
router.delete('/:featuredId', FeaturedController.deleteFeatured)

export const FeaturedRoute = router
