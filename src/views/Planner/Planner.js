import React, { useState } from 'react'
// react plugin for creating charts
import { DayPilot, DayPilotScheduler } from 'daypilot-pro-react'
// @material-ui/core
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

import DraggableItem from './DraggableItem'
import AddCropDialog from './AddCropDialog'
import styles from 'assets/jss/material-dashboard-react/views/plannerStyle.js'

const useStyles = makeStyles(styles)
const crops = [
  {
    name: 'Dent Corn',
    daysToHarvest: 18,
    goodSeasons: ['Summer'],
  },
  {
    name: 'Soybean',
    daysToHarvest: 20,
    goodSeasons: ['Winter'],
  },
  {
    name: 'Alfalfa',
    daysToHarvest: 16,
    goodSeasons: ['Spring'],
  },
]

const generateCropList = () =>
  crops.map((crop) => ({
    id: DayPilot.guid(),
    name: crop.name,
    duration: crop.daysToHarvest,
  }))

export default function Dashboard() {
  const classes = useStyles()

  const [modalOpen, setModalOpen] = useState(false)
  const [cropList, setCropList] = useState(generateCropList())

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

  const addCrop = (cropData) => {
    crops.push(cropData)
    setCropList(generateCropList())
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
        onEventMove={() => setCropList(generateCropList())}
        resources={[
          { name: 'A0-C7', id: 'A0-C7' },
          { name: 'C8-D1', id: 'C8-D1' },
          { name: 'D2-D7', id: 'D2-D8' },
          { name: 'D8-E2', id: 'D8-E2' },
          { name: 'E3-E6', id: 'E3-E6' },
          { name: 'E7-F4', id: 'E7-F4' },
        ]}
      />
    </div>
  )
}
