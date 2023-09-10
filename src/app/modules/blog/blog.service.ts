import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { IComment } from './blog.interface'
import BlogModel, { IPost } from './blog.model'
import { Types } from 'mongoose'

const getAllBlogService = async () => {
  const blogs = await BlogModel.find({})
  return blogs
}
const postBlogService = async (blogData: IPost): Promise<IPost> => {
  const blog = await BlogModel.create(blogData)
  return blog
}

const getSingleBlogService = async (blogId: string): Promise<IPost> => {
  if (!Types.ObjectId.isValid(blogId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid ID')
  }
  const singleBlog = await BlogModel.findById(blogId)
  if (!singleBlog) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Blog is not found')
  }
  return singleBlog
}

const AddCommentToBlogService = async (
  blogId: string,
  addComment: Partial<IComment>,
): Promise<IComment> => {
  if (!Types.ObjectId.isValid(blogId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid ID')
  }
  const comment = await BlogModel.findByIdAndUpdate(
    blogId,
    { $push: { comments: addComment } },
    {
      new: true,
    },
  )
  if (!comment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Comment is not found')
  }
  return comment
}

const likeACommentService = async (blogId: string, commentId: string) => {
  if (!Types.ObjectId.isValid(blogId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid blog id')
  }
  if (!Types.ObjectId.isValid(commentId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid comment id')
  }
  // do push 1 number with likes[] array
  console.log('hitted')
}

// const updateCommentService = async (
//   blogId: string,
//   commentId: string,
//   updateComment: Partial<IComment>,
// ) => {
//   if (!Types.ObjectId.isValid(blogId)) {
//     throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid blog ID')
//   }
//   // find the blog
//   const blog = await BlogModel.findById(blogId)

//   if (!Types.ObjectId.isValid(commentId)) {
//     throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid comment ID')
//   }
//   // find the comment
//   const findComment = blog?.comments?.find(c => c._id.toString() === commentId)
//   console.log(findComment?.comment);

//   // const updateComment = push { comments: updateComment }

//   // console.log('updateComment', updateComment);
//   // if (!comment) {
//   //   throw new ApiError(httpStatus.NOT_FOUND, 'Comment is not found')
//   // }
//   // return comment
// }

// const AddReplyToCommentService = async (
//   blogId: string,
//   commentId: string,
//   replyToComment: IComment,
// ): Promise<IComment> => {
//   const blogPost = await BlogModel.findById(blogId)
//   if (!blogPost) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Blog is not found')
//   }

//   // Find the specific comment by its ID
//   const comment = blogPost.comments.find((c) => c._id.equals(commentId));
//   if (!comment) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Comment is not found')
//   }

//   // Add the reply to the comment's replies array
//   comment.replies.push(replyToComment);

//   // Save the updated blog post with the new reply
//   const updatedBlogPost = await blogPost.save();
//    // Find and return the newly added reply from the updated blog post
//    const newlyAddedReply = updatedBlogPost.comments.find((c) => c._id.equals(commentId))?.replies.slice(-1)[0];

//   return newlyAddedReply

// }

export const BlogService = {
  postBlogService,
  getAllBlogService,
  AddCommentToBlogService,
  likeACommentService,
  // updateCommentService,
  // AddReplyToCommentService,
  getSingleBlogService,
}
