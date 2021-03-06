/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from '@material-ui/icons/Dashboard'
import Map from '@material-ui/icons/Map'
import Person from '@material-ui/icons/Person'
import People from '@material-ui/icons/People'
import LightBulb from '@material-ui/icons/EmojiObjects'
import Gear from '@material-ui/icons/Settings'

// core components/views for Admin layout
import DashboardPage from 'views/Dashboard/Dashboard.js'
import UserProfile from 'views/UserProfile/UserProfile.js'
import TableList from 'views/TableList/TableList.js'
import Typography from 'views/Typography/Typography.js'
import Icons from 'views/Icons/Icons.js'
import Maps from 'views/Maps/Maps.js'
import Planner from 'views/Planner/Planner.js'
import NotificationsPage from 'views/Notifications/Notifications.js'

const dashboardRoutes = [
  {
    path: '/overview',
    name: 'Overview',
    icon: Dashboard,
    component: DashboardPage,
    layout: '/admin',
  },
  {
    path: '/map',
    name: 'Map',
    icon: Map,
    component: Maps,
    layout: '/admin',
  },
  {
    path: '/planner',
    name: 'Planner',
    icon: 'content_paste',
    component: Planner,
    layout: '/admin',
  }
]

export default dashboardRoutes
