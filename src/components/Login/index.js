import React, { Component, PropTypes } from 'react'
import LoginSDK from 'utils/loginSDK'
import { getLoginDomain, getApiDomain } from 'utils/domain'
import './login.scss'

export default class Login extends Component {
  static propTypes = {
    authenticated: PropTypes.bool,
  };

  static defaultProps = {
    authenticated: false
  };

  constructor (props) {
    super(props);
    this.state = {
      isLogin : props.authenticated,
      userInfo : {}
    }
  }

  componentDidMount() {
    console.log("====1111111111=====")
    let url = getLoginDomain(`passport/session-check.json`)
    let loginUrl = getApiDomain(`#!/login/`)
    let callbackurl = `open.sit.ffan.net/apps`
    LoginSDK.getStatus((status, data) => {
      console.log("getStatus ", status, data)
      if (status) {
        // 已登录
        console.log("已登录 data ", data)
        this.setState({isLogin: true})
      } else {
        data = {
          face: "https://cloud.githubusercontent.com/assets/23731186/20859074/50d1502a-b98f-11e6-8073-a4862f5c9c15.png",
          mix_face: "https://cloud.githubusercontent.com/assets/23731186/20859074/50d1502a-b98f-11e6-8073-a4862f5c9c15.png",
          nick: "SeaDM",
          psrc: 0,
          puid: "0",
          uid: "M4OG7Bof9u8."
        }
        this.setState({isLogin: true, userInfo: data})
      }
    }, url)
  }

  clickQuit() {
    let quitUrl = getLoginDomain(`passport/session-remove.json`)
    LoginSDK.quit((status) => {
      console.log("quit ", status)
      if (status) {
        // 退出成功
        this.setState({isLogin: false})
      } else {
        // 退出失败
      }
    }, quitUrl)
  }

  registerHandle = ()=>{
    alert('show register modal');
  }

  loginHandle = ()=>{
    alert('show login modal');
  } 

  render (){

    const { userInfo } = this.state

    return !this.state.isLogin ? (
      <div className="login-wrapper loginIn">
          <span onClick={this.registerHandle}>注册</span> 
          <span onClick={this.loginHandle}>登录</span>
      </div>
    ) : (
      <div className="login-wrapper logined">
          <img src={userInfo.mix_face} title={userInfo.nick} />
          <span><a onClick={this.clickQuit.bind(this)}>退出</a></span>
      </div>
    )
  }
}
