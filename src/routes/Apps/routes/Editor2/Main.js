import React from 'react'
import SideBar from 'business/SideBar'
import { getPageLinks } from 'config/index'

const Main = (props) => {
  return <div className='container'>
    <SideBar pageLinks={getPageLinks('apps')} type={'apps'} />
    { props.children }
  </div>
}

export default Main
