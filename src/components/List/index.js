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
          data.map( (item, index) => (
            <div key={index} className="list-container">
              <div className="col-md-8 no-padding-left">
                <div className="info-img-container">
                  <div className="img-container">
                    <img src={item[name+'Logo']} className="img-rounded" />
                  </div>
                </div>
                <div className="info-content">
                  <div className="info-name" title={item[name+'Name']}>{showName + '名称 : '}{item[name+'Name']}</div>
                  <div className="info-name" title={item[name+'Desc']}>{showName + '介绍 : '}{item[name+'Desc']}</div>
                  <Link to={linkUrl}>{'在' + showName + '市场查看详情'}</Link>
                </div>
              </div>
              <div className="col-md-2">{item.state}</div>
              <div className="col-md-2">
                <Link to={'/developer/' + name + 's/detail/' + item.developerId}>
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