import React from 'react'
import { Link } from 'react-router'
import './index.scss'
import 'styles/_base.scss'

class List extends React.Component {
  render() {
    const listData = this.props.listData || []
    const len = listData.length
    console.log(listData)
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
              <Link className="info-name" title={item.name} to={item.detailUrl}> 
                <span>{item.name}</span>
                { item.latestCodeVersion && <i className={item.appKind === 0 ?"icon-rnpng":item.appKind ===1 ?"icon-hpng":"icon-apkpng"}></i> }
              </Link>
              
              <div className="info-introduce">
                <p>AppID：{item.id}</p>
                <p>AppKEY：{item.appKey}</p>
              </div>
              { item.showOpenLink && <Link className="info-link" to={item.marketUrl}>{item.marketUrlTxt}<i className="iconfont icon-categoryindi"></i></Link> }
            </div>
            <div className="info-price w90">{item.price}</div>
            { item.status && <div className="w90 info-download"><div>{item.status}</div></div>}
            <div className="w190">
              { item.latestCodeVersion && <div className="info-status">
                <span className="info-status-info1">
                  <i className={item.latestActiveColor}></i>{item.latestCodeVersion}
                </span>
                <span className="info-status-info2">{item.latestStatusName}</span>
              </div>
              }
              { item.prevCodeVersion && <div className="info-status">
                <span className="info-status-info1">
                  <i className={item.prevActiveColor}></i>{item.prevCodeVersion}
                </span>
                <span className="info-status-info2">{item.prevStatusName}</span>
              </div>
              }
            </div>
            {/**<div className="info-download w90">{item.download}</div> */}
            <div className="info-btn w112">
             <Link className='active' to={item.detailUrl}><button>查看</button> </Link>
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