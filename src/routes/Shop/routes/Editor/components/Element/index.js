import React, { Component, PropTypes } from 'react'

export class Element extends Component {
  render() {
    const { name, id, productId, selected, children, dispatch, selectElement, ...rest } = this.props
    console.log(selected)
    return <div
      {...rest}>
      {name}
      {children}
    </div>
  }
}


Element.defaultProps = {
  selectElement: ()=> {}
}

export default Element
