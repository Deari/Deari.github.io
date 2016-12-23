import React from 'react'

class Relative extends React.Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
  }
  componentWillReceiveProps(nextProps) {
    console.log("nextProps", nextProps)
    let data = nextProps.data;
    this.setState({data: data});
  }
  render() {
    let data = this.state.data;
    return (
      <div>
      <ul className="clx">
        <li className="col-md-2 col-sm-2">
          <div className="Detail-appBox">
            <div className="Detail-appImg"></div>
            <h5>名称</h5>
            <p>类型</p>
            <button className="btn btn-default btn-xs">下载</button>
          </div>
        </li>
        <li className="col-md-2 col-sm-2">
          <div className="Detail-appBox">
            <div className="Detail-appImg"></div>
            <h5>名称</h5>
            <p>类型</p>
            <button className="btn btn-default btn-xs">下载</button>
          </div>
        </li>
        <li className="col-md-2 col-sm-2">
          <div className="Detail-appBox">
            <div className="Detail-appImg"></div>
            <h5>名称</h5>
            <p>类型</p>
            <button className="btn btn-default btn-xs">下载</button>
          </div>
        </li>
        <li className="col-md-2 col-sm-2">
          <div className="Detail-appBox">
            <div className="Detail-appImg"></div>
            <h5>名称</h5>
            <p>类型</p>
            <button className="btn btn-default btn-xs">下载</button>
          </div>
        </li>
      </ul>
      </div>
    )
  }
}

export default Relative;