import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { IArticle } from './blog.interface'
import { Types } from 'mongoose'
import ArticleModel from './blog.model'

const getAllBlogService = async () => {
  const blogs = await ArticleModel.find({})
  return blogs
}
const postBlogService = async (article: IArticle): Promise<IArticle> => {
  const blog = await ArticleModel.create(article)
  return blog
}

const getSingleBlogService = async (articleId: string): Promise<IArticle> => {
  if (!Types.ObjectId.isValid(articleId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid ID')
  }
  const singleBlog = await ArticleModel.findById(articleId)
  if (!singleBlog) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Blog is not found')
  }
  return singleBlog
}

const deleteArticleService = async (
  articleId: string,
): Promise<IArticle | null> => {
  const result = await ArticleModel.findByIdAndDelete(articleId)
  return result
}
const updateArticleService = async (
  articleId: string,
  update: Partial<IArticle>
): Promise<IArticle | null> => {
  if (!Types.ObjectId.isValid(articleId)) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Article is not found')
  }
  const data = await ArticleModel.findByIdAndUpdate({ _id: articleId }, update, {
    new: true,
  })
  if (!data) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Article update failed')
  }
  return data
}

export const BlogService = {
  postBlogService,
  getAllBlogService,
  getSingleBlogService,
  deleteArticleService,
  updateArticleService
}
