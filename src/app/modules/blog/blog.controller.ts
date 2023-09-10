import { Request, Response } from 'express'

import httpStatus from 'http-status'
import BlogModel, { IPost } from './blog.model'
import { IComment } from './blog.interface'
import catchAsync from '../../../shared/catchAsync'
import { BlogService } from './blog.service'
import { sendSuccessResponse } from '../../../shared/customResponse'

// need to work with it, and need to pagination and filtering
const getAllBlog = catchAsync(async (req: Request, res: Response) => {
  const blogs = await BlogModel.find()
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Blogs are retrieved successfully',
    data: blogs,
  })
})

const postBlog = catchAsync(async (req: Request, res: Response) => {
  const blogData = req.body
  console.log('blogData', blogData);
  // const blog = await BlogService.postBlogService(blogData)
  // sendSuccessResponse<IPost>(res, {
  //   statusCode: httpStatus.OK,
  //   message: 'Blog posted successfully',
  //   data: blog,
  // })
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

const AddCommentToBlog = catchAsync(async (req: Request, res: Response) => {
  const { blogId } = req.params
  const commentData = req.body
  const addComment = await BlogService.AddCommentToBlogService(
    blogId,
    commentData,
  )
  sendSuccessResponse<IComment>(res, {
    statusCode: httpStatus.OK,
    message: 'Comment posted successfully',
    data: addComment,
  })
})

const likeAComment = catchAsync(async (req: Request, res: Response) => {
  const { blogId, commentId } = req.params
  const liked = await BlogService.likeACommentService(blogId, commentId)
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Liked successfully',
    data: liked,
  })
})

// const updateComment = catchAsync(async (req: Request, res: Response) => {
//   const {blogId, commentId} = req.params;
//   const updateComment = req.body
//   const result = await BlogService.updateCommentService(blogId, commentId, updateComment)
// })

// const AddReplyToComment = catchAsync(async (req: Request, res: Response) => {
//   const { blogId, commentId } = req.params
//   const replyToComment = req.body
//   // const data = await BlogService.AddReplyToCommentService(
//   //   blogId,
//   //   commentId,
//   //   replyToComment,
//   // )

//   const blogPost = await BlogModel.findById(blogId)
//   if (!blogPost) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Blog is not found')
//   }
//   // Create an ObjectId instance from the commentId string
//   const commentObjectId = mongoose.Types.ObjectId.createFromHexString(commentId)
//   // console.log('commentObjectId', commentObjectId)

//   // Find the specific comment by its ID
//   const comment = blogPost.comments?.find(c => c._id.equals(commentObjectId))
//   if (!comment) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'comment is not found')
//   }

//   // Add the reply to the comment's replies array
//   comment.replies.push(replyToComment)

//   // Save the updated blog post with the new reply
//   const updatedBlogPost = await blogPost.save()
//   console.log('updatedBlogPost', updatedBlogPost)

//   // Find and return the newly added reply from the updated blog post
//   const newlyAddedReply = updatedBlogPost.comments
//     ?.find(c => c._id.equals(commentObjectId))
//     ?.replies.slice(-1)[0]

//   res.status(200).json({
//     data: newlyAddedReply,
//   })
// })

export const BlogController = {
  getAllBlog,
  postBlog,
  AddCommentToBlog,
  likeAComment,

  // updateComment,
  // AddReplyToComment,
  getSingleBlog,
}
