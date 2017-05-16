import React from 'react'
import { Link } from 'react-router'
import cx from 'classnames'
import { PageTypes, getPageLinks } from 'config/index'
import Basic from '../components/Basic'
import Publish from '../components/Publish'

const TEST = () => {
  return <Basic></Basic>
}
export default {
  path: 'h5',
  indexRoute: {
    component: TEST
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
