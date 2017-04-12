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
      <div className="list-header-nav">
        <div className="list-header-search">
          {searchValue?<i className="iconfont icon-close" onClick={str=>{handleSearch(str)}}></i>:''}
           <i className="iconfont icon-search"></i>
          <input type="text" placeholder={label}  onChange={e=>{handleSearch(e)}} value={searchValue?searchValue:''}/>
        </div>
        <BasicNav navData={navData} onChange={this.changeNav.bind(this)} />
      </div>
     
    )
  }
}

export default ListNav