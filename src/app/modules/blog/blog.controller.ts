import { Request, Response } from 'express'

import httpStatus from 'http-status'
import { IArticle } from './blog.interface'
import catchAsync from '../../../shared/catchAsync'
import { BlogService } from './blog.service'
import { sendSuccessResponse } from '../../../shared/customResponse'
import ArticleModel from './blog.model'
import { calculateReadingTime } from '../../helpers/calculateReadingTime'
import { validateAndFormatInput } from '../../helpers/validateAndFormatInput'

// need to work with it, and need to pagination and filtering
const getAllBlog = catchAsync(async (req: Request, res: Response) => {
  const blogs = await ArticleModel.find()
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Blogs are retrieved successfully',
    data: blogs,
  })
})

const postBlog = catchAsync(async (req: Request, res: Response) => {
  const blogData = req.body
  const file = req.file
  const readingTime = await calculateReadingTime(blogData?.content)
  const slug = await validateAndFormatInput(blogData?.metaTitle)
  const article: IArticle = {
    metaTitle: blogData?.metaTitle,
    content: blogData?.content,
    category: blogData?.category,
    tags: blogData?.tags,
    cover: file?.filename || '',
    views: 0,
    share: 0,
    position: 1,
    readingTime: readingTime,
    slug: slug,
  }
  const blog = await BlogService.postBlogService(article)
  sendSuccessResponse<IArticle>(res, {
    statusCode: httpStatus.OK,
    message: 'Blog posted successfully',
    data: blog,
  })
})

const getSingleBlog = catchAsync(async (req: Request, res: Response) => {
  const { articleId } = req.params
  const singleBlog = await BlogService.getSingleBlogService(articleId)
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: `successfully getting ${articleId} blog`,
    data: singleBlog,
  })
})

const getArticleByCategoryAndSlug = catchAsync(
  async (req: Request, res: Response) => {
    const { category, slug } = req.params
    const singleBlogByCategoryAndSlug =
      await BlogService.getArticleByCategoryAndSlugService(category, slug)
    sendSuccessResponse(res, {
      statusCode: httpStatus.OK,
      message: `successfully getting ${category} and ${slug} article`,
      data: singleBlogByCategoryAndSlug,
    })
  },
)

export const deleteArticle = catchAsync(async (req: Request, res: Response) => {
  const { articleId } = req.params
  const result = await BlogService.deleteArticleService(articleId)
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: `Article Deleted`,
    data: result,
  })
})

export const updateArticle = catchAsync(async (req: Request, res: Response) => {
  const { articleId } = req.params
  const updateData = req.body
  const updateFile = req.file
  const update: Partial<IArticle> = {
    metaTitle: updateData?.metaTitle || '',
    content: updateData?.content || '',
    category: updateData?.category || '',
    tags: updateData?.tags || [],
    cover: updateFile?.filename || '',
  }

  // console.log('update article', update);
  const result = await BlogService.updateArticleService(articleId, update)
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: `Article updated`,
    data: result,
  })
})

export const BlogController = {
  getAllBlog,
  postBlog,
  getSingleBlog,
  getArticleByCategoryAndSlug,
  deleteArticle,
  updateArticle,
}
