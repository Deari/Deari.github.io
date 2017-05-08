import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import SideBar from 'business/SideBar'
import { getEnvDomain, getXapiComDomain } from 'utils/d'
import { getLoginDomain, getApiDomain, getSourceVal } from 'utils/domain'
import fetchUtil from 'utils/fetch'
import s from './index-new.scss'
import { PageTypes, getPageLinks } from 'config/index'

class Analytics extends Component {
  state = {
    allowGetCode: true,
    allowGetCodeTime: 60,
    hasAccount: false,
    downloadUrl: '',
    account: {
      userName: 'mock_username',
      password: 'mock_password'
    }
  }

  getAccount() {
    const url = getEnvDomain()+'/bow/v1/account'
    
    return fetchUtil.getJSON(url, {
      clientType: 1
    })
  }

  componentDidMount() {
    this.getAccount().then(account => {
      this.renderWithAccount(account)
    }).catch(e=>{
      console.log(e)
      this.renderWithApplyAccount()
    })
    this.getDownloadUrl()
  }

  renderWithAccount(account) {
    this.setState({ 
      hasAccount: true, 
      account
    })
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
    const phone = findDOMNode(this.refs.phone).value.trim()
    const url = getEnvDomain()+'/bow/v1/verifycodes'
    if(!phone) {
      return alert('请填写手机号！！')
    }
    if(!this.state.allowGetCode) {
      return
    }
    this.setState({
      allowGetCode: false
    }, ()=>{
      fetchUtil.postJSON(url, {
        phone,
        clientType: 1
      }).then(data => {
        alert('验证码已发送!')
        this.setTimeoutForGetCode()
      }).catch(e=>{
        this.resetGetCode()
        const { status, message } = e;
        const _msg = message || '获取验证码失败，请重试！'
        alert(`${_msg}(错误码：${status})`)
      })
    })
  }

  getDownloadUrl () {
    const url = getXapiComDomain()+'/oc/v1/version/latest'
    fetchUtil.getJSON(url, {
      objectId: 1,
      osType: 2,
      attachExt: 2
    }, {
      credentials: 'omit'
    }).then(data => {
      this.setState({
        downloadUrl: data.downloadUrl
      })
    }).catch(e=>{
      console.log(e)
    })
  }

  submitHandler() {
    const phone = findDOMNode(this.refs.phone).value.trim()
    const code = findDOMNode(this.refs.code).value.trim()
    const url = getEnvDomain()+'/bow/v1/testaccount'
    if(!phone || !code ) {
      return alert('填写手机号以及验证码')
    }

    fetchUtil.postJSON(url, {
      phone, 
      verifycodes: code,
      clientType: 1
    }).then(account => {
      this.renderWithAccount(account)
    }).catch(e=>{
      const { status, message } = e;
      const _msg = message || '获取商家测试账号失败，请重试!'
      alert(`${status}|${_msg}`)
    })
  }

  render() {
    const { hasAccount, account, allowGetCode, allowGetCodeTime, downloadUrl } = this.state
    let Account = (
      <div className={s.applyForm}>
        <div className={s.formItem}>
          <input 
            className={`${s.phone}`}
            type="text" 
            ref="phone"
            maxLength="11"
            defaultValue=''
            placeholder='请输入手机号' 
          />
        </div>
        <div className={s.formItem}>
          <input 
            className={s.code} 
            type="text" 
            ref="code"
            maxLength="6"
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
        <div className={s.formAction}>
          <button className={s.submit} onClick={::this.submitHandler}>获取商家测试账号</button>
        </div>
      </div>
    );

    if(hasAccount) {
      Account = <div className={s.account}>
        <h3 className={s.title}>商家测试账号</h3>
        <div className={s.item}>
          <label>wid：</label>
          <span>{account.wid}</span>
        </div>
        <div className={s.item}>
          <label>默认账号：</label>
          <span>{account.userName}</span>
        </div>
        <div className={s.item}>
          <label>默认密码：</label>
          <span>{account.password}</span>
        </div>
      </div>
    }

    return (
      <div className={`container`} >
        <SideBar pageLinks={getPageLinks('apps')} type={'apps'}></SideBar>
        <div className={s.content}>
          <h1>申请测试账号</h1>
          <span className={s.status}>
            您{hasAccount ? '已获得' : '还没有获得'}测试账号
          </span>
          <div className={s.desc}>
            <p>获得商家测试账号后，你将可以使用API市场中的接口，在你自身服务器上接受商家的信息。
            但是，这里需要注意：</p>
            <ul>
              <li>1、每位开发者有且只有一个商家测试账号。</li>
              <li>2、每位开发者获得属于自己的商家测试账号后，此账号不可分享给其他开发者使用。</li>
              <li>3、下载 <a className={s.downlinks} href={downloadUrl}>开发者Pad端</a>，安装成功后，使用商家测试账号登录，可在应用市场浏览属于开发者自己开发的应用、组件，并进行调试。</li>
            </ul>
          </div>
          { Account }
        </div>
      </div>
    )
  }
}

export default Analytics
