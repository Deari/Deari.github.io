import React from 'react'
import { Link } from 'react-router'
import './index.scss'
import '../../styles/button.scss'
import '../../styles/tools.scss'

class List extends React.Component {
  getLinkUrl(developerId) {
    var name = this.props.showName === '应用' ? 'apps' : 'widgets';
    return  '/developer/' + name + '/' + developerId + '/detail'
  }
  render() {
    var data = this.props.data;
    var showName = this.props.showName;
    var linkUrl = this.props.linkUrl;
    return (
      <div className="listContent">
        {
          data.map( (item, index) => (
            <div key={index} className="list-container">
              <div className="info-img-container col-md-2">
                <div>
                  <img src={item.appLogo} />
                </div>
              </div>
              <div className="info-content col-md-6">
                <div className="info-name" title={item.name}>{showName + '名称 : '}{item.appName}</div>
                <div className="info-introduce" title={item.state}>{showName + '介绍 : '}{item.appDesc}</div>
                <Link className="info-link" to={linkUrl}>{'在' + showName + '市场查看详情'}</Link>
              </div>
              <div className="info-status col-md-2">46sjjasgdadshgjhagdgasdhgj</div>
              <div className="info-btn col-md-2">
                <Link to={this.getLinkUrl.bind(this, item.developerId)}>
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