import React, { Component, PropTypes } from 'react'
import fetchUtil from 'utils/fetchUtil'
import debug from 'utils/debug'
import './login.scss'

export class Login extends Component {
  clickLogin(e) {
    e.preventDefault()
    const userName = this.refs.userName.value
    const password = this.refs.password.value
    for(let i=0; i<userInfo.length; i++) {
      if (userInfo[i].userName == userName){
        if (userInfo[i].password == password) {
          debug.warn("登录成功")
          this.serCookie(365)
          const searchArr = location.search.split("=")
          if (searchArr && searchArr[1]) {
            window.location.href = searchArr[2] ? `${searchArr[1]}=${searchArr[2]}` : searchArr[1]
          } else {
            window.location.href = location.origin
          }
          return false
        } else {
          (i == userInfo.length - 1) && debug.warn("密码错误")
        }
      } else {
        (i == userInfo.length - 1) && debug.warn("用户不存在")
      }
    }
  }

  serCookie(expiredays) {
    var exdate = new Date()
    exdate.setDate(exdate.getDate() + expiredays)
    document.cookie = `WG-PPC-test1=testmix; expires=${exdate.toGMTString()}`
    document.cookie = `WG-PPC-test2=testuid; expires=${exdate.toGMTString()}`
  }

  render() {
    return (
      <form className="login-form-container" onSubmit={this.clickLogin.bind(this)}>
        <div className="content">
          <label>登录账号: </label>
          <input className="conten-input" type="text" placeholder="请输入登录账号" ref="userName" />
        </div>
        <div className="content">
          <label>登录密码: </label>
          <input className="conten-input" type="password" placeholder="请输入登录密码" ref="password" />
        </div>
        <button type="submit">登录</button>
      </form>
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
