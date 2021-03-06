import React, { Component } from 'react'
import { DayPilot } from 'daypilot-pro-react'
import { makeStyles } from '@material-ui/core/styles'

import styles from 'assets/jss/material-dashboard-react/views/plannerStyle.js'

const useStyles = makeStyles(styles)

const DraggableItem = ({ id, text, days }) => {
  const classes = useStyles()
  return (
    <div
      className={classes.cropListOption}
      ref={(element) => {
        if (!element) {
          return
        }
        DayPilot.Scheduler.makeDraggable({
          element: element,
          id: id,
          text: text,
          duration: days * 24 * 60 * 60,
          keepElement: true,
        })
      }}
    >
      {text}
    </div>
  )
}

export default DraggableItem
