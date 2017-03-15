import React, { PropTypes, PureComponent } from 'react'
import { render, findDOMNode, unmountComponentAtNode, } from 'react-dom'
const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup
import './Message.scss'

const LeaveTimeout = 500
const AppearTimeout = 500
const compClassName = 'message'

class CSSTransitionContainer extends PureComponent {

  render() {
    const items = this.props.items.map((item, i) => React.cloneElement(item, { className: compClassName, key: item }))
    return (
      <ReactCSSTransitionGroup
        transitionName={compClassName}
        transitionAppear={true}
        transitionAppearTimeout={AppearTimeout}
        transitionLeaveTimeout={LeaveTimeout}>
        {items}
      </ReactCSSTransitionGroup>
    )
  }
}

export class Messages {

  getContainer() {
    if (!this._container) {
      const messagesContainer = document.createElement('div')
      messagesContainer.className = 'messages-container'
      document.body.appendChild(messagesContainer)
      this._container = findDOMNode(messagesContainer)
    }
    return this._container
  }

  remove(messageContainer) {
    render(<CSSTransitionContainer items={[]}/>, messageContainer, () => {
      setTimeout(() => {
        unmountComponentAtNode(messageContainer)
        this.getContainer().removeChild(messageContainer)
      }, LeaveTimeout)

    })
  }

  add(message, during) {
    const messageContainer = document.createElement('div')
    this.getContainer().appendChild(messageContainer)
    render(<CSSTransitionContainer items={[ message ]}/>, messageContainer, () => {
        if (during > 0) {
          setTimeout(() => {
            this.remove(messageContainer)
          }, during)
        }
      }
    )
  }
}

export default Messages
