import React from 'react'
import { Link } from 'react-router'
import List from '../../../../../components/List'

class AppsDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      listData: [
        {url: "./a.jpg", name: "namenamenamenamenamenamenamenamenamenamenamenamename one", state: 'state one'},
        {url: "./a.jpg", name: "name two", state: 'two'},
        {url: "./a.jpg", name: "name three", state: 'three'},
        {url: "./a.jpg", name: "name four", state: 'four'},
      ]
    };
  }
  render() {
    return (
      <div className="container">
        <div className="list-title">
          <div className="col-sm-8 no-padding-left">名称</div>
          <div className="col-sm-2 no-padding-left">状态</div>
          <div className="col-sm-2 no-padding-left">操作</div>
        </div>
      </div>
    )
  }
}

export default AppsDetail;