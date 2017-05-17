import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import './index.scss'

class DescribeIcon extends Component {
  onMouseEnter () {
    let content = findDOMNode(this.refs.cont)
    content.style.display = 'block'
  }
  onMouseLeave () {
    let content = findDOMNode(this.refs.cont)
    content.style.display = 'none'
  }
  render () {
    let { describeContent = '' } = this.props
    return (!describeContent ? <div /> :
    <div className='describe-container'
      onMouseEnter={this.onMouseEnter.bind(this)}
      onMouseLeave={this.onMouseLeave.bind(this)}>
      <span className='iconfont icon-miashu' />
      <div ref='cont' className='describe-content'>{describeContent}</div>
    </div>
    )
  }
}

export default DescribeIcon
