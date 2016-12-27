import React from 'react'
import { Link } from 'react-router'
import './index.scss'
import '../../styles/button.scss'
import '../../styles/tools.scss'

class List extends React.Component {;
    state = {
      name: 'app'
    };

  componentWillReceiveProps(nextProps) {
    this.setState({
      name: this.props.showName === '应用' ? 'app' : this.props.showName === '组件' ? 'widget' :'hardware'
    })
  }
  render() {
    const {data,showName,linkUrl} = this.props
    console.log(data)
    const {name} = this.state
    return (
      <div className="listContent">
        {
          data.length == 0 ? <div className="list-none">没有更多数据了~</div> :
          data.map( (item, index) => (
            <div key={index} className="list-container">
              <div className="info-img-container w124">
                <div>
                  <img src={item[name+'Logo']} />
                </div>
              </div>
              <div className="info-content w342">
                <div className="info-name" title={item[name+'Name']}>{showName + '名称 : '}{item[name+'Name']}</div>
                <div className="info-introduce" title={item[name+'Desc']}>{showName + '介绍 : '}{item[name+'Desc']}</div>
                {/*<Link className="info-link" to={linkUrl}>{'在' + showName + '市场查看详情'}</Link>*/}
              </div>
              <div className="info-price w90">免费</div>
              <div className="info-status w90">{item.state}</div>
              <div className="info-download w90">100</div>
              <div className="info-btn w114">
                <Link className={name === 'hardware' ? "no-active" : item[name+'id'] ? '':"no-active" } to={'/developer/' + name + 's/detail/' + item[name+'id']}>
                  <button>编辑</button>
                </Link>
                <Link className={name === 'hardware' ? "no-active" : item[name+'id'] ? "no-active": ''} to={'/developer/' + name + 's/detail/' + item[name+'id']}>
                  <button>发布新版本</button>
                </Link>
                <Link className={name === 'hardware' ? "" : "no-active" } to={'/developer/' + name + 's/detail/' + item[name+'id']}>
                  <button>调试硬件</button>
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