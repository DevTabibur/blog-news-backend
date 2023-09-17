import { Request, Response } from 'express'

import httpStatus from 'http-status'
import { IArticle } from './blog.interface'
import catchAsync from '../../../shared/catchAsync'
import { BlogService } from './blog.service'
import { sendSuccessResponse } from '../../../shared/customResponse'
import ArticleModel from './blog.model'

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
  const article: IArticle = {
    metaTitle: blogData?.metaTitle,
    content: blogData?.content,
    category: blogData?.category,
    tags: blogData?.tags,
    cover: file?.filename || '',
  }
  const blog = await BlogService.postBlogService(article)
  sendSuccessResponse<IArticle>(res, {
    statusCode: httpStatus.OK,
    message: 'Blog posted successfully',
    data: blog,
  })
})

const getSingleBlog = catchAsync(async (req: Request, res: Response) => {
  const { blogId } = req.params
  const singleBlog = await BlogService.getSingleBlogService(blogId)
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: `successfully getting ${blogId} blog`,
    data: singleBlog,
  })
})

export const deleteArticle = catchAsync(async (req: Request, res: Response) => {
  const { articleId } = req.params
  const result = await BlogService.deleteArticleService(articleId)
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: `Article Deleted`,
    data: result,
  })
})

export const BlogController = {
  getAllBlog,
  postBlog,
  getSingleBlog,
  deleteArticle,
}
