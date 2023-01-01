import multer from 'multer'
import cloudinary from '../services/cloudinary.js'

const { storage } = cloudinary

export const upload = multer({ storage })
