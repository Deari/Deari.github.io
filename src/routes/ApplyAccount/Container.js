import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import SideBar from 'business/SideBar'
import { getEnvDomain } from 'utils/d'
import fetchUtil from 'utils/fetch'
import s from './index-new.scss'

class Analytics extends Component {
  state = {
    allowGetCode: true,
    allowGetCodeTime: 60,
    hasAccount: true,
    account: {
      uname: 'mock_username',
      pwd: 'mock_password'
    }
  }

  getAccount() {
    const url = getEnvDomain()+'/xxxx'
    return fetchUtil.getJSON(url, {})
  }

  componentDidMount() {
    this.getAccount().then(amount => {
      this.renderWithAccount(account)
    }).catch(e=>{
      this.renderWithApplyAccount()
    })
  }

  renderWithAccount(account) {
    this.setState({ hasAccount: false, account })
  }

  renderWithApplyAccount() {
    this.setState({ hasAccount: false })
  }
  
  resetGetCode () {
    this.setState({ allowGetCode: true })
  }

  setTimeoutForGetCode () {
    let interval = setInterval(()=>{
      let time = this.state.allowGetCodeTime;
      if(time>0) {
        this.setState({ allowGetCodeTime: --time })
      } else {
        clearInterval(interval)
        this.resetGetCode()
      }
    }, 1000)
  }

  getCode () {
    if(!this.state.allowGetCode) {
      return
    }
    this.setState({
      allowGetCode: false
    }, ()=>{
      fetchUtil.getJSON('/getCode', {}).then(data => {
        alert('验证码已发送!')
        this.setTimeoutForGetCode()
      }).catch(e=>{
        alert('获取验证码失败，请重试！')
        this.resetGetCode()
      })
    })
  }

  submitHandler() {
    const phone = findDOMNode(this.refs.phone).nodeValue.trim()
    const code = findDOMNode(this.refs.code).nodeValue.trim()
    if(!phone || !code ) {
      return alert('填写手机号以及验证码')
    }

    fetchUtil.postJSON('/postAccount', {
      phone, code
    }).then(account => {
      this.renderWithAccount(account)
    }).catch(e=>{
      alert('获取商家测试账号失败，请重试!')
    })
  }


  render() {
    const { hasAccount, account, allowGetCode } = this.state
    let Account = (
      <div className={s.apply}>
        <input 
          className={s.phone} 
          type="text" 
          ref="phone"
          placeholder='请收入手机号' 
        />
        <div>
          <input 
            className={s.code} 
            type="text" 
            ref="code"
            placeholder='请输入验证码' 
          />
          <button 
            onClick={::this.getCode} 
            disabled={!allowGetCode}
            className={s.getCodeBtn} 
          >
            { allowGetCode ? '获取验证码' : allowGetCodeTime }
          </button>
        </div>
        <button className={s.submit} onClick={::this.submitHandler}>获得商家测试账号</button>
      </div>
    );

    if(hasAccount) {
      Account = <div className={s.account}>
        <span>商家测试账号</span>
        <span>默认账号：{account.uname}</span>
        <span>默认密码：{account.pwd}</span>
      </div>
    }

    return (
      <div className={`container`} >
        <SideBar></SideBar>
        <div className={s.content}>
          <h1>测试账号</h1>
          <span className={s.status}>
            您{hasAccount ? '已获得' : '还没有获得'}
          </span>
          <div className={s.desc}>
            获得商家测试账号后，你将可以使用API市场中的接口，在你自身服务器上接受商家的信息。
            但是，这里需要注意：
            <ul>
              <li>1、每位开发者有且只有一个商家测试账号。</li>
              <li>2、每位开发者获得属于自己的商家测试账号后，此账号不可分享给其他开发者使用。</li>
              <li>3、下载开发者的Pad端，安装成功后，使用商家测试账号登录，可在应用市场浏览属于开发者自己开发的应用、组件，并进行调试。</li>
            </ul>
          </div>
          { Account }
        </div>
      </div>
    )
  }
}

export default Analytics
