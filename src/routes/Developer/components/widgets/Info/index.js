import React from 'react'
import './index.scss'
import Tab from '../../../../../components/Tab'
import Basic from './Basic'
import Platform from './Platform'

class Info extends React.Component {

  state = {
    isSubmitted: false,
    appName: "",
    appLogo: "",
    appDesc: "",
    categoryId: ""
  }
  fromList(){
    alert(1)
  }
  save(e) {
    e.preventDefault();
    this.fromList()
    
    this.setState({ isSubmitted: true });
    
    console.log(this.state)
  }

  render() {
    return (
      <div>
        <form className="container bo-form-container" onSubmit={this.save.bind(this)} >
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