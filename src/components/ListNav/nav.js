import React from 'react'
//import 'styles/_base.scss'

class BasicNav extends React.Component {
  render () {
    const navData = this.props.navData || []
    const { onChange } = this.props

    return (
      <ul className='sub-content-tab'>
        {
          navData.map((item, index) => (
            <li key={item.value}>
              <a className={(item.active && 'tab-active') || ''} onClick={() => { onChange(item.value) }}>{item.name}</a>
            </li>
          ))
        }
      </ul>
    )
  }
}

export default BasicNav
