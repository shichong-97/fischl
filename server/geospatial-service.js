const Geospatial = require('./geospatial-model')
const ReadPreference = require('mongodb').ReadPreference

require('./mongo').connect()

function getAll(req, res) {
  const docquery = Geospatial.find({}).read(ReadPreference.NEAREST)
  docquery
    .exec()
    .then((geo) => {
      res.json(
        geo.map((g) => ({
          id: g.id,
          name: g.name,
          type: g.type,
          area: g.area,
          path: g.path,
        }))
      )
    })
    .catch((err) => {
      res.status(500).send(err)
    })
}

module.exports = { getAll }
