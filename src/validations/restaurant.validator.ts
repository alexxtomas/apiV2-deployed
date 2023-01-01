import { body, param } from 'express-validator'
import Restaurant from '../models/Restaurant.js'
export const idValidator = [
  param('id')
    .isString()
    .notEmpty()
    .custom(async (value, { req }) => {
      const restaurant = await Restaurant.findById(value)
      if (!restaurant) throw new Error('No existent restaurant with this id')
      return true
    })
]

export const createRestaurantValidator = [
  body('name')
    .exists()
    .isString()
    .notEmpty()
    .custom(async (value, { req }) => {
      const restaurant = await Restaurant.findOne({ name: value })
      if (restaurant) throw new Error('restaurant name no available')
      return true
    }),
  body('neighborhood').exists().isString().notEmpty(),
  body('address').exists().isString().notEmpty(),
  body('cuisineType').exists().isString().notEmpty()
]
