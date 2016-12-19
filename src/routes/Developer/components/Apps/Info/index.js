import React from 'react'
import './index.scss'
import Tab from '../../../../../components/Tab'
import Basic from './Basic'
import Platform from './Platform'
import fetchUtil from '../../../../utils/fetchUtil'
import fetch from '../../../../../../fetch'
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
      console.log(this.refs.from)
      //const data = new FormData(this.refs.from)
      // const data = new FormData()
      // data.append("bar", "bar")
      // data.append("foo", 234)
      //console.log(JSON.stringify(data))
      const data ={
          appName: "213123",
          appLogo: "123123",
          appDesc: "412",
          categoryId: "666666"
      }
      const url = 'http://api.intra.sit.ffan.net/bo/v1/web/developer/1/app'
      fetch(url, {
                method: "POST",
                headers:{
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