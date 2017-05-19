import React from 'react'
import BasicContainer from './BasicContainer'
import VersionContainer from './VersionContainer'
import Complete from '../components/Complete'
import Alert from '../components/Alert'
import PhoneSize from 'business/AppCreate/PhoneSize'

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
      path: 'alert/:id',
      component: Alert
    },
    {
      path: 'size/:id',
      component: PhoneSize
    }
  ]
}
