import { v2 as cloudinaryV2 } from 'cloudinary'

import { CloudinaryStorage } from 'multer-storage-cloudinary'

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
  process.env
if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
  throw new Error(
    'No cloudinary keys available, please set your keys in file .env'
  )
}

const setUp = () => {
  cloudinaryV2.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
  })
}

const deleteFile = async (imgUrl: string) => {
  const imgSplited = imgUrl.split('/')
  const nameSplited = imgSplited[imgSplited.length - 1].split('.')
  const folderSplited = imgSplited[imgSplited.length - 2]
  const publicId = `${folderSplited}/${nameSplited[0]}`
  await cloudinaryV2.uploader.destroy(publicId, () => {
    console.log('Image deleted in cloudinary')
  })
}

const storage = new CloudinaryStorage({
  cloudinary: cloudinaryV2,
  params: {
    folder: 'tailor',
    allowedFormats: ['jpg', 'png', 'jpeg']
  }
})

export default { setUp, deleteFile, storage }
