import { object, string, ref } from 'yup'

export const USERNAME_VALIDATION = string()
  .trim()
  .required('Please Enter your username')

export const EMAIL_VALIDATION = string()
  .trim()
  .email('Please enter a valid email')
  .required('Please Enter your email')

export const PASSWORD_VALIDATION = string()
  .trim()
  .required('Please Enter your password')

export const MATCH_CONFIRM_PASSWORD = (
  passwordRef = 'confirmPassword',
  message = 'Please Confirm the Password'
) =>
  string()
    .required(message)
    .oneOf([ref(passwordRef)], 'Passwords must match.')

export const LOGIN_VALIDATION = object({
  email: EMAIL_VALIDATION,
  password: PASSWORD_VALIDATION,
})

export const SIGNUP_VALIDATION = object({
  username: USERNAME_VALIDATION,
  email: EMAIL_VALIDATION,
  password: PASSWORD_VALIDATION,
  confirmPassword: MATCH_CONFIRM_PASSWORD('password'),
})

export const SET_PASSWORD_VALIDATION = object({
  email: EMAIL_VALIDATION,
  password: PASSWORD_VALIDATION,
  confirmPassword: MATCH_CONFIRM_PASSWORD('password'),
})

export const FORGOT_PASSWORD_VALIDATION = object({
  email: EMAIL_VALIDATION,
})

export const RESET_PASSWORD_VALIDATION = object({
  password: string().trim().required('Please enter your new password'),
  confirmPassword: MATCH_CONFIRM_PASSWORD(
    'confirmPassword',
    'Please confirm the new password.'
  ),
})

export const CHANGE_PASSWORD_VALIDATION = object({
  newPassword: string().trim().required('Please enter your new password'),
  confirmNewPassword: MATCH_CONFIRM_PASSWORD(
    'newPassword',
    'Please confirm the new password.'
  ),
})
