import { z } from 'zod'

const loginZodSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'email is required',
    }),
    password: z.string({
      required_error: 'password is required',
    }),
  }),
})

const registerUserZodSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'email is required',
    }),
    name: z.object({
      firstName: z.string({
        required_error: 'First Name is required',
      }),
      lastName: z.string({
        required_error: 'Last Name is required',
      }),
    }),
    password: z.string({
      required_error: 'password is required',
    }),
  }),
})

const changePasswordZodSchema = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: 'Old password  is required',
    }),
    newPassword: z.string({
      required_error: 'New password  is required',
    }),
    confirmNewPassword: z.string({
      required_error: 'New password  is required',
    }),
  }),
})

const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh Token is required',
    }),
  }),
})

export const AuthValidation = {
  loginZodSchema,
  changePasswordZodSchema,
  registerUserZodSchema,
  refreshTokenZodSchema,
}
