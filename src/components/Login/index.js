import React, { Component, PropTypes } from 'react'
import LoginSDK from 'utils/loginSDK'
import { getLoginDomain, getApiDomain, getApiUrl } from 'utils/domain'
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

  login() {
    let url = getLoginDomain(`passport/session-check.json`)
    let loginUrl = getApiDomain(`#!/login/`)
    let callbackurl = location.href

    LoginSDK.getStatus((status, data) => {
      if (status) {
        // 已登录
        this.setState({isLogin: true, userInfo: data})
      } else {
        // 未登录
      }
    }, url, loginUrl, callbackurl)
  }

  componentDidMount() {
    let url = getLoginDomain(`passport/session-check.json`)

    LoginSDK.getStatus((status, data) => {
      if (status) this.setState({isLogin: true, userInfo: data}) 
    }, url)
  }

  clickQuit() {
    let quitUrl = getLoginDomain(`passport/session-remove.json`)
    LoginSDK.quit((status) => {
      if (status) {
        // 退出成功
        this.setState({isLogin: false})
      } else {
        // 退出失败
      }
    }, quitUrl)
  }

  loginHandle = ()=>{
    this.login()
  } 

  render (){

    const { userInfo } = this.state

    const register = getApiDomain(`#/register?callbackurl=${location.href}`)

    return !this.state.isLogin ? (
      <div className="login-wrapper loginIn">
        <a href={register}><span>注册</span></a> 
        <a><span onClick={this.loginHandle}>登录</span></a>
      </div>
    ) : (
      <div className="login-wrapper logined">
          <img src={userInfo.mix_face} title={userInfo.nick} />
          <a onClick={this.clickQuit.bind(this)}><span>退出</span></a>
      </div>
    )
  }
}
