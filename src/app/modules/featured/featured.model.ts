import { Schema, model } from 'mongoose'
import { IFeatured } from './featued.interface'

const featuredSchema = new Schema<IFeatured>(
  {
    iconImage: {
      type: String,
      required: true,
    },
    featuredTitle: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      minlength: 30,
    },
    featuredImage1: { type: String },
    featuredImage2: { type: String },
  },
  {
    timestamps: true,
  },
)

const featuredModel = model<IFeatured>('Featured', featuredSchema)

export default featuredModel
