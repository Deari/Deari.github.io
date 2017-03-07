import React, { PropTypes, Component, PureComponent } from 'react'
import classnames from 'classnames'
const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup
import {
  render,
  findDOMNode,
  unmountComponentAtNode,
  unstable_renderSubtreeIntoContainer as renderSubtreeIntoContainer
} from 'react-dom'
import DelayRenderer from 'components/Protal/DelayRenderer'

// http://stackoverflow.com/questions/29884848/react-animation-not-working


const LeaveTimeout = 1000

class Message extends Component {
  render() {

    // TODO remove 时机
    const items = this.props.items.map((item, i) => (
      <div key={item} onClick={() => this.props.handleRemove(i)}>
        {item}
      </div>
    ));

    return (
      <ReactCSSTransitionGroup
        transitionName="example"
        transitionAppear={true}
        transitionAppearTimeout={1000}
        transitionLeaveTimeout={LeaveTimeout}>
        {items}
      </ReactCSSTransitionGroup>
    );
  }
}

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

  remove(messageContainer) {

    render(<Message items={[]}/>, messageContainer, () => {
      console.log(3333333333)
      setTimeout(()=> {
        console.log(4444444444)
        unmountComponentAtNode(messageContainer)
        this._getContainer().removeChild(messageContainer)
      }, LeaveTimeout)

    })
  }

  add(message, during) {
    const messageContainer = document.createElement('div')
    this._getContainer().appendChild(messageContainer)
    render(<Message items={[message]} />, messageContainer, () => {
        //renderSubtreeIntoContainer(this._context, message, messageContainer, () => {
        if (during > 0) {
          console.log(11111111)
          setTimeout(() => {
            console.log(2222222222)
            this.remove(messageContainer)
          }, during)
        }
      }
    )
  }
}

