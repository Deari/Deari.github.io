import React, { Component, PropTypes } from 'react'
import fetchUtil from 'utils/fetchUtil'
import debug from 'utils/debug'
import './login.scss'

export class Login extends Component {
  state = {
    errMsg: ''
  }

  clickLogin(e) {
    e.preventDefault()
    const userName = this.refs.userName.value
    const password = this.refs.password.value
    for(let i=0; i<userInfo.length; i++) {
      if (userInfo[i].userName == userName){
        if (userInfo[i].password == password) {
          this.setCookie(365)
          const searchArr = location.search.split("=")
          if (searchArr && searchArr[1]) {
            window.location.href = searchArr[2] ? `${searchArr[1]}=${searchArr[2]}` : searchArr[1]
          } else {
            window.location.href = location.origin
          }
          return false
        } else {
          (i == userInfo.length - 1) && this.setState({errMsg: '密码错误，请重新输入'})
        }
      } else {
        (i == userInfo.length - 1) && this.setState({errMsg: '账号不存在'})
      }
    }
  }

  setCookie(expiredays) {
    var exdate = new Date()
    exdate.setDate(exdate.getDate() + expiredays)
    document.cookie = `WG-PPC-test1=testmix; expires=${exdate.toGMTString()}`
    document.cookie = `WG-PPC-test2=testuid; expires=${exdate.toGMTString()}`
  }

  render() {
    const { errMsg } = this.state
    return (
      <div>
        <div className="login-header-wrapper">
          <div className="login-header-bg"></div>
          <div className="login-g-header container ">
            <h1 className="login-title pull-left ">
              <a className="login-logo" href="/"><i className="login-icon"></i><span className="login-text">BO开放平台</span></a>
              <small className="login-small-title">开发者平台</small>
            </h1>
          </div>
        </div>
        <div className="login-container">
          <div className="login-center">
            <h3>登录</h3>
            <div className="login-formBox">
              <div className="login-warnBox" style={{display: errMsg ? 'block' : 'none'}}>{errMsg}</div>
              <form className="login-form-content" onSubmit={this.clickLogin.bind(this)}>
                <div className="login-form-row">
                  <label>登录账号 </label>
                  <input className="login-conten-input" type="text" placeholder="请输入登录账号" ref="userName" />
                </div>
                <div className="login-form-row">
                  <label>登录密码 </label>
                  <input className="login-conten-input" type="password" placeholder="请输入登录密码" ref="password" />
                </div>
                <div className="login-form-row">
                  <label></label>
                  <button className="btn" type="submit">登录</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export const userInfo = [
  {userName: '13910999810', password: 'wanda123'},
  {userName: '18500738359', password: 'wanda123'},
  {userName: '18510000005', password: 'wanda123'},
  {userName: '18018500728', password: 'wanda123'},
  {userName: 'syzj', password: 'wanda123'},
  {userName: 'keruyun', password: 'wanda123'},
  {userName: 'getui', password: 'wanda123'},
]

export default store => ({
  path: 'login',
  component: Login
})
