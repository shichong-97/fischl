const Event = require('./event-model')
const ReadPreference = require('mongodb').ReadPreference

require('./mongo').connect()

function getAll(req, res) {
  const docquery = Event.find({}).read(ReadPreference.NEAREST)
  docquery
    .exec()
    .then((events) => {
      res.json(
        events.map((e) => ({
          id: e.id,
          areaId: e.area_id,
          cropId: e.crop_id,
          startDate: e.start_date,
          endDate: e.end_date,
        }))
      )
    })
    .catch((err) => {
      res.status(500).send(err)
    })
}

function create(req, res) {
  const { id, areaId, cropId, startDate, endDate } = req.body

  const event = new Event({
    id,
    area_id: areaId,
    crop_id: cropId,
    start_date: startDate,
    end_date: endDate,
  })
  event
    .save()
    .then(() => {
      res.json(event)
    })
    .catch((err) => {
      res.status(500).send(err)
    })
}

function update(req, res) {
  const { id, areaId, cropId, startDate, endDate } = req.body
  console.log(id)
  Event.findOne({ id })
    .then((event) => {
      event.area_id = areaId
      event.crop_id = cropId
      event.start_date = startDate
      event.end_date = endDate
      event.save().then(res.json(event))
    })
    .catch((err) => {
      res.status(500).send(err)
    })
}

function destroy(req, res) {
  const { id } = req.params

  Event.findOneAndRemove({ id })
    .then((event) => {
      res.json(event)
    })
    .catch((err) => {
      res.status(500).send(err)
    })
}

module.exports = { getAll, create, update, destroy }
