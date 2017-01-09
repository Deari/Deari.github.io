import React from 'react'
import { Link } from 'react-router'
import './index.scss'
import '../../styles/_base.scss'
const choose = (showName) => {
  let name = '';
  switch (showName) {
    case 'hardware':
      name = '硬件'
      break;
    case 'app':
      name = '应用'
      break;
    default:
      name = '组件'
  }
  return name
}
const editJudge = (showName,item) => {
 return showName!=='hardware'&&!item.codeId || item.reviewStatus==3 || item.hardwareStatus==3 || item.hardwareStatus==0
}
const createJudge = (showName,item) => {
 return  item.codeId || item.hardwareStatus==2
}
class List extends React.Component {;
  render() {
    const {data, showName} = this.props
    const name = choose(showName)
    const itemName = showName === 'hardware' ? 'hardware' : 'app'
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
                <div className="info-name" title={item[itemName+'Name']}>
                  {name + '名称 : '}{item[itemName+'Name']}
                </div>
                <div className="info-introduce" title={item[itemName+'Desc']}>
                  {name + '介绍 : '}{item[itemName+'Desc']?item[itemName+'Desc']:item[itemName+'Function']}
                </div>
                {/*<Link className="info-link" to={linkUrl}>{'在' + name + '市场查看详情'}</Link>*/}
              </div>
              <div className="info-price w90">免费</div>
              <div className="info-status w90">{editJudge(showName, item)?'待提交' : createJudge(showName, item)? '已审核' : '待审核'}</div>
              <div className="info-download w90">100</div>
              <div className="info-btn w112">
                <Link className={editJudge(showName, item) ? 'active' : ''} 
                  to={showName === 'hardware' ?'/' + showName + '/edit/' + item[itemName+'Id']:'/' + showName + 's/edit/' + item[itemName+'Id']}>
                    <button disabled={editJudge(showName, item) ? false : true}>编辑</button>
                </Link>
                <Link className={createJudge(showName, item) ? 'active' : ''} 
                  to={showName === 'hardware' ?'/' + showName + '/edit/' + item[itemName+'Id']:'/' + showName + 's/edit/' + item[itemName+'Id']}>
                  <button disabled={createJudge(showName, item) ? false : true}>发布新版本</button>
                </Link>
                <Link className={showName === 'hardware' ? "active" : "none" } 
                to={'/' + showName + 's/edit/' + item[itemName+'id']}>
                  <button disabled={showName === 'hardware' ? false : true}>调试硬件</button>
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