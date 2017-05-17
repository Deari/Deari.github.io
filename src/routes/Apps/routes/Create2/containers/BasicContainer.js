import React from 'react'
import {
  postAppBasicInfo
} from 'reducers/api'
import Basic from '../components/Basic'

const onSubmit = (values) => {
  console.log(values);
  // postAppBasicInfo()
}

const Container = () => {
  return <Basic onSubmit={onSubmit}></Basic>
}

export default Container