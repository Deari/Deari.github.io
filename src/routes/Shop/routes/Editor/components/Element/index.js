import React, { Component, PropTypes } from 'react'

export class Element extends Component {
  render() {
    const { name, id, productId, defaultLayout, children, dispatch, selectElement, ...rest } = this.props
    return <div
      {...rest}
      onClick={selectElement.bind(this, id)}>
      {name}
      {children}
    </div>
  }
}


Element.defaultProps = {
  selectElement: ()=> {}
}

export default Element
