const express = require('express')
const router = express.Router()

const geospatialService = require('../geospatial-service')
const cropService = require('../crop-service')
const eventService = require('../event-service')

router.get('/getAllGeodata', (req, res) => {
  geospatialService.getAll(req, res)
})

router.get('/getAllCrops', (req, res) => {
  cropService.getAll(req, res)
})

router.post('/addNewCrop', (req, res) => {
  cropService.create(req, res)
})

router.get('/getAllEvents', (req, res) => {
  eventService.getAll(req, res)
})

router.post('/addNewEvent', (req, res) => {
  eventService.create(req, res)
})

router.post('/editEvent', (req, res) => {
  eventService.update(req, res)
})

router.delete('/deleteEvent/:id', (req, res) => {
  eventService.destroy(req, res)
})

module.exports = router
