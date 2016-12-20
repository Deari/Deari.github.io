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
    categoryId: ""
  }
  async save(e) {
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
         categoryId: 4,
         platform: 2,

       }
       const vesion = {}
      
       const url = 'http://10.1.115.14:8006/bo/v1/web/developer/1/app'
       const res = await fetch(url, {
         method: "POST",
         headers: {
           "Content-Type": "application/x-www-form-urlencoded"
         },
         body: data
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