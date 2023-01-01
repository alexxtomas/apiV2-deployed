import cors from 'cors'
import express, { Application } from 'express'
import morgan from 'morgan'
import '../db/connection.js'
import authRoutes from '../routes/auth.routes.js'
import restaurantsRoutes from '../routes/restaurants.routes.js'
import usersRouter from '../routes/users.routes.js'
import cloudinary from '../services/cloudinary.js'
const app: Application = express()

cloudinary.setUp()
// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
app.set('port', process.env.PORT || 3001)
// Middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
// Routes
app.use('/api/auth', authRoutes)
app.use('/api/restaurants', restaurantsRoutes)
app.use('/api/users', usersRouter)

export default app
