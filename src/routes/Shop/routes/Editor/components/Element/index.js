import React, { Component, PropTypes } from 'react'
import Clock from '../../../../../../components/business/Clock'

export class Element extends Component {
  render() {
    const { appName, id, children, dispatch, selectElement, ...rest } = this.props

    if (this.props.moduleName === 'clock') {
      return <Clock {...rest} />
    }

    return <div
      {...rest}>
      {rest.appPreviewImage ? '' :  appName }
      {children}
    </div>
  }
}

Element.defaultProps = {
  selectElement: ()=> {}
}

export default Element
