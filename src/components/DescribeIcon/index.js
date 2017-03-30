import React, { Component, PropTypes } from 'react'
import './index.scss'

class DescribeIcon extends Component {
  onMouseEnter() {
    let {describeId} = this.props
    let content = document.getElementById(`Describe-${describeId}`);
    content.style.display = "block";
  }
  onMouseLeave() {
    let {describeId} = this.props
    let content = document.getElementById(`Describe-${describeId}`);
    content.style.display = "none";
  }
  render() {
    let { describeId='', describeContent='' } = this.props
    return ( !(describeId && describeContent) ? <div></div> :
      <div className="describe-container" 
           onMouseEnter={this.onMouseEnter.bind(this)} 
           onMouseLeave={this.onMouseLeave.bind(this)}>
        <span className="iconfont icon-miashu"></span>
        <div id={'Describe-' + describeId} className="describe-content">{describeContent}</div>
      </div> 
    )
  }
}

export default DescribeIcon;