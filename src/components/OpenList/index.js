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
          const desc = item[`${typeName}Function`] || item[`${typeName}Desc`]
          const price = item.hardwarePrice || '免费'
          return (
            <li>
              {/**<p className="open-list-start" onClick={() => {clickStar && clickStar(item)}}>
                <i className="iconfont icon-star icon-start-hover"></i>
                { item.checkedStar ? '' : <i className="iconfont icon-uncollected"></i> }
              </p>*/}
              <Link className="open-content-info" to={detailLink + item[`${typeName}Id`]}>
                <p className="open-info-name" title={ item[`${typeName}Name`] }>{ item[`${typeName}Name`] }</p>
                <span className="open-user-name" title={ item.developerName }><i className="user-img"></i>{ item.developerName }</span>
                <img className="open-list-img" src={ item[`${typeName}Logo`] } alt="LOGO"/>
                <span className="open-info-introduce" title={ desc }>{ desc }</span>
              </Link>
              <p className="open-list-price"><Link to={detailLink + item[`${typeName}Id`]}>查看</Link></p>
              {/**<p className="open-list-price">{ price } </p>
              <p className="open-list-show">
                <a><i className="iconfont icon-team"></i>165</a>
                <a><i className="iconfont icon-star"></i>251</a>
                <a><i className="iconfont icon-heart"></i>100</a>
              </p>*/}
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