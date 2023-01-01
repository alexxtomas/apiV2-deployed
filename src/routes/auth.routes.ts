import { Router } from 'express'
import {
  loginController,
  signUpController
} from '../controller/auth.controller.js'
import {
  loginValidator,
  signUpValidator
} from '../validations/auth.validations.js'

const router = Router()

router.post('/signUp', signUpValidator, signUpController)
router.post('/login', loginValidator, loginController)

export default router
