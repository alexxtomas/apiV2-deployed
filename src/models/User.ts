import { model, Schema } from 'mongoose'

export interface IUser {
  username: string
  email: string
  password: string
  favorites: string[]
}

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    min: 2,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    min: 6
  },
  favorites: [{ type: Schema.Types.ObjectId, ref: 'Restaurant' }]
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export default model<IUser>('User', userSchema)
