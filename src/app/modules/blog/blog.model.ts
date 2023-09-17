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
  },
  { timestamps: true },
)

const Article = model<IArticle>('Article', articleSchema)

export default Article
