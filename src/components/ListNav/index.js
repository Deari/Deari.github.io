import React from 'react'
import BasicNav from './nav'

class ListNav extends React.Component {
  
  changeNav(value) {
    const { onChange } = this.props
    const navData = this.props.navData || []
    navData.map((item, index) => {
      item.active = (item && (item.value == value)) ? true : false
    })
    onChange({ navData })
  }

  render() {

    const {navData, handleSearch, label, searchValue} = this.props
    const str = ''
    return (
      <div>
      {searchValue?<i onClick={str=>{handleSearch(str)}}>x</i>:''}
        <input type="text" placeholder={label}  onChange={e=>{handleSearch(e)}} value={searchValue?searchValue:''}/>
        <BasicNav navData={navData} onChange={this.changeNav.bind(this)} />
      </div>
     
    )
  }
}

export default ListNav