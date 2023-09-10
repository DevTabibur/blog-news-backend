import bcrypt from 'bcrypt'
import userModel from '../modules/user/user.model'

export const comparePassword = async (
  loginEmail: string,
  givenPassword: string,
): Promise<boolean> => {
  const user = await userModel.findOne({ email: loginEmail })
  const hashedPassword = user?.password
  if (!user || !user?.password) {
    return false
  }
  const isPasswordMatch = await bcrypt.compare(
    givenPassword,
    hashedPassword as string,
  )
  return isPasswordMatch
}
