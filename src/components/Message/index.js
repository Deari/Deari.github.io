import React, { PropTypes, Component } from 'react'
import classnames from 'classnames'

import {
  findDOMNode,
  unmountComponentAtNode,
  unstable_renderSubtreeIntoContainer as renderSubtreeIntoContainer
} from 'react-dom'

export class Messages {

  constructor(context) {
    this._context = context
  }

  _getContainer() {
    if (!this._container) {
      const messagesContainer = document.createElement('div')
      document.body.appendChild(messagesContainer)
      this._container = findDOMNode(messagesContainer)
    }
    return this._container
  }

  add(message, during) {
    const messageContainer = document.createElement('div')
    this._getContainer().appendChild(messageContainer)
    renderSubtreeIntoContainer(this._context, message, messageContainer, () =>
      setTimeout(() => unmountComponentAtNode(messageContainer), during)
    )
  }


}

