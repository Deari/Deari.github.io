import React from 'react'
import moment from 'moment'
import SideBar from 'business/SideBar'
import { PageTypes, getPageLinks } from 'config/index'
import { getDomain } from 'utils/d'
import fetchUtil from 'utils/fetch'
import s from './index-new.scss'

// import Detail from 'components/Detail'

class AppsDetail extends React.Component {

  render () {
    return (
      <div className='container'>
        <SideBar pageLinks={getPageLinks('apps')} type={'apps'} />
        <div className="content">
          <div>
            <img src="" alt=""/>
            <div className="appInfo">
              <h2 className="title">title</h2>
              <div>
                <label htmlFor="">内容提要</label>
                <p>desc</p>
              </div>
              <div>
                <label htmlFor="">信息</label>
                <div>
                  <label htmlFor="">标签</label>
                  <ul>
                    <li>数据分析</li>
                    <li>数据分析</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="version">
            <ul className>
              <li>
                <label htmlFor="">更新日期</label>
                <div>xxxxx</div>
              </li>
              <li>
                <label htmlFor="">版本</label>
                <div>xxxxx</div>
              </li>
              <li>
                <label htmlFor="">大小</label>
                <div>xxxxx</div>
              </li>
              <li>
                <label htmlFor="">版本介绍</label>
                <div>xxxxx</div>
              </li>
            </ul>
          </div>

        </div>
      </div>
    )
  }
}

export default AppsDetail
