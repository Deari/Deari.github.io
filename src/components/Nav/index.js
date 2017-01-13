import React from 'react'
import BasicNav from './nav'

class Nav extends React.Component {
  
  changeNav(value) {
    const { onChange } = this.props
    const navData = this.props.navData || []
    navData.map((item, index) => {
      item.active = (item && (item.value == value)) ? true : false
    })
    onChange({ navData })
  }

  render() {

    const navData = this.props.navData || []
    
    return (
      <BasicNav navData={navData} onChange={this.changeNav.bind(this)} />
    )
  }
}

export default Nav