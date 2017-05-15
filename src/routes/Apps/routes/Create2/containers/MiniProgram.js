import React from 'react'
import { Link } from 'react-router'
import cx from 'classnames'
import { PageTypes, getPageLinks } from 'config/index'
import Basic from '../components/Basic'
import Publish from '../components/Publish'

const Main = () => {
  return <div>
    <h1>skdhksds</h1>
    <ul>
      <li><Link to='Basic'>Basic</Link></li>
      <li><Link to='Publish'>Publish</Link></li>
    </ul>
    <div>
      <Basic></Basic>
      <Publish></Publish>
    </div>
  </div>
}


export default {
  path: 'mini_program',
  indexRoute: {
    component: Basic
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