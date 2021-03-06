import React, { useState } from 'react'

// @material-ui/core
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import MenuItem from '@material-ui/core/MenuItem'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import Chip from '@material-ui/core/Chip'

import styles from 'assets/jss/material-dashboard-react/views/plannerStyle.js'

const useStyles = makeStyles(styles)

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

function getStyles(name, personName) {
  return {
    fontWeight: personName.indexOf(name) === -1 ? 300 : 400,
  }
}

const seasons = ['Spring', 'Summer', 'Fall', 'Winter']

export default function AddCropDialog({ open, onAdd, onCancel }) {
  const classes = useStyles()
  const [name, setName] = useState('')
  const [daysToHarvest, setDaysToHarvest] = useState(0)
  const [goodSeasons, setGoodSeasons] = useState([])

  const handleChange = (event) => {
    setGoodSeasons(event.target.value)
  }

  const resetState = () => {
    setName('')
    setDaysToHarvest(0)
    setGoodSeasons([])
  }

  return (
    <Dialog
      open={open}
      onClose={() => {
        onCancel()
        resetState()
      }}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Add new crop</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To add a new crop, please specify its name, maturation period (in
          days), and seasons compatible with its growth.
        </DialogContentText>
        <TextField
          autoFocus
          className={classes.textField}
          id="name"
          label="Name"
          type="text"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          className={classes.textField}
          id="days_mature"
          label="Average days till maturation"
          type="number"
          fullWidth
          value={daysToHarvest}
          onChange={(e) => setDaysToHarvest(e.target.value)}
        />
        <InputLabel className={classes.selectFieldLabel}>
          Good seasons
        </InputLabel>
        <Select
          className={classes.selectField}
          labelId="demo-mutiple-chip-label"
          id="demo-mutiple-chip"
          multiple
          value={goodSeasons}
          onChange={handleChange}
          input={<Input id="select-multiple-chip" />}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {selected.map((value) => (
                <Chip key={value} label={value} className={classes.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {seasons.map((season) => (
            <MenuItem
              key={season}
              value={season}
              style={getStyles(season, goodSeasons)}
            >
              {season}
            </MenuItem>
          ))}
        </Select>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            onCancel()
            resetState()
          }}
          color="primary"
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            onAdd({ name, daysToHarvest, goodSeasons })
            resetState()
          }}
          color="primary"
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  )
}
