import React, { Component, PropTypes } from 'react'

export class Download extends Component {

  render() {
    return <div>下载页</div>
  }
}

export default store => ({
  path: 'download',
  component: Download,
})
