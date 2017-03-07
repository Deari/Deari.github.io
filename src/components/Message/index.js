import React, { PropTypes, Component } from 'react'
import classnames from 'classnames'

import {
  render,
  findDOMNode,
  unmountComponentAtNode,
  unstable_renderSubtreeIntoContainer as renderSubtreeIntoContainer
} from 'react-dom'

const Message = ({children}) => <div>
  {children}
</div>

export class Messages {

  constructor(context) {
    this._context = context
  }

  _getContainer() {
    if (!this._container) {
      const messagesContainer = document.createElement('div')
      messagesContainer.className = 'messages-container'
      document.body.appendChild(messagesContainer)
      this._container = findDOMNode(messagesContainer)
    }
    return this._container
  }

  add(message, during) {
    const messageContainer = document.createElement('div')
    this._getContainer().appendChild(messageContainer)
    render(<Message children={message}/>, messageContainer, () => {
    //renderSubtreeIntoContainer(this._context, message, messageContainer, () => {
        if (during > 0) {
          setTimeout(() => {
            unmountComponentAtNode(messageContainer)
            this._getContainer().removeChild(messageContainer)
          }, during)
        }
      }
    )
  }
}

