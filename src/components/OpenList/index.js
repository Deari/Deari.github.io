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
          const price = item.hardwarePrice || 0
          const download = item.downloadCount || 0
          const likeCount = item.likeCount || 0
          const defaultLayout = item.defaultLayout
          return (
            <li>
              {
              typeName==='hardware'?
              <p className="open-list-start" onClick={() => {clickStar && clickStar(item)}}>
                <i className="iconfont icon-star icon-start-hover"></i>
                { item.checkedStar ? '' : <i className="iconfont icon-uncollected icon-uncollected1"></i> }
              </p>:''
              }
              <Link className="open-content-info" to={detailLink + item[`${typeName}Id`]}>
                <p className="open-info-name" title={ item[`${typeName}Name`] }>{ item[`${typeName}Name`] }</p>
                <span className="open-user-name" title={ item.developerName }><i className="user-img"></i>{ item.developerName }</span>
                <img className="open-list-img" src={ item[`${typeName}Logo`] } alt="LOGO"/>
                {
                  defaultLayout?<p className='sizeTxt'>尺寸：<i>{defaultLayout.w}*{defaultLayout.h}</i></p>:''
                }
                <span className="open-info-introduce" title={ desc }>{ desc }</span>
              </Link>
              <div>
                <Link to={detailLink + item[`${typeName}Id`]}>
                  <p className="open-list-price">
                    { price == 0 ? '免费' : 
                      typeName==='hardware' ? <span>{price} 元</span> :
                      <span><i className="iconfont icon-rmb"></i>{price}</span> }
                  </p>
                </Link>
                <p className="open-list-show">
                  { typeName==='hardware' ? 
                  <a><i className="iconfont icon-sold"></i>已售251</a> : 
                  <a><i className="iconfont icon-team"></i> {download}</a> }
                  { typeName==='hardware' ? 
                  <a><i className="iconfont icon-hands"></i>好评率100%</a> : 
                  <a><i className="iconfont icon-star"></i> {likeCount}</a> }
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