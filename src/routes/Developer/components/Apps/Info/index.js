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
   state = {
    isSubmitted: false,
    appName: "",
    appLogo: "",
    appDesc: "",
    categoryId: ""
  }
  fromList(data){
    alert(1)
  }
  save(e) {
    const puid = 123;
    const pLoginToken = 456;
    e.preventDefault();
    console.log("click save");
    this.fromList()
    if(puid,pLoginToken){
      this.setState({isSubmitted: true});  
    }
    console.log(this.state)
  }
  render() {
    return (
      <div className="cContent bg-white cContent-onenav">
        <div className="cContent-nav">
          <h3>创建应用</h3>
        </div>
        <form className="bo-form-container" onSubmit={this.save.bind(this)}
            action={`http://10.1.115.14:8006/bo/v1/web/developer/1/app`}
        		method="post" >
          <Tab isSubmitted={this.state.isSubmitted} linkUrl="/developer/apps/list">
            <div name="填写基本信息"><Basic onChange={::this.fromList}/></div>
            <div name="填写平台信息"><Platform onChange={::this.fromList}/></div>
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