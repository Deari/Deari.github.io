import React from 'react'
import { Link } from 'react-router'
import cx from 'classnames'
import { PageTypes, getPageLinks } from 'config/index'
import BasicContainer from './BasicContainer'
import Publish from '../components/Publish'


export default {
  path: 'h5',
  indexRoute: {
    component: BasicContainer
  },
  childRoutes: [
    {
      path: 'basic',
      component: BasicContainer
    },
    {
      path: 'version',
      component: Publish
    }
  ]
}
