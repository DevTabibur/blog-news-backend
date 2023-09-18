import { NextFunction, Request, Response } from 'express'
import ArticleModel from '../modules/blog/blog.model'
import ApiError from '../../errors/ApiError'
import httpStatus from 'http-status'

// Initialize an object to store API hit counts

const trackShares = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { path } = req
    const { articleId } = req.params
    console.log('articleId', articleId);
    console.log('path', path);

    // Find the article by ID
    const article = await ArticleModel.findById(articleId)
    if (!article) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Article is not found')
    } else {
      // Increment the view count
      article.share++
      await article.save()
    }
    next()
  } catch (error) {
    next(error)
  }
}

export default trackShares
