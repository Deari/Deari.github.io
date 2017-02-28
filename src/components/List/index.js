import React from 'react'
import { Link } from 'react-router'
import './index.scss'
import 'styles/_base.scss'

class List extends React.Component {
  render() {

    const listData = this.props.listData || []
    //console.log(listData)
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
            <div className="info-content w342">
              <Link className="info-name" title={item.name} to={item.detailUrl}> {item.name}<i className={item.isH5App?"icon-hpng":"icon-rnpng"}></i> </Link>
              <Link className="info-introduce" title={item.desc} to={item.detailUrl}> {item.desc} </Link>
              <Link className="info-link" to={item.marketUrl}>在应用市场中查看<i className="iconfont icon-categoryindi"></i></Link>
            </div>
            <div className="info-price w90">{item.price}</div>
            <div className="info-status w90"><i></i><span>{item.statusObj.status}</span><span>{item.codeVersion}</span></div>
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