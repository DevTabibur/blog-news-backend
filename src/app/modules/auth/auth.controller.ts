import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import { sendSuccessResponse } from '../../../shared/customResponse'
import { AuthService } from './auth.service'
import config from '../../../config/config'
import { Response, Request } from 'express'
import { ILoginUser } from './auth.interface'
import ApiError from '../../../errors/ApiError'

const registerUser = catchAsync(async (req: Request, res: Response) => {
  const userData = req.body
  const { refreshToken, ...rest } = await AuthService.registerUserService(
    userData,
  )

  const cookieOptions = {
    httpOnly: true,
    secure: config.env === 'production',
  }

  res.cookie('refreshToken', refreshToken, cookieOptions)

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Registered successfully',
    data: { ...rest },
  })
})

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const loginData = req.body
  const { refreshToken, ...rest } = await AuthService.loginUserService(
    loginData,
  )

  const cookieOptions = {
    httpOnly: true,
    secure: config.env === 'production',
  }
  res.cookie('refreshToken', refreshToken, cookieOptions)
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Login is successful',
    data: { ...rest },
  })
})

const regenerateToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies
  const accessToken = await AuthService.regenerateTokenService(refreshToken)
  sendSuccessResponse(res, {
    data: { accessToken },
    message: 'Access Token regenerated successfully',
  })
})

const changePassword = catchAsync(async (req: Request, res: Response) => {
  const user = req.user
  const { ...passwordData } = req.body
  await AuthService.changePasswordService(user, passwordData)

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'password changed successfully',
  })
})

const logOut = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params
  const result = await AuthService.logOutService(userId)
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Log out successful',
    data: result,
  })
})

const loggedInUser = catchAsync(async (req: Request, res: Response) => {
  const authorization = req.headers.authorization

  if (!authorization) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Please Provide a token')
  }

  const token = authorization.split(' ')[1] || authorization
  const user = await AuthService.loggedInUserService(token as string)

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'User retrieved successfully',
    data: user,
  })
})

const resetPassword = catchAsync(async (req: Request, res: Response) => {
  
})

export const AuthController = {
  registerUser,
  loginUser,
  regenerateToken,
  changePassword,
  logOut,
  loggedInUser,
  resetPassword
}
