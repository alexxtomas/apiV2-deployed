import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import User from '../models/User.js'
export async function getAllController(req: Request, res: Response) {
  try {
    const users = await User.find()
    res.status(200).json({ users })
  } catch (err) {
    console.error(err)
    res
      .status(500)
      .json({ error: 'Something went wrong. Internal Server Error' })
  }
}

export async function getByIdController(req: Request, res: Response) {
  try {
    validationResult(req).throw()
    const { id } = req.params
    const user = await User.findById(id, { password: 0 })
    return res.status(200).json(user)
  } catch (err: any) {
    return res.status(400).json({ error: err.errors })
  }
}
