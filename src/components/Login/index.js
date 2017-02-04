import React, { Component, PropTypes } from 'react'
import LoginSDK from 'utils/loginSDK'
import { getLoginDomain, getApiDomain, getApiUrl, getSourceVal } from 'utils/domain'
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
    let sourceVal = getSourceVal()
    let url = getLoginDomain(`passport/session-check.json`)
    let loginUrl = getApiDomain(`#!/login?source=${sourceVal}`)
    let callbackUrl = location.href

    LoginSDK.getStatus((status, data) => {
      if (status) {
        // 已登录
        this.setState({isLogin: true, userInfo: data})
      } else {
        // 未登录
      }
    }, url, loginUrl, callbackUrl)
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

    const sourceVal = getSourceVal()

    const register = getApiDomain(`#/register?source=${sourceVal}&callbackurl=${location.href}`)

    const centerUrl = getApiDomain(`#/center/1`)

    return !this.state.isLogin ? (
      <div className="login-wrapper loginIn">
        <a href={register}><span>注册</span></a> 
        <a><span onClick={this.loginHandle}>登录</span></a>
      </div>
    ) : (
      <div className="login-wrapper logined">
          <a href={centerUrl}><img src={userInfo.face} title={userInfo.nick} /></a>
          <span onClick={this.clickQuit.bind(this)}>退出</span>
      </div>
    )
  }
}
