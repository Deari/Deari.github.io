import React from 'react'
import { Link } from 'react-router'
import cx from 'classnames'
import { PageTypes, getPageLinks } from 'config/index'
import Version from 'business/AppCreate/Version'
import BasicContainer from './BasicContainer'

export default {
  path: 'apk',
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
      component: Version
    }
  ]
}