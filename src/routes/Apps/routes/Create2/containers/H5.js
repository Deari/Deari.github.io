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
      <li>Basic</li>
      <li>Publish</li>
    </ul>
    <div>
      <Basic></Basic>
      <Publish></Publish>
    </div>
  </div>
}

export default {
  path: 'h5',
  component: Basic
}
