import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { IUser } from './user.interface'
import userModel from './user.model'

const getAllUserService = async () => {
  //   const user = await userModel.find()
  //   if (!user) {
  //     throw new ApiError(httpStatus.NOT_FOUND, `Couldn't retrieved users`)
  //   }
  //   return user
}
const getSingleUserService = async (userId: string) => {
  const user = await userModel.findById(userId)
  return user
}

export const UserService = {
  getAllUserService,
  getSingleUserService,
}
