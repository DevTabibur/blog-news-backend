import httpStatus from 'http-status'
import config from '../../../config/config'
import ApiError from '../../../errors/ApiError'
import { comparePassword } from '../../helpers/comparePassword'
import { jwtHelpers } from '../../helpers/jwtHelpers'
import { IUser } from '../user/user.interface'
import userModel from '../user/user.model'
import {
  IChangePassword,
  IJwtPayload,
  ILoginUser,
  IUserResponse,
} from './auth.interface'
import { JwtPayload } from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const registerUserService = async (userData: IUser): Promise<IUserResponse> => {
  const { email: registerEmail } = userData
  // validation for a already loggedIn user cannot register again
  const isUserExist = await userModel.findOne({ email: registerEmail })
  if (isUserExist) {
    throw new ApiError(httpStatus.FOUND, 'User is already exists')
  }

  // then stored user data
  const result = await userModel.create(userData)
  const role = result.role
  // console.log('result', result)

  // let's give user secret token
  const accessToken = jwtHelpers.createToken(
    { _id: result._id, role: role },
    config.jwt.accessToken as string,
  )
  const refreshToken = jwtHelpers.createToken(
    { _id: result._id, role: role },
    config.jwt.refreshToken as string,
  )

  return { accessToken, refreshToken, data: { role } }
}

const loginUserService = async (
  loginData: ILoginUser,
): Promise<IUserResponse> => {
  const { email, password } = loginData

  // const isUserExist = await userModel.findOne({ loginEmail })
  const isUserExist = await userModel.findOne({ email })
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User is not found')
  }
  // const isPasswordMatched = await comparePassword(email, password)
  const isPasswordMatched = await bcrypt.compare(
    password,
    isUserExist?.password as string,
  )
  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Password is not matched')
  }

  // give user access and refresh token
  const { _id, role, email: userEmail } = isUserExist
  const accessToken = jwtHelpers.createToken(
    { _id: _id, role, userEmail },
    config.jwt.accessToken as string,
  )
  const refreshToken = jwtHelpers.createToken(
    { _id: _id, role, userEmail },
    config.jwt.refreshToken as string,
  )

  // lets make the user status is active
  const statusUpdate = await userModel.findByIdAndUpdate(
    { _id: isUserExist._id },
    { status: 'active' },
    { new: true },
  )

  return { accessToken, refreshToken, data: { role } }
}

const regenerateTokenService = async (refreshToken: string) => {
  const token = await jwtHelpers.regenerateToken(
    refreshToken,
    config.jwt.accessToken as string,
    config.jwt.refreshToken as string,
  )

  return token
}

const changePasswordService = async (
  user: JwtPayload | null,
  passwordData: IChangePassword,
) => {
  const { oldPassword, confirmNewPassword } = passwordData
  // checking is user exist or not
  const isUserExist = await userModel
    .findOne({ id: user?.userId })
    .select('+password')
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }

  // checking old password is correct or not
  if (
    isUserExist.password &&
    !(await userModel.isPasswordMatched(oldPassword, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Old Password is incorrect')
  }

  // hash password before save  !// this is the main culprit. we do not need to hashed password again
  // const newHashedPassword = await bcrypt.hash(
  //   confirmNewPassword,
  //   Number(config.bcrypt_salt_round),
  // )
  // console.log('newHashedPassword', newHashedPassword)
  // data update
  isUserExist.password = confirmNewPassword
  // updating using save()
  await isUserExist.save()
}

const logOutService = async (userId: string) => {
  const result = await userModel.findByIdAndUpdate(
    userId,
    { status: 'inactive' },
    { new: true },
  )
  return result
}

const loggedInUserService = async (token: string): Promise<IUser> => {
  const decodedToken = jwt.verify(
    token,
    config.jwt.accessToken as string,
  ) as IJwtPayload

  const id = decodedToken?._id
  const user = await userModel
    .findOne({ _id: id })
    .select({ password: 0, updatedAt: 0, createdAt: 0, __v: 0 })
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found')

  return user
}

export const AuthService = {
  registerUserService,
  loginUserService,
  regenerateTokenService,
  changePasswordService,
  logOutService,
  loggedInUserService,
}
