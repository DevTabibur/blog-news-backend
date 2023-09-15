import { Schema, model } from 'mongoose'
import { ICategory } from './category.interface'

const categorySchema = new Schema<ICategory>(
  {
    categoryName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)


const CategoryModel = model<ICategory>('Category', categorySchema)

export default CategoryModel
