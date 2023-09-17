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

const getSingleBlogService = async (blogId: string): Promise<IArticle> => {
  if (!Types.ObjectId.isValid(blogId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid ID')
  }
  const singleBlog = await ArticleModel.findById(blogId)
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

export const BlogService = {
  postBlogService,
  getAllBlogService,
  getSingleBlogService,
  deleteArticleService,
}
