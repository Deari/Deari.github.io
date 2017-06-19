import React, { Component } from 'react'
import { Link } from 'react-router'
import SideBar from 'business/SideBar'
import DevInfo from 'business/DevInfo'
import s from './index-new.scss'
import { PageTypes, getPageLinks } from 'config/index'
import cx from 'classnames'
import SDKDownload from '../SDkDownload/index'

class DevTools extends Component {
  state = {
    showDevInfo: false,
    showSDKInfo:false
  }

  handleClick (index) {
    if(index){
      this.setState({ showDevInfo: !this.state.showDevInfo })
    }else {
      this.setState({ showSDKInfo: !this.state.showSDKInfo })
    }
  }

  render () {
    const { type } = this.props
    const { showDevInfo, showSDKInfo } = this.state

    return (
      <div className={`container`} >
        <SideBar pageLinks={getPageLinks(type)} type={type} />
        <div className="content">
          <h2 className="content-header"><i className='iconfont icon-tool' />开发者工具</h2>
          <div className={s.tool}>
            <dl className={s.detail}>
              <dt className={s.img} />
              <dd className={s.main}>
                <h3 className={s.name}>SDK下载</h3>
                <p className={s.text}>
                    查看工程示例，根据开发需求和使用场景下载SDK。
                  </p>
              </dd>
            </dl>
            <div className={s['tool-btn']}>
              <span className={`btn-primary ${s.action}`} onClick={() => ::this.handleClick(0)}>点击{showSDKInfo ? '收起':'查看'}</span>
            </div>
            <div className={cx(s.key, { [s.SDkActive]: showSDKInfo })}>
              <SDKDownload />
            </div>
          </div>
          <div className={s.tool}>
            <dl className={s.detail}>
              <dt className={s.img} />
              <dd className={s.main}>
                <h3 className={s.name}>开发者文档</h3>
                <p className={s.text}>
                    开发者在创建应用、组件后，可阅读开发者文档帮助完成接入及功能开发。
                  </p>
              </dd>
            </dl>
            <div className={s['tool-btn']}>
              <Link to={`/${type}/doc`} className={`btn-primary ${s.action}`}>点击查看</Link>
            </div>
          </div>
          <div className={s.tool}>
            <dl className={s.detail}>
              <dt className={s.img} />
              <dd className={s.main}>
                <h3 className={s.name}>查看developerKey和developerSecret</h3>
                <p className={s.text}>开发者在进行开发、调试时，需要developerKey、developerSecret，进行授权认证。</p>
              </dd>
            </dl>
            <div className={s['tool-btn']}>
              <span onClick={() => ::this.handleClick(1)} className={`btn-primary ${s.action}`}>点击{showDevInfo ? '收起':'查看'}</span>
            </div>
            <div className={cx(s.key, { [s.InfoActive]: showDevInfo })}>
              <DevInfo />
            </div>
          </div>
          <div className={s.tool}>
            <dl className={s.detail}>
              <dt className={s.img} />
              <dd className={s.main}>
                <h3 className={s.name}>查看开放平台测试账号</h3>
                <p className={s.text}>申请商家的测试账号，可在测试账号中体验并测试开发者创建的应用、组件。</p>
              </dd>
            </dl>
            <div className={s['tool-btn']}>
              <Link to={`/${type}/account`} className={`btn-primary ${s.action}`}>点击查看</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DevTools
