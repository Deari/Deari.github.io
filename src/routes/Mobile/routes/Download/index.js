import React, { Component, PropTypes } from 'react'
import './index.scss'

export class Download extends Component {

  render() {
    return <div className="download-box"></div>
  }
}

export default store => ({
  path: 'download',
  component: Download,
})
