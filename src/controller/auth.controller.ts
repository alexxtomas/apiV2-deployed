import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import { validationResult } from 'express-validator/src/validation-result.js'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export async function signUpController(req: Request, res: Response) {
  try {
    validationResult(req).throw()
    let { email, password, username } = req.body
    password = await bcrypt.hash(password, 10)
    const user = new User({
      email,
      password,
      username
    })

    const savedUser = await user.save()

    res.status(201).json({ user: savedUser })
  } catch (err: any) {
    res.status(400).json(err.errors)
  }
}

export async function loginController(req: Request, res: Response) {
  try {
    const { username } = req.body
    validationResult(req).throw()
    const { JWT_SECRET } = process.env
    if (!JWT_SECRET) throw new Error('Set JWT_SECRET in .env file')
    const user = await User.findOne({ username })
    const token: string = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) * (60 * 60 * 24 * 7),
        id: user?._id
      },
      JWT_SECRET
    )

    res.status(200).json(token)
  } catch (err: any) {
    res.status(401).json(err.errors)
  }
}
