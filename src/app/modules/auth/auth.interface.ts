import { IUser } from '../user/user.interface'

export interface IUserResponse {
  accessToken: string
  refreshToken: string
  data: Partial<IUser>
}

export interface ILoginUser {
  email: string
  password: string
}

export type IChangePassword = {
  oldPassword: string
  newPassword: string
  confirmNewPassword: string
}

// For jwt payload-------------
export interface IJwtPayload {
  _id: string
}
