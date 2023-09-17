import { Schema, model } from 'mongoose'
import { IArticle } from './blog.interface'

const articleSchema = new Schema<IArticle>(
  {
    metaTitle: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    views: { type: Number, default: 0 }, // Initialize the view count to 0
    share: { type: Number, default: 0 }, // Initialize the view count to 0
  },
  { timestamps: true },
)

const ArticleModel = model<IArticle>('Article', articleSchema)

export default ArticleModel
