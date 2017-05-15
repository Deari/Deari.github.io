import React from 'react'
import { Link } from 'react-router'
import cx from 'classnames'
import { PageTypes, getPageLinks } from 'config/index'
import Basic from '../components/Basic'
import Publish from '../components/Publish'

const Main = () => {
  return <div>
      <Basic></Basic>
      <Publish></Publish>
  </div>
}

export default {
  path: 'h5',
  component: Publish
}
