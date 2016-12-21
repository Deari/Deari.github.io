import React from 'react'
import './index.scss'
import Tab from '../../../../../components/Tab'
import Basic from './Basic'
import Platform from './Platform'
import fetchUtil from '../../../../utils/fetchUtil'
import fetch from '../../../../../../fetch'
const querystring = require('querystring');

class Info extends React.Component {
   state = {
    isSubmitted: false,
    appName: "",
    appLogo: "",
    appDesc: "",
    categoryId: ""
  }
  btnInfo = [
    {step: 2, nextName: "提交审核"},
    {step: 3, nextName: "完成"},
  ]
   save(e) {
     const puid = 123;
     const pLoginToken = 456;
     e.preventDefault();
     if (puid, pLoginToken) {
       console.log("click save");
       const appName = new FormData(this.refs.from).get('appName')
       // const categoryId = new FormData(this.refs.from).get('categoryId')
       const appDesc = new FormData(this.refs.from).get('appDesc')
       const appOption = new FormData(this.refs.from).get('appOption')
       const appTit = new FormData(this.refs.from).get('appTit')
       // const appLogo = new FormData(this.refs.from).get('appLogo')
       const appInformat = new FormData(this.refs.from).get('appInformat')
       const appVersion = new FormData(this.refs.from).get('appVersion')
       const data = {
         appName: appName,
         appLogo: '../img/12.jpg',
         appDesc: appDesc,
         categoryId: 13213,
         appOption: appOption,
         appInformat: appInformat,
         appVersion: appVersion
       }
       const url = 'http://api.intra.sit.ffan.net/bo/v1/web/developer/1/app'
       fetch(url, {
         method: "POST",
         headers: {
           "Content-Type": "application/x-www-form-urlencoded"
         },
         body: querystring.stringify(data)
       })
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
        		method="post" ref='from' enctype="application/x-www-form-urlencoded">
          <Tab isSubmitted={this.state.isSubmitted} linkUrl="/developer/apps/list" btnInfo={this.btnInfo}>
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