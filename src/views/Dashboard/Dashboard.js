import React, { useState, useEffect } from 'react'
import axios from 'axios'
// react plugin for creating charts
import ChartistGraph from 'react-chartist'
// @material-ui/core
import { makeStyles } from '@material-ui/core/styles'
import Icon from '@material-ui/core/Icon'
// @material-ui/icons
import FilledCheckbox from '@material-ui/icons/CheckBox'
import Timer from '@material-ui/icons/Timer'
import List from '@material-ui/icons/ListAlt'
import EmptyCheckbox from '@material-ui/icons/CheckBoxOutlineBlank'

import Store from '@material-ui/icons/Store'
import Warning from '@material-ui/icons/Warning'
import DateRange from '@material-ui/icons/DateRange'
import LocalOffer from '@material-ui/icons/LocalOffer'
import Update from '@material-ui/icons/Update'
import ArrowUpward from '@material-ui/icons/ArrowUpward'
import AccessTime from '@material-ui/icons/AccessTime'
import Accessibility from '@material-ui/icons/Accessibility'
import BugReport from '@material-ui/icons/BugReport'
import Code from '@material-ui/icons/Code'
import Cloud from '@material-ui/icons/Cloud'
// core components
import GridItem from 'components/Grid/GridItem.js'
import GridContainer from 'components/Grid/GridContainer.js'
import Table from 'components/Table/Table.js'
import Tasks from 'components/Tasks/Tasks.js'
import CustomTabs from 'components/CustomTabs/CustomTabs.js'
import Danger from 'components/Typography/Danger.js'
import Card from 'components/Card/Card.js'
import CardHeader from 'components/Card/CardHeader.js'
import CardIcon from 'components/Card/CardIcon.js'
import CardBody from 'components/Card/CardBody.js'
import CardFooter from 'components/Card/CardFooter.js'

import { bugs, website, server } from 'variables/general.js'

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart,
} from 'variables/charts.js'

import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js'

const useStyles = makeStyles(styles)

export default function Dashboard() {
  const classes = useStyles()
  const [harvestable, setHarvestable] = useState(0)
  const [inUse, setInUse] = useState(0)
  const [planned, setPlanned] = useState(0)
  const [open, setOpen] = useState(0)

  const precedence = (event) => {
    if (
      Date.parse(event.startDate) >= Date.now() &&
      Date.parse(event.endDate) < Date.now()
    )
      return 1
    if (Date.parse(event.endDate) < Date.now()) return 2
    else return 3
  }

  useEffect(() => {
    const geoDataReq = axios.get('/api/getAllGeodata')
    const eventDataReq = axios.get('/api/getAllEvents')
    axios.all([geoDataReq, eventDataReq]).then(
      axios.spread((...responses) => {
        const geoAreas = responses[0].data
        const events = responses[1].data.sort(
          (a, b) => precedence(a) - precedence(b)
        )

        const areasAccountedFor = []
        for (const event of events) {
          if (areasAccountedFor.indexOf(event.areaId) != -1) continue

          areasAccountedFor.push(event.areaId)
          if (Date.parse(event.endDate) <= Date.now()) {
            setHarvestable(
              (harvestable) =>
                harvestable +
                geoAreas.find((area) => area.id === event.areaId).area
            )
          } else if (
            Date.parse(event.startDate) <= Date.now() &&
            Date.parse(event.endDate) > Date.now()
          ) {
            setInUse(
              (inUse) =>
                inUse + geoAreas.find((area) => area.id === event.areaId).area
            )
          } else
            setPlanned(
              (planned) =>
                planned + geoAreas.find((area) => area.id === event.areaId).area
            )
        }

        for (const area of geoAreas.filter(
          (area) => areasAccountedFor.indexOf(area.id) == -1
        )) {
          setOpen((open) => open + area.area)
        }
      })
    )
  }, [])
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Icon>
                  <FilledCheckbox />
                </Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Harvestable</p>
              <h3 className={classes.cardTitle}>
                {harvestable} <small>acres</small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Just Updated
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>
                  <Timer />
                </Icon>
              </CardIcon>
              <p className={classes.cardCategory}>In Use</p>
              <h3 className={classes.cardTitle}>
                {inUse} <small>acres</small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Just Updated
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Icon>
                  <List />
                </Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Planned</p>
              <h3 className={classes.cardTitle}>
                {planned} <small>acres</small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Just Updated
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Icon>
                  <EmptyCheckbox />
                </Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Open</p>
              <h3 className={classes.cardTitle}>
                {open} <small>acres</small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Just Updated
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <CustomTabs
            title="Tasks:"
            headerColor="primary"
            tabs={[
              {
                tabName: 'Bugs',
                tabIcon: BugReport,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0, 3]}
                    tasksIndexes={[0, 1, 2, 3]}
                    tasks={bugs}
                  />
                ),
              },
              {
                tabName: 'Website',
                tabIcon: Code,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0]}
                    tasksIndexes={[0, 1]}
                    tasks={website}
                  />
                ),
              },
              {
                tabName: 'Server',
                tabIcon: Cloud,
                tabContent: (
                  <Tasks
                    checkedIndexes={[1]}
                    tasksIndexes={[0, 1, 2]}
                    tasks={server}
                  />
                ),
              },
            ]}
          />
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Employees Stats</h4>
              <p className={classes.cardCategoryWhite}>
                New employees on 15th September, 2016
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="warning"
                tableHead={['ID', 'Name', 'Salary', 'Country']}
                tableData={[
                  ['1', 'Dakota Rice', '$36,738', 'Niger'],
                  ['2', 'Minerva Hooper', '$23,789', 'Curaçao'],
                  ['3', 'Sage Rodriguez', '$56,142', 'Netherlands'],
                  ['4', 'Philip Chaney', '$38,735', 'Korea, South'],
                ]}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  )
}
