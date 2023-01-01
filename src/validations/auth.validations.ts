import bcrypt from 'bcrypt'
import { body } from 'express-validator'
import User from '../models/User.js'
export const signUpValidator = [
  body('username')
    .isString()
    .isLength({ min: 2 })
    .custom(async (value, { req }) => {
      const user = await User.findOne({ username: value })
      if (user) throw new Error('username is not available')
      return true
    }),
  body('email')
    .isEmail()
    .custom(async (value, { req }) => {
      const user = await User.findOne({ email: value })
      if (user) throw new Error('email is not available')
    }),
  body('password').isString().isLength({ min: 6 }).notEmpty()
]

export const loginValidator = [
  body('username')
    .isString()
    .isLength({ min: 2 })
    .custom(async (value, { req }) => {
      const user = await User.findOne({ username: value })
      if (!user) throw new Error('username does not exist')
      return true
    }),
  body('password')
    .isString()
    .isLength({ min: 6 })
    .notEmpty()
    .custom(async (value, { req }) => {
      const { username } = req.body
      const user = await User.findOne({ username })
      const isAValidPassword = await bcrypt.compare(value, user?.password ?? '')
      if (!isAValidPassword) throw new Error('invalid credentails')

      return true
    })
]
