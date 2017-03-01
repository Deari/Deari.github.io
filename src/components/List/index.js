import React from 'react'
import { Link } from 'react-router'
import './index.scss'
import 'styles/_base.scss'

class List extends React.Component {
  render() {
    const listData = this.props.listData || []
    const len = listData.length
    return (
      <div className="listContent">
      {
        len == 0 ? <div className="list-none">没有更多数据了~</div> :
        listData.map( (item, index) => (
          <div key={index} className="list-container">
            <div className="info-img-container w124">
              <Link className="info-img" to={item.detailUrl}> <img src={item.logo} /> </Link>
            </div>
            <div className="info-content w332">
              <Link className="info-name" title={item.name} to={item.detailUrl}> <span>{item.name}</span><i className={item.appKind === 0 ?"icon-rnpng":item.appKind ===1 ?"icon-hpng":"icon-apkpng"}></i> </Link>
              <Link className="info-introduce" title={item.desc} to={item.detailUrl}> {item.desc} </Link>
              <Link className="info-link" to={item.marketUrl}>{item.marketUrlTxt}<i className="iconfont icon-categoryindi"></i></Link>
            </div>
            <div className="info-price w90">{item.price}</div>
            <div className="info-status w100">
              <span className="info-status-info1"><i  className={item.statusObj.activeColor=="red"?"color-red":item.statusObj.activeColor=="green"?"color-green":""}></i>{item.codeVersion}</span>
              <span className="info-status-info2">{item.statusObj.status}</span>
            </div>
            <div className="info-download w90">{item.download}</div>
            <div className="info-btn w112">
             {
              item.btnData.map( (btn, btnIndex) => (
                <Link key={btnIndex} className={(btn.active && 'active') || ''} to={btn.url}> 
                  <button disabled={btn.active ? false : true}>{btn.name}</button> 
                </Link>
              ) )
             } 
            </div>
          </div>
        ) )
      }
      </div>
    )
  }
}

export default List;