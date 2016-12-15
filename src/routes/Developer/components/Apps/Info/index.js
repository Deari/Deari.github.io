import React from 'react'
import './index.scss'
import Tab from '../../../../../components/Tab'
import Basic from './Basic'
import Platform from './Platform'

class Info extends React.Component {
  constructor() {
    super();
    this.state = {
      isSubmitted: false
    };
  }
  save(e) {
    e.preventDefault();
    console.log("click save");
    this.setState({isSubmitted: true});
  }
  render() {
    return (
      <div>
        <form className="container bo-form-container" onSubmit={this.save.bind(this)} >
          <Tab isSubmitted={this.state.isSubmitted} linkUrl="/developer/apps/list">
            <div name="填写基本信息"><Basic /></div>
            <div name="填写平台信息"><Platform /></div>
            <div name="提交成功">
              <div className="success-container">提交成功，等待审核</div>
            </div>
          </Tab>
        </form>
      </div>
    )
  }
}

export default Info;