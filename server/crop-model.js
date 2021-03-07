const mongoose = require('mongoose')
const Schema = mongoose.Schema
const cropSchema = new Schema(
  {
    id: { type: Number, required: true, unique: true },
    name: String,
    duration: Number,
    seasons: [String],
  },
  { autoIndex: false }
)

const Crop = mongoose.model('Crop', cropSchema)
module.exports = Crop
