import React, { Component, PropTypes } from 'react'
import Business from '../../../../../../components/business'

export class Element extends Component {
  render() {
    const { appName, moduleName, children, moduleType, ...rest } = this.props

    if (moduleType === 'html5') {
      const { Preview } = Business[ moduleName ]
      if (Preview) {
        return <Preview {...rest}  />
      }
    }

    return <div
      {...rest}>
      {rest.appPreviewImage ? '' : appName }
      {children}
    </div>
  }
}

Element.defaultProps = {
  selectElement: () => {}
}

export default Element
