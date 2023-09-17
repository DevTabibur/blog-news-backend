import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { IArticle } from './blog.interface'
import BlogModel from './blog.model'
import { Types } from 'mongoose'

const getAllBlogService = async () => {
  const blogs = await BlogModel.find({})
  return blogs
}
const postBlogService = async (article: IArticle): Promise<IArticle> => {
  const blog = await BlogModel.create(article)
  return blog
}

const getSingleBlogService = async (blogId: string): Promise<IArticle> => {
  if (!Types.ObjectId.isValid(blogId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid ID')
  }
  const singleBlog = await BlogModel.findById(blogId)
  if (!singleBlog) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Blog is not found')
  }
  return singleBlog
}



export const BlogService = {
  postBlogService,
  getAllBlogService,
  getSingleBlogService,
}
