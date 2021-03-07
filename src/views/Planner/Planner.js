import React, { useState, useEffect } from 'react'
import axios from 'axios'
// react plugin for creating charts
import { DayPilot, DayPilotScheduler } from 'daypilot-pro-react'
// @material-ui/core
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

import DraggableItem from './DraggableItem'
import AddCropDialog from './AddCropDialog'
import styles from 'assets/jss/material-dashboard-react/views/plannerStyle.js'

const useStyles = makeStyles(styles)

export default function Dashboard() {
  const classes = useStyles()

  const [modalOpen, setModalOpen] = useState(false)
  const [geospatial, setGeospatial] = useState([])
  const [crops, setCrops] = useState([])
  const generateCropList = () =>
    crops.map((crop) => ({
      id: DayPilot.guid() + '_' + crop.id,
      name: crop.name,
      duration: crop.daysToHarvest,
    }))
  const [cropList, setCropList] = useState([])
  const [events, setEvents] = useState([])

  useEffect(() => {
    const geoDataReq = axios.get('/api/getAllGeodata')
    const cropDataReq = axios.get('/api/getAllCrops')
    axios.all([geoDataReq, cropDataReq]).then(
      axios.spread((...responses) => {
        const responseOne = responses[0]
        const responseTwo = responses[1]
        setGeospatial(
          responseOne.data.sort((a, b) => {
            if (a.name < b.name) {
              return -1
            }
            if (a.name > b.name) {
              return 1
            }
            return 0
          })
        )
        setCrops(
          responseTwo.data.map(({ id, name, duration, seasons }) => ({
            id,
            name,
            daysToHarvest: duration,
            goodSeasons: seasons,
          }))
        )

        axios.get('/api/getAllEvents').then((response) => {
          setEvents(
            response.data.map(({ id, areaId, cropId, startDate, endDate }) => ({
              id,
              areaId,
              cropId,
              startDate,
              endDate,
            }))
          )
        })
      })
    )
  }, [])

  useEffect(() => setCropList(generateCropList()), [crops])

  const renderCropList = () => {
    return (
      <div className={classes.cropOptionsContainer}>
        {cropList.map((crop) => (
          <DraggableItem
            id={crop.id}
            text={crop.name}
            days={crop.duration}
          ></DraggableItem>
        ))}
      </div>
    )
  }

  const addCrop = ({ name, daysToHarvest, goodSeasons }) => {
    axios.post('/api/addNewCrop', {
      id: crops.length,
      name: name,
      duration: daysToHarvest,
      seasons: goodSeasons,
    })
    crops.push({
      id: crops.length,
      name,
      daysToHarvest,
      goodSeasons,
    })
    setCrops(crops.slice())
  }

  const addOrEditEvent = (id, areaId, cropId, startDate, endDate, create) => {
    if (create) {
      axios.post('/api/addNewEvent', {
        id,
        areaId,
        cropId,
        startDate,
        endDate,
      })
      events.push({
        id,
        areaId,
        cropId,
        startDate,
        endDate,
      })
    } else {
      events.splice(
        events.findIndex((event) => event.id === id),
        1
      )
      axios.post('/api/editEvent', {
        id,
        areaId,
        cropId,
        startDate,
        endDate,
      })
      events.push({
        id,
        areaId,
        cropId,
        startDate,
        endDate,
      })
    }
  }

  const deleteEvent = (id) => {
    axios.delete(`/api/deleteEvent/${id}`)
    events.splice(
      events.findIndex((event) => event.id === id),
      1
    )
  }

  return (
    <div className={classes.mainContainer}>
      <div className={classes.cropListContainer}>
        <div className={classes.cropListHeader}>
          Drag and drop crops to your schedule!
        </div>
        {renderCropList()}
      </div>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={() => setModalOpen(true)}
      >
        Add new crop
      </Button>
      <AddCropDialog
        open={modalOpen}
        onAdd={(cropData) => {
          addCrop(cropData)
          setModalOpen(false)
        }}
        onCancel={() => setModalOpen(false)}
      />
      <DayPilotScheduler
        width="100%"
        rowMinHeight={50}
        eventHeight={50}
        styles
        startDate={'2021-01-01'}
        days={365}
        scale={'Day'}
        timeHeaders={[{ groupBy: 'Month' }, { groupBy: 'Day', format: 'd' }]}
        onEventMove={(event) => {
          setCropList(generateCropList())
          addOrEditEvent(
            event.e.data.id.slice(0, event.e.data.id.indexOf('_')),
            event.newResource,
            parseInt(event.e.data.id.slice(event.e.data.id.indexOf('_') + 1)),
            event.newStart.value,
            event.newEnd.value,
            event.external
          )
        }}
        resources={geospatial.map((g) => ({ name: g.name, id: g.id }))}
        events={events.map((event) => ({
          id: event.id + '_' + event.cropId,
          text: crops.filter((crop) => crop.id === event.cropId)[0]?.name,
          start: event.startDate,
          end: event.endDate,
          resource: event.areaId,
        }))}
        eventDeleteHandling="Update"
        onEventDelete={(event) =>
          deleteEvent(event.e.data.id.slice(0, event.e.data.id.indexOf('_')))
        }
      />
    </div>
  )
}
