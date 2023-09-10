import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import userModel from './user.model'
import { UserService } from './user.service'
import { sendSuccessResponse } from '../../../shared/customResponse'
import httpStatus from 'http-status'

const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const result = await userModel.find({})
  res.status(200).json({ message: 'got all users', data: result })
})

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params
  const result = await UserService.getSingleUserService(userId)
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'successfully retrieved single user',
    data: result,
  })
})

export const UserController = {
  getAllUser,
  getSingleUser,
}
