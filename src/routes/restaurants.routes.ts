import { Router } from 'express'
import {
  createController,
  deleteController,
  getAllController,
  getByIdController,
  updateController
} from '../controller/restaurants.controller.js'
import { tokenValidator } from '../middlewares/token.middleware.js'
import { upload } from '../middlewares/upload.middleware.js'
import {
  createRestaurantValidator,
  idValidator
} from '../validations/restaurant.validator.js'

const router = Router()

router.get('/', getAllController)
router.get('/:id', idValidator, getByIdController)
router.post(
  '/',

  [tokenValidator, upload.single('image')],
  createRestaurantValidator,

  createController
)
router.put('/:id', [tokenValidator, upload.single('image')], updateController)
router.delete('/:id', idValidator, tokenValidator, deleteController)

export default router
