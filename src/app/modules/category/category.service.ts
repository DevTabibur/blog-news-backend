import CategoryModel from './category.model'

const getAllCategory = async () => {
  const category = await CategoryModel.find({})
  return category
}


export const CategoryService ={
    getAllCategory
}
