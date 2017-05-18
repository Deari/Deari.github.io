import React from 'react'
import { Link } from 'react-router'
import cx from 'classnames'
import { PageTypes, getPageLinks } from 'config/index'
import BasicContainer from './BasicContainer'
import VersionContainer from './VersionContainer'
import Complete from '../components/Complete'
import Submit from '../components/Submit'
import Alert from '../components/Alert'

export default {
  path: ':type',
  indexRoute: {
    component: BasicContainer
  },
  childRoutes: [
    {
      path: 'version/:id',
      component: VersionContainer
    },
    {
      path: 'complete/:id',
      component: Complete
    },
    {
      path: 'submit',
      component: Submit
    },
    {
      path: 'alert',
      component: Alert
    }
  ]
}
