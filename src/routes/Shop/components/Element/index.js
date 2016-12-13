import React, { Component, PropTypes } from 'react'


export class Element extends Component {

  render() {
    const { name, children, dispatch, selectElement, ...rest} = this.props
    return <div {...rest} onClick={selectElement}>
      {name}
      {children}
    </div>
  }

}


Element.defaultProps = {
  selectElement: ()=>{}
}


export default Element
