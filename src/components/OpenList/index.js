import React from 'react'
import { IndexLink, Link } from 'react-router'
import './index.scss'

class OpenList extends React.Component {
  state = {
    listData: [],
    typeName: ''
  }
  componentWillReceiveProps( nextProps ) {
    if ( !nextProps.listData ) return
    const { listData, typeName } = nextProps
    this.setState({ listData: listData, typeName: typeName})
  }
  render() {
    const { listData, typeName } = this.state
    return (
      <ul className="open-content-list">
      {
        listData.length !== 0 ?
        listData.map(( item, index ) => {
          return (
            <li>
              <div>
                <p className="open-list-start">
                  <i className="iconfont icon-star icon-start-hover"></i>
                  <i className="iconfont icon-uncollected"></i>
                </p>
                <Link to={ `/open/${typeName}s/detail/${item[`${typeName}Id`]}` }>
                <p className="pt10">{ item[`${typeName}Name`] }</p>
                <span className="font-hidden font-nowrap"><i className="user-img"></i>极速数据(北京)</span>
                <img className="" src={ item[`${typeName}Logo`] } alt="LOGO"/>
                <span className="font-hidden">{ item[`${typeName}Desc`] }</span>
              </Link>
              <Link className="open-list-price">免费</Link>
              <p>
                <a><i className="iconfont icon-team"></i>165</a>
                <a><i className="iconfont icon-star"></i>251</a>
                <a><i className="iconfont icon-toparrow"></i>100%</a>
              </p>
              </div>
            </li>
          )
        }) :
        <p>暂无数据</p>
      }
      </ul>
    )
  }
}

export default OpenList
