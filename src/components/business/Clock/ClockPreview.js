import React, { Component } from 'react'
import moment from 'moment'

export default class ClockPreview extends Component {

  style = {
    color: 'white',
    fontSize: '18px',
    fontWeight: '400',
    lineHeight: '47',
    textAlign: 'center',
    fontFamily: 'sans-serif',
    textShadow: '3px 3px 5px #444444',
  }

  state = { time: '' }

  componentDidMount() {
    const that = this
    this.timer = setInterval(() => {
      this.setState({ time: moment().format(that.formatString) })
    }, 1000)
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    const { w: width, h: height } = this.props.layout
    const style = { ...this.style, lineHeight: (height * this.props.gridProps.rowHeight) + 'px', ...this.props.detail }
    this.formatString = (width == 1) ? 'hh:mm:ss' : 'YYYY-MM-DD hh:mm:ss'
    return <div style={style}>{this.state.time}</div>
  }
}
