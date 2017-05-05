import React, { Component, PropTypes } from 'react'
import LoginSDK from 'utils/loginSDK'
import { getLoginDomain, getApiDomain, getSourceVal } from 'utils/domain'
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
    let loginUrl = getApiDomain(`#/login?source=${sourceVal}`)
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

  shouldComponentUpdate(nextProps, nextState) {
    const isLogin = this.checkIslogin()
    return true;
  }

  checkIslogin() {
    const cookie = document.cookie
    const cookieArr = cookie && cookie.split(";")
    const cookieObj = {
      mix: false,
      uid: false
    }
    cookieArr.length > 0 && cookieArr.map((item, index) => {
      const arr = item.toString().split("=")
      const name = arr && arr.length > 0 && arr[0].trim()
      const value = arr && arr.length > 0 && arr[1].trim()
      if (name == "WG-PPC-test1" && value) {
        cookieObj.mix = true
      }
      if (name == "WG-PPC-test2" && value) {
        cookieObj.uid = true
      }
    })
    if (!(cookieObj.mix && cookieObj.uid)) {
      const origin = location.origin
      const href = location.href
      window.location.href = `${origin}/login?callbackurl=${href}`
    } 
  }

  componentDidMount() {
    this.checkIslogin()
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
