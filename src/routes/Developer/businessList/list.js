import { Link } from 'react-router';
import React from 'react';
import './list.scss';

class List extends React.Component {
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
        <Link to='/developer/create/businessApp'><button className="btn btn-primary">+ 创建商家应用</button></Link>
        <div className="list-title">
          <div className="col-sm-8 no-padding-left">名称</div>
          <div className="col-sm-2 no-padding-left">状态</div>
          <div className="col-sm-2 no-padding-left">操作</div>
        </div>
        <div>
          {
            this.state.listData.map( (item, index) => (
              <div key={index} className="list-container">
                <div className="col-sm-8 no-padding-left">
                  <div className="info-img-container">
                    <div className="img-container">
                      <img src={item.url} className="img-thumbnail" />
                    </div>
                  </div>
                  <div className="info-content">
                    <div className="info-name" title={item.name}>{item.name}</div>
                    <div className="info-name" title={item.state}>{item.state}</div>
                  </div>
                </div>
                <div className="col-sm-2 no-padding-left list-item-center">{item.state}</div>
                <div className="col-sm-2 no-padding-left list-item-center">
                  <Link to='/counter'><button className="btn btn-sm btn-info">管理</button></Link>
                </div>
              </div>  
            ) )
          }
        </div>
      </div>
    )
  }
}

export default List;