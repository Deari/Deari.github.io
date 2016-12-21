import React from 'react'
import './index.scss'
import Tab from '../../../../../components/Tab'
import Basic from './Basic'
import Platform from './Platform'
import fetchUtil from '../../../../utils/fetchUtil'
import fetch from '../../../../../../fetch'
const querystring = require('querystring');

class Info extends React.Component {
  clickNext() {
    return {
      status: 200
    }
  }
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
       const formData = new FormData(this.refs.from) 
       const appName = formData.get('appName')
       // const categoryId = new FormData(this.refs.from).get('categoryId')
       // const appLogo = new FormData(this.refs.from).get('appLogo')
       const data = {
         appName: formData.get('appName'),
         appLogo: '../img/12.jpg',
         appDesc: formData.get('appDesc'),
         categoryId: 4      
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
          <Tab linkUrl="/developer/apps/list" btnInfo={this.btnInfo} onClickNext={this.clickNext.bind(this)}>
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