import React from 'react'
import './index.scss'
import Tab from '../../../../../components/Tab'
import Basic from './Basic'
import Platform from './Platform'
import fetchUtil from '../../../../utils/fetchUtil'

class Info extends React.Component {
   state = {
    isSubmitted: false,
    appName: "",
    appLogo: "",
    appDesc: "",
    categoryId: ""
  }
  save(e) {
    const puid = 123;
    const pLoginToken = 456;
    e.preventDefault();
    if (puid, pLoginToken) {
      console.log("click save");
      //console.log(this.refs.from)
      const app = new FormData(this.refs.from)
      const url = 'http://api.intra.sit.ffan.net/bo/v1/web/developer/1/app'
      fetchUtil.postJSON(url,app)
      this.setState({ isSubmitted: true });
    }
  }
  render() {
    return (
      <div className="cContent bg-white cContent-onenav">
        <div className="cContent-nav">
          <h3>创建应用</h3>
        </div>
        <form className="bo-form-container" onSubmit={this.save.bind(this)}
        		method="post" ref='from' >
          <Tab isSubmitted={this.state.isSubmitted} linkUrl="/developer/apps/list">
            <div name="填写基本信息"><Basic/></div>
            <div name="填写平台信息"><Platform/></div>
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