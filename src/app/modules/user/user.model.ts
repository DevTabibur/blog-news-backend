import { Schema, model } from 'mongoose'
import { USER_ROLE, USER_STATUS } from './user.constant'
import { IUser, IUserModel } from './user.interface'
import config from '../../../config/config'
import bcrypt from 'bcrypt'

const userSchema = new Schema<IUser>(
  {
    name: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
    },
    phoneNumber: {
      type: String,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
      enum: USER_ROLE,
      default: USER_ROLE.USER,
    },
    status: {
      type: String,
      enum: USER_STATUS,
      default: USER_STATUS.ACTIVE,
    },
    passwordChangedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)

// hashed the password
userSchema.pre('save', async function (next) {
  // hash the password
  if (this?.password) {
    const hashedPassword = await bcrypt.hash(
      this.password,
      Number(config.bcrypt_salt_round),
    )
    this.password = hashedPassword
  }

  next()
})

// checking user exist or not
userSchema.statics.isUserExist = async function (
  phoneNumber: string,
): Promise<boolean> {
  const user = await this.findOne({ phoneNumber })
  return user
}

// checking user old password is matched or not
userSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword)
}

const userModel = model<IUser, IUserModel>('User', userSchema)

export default userModel
