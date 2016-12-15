import React from 'react'
import { Link } from 'react-router'
import List from '../../../../../components/List'
import './index.scss'

class AppsList extends React.Component {
  constructor() {
    super();
    this.state = {
      listData: [
        {url: "./a.jpg", developerId: 987, name: "namenamenamenamenamenamenamenamenamenamenamenamename one", state: 'state one'},
        {url: "./a.jpg", developerId: 876, name: "name two", state: 'two'},
        {url: "./a.jpg", developerId: 765, name: "name three", state: 'three'},
        {url: "./a.jpg", developerId: 654, name: "name four", state: 'four'},
      ]
    };
  }
  render() {
    return (
      <div className="container">
        <Link to='/developer/apps/create'><button className="btn btn-primary">+ 创建商家应用</button></Link>
        <div className="list-title">
          <div className="col-sm-2 no-padding-left">图例</div>
          <div className="col-sm-6 no-padding-left">应用介绍</div>
          <div className="col-sm-2 no-padding-left">状态</div>
          <div className="col-sm-2 no-padding-left">操作</div>
        </div>
        <List data={this.state.listData} showName="应用" linkUrl="/developer/apps/create" />
      </div>
    )
  }
}

export default AppsList;