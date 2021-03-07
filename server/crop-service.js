const Crop = require('./crop-model')
const ReadPreference = require('mongodb').ReadPreference

require('./mongo').connect()

function getAll(req, res) {
  const docquery = Crop.find({}).read(ReadPreference.NEAREST)
  docquery
    .exec()
    .then((crops) => {
      res.json(
        crops.map((c) => ({
          id: c.id,
          name: c.name,
          duration: c.duration,
          seasons: c.seasons,
        }))
      )
    })
    .catch((err) => {
      res.status(500).send(err)
    })
}

function create(req, res) {
  const { id, name, duration, seasons } = req.body

  const crop = new Crop({ id, name, duration, seasons })
  crop
    .save()
    .then(() => {
      res.json(crop)
    })
    .catch((err) => {
      res.status(500).send(err)
    })
}

module.exports = { getAll, create }
