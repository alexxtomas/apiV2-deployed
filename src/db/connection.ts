import mongoose from 'mongoose'
import URI from './URI.js'
await mongoose
  .set('strictQuery', false)
  .connect(URI)
  .then((db) => console.log(`Connected to ${db.connection.name} db`))
  .catch((err) => console.error(err))
