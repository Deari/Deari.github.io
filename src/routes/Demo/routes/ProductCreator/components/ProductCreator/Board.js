import React, { Component, PropTypes } from 'react'
import Square from './Square'
import Knight from './Knight'

export default class Board extends Component {

  static propTypes = {
    knightPosition: PropTypes.arrayOf(
      PropTypes.number.isRequired
    ).isRequired
  }

  renderSquire (i) {
    const x = i % 8
    const y = Math.floor(i / 8)
    const black = (x + y) % 2 === 1
    const [ knightX, knightY ] = this.props.knightPosition
    const piece = (x === knightX && y === knightY) ? <Knight /> : null
    return <div key={i} style={{ width: '12.5%', height: '12.5%' }}>
      <Square black={black}>
        {piece}
      </Square>
    </div>
  }

  render () {
    const squires = []
    for (let i = 0; i < 64; i++) {
      squires.push(this.renderSquire(i))
    }

    return <div style={{
      width: '100%',
      height: '300px',
      display: 'flex',
      flexWrap: 'wrap'
    }}>
      {squires}
    </div>
  }
}
