import { Schema, model } from 'mongoose'
import { IBlogImage, IComment, IProfile } from './blog.interface'

const profileSchema = new Schema<IProfile>({
  imgUrl: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
  },
  joinedAt: {
    type: String,
    required: true,
  },
})

const commentSchema = new Schema<IComment>({
  author: {
    type: String,
    required: true,
  },
  profile: profileSchema,
  comment: {
    type: String,
    required: true,
  },
  likes: {
    type: [String], // Array of user IDs who liked the comment
    default: [],
  },
  replies: {
    type: [
      {
        author: {
          type: String,
          required: true,
        },
        profile: profileSchema,
        comment: {
          type: String,
          required: true,
        },
        createdAt: {
          type: String,
          required: true,
        },
      },
    ],
    default: [],
  },
  createdAt: {
    type: String,
    required: true,
  },
})

const postImageSchema = new Schema<IBlogImage>({
  url: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
  },
})

const blogSchema = new Schema<IPost>(
  {
    author: {
      // eita hobe after User Model {type:Schema.Types.ObjectId, ref:'User'},
      type: String,
      required: true,
    },
    profile: profileSchema,
    title: {
      type: String,
      required: true,
    },
    metaTitle: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    publishedAt: {
      type: String,
      required: true,
    },
    article: {
      type: String,
      required: true,
    },
    postImage: postImageSchema,
    comments: {
      type: [commentSchema],
      default: [],
    },
  },
  { timestamps: true },
)

export interface IPost extends Document {
  author: string
  profile: IProfile
  title: string
  metaTitle: string
  slug: string
  publishedAt: string
  article: string
  postImage: IBlogImage
  comments: IComment[] | undefined
}

const BlogModel = model<IPost>('Blog', blogSchema)

export default BlogModel
