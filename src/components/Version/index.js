import React from 'react'
import { Link } from 'react-router'
import './index.scss'

class Version extends React.Component {
  constructor() {
    super();
    this.state = {
      showAll: false
    }
  }
  changeState() {
    this.setState({showAll: !this.state.showAll});
  }
  render() {
    var linkUrl = this.props.linkUrl;
    var data = this.props.data;
    return this.state.showAll ? 
           <AllVersions data={data} changeState={this.changeState.bind(this)}/> : 
           <LastVersion data={data} linkUrl={linkUrl} changeState={this.changeState.bind(this)}/>  
  }
}

class LastVersion extends React.Component {
  showAllVersions(e) {
    e.preventDefault();
    this.props.changeState();
  }
  render() {
    var linkUrl = this.props.linkUrl;
    var data = this.props.data;
    console.log(data)
    return (
      <div className="container">
          <h5 className="version-title">版本管理</h5>
          <hr />
          <div className="version-container">
            <dl className="dl-horizontal">
              <dt className="col-sm-2">版本号 ：</dt>
              <dd className="col-sm-10">{data.codeVersion}</dd>
              <dt className="col-sm-12">版本介绍 ：</dt>
              <dt className="col-sm-12">
                <textarea className="col-sm-12" rows="5" disabled>{data.codeDesc}</textarea>
              </dt>
              <dt className="col-sm-12">
                <a href="javascript:;" onClick={this.showAllVersions.bind(this)}>查看历史版本</a>
              </dt>
            </dl>
          </div>
          <hr />
          <Link to={linkUrl}><button className="btn btn-primary version-btn">+ 发布新版本</button></Link>
      </div>
    )
  }
}

class AllVersions extends React.Component {
  showAllVersions(e) {
    e.preventDefault();
    this.props.changeState();
  }
  render() {
    var data = this.props.data;
    return (
      <div className="container">
        <div className="col-sm-12">
          <a href="javascript:;" onClick={this.showAllVersions.bind(this)}>返回当前版本</a>
        </div>
        <div className="version-title">版本记录</div>
        <hr />
        {JSON.stringify(data)}
      </div>
    )
  }
}

export default Version;