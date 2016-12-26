import React from 'react'
import { Link } from 'react-router'
import './index.scss'
import '../../styles/button.scss'
import '../../styles/tools.scss'

class List extends React.Component {
  constructor() {
    super();
    this.state = {
      name: 'app'
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      name: this.props.showName === '应用' ? 'app' : 'widget'
    })
  }
  render() {
    var data = this.props.data,
        showName = this.props.showName,
        linkUrl = this.props.linkUrl,
        name = this.state.name;
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
                <Link className="info-link" to={linkUrl}>{'在' + showName + '市场查看详情'}</Link>
              </div>
              <div className="w90">免费</div>
              <div className="info-status w90">{item.state}</div>
              <div className="w90">已下载</div>
              <div className="info-btn w114">
                <Link to={'/developer/' + name + 's/detail/' + item.appId}>
                  <button className="btn btn-default">管理</button>
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