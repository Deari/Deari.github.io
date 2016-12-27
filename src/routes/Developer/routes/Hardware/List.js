import React from 'react'
import { Link } from 'react-router'
import HardwaresList from '../../components/Hardwares/List';
class HardwareList extends React.Component {
  render() {
    return <HardwaresList/>
  }
}

module.exports = {
  path: 'list',
  component: HardwareList
}