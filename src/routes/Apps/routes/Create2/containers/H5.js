import React from 'react'
import { Link } from 'react-router'
import cx from 'classnames'
import { PageTypes, getPageLinks } from 'config/index'
import Basic from '../components/Basic'
import Publish from '../components/Publish'

export default {
  path: 'h5',
  indexRoute: {
    component: Publish
  },
  childRoutes: [
    {
      path: 'basic',
      component: Basic
    },
    {
      path: 'version',
      component: Publish
    }
  ]
}
