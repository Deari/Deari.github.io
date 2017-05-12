import React, { Component } from 'react'
import { Link } from 'react-router'
import SideBar from 'business/SideBar'
import DevInfo from 'business/DevInfo'
import s from './index-new.scss'
import { PageTypes, getPageLinks } from 'config/index'
import cx from 'classnames'

class DevTools extends Component {
  state = {
    showDevInfo: false
  }

  handleClick () {
    this.setState({ showDevInfo: !this.state.showDevInfo })
  }

  render () {
    const { type } = this.props
    const { showDevInfo } = this.state

    return (
      <div className={`container`} >
        <SideBar pageLinks={getPageLinks(type)} type={type} />
        <div className={s.content}>
          <h2 className={s['content-header']}><i className='iconfont icon-tool' />开发者工具</h2>
          <div className={s.tool}>
            <dl className={s.detail}>
              <dt className={s.img} />
              <dd className={s.main}>
                <h3 className={s.name}>开发者文档</h3>
                <p className={s.text}>
                    后续补充文案。
                  </p>
              </dd>
            </dl>
            <div className={s['tool-btn']}>
              <Link to={`/${type}/doc`} className={s['btn-primary']}>点击查看</Link>
            </div>
          </div>
          <div className={s.tool}>
            <dl className={s.detail}>
              <dt className={s.img} />
              <dd className={s.main}>
                <h3 className={s.name}>查看developerKey和developerSecret</h3>
                <p className={s.text}>后续补充文案。</p>
              </dd>
            </dl>
            <div className={s['tool-btn']}>
              <span onClick={::this.handleClick} className={s['btn-primary']}>点击{showDevInfo ? '收起':'查看'}</span>
            </div>
            <div className={cx(s.key, { [s.active]: showDevInfo })}>
              <DevInfo />
            </div>
          </div>
          <div className={s.tool}>
            <dl className={s.detail}>
              <dt className={s.img} />
              <dd className={s.main}>
                <h3 className={s.name}>查看开放平台测试账号</h3>
                <p className={s.text}>后续补充文案。</p>
              </dd>
            </dl>
            <div className={s['tool-btn']}>
              <Link to={`/${type}/account`} className={s['btn-primary']}>点击查看</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DevTools
