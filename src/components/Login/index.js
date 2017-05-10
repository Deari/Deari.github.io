import React, { Component, PropTypes } from 'react'
import { login, logout } from 'utils/login'
import { getLoginDomain, getApiDomain, getSourceVal } from 'utils/domain'
import './login.scss'
import LoginSDK from 'utils/loginSDK'
export default class Container extends Component {
  static propTypes = {
    authenticated: PropTypes.bool,
  };

  static defaultProps = {
    authenticated: false
  };

  constructor (props) {
    super(props);
    this.state = {
      isLogin: false,
      userInfo : {}
    }
  }

  componentDidMount () {
    let sourceVal = getSourceVal()
    let checkUrl = getLoginDomain(`passport/session-check.json`)
    let loginUrl = getApiDomain(`#/login?source=${sourceVal}`)
    let callbackUrl = location.href
    
    LoginSDK.getStatus((status, data) => {
      if(status) {
        this.setState({isLogin: true, userInfo: data})
      }
    }, checkUrl)
  }

  handleLogin = ()=>{
    login()
  } 

  handleLogout() {
    logout(()=>{
      this.setState({isLogin: false})
    })
  }

  render (){

    const { userInfo } = this.state

    const sourceVal = getSourceVal()

    const register = getApiDomain(`#/register?source=${sourceVal}&callbackurl=${location.href}`)

    const centerUrl = getApiDomain(`#/center/userinfo`)

    return !this.state.isLogin ? (
      <div className="login-wrapper loginIn">
        <a href={register}><span>注册</span></a> 
        <a><span onClick={::this.handleLogin}>登录</span></a>
      </div>
    ) : (
      <div className="login-wrapper logined">
          <a href={centerUrl}><img src={userInfo.face} title={userInfo.nick} /></a>
          <span onClick={::this.handleLogout}>退出</span>
      </div>
    )
  }
}
