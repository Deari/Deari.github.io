import React, { Component } from 'react'
import './ProductCreator.scss'
import Board from './Board'
import {Accordion, Collapse} from 'components/Accordion'

export class ProductCreator extends Component {



  render() {
    return <div>
      <Board knightPosition={[ 3, 5 ]}/>
      <Accordion>
        <Collapse>
          <span>aaaaa</span>
          <div>ccccccccccccc</div>
        </Collapse>
        <Collapse>
          <span>bbbbb</span>
          <div>ddddddddddddd</div>
        </Collapse>
      </Accordion>
    </div>
  }
}

export default ProductCreator
