import React from 'react'
import { Link } from 'react-router'
import './index.scss'
import '../../styles/button.scss'

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
      <div>
        {
          data.map( (item, index) => (
            <div key={index} className="list-container">
              <div className="col-md-8 no-padding-left">
                <div className="info-img-container">
                  <div className="img-container">
                    <img src={item.appLogo} className="img-rounded" />
                  </div>
                </div>
                <div className="info-content">
                  <div className="info-name" title={item.name}>{showName + '名称 : '}{item.appName}</div>
                  <div className="info-name" title={item.state}>{showName + '介绍 : '}{item.appDesc}</div>
                  <Link to={linkUrl}>{'在' + showName + '市场查看详情'}</Link>
                </div>
              </div>
              <div className="col-md-2">{item.state}</div>
              <div className="col-md-2">
                <Link to={this.getLinkUrl.bind(this, item.developerId)}>
                  <button className="btn border-btn-black">管理</button>
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