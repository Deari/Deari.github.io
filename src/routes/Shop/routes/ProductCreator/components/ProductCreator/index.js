import React, { Component } from 'react'
import './ProductCreator.scss'
import Board from './Board'
import { Accordion, Collapse } from 'components/Accordion'
import { Messages } from 'components/Message'

export class ProductCreator extends Component {

  render() {
    const mess = new Messages(this)
    mess.add(<div>dcccf</div>, 3000)
    mess.add(<div>ccccc</div>, 4000)
    mess.add(<div>ddddd</div>, 5000)

    return <div>
      <Board knightPosition={[ 3, 5 ]}/>
    </div>
  }
}

export default ProductCreator
