import React from 'react'
import { Link } from 'react-router'
import './index.scss'
import '../../styles/_base.scss'
function choose(showName) {
  let name = '';
  switch (showName) {
    case '硬件':
      name = 'hardware'
      break;
    case '应用':
      name = 'app'
      break;
    default:
      name = 'widget'
  }
  return name
}
class List extends React.Component {;
  render() {
    const {data,showName} = this.props
    const name = choose(showName)
    const itemName = name === 'hardware' ? 'hardware' : 'app'
    return (
      <div className="listContent">
        {
          data.length == 0 ? <div className="list-none">没有更多数据了~</div> :
          data.map( (item, index) => (
            <div key={index} className="list-container">
              <div className="info-img-container w124">
                <div>
                  <img src={item[itemName+'Logo']} />
                </div>
              </div>
              <div className="info-content w342">
                <div className="info-name" title={item[itemName+'Name']}>{showName + '名称 : '}{item[itemName+'Name']}</div>
                <div className="info-introduce" title={item[itemName+'Desc']}>{showName + '介绍 : '}{item[itemName+'Desc']}</div>
                {/*<Link className="info-link" to={linkUrl}>{'在' + showName + '市场查看详情'}</Link>*/}
              </div>
              <div className="info-price w90">免费</div>
              <div className="info-status w90">{item.state}</div>
              <div className="info-download w90">100</div>
              <div className="info-btn w112">
                <Link className={
                  name!=='hardware'&&!item.codeId 
                  || item.reviewStatus==3 
                  || item.hardwareStatus==3 
                  || item.hardwareStatus==0 ? 
                  'active':'' 
                } 
                  to={name === 'hardware' ?'/' + name + '/edit/' + item[itemName+'Id']:'/' + name + 's/edit/' + item[itemName+'Id']}>
                  <button disabled={
                    name !== 'hardware'&&!item.codeId 
                    || item.reviewStatus == 3 
                    || item.hardwareStatus == 3
                    || item.hardwareStatus==0 ? 
                    false : true
                  }>编辑</button>
                </Link>
                <Link className={
                  item.codeId 
                  || item.hardwareStatus==2 ? 
                  'active': ''
                } 
                to={name === 'hardware' ?'/' + name + '/edit/' + item[itemName+'Id']:'/' + name + 's/edit/' + item[itemName+'Id']}>
                  <button disabled={
                    item.codeId 
                    || item.hardwareStatus == 2 ? 
                    false : true
                  }>发布新版本</button>
                </Link>
                <Link className={name === 'hardware' ? "active" : "" } 
                to={'/' + name + 's/edit/' + item[itemName+'id']}>
                  <button disabled={name === 'hardware' ? false : true}>调试硬件</button>
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