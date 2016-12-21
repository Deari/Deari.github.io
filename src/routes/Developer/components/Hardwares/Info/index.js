import React from 'react'
import './index.scss'
import Tab from '../../../../../components/Tab'
import Basic from './Basic'
import Platform from './Platform'
import fetchUtil from '../../../../utils/fetchUtil'

class Info extends React.Component {
  constructor() {
    super();
    this.state = {
      isSubmitted: false,
    };
  }
  render() {
    return (
      <div className="cContent bg-white cContent-onenav">
        <div className="cContent-nav">
          <h3>创建硬件</h3>
        </div>
        <div className="bo-form-container">
          <Tab isSubmitted={this.state.isSubmitted} linkUrl="/developer/apps/list">
            <div name="功能录入"><Basic/></div>
            <div name="获取SDK"><Basic/></div>
            <div name="设备调试"><Basic/></div>
            <div name="准备上线"><Basic/></div>
          </Tab>
        </div>
      </div>
    )
  }
}

export default Info;