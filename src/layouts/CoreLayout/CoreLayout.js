import React from 'react'
import Header from 'business/Header'
import './CoreLayout.scss'
import 'styles/core.scss'

export const CoreLayout = (props) => (
  <div>
    <Header {...props} />
    <div className='core-layout__viewport'>
      {props.children}
    </div>
  </div>
)

CoreLayout.propTypes = {
  children : React.PropTypes.element.isRequired
}

export default CoreLayout
