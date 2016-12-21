import React from 'react'
import './index.scss'
import Tab from '../../../../../components/Tab'
import Basic from './Basic'
import Platform from './Platform'
import fetch from '../../../../../../fetch'

class Info extends React.Component {
   state = {
    isSubmitted: false,
    categoryId: "",
    appLogo:"",
    appTages:[]
  }
  async save(e) {
     const puid = 123;
     const pLoginToken = 456;
     e.preventDefault();
     if (puid, pLoginToken) {
       console.log("click save");
       const formData = new FormData(this.refs.from)
       const tageList = this.state.appTages
       var data = new FormData();
       data.append("appName", formData.get('appName'));
       data.append("appLogo", this.state.appLogo);
       data.append("appDesc", formData.get('appDesc'));
       data.append("categoryId", formData.get('appOption'));
       data.append("platform", 2);
       for (var i = 0; i < tageList.length; i++) {
         data.append("tags[]", tageList[i]);
       }
       const url = 'http://api.intra.sit.ffan.net/bo/v1/web/developer/app'
       const res = await fetch(url, {
         method: "POST",
         body: data
       })
       const resp = await res.json();
       const id = resp.data.app.appId;
       const verUrl = `http://api.intra.sit.ffan.net/bo/v1/web/developer/app/${id}/code`
       console.log(verUrl)
       var verData = new FormData();
       verData.append("fileName", this.state.fileName);
       verData.append("fileLink", this.state.fileLink);
       verData.append("codeDesc", formData.get('codeDesc'));
       //data.append("",this.state.fileLink);
       data.append("rnFrameworkVersion", 2);
       const verRes = await fetch(url, {
         method: "POST",
         body: verData
       })
       this.setState({ isSubmitted: true });
     }
  }

  onSelected(appLogo,appTages){
      this.setState({appLogo:appLogo,appTages:appTages})
  }
  fileSelected(){

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
            <div name="填写基本信息"><Basic onFinish={::this.onSelected}/></div>
            <div name="填写平台信息"><Platform onFinish={::this.fileSelected}/></div>
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