import { param } from 'express-validator'
import User from '../models/User.js'
export const idValidator = [
  param('id')
    .isString()
    .notEmpty()
    .custom(async (value, { req }) => {
      const user = await User.findById(value)
      if (!user) throw new Error('No existent user with this id')
      return true
    })
]
