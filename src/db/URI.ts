import dotenv from 'dotenv'
dotenv.config()
const { NODE_ENV: environment } = process.env

const { MONGODB_DEVELOPMENT_URI, MONGODB_TESTING_URI, MONGODB_PRODUCTION_URI } =
  process.env

if (
  !MONGODB_DEVELOPMENT_URI &&
  !MONGODB_TESTING_URI &&
  !MONGODB_PRODUCTION_URI
) {
  throw new Error('No URI/s available, please check .env file ')
}

let URI: string
switch (environment) {
  case 'development':
    if (!MONGODB_DEVELOPMENT_URI) {
      throw new Error('No Development URI available, please check .env file')
    }
    console.log('Development Mode')
    URI = MONGODB_DEVELOPMENT_URI
    break
  case 'testing':
    if (!MONGODB_TESTING_URI) {
      throw new Error('No Testing URI available, please check .env file')
    }
    console.log('Testing Mode')
    URI = MONGODB_TESTING_URI
    break
  default:
    if (!MONGODB_PRODUCTION_URI) {
      throw new Error('No Development URI available, please check .env file')
    }
    URI = MONGODB_PRODUCTION_URI
    console.log('WARNING, PRODUCTION MODE!!!!!!!!!')
}

export default URI
