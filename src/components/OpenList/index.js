import React from 'react'
import { Link } from 'react-router'
import './index.scss'

class OpenList extends React.Component {
  render() {
    const { typeName, detailLink, clickStar } = this.props
    const listData = this.props.listData || []
    return (
      <ul className="open-content-list">
      {
        listData.length !== 0 ?
        listData.map(( item, index ) => {
          return (
            <li>
              <div>
                <p className="open-list-start" onClick={() => {clickStar && clickStar(item)}}>
                  <i className="iconfont icon-star icon-start-hover"></i>
                  { item.checkedStar ? '' : <i className="iconfont icon-uncollected"></i> }
                </p>
                <Link className="open-content-info" to={detailLink + item[`${typeName}Id`]}>
                  <p className="open-info-name">{ item[`${typeName}Name`] }</p>
                  <span className="open-user-name"><i className="user-img"></i>极速数据(北京)</span>
                  <img className="" src={ item[`${typeName}Logo`] } alt="LOGO"/>
                  <span className="open-info-introduce">{ item[`${typeName}Desc`] }</span>
                </Link>
                <Link className="open-list-price">免费</Link>
                <p className="open-list-show">
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