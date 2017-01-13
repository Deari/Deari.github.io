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
              <Link className="info-img" to={item.id}>
                <img src={item.logo} />
              </Link>
            </div>
            <div className="info-content w342">
              <Link className="info-name" title={item.name} to={item.id}>
                {item.name}
              </Link>
              <Link className="info-introduce" title={item.desc} to={item.id}>
                {item.desc}
              </Link>
            </div>
            <div className="info-price w90">免费</div>
            <div className="info-status w90">{item.status}</div>
            <div className="info-download w90">100</div>
            <div className="info-btn w112">
              <Link>
                <button disabled={true}>编辑</button>
              </Link>
              <Link>
                <button disabled={true}>发布新版本</button>
              </Link>
              <Link>
                <button disabled={true}>调试硬件</button>
              </Link>
            </div>
          </div>
        ) )
      }
      </div>
    )
  }
}

export default List;