import React from 'react'
import { Link } from 'react-router'
import List from '../../../../../components/List'
import './index.scss'
import '../../../../../styles/tools.scss'
import '../../../../../styles/button.scss'

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
      <div className="cContent">
        <div className="navThird">
          <ul>
            <li>待审核</li>
            <li>已审核</li>
          </ul>
        </div>
        <div className="ccContent">
          <div>
            <Link className="ccContentBtn" to='/developer/apps/create'>
              <div className="width110 float-right">
                <button className="btn btn-primary">+ 创建应用</button>
              </div>
            </Link>
            <div className="list-title">
              <div className="col-md-3">图例</div>
              <div className="col-md-5">应用介绍</div>
              <div className="col-md-2">状态</div>
              <div className="col-md-2">操作</div>
            </div>
            <List data={this.state.listData} showName="应用" linkUrl="/developer/apps/create" />
          </div>
        </div>
    </div>
    )
  }
}

export default AppsList;