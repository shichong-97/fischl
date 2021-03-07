const mongoose = require('mongoose')
const Schema = mongoose.Schema
const eventSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    area_id: Number,
    crop_id: Number,
    start_date: String,
    end_date: String,
  },
  { autoIndex: false }
)

const Event = mongoose.model('Event', eventSchema)
module.exports = Event
