import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import ApiError from '../../errors/ApiError'
import { jwtHelpers } from '../helpers/jwtHelpers'
import config from '../../config/config'

const authGuard =
  (...permissionRole: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // const dummyToken = req.headers.authorization
      const token =
        req.headers.authorization?.split(' ')[1] || req.headers.authorization
      // console.log('token', token)
      if (!token)
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized')

      // verifyToken
      let verifiedUser = null
      verifiedUser = await jwtHelpers.verifyToken(
        token,
        config.jwt.accessToken as string,
      )
      req.user = verifiedUser
      if (!verifiedUser || !verifiedUser.role) {
        throw new ApiError(
          httpStatus.FORBIDDEN,
          'You are not allowed to access this resource',
        )
      }

      if (
        permissionRole.length &&
        !permissionRole.includes(verifiedUser.role as string)
      ) {
        throw new ApiError(
          httpStatus.FORBIDDEN,
          'You are not allowed to access this resource',
        )
      }

      next()
    } catch (error) {
      next(error)
    }
  }

export default authGuard
