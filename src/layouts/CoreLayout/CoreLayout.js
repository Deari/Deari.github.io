import React from 'react'
import Header from '../../components/Header'
import './CoreLayout.scss'
import '../../styles/core.scss'

export const CoreLayout = (props) => (
  <div className='container-full text-center'>
    <Header {...props}/>
    <div className='core-layout__viewport'>
      {props.children}
    </div>
    ds
  </div>
)

CoreLayout.propTypes = {
  children : React.PropTypes.element.isRequired
}

export default CoreLayout
