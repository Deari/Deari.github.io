import React, { Component, PropTypes } from 'react'
// https://github.com/facebook/react/blob/master/src/renderers/dom/client/ReactMount.js#L390-L401
import { unmountComponentAtNode, findDOMNode, unstable_renderSubtreeIntoContainer as renderSubtreeIntoContainer } from 'react-dom'

function getContainer () {
  return document.body
}

export default class Protal extends Component {

  static propTypes = {
    children: PropTypes.any
  };

  componentDidMount () {
    this._updateOverlay()
  }

  componentDidUpdate () {
    this._updateOverlay()
  }

  componentWillUnmount () {
    this._unrenderOverlay()
  }

  _getOverlay () {
    return this.props.children
      ? React.Children.only(this.props.children)
      : null
  }

  _getOverlayTarget () {
    if (this._overlayTarget) {
      return this._overlayTarget
    }

    const overlayTarget = document.createElement('div')
    getContainer().appendChild(overlayTarget)
    return this._overlayTarget = findDOMNode(overlayTarget)
  }

  _updateOverlay () {
    const overlay = this._getOverlay()

    if (overlay === null) {
      this._unrenderOverlay()
    } else {
      this._renderOverlay()
    }
  }

  _renderOverlay () {
    renderSubtreeIntoContainer(
      this, this._getOverlay(), this._getOverlayTarget()
    )
  }

  _unrenderOverlay () {
    if (this._overlayTarget) {
      unmountComponentAtNode(this._overlayTarget)
      getContainer().removeChild(this._overlayTarget)
      this._overlayTarget = null
    }
  }

  render () {
    return null
  }

}

