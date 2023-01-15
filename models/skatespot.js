import mongoose from "mongoose"

const Schema =mongoose.Schema

const skatespotSchema = new Schema({
  name: String,
  bust: Boolean,
  owner: {type: Schema.Types.ObjectId, ref: 'Profile'}
},{
  timestamps: true
})

const Skatespot = mongoose.model('Skatespot', skatespotSchema)

export {
  Skatespot
}