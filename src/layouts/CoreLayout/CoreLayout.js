import React from 'react'
import Header from 'business/Header'
import 'styles/core.scss'

export const CoreLayout = (props) => (
  <div>
    { props.location.pathname === '/login' ? '' : <Header {...props} /> }
    <div className='core-layout__viewport'>
      {props.children}
    </div>
  </div>
)

CoreLayout.propTypes = {
  children : React.PropTypes.element.isRequired
}

export default CoreLayout
