import mongoose from "mongoose"

const Schema =mongoose.Schema

const reviewSchema = new Schema({
  content: String,
  reviewer: {type: Schema.Types.ObjectId, ref: 'Profile'},
})

const skatespotSchema = new Schema({
  name: String,
  bust: Boolean,
  owner: {type: Schema.Types.ObjectId, ref: 'Profile'},
  reviews: [reviewSchema] 
},{
  timestamps: true
})

const Skatespot = mongoose.model('Skatespot', skatespotSchema)

export {
  Skatespot
}