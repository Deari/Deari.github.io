import React, { Component } from 'react'
import moment from 'moment'

export default class Clock extends Component {


  style = {
    color     : 'white',
    fontSize  : '30px',
    fontWeight: '400',
    lineHeight: '100px',
    textAlign : 'center',
    //fontFamily: 'Taviraj',
    fontFamily: 'BotonProB7cee9443a179eb',
    textShadow  : '3px 3px 5px #444444',
  }

  state = { time: '' }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({ time: moment().format('hh:mm:ss') })
    }, 1000)
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    console.log(this.props.layout)
    return <div style={this.style}>{this.state.time}</div>
  }
}



