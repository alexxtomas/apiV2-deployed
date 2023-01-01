import { model, Schema } from 'mongoose'

interface IReview {
  name: string
  date: string
  rating: number
  comment: string
}

export interface IRestaurant {
  name: string
  neighborhood: string
  address: string
  cuisineType: string
  image: string
  reviews: IReview[] | []
}

const reviewSchema = new Schema(
  {
    name: { type: String, required: true },
    date: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true }
  },
  { _id: false }
)

const restaurantSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    min: 4
  },
  neighborhood: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  cuisineType: { type: String, required: true },
  image: {
    type: String,
    required: true
  },
  reviews: [{ type: reviewSchema, default: [] }]
})
restaurantSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export default model<IRestaurant>('Restaurant', restaurantSchema)
