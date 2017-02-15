import React, { Component } from 'react'
import './ProductCreator.scss'
import Board from './Board'
import Collapse from 'components/Accordion/Collapse'

export class ProductCreator extends Component {
  render() {
    return <div>
      <Board knightPosition={[ 3, 5 ]}/>
      <Collapse>
        <span>aaaaa</span>
        <div>ccccccccccccc</div>
      </Collapse>
    </div>
  }
}

export default ProductCreator
