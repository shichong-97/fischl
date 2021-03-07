const mongoose = require('mongoose')
const Schema = mongoose.Schema
const geospatialSchema = new Schema(
  {
    id: { type: Number, required: true, unique: true },
    name: String,
    type: String,
    area: Number,
    path: [{ lat: Number, lng: Number }],
  },
  { autoIndex: false }
)

const Geospatial = mongoose.model('Geospatial', geospatialSchema)
module.exports = Geospatial
