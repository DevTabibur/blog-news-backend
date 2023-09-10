import { Model } from 'mongoose'
import { USER_ROLE, USER_STATUS } from './user.constant'

export interface IUser {
  _id?: string
  phoneNumber: string
  role: USER_ROLE
  email: string
  password?: string
  name: {
    firstName: string
    lastName: string
  }
  passwordChangedAt?: string
  status?: USER_STATUS
}

// For using static methods in model
export interface IUserModel extends Model<IUser> {
  // eslint-disable-next-line no-unused-vars
  isUserExist(phoneNumber: string): Promise<IUser>
}

export interface IUserModel extends Model<IUser> {
  // eslint-disable-next-line no-unused-vars
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string,
  ): Promise<boolean>
}

// // alternative way
// export type UserModel = {
//   isUserExist(
//     id: string
//   ): Promise<Pick<IUser, 'id' | 'password' | 'role' | 'needsPasswordChange'>>;
//   isPasswordMatched(
//     givenPassword: string,
//     savedPassword: string
//   ): Promise<boolean>;
// } & Model<IUser>;
