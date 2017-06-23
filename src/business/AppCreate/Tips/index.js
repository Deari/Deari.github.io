import React from 'react'
import { findDOMNode } from 'react-dom'
import './index.scss'
import cx from 'classnames'

class Tips extends React.Component {
  state={
    show: this.props.show
  }
  onMouseEnter () {
    this.setState({
      show: true
    })
  }
  onMouseLeave () {
    this.setState({
      show: false
    })
  }

  render () {
    return (
      <div className="g-popover">
        <i className="iconfont icon-miashu" 
          onMouseLeave={this.onMouseLeave.bind(this)} 
          onMouseEnter={this.onMouseEnter.bind(this)}></i>
        <p ref='cont' className={cx('g-popover-content', {
          show: this.state.show })}>{this.props.content}</p>
      </div>
    )
  }
}

export default Tips
