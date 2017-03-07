import React, { Component } from 'react'
import './ProductCreator.scss'
import Board from './Board'
import { Accordion, Collapse } from 'components/Accordion'
import { Messages } from 'components/Message'

export class ProductCreator extends Component {

  constructor(props) {
    super(props)
    this._messages = new Messages(this)
  }

  onClick() {
    this._messages.add('ttttttttttt', 3000)
  }

  render() {
    const mess = new Messages(this)
    mess.add(<div>dddddddd</div>)
    mess.add(<div>dcccf</div>, 3000)
    mess.add(<div>ccccc</div>, 4000)
    mess.add(<div>ddddd</div>, 5000)

    return <div>
      <Board knightPosition={[ 3, 5 ]}/>
      <button onClick={::this.onClick}>Mess</button>
    </div>
  }
}

export default ProductCreator
