import React from 'react'
import Version from '../../../../../components/Version'
import './index.scss'
import '../../../../../styles/base.scss'
import '../../../../../styles/button.scss'

class AppsDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      showVersion: false,
      data: {
        codeVersion: '0.2.0.2312',
        code_desc: 'asdfasdfasdfasdfasdsdfa'
      }
    };
  }
  showBasicInfo() {
    this.setState({showVersion: false});
  }
  showVersion() {
    this.setState({showVersion: true});
  }
  render() {
    return (
      <div className="cContent">
        <div className="navThird">
          <ul>
            <li className={this.state.showVersion ? '' : 'navThirdHover'} 
                onClick={this.showBasicInfo.bind(this)}>基本信息</li>
            <li className={this.state.showVersion ? 'navThirdHover' : ''} 
                onClick={this.showVersion.bind(this)}>版本管理</li>
          </ul>
        </div>
        <div className="ccContent">
        {
          this.state.showVersion ? 
          <Version data={this.state.data} linkUrl="/developer/apps/876/edit" /> :
          <BasicInfo />
        }
        </div>
      </div>
    )
  }
}

class BasicInfo extends React.Component {
  render() {
    return (
      <div>
        <img />
        应用名称: 名称
        分类：分类3
        描述：撒打发斯蒂芬
        标签：标签一 标签二
      </div>

    )
  }
}

export default AppsDetail;