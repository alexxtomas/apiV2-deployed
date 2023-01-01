import { Router } from 'express'

import {
  getAllController,
  getByIdController
} from '../controller/users.controller.js'
import { tokenValidator } from '../middlewares/token.middleware.js'
import { idValidator } from '../validations/user.validator.js'

const router = Router()

router.get('/', tokenValidator, getAllController)
router.get('/:id', idValidator, tokenValidator, getByIdController)

export default router
