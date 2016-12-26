import React from 'react'
import DuckImage from '../assets/Duck.jpg'
import { IndexLink, Link, withRouter, browserHistory } from 'react-router'
import './HomeView.scss'
import'../../../styles/iconfont/iconfont.css'

export const HomeView = () => (
  <div className="core-layout__viewport">
    <div className="home-banner">
      <dl>
        <dt>API集市</dt>
        <dd>为开发者提供最全面 最权威的API服务</dd>
      </dl>
      <p>
        <a className="btn btn-primary btn-lg">浏览API</a>
        <a className="btn btn-lg">发布API</a>
      </p>
    </div>
    <div className="home-reminder">
      <div className="container">
        <span>
          <i className="iconfont icon-laba"></i>
          系统公告：蓝海BO开放平台关于处理“二元期权”类信息的公告
          <i></i>
        </span>
        <a>查看更多</a>
      </div>
    </div>
    <div className="home-market">
      <div className="container">
        <h3>为超过<span>176，4600</span>客户服务</h3>
        <p>数据由万达提供</p>
        <ul className="clx">
          <li>
            <a className="a-bg1">
              <p>应用市场</p>
              <i className="iconfont icon-business"></i>
              <span>为2000万中小门店提供信息化工具，帮助其改善经营效率，共享收益</span>
            </a>
          </li>
          <li>
            <a className="a-bg2">
              <p>组件市场</p>
              <i className="iconfont icon-business"></i>
              <span>为2000万中小门店提供信息化工具，帮助其改善经营效率，共享收益</span>
            </a>
          </li>
          <li>
            <a className="a-bg3">
              <p>API市场</p>
              <i className="iconfont icon-business"></i>
              <span>为2000万中小门店提供信息化工具，帮助其改善经营效率，共享收益</span>
            </a>
          </li>
          <li>
            <a className="a-bg4">
              <p>硬件市场</p>
              <i className="iconfont icon-business"></i>
              <span>为2000万中小门店提供信息化工具，帮助其改善经营效率，共享收益</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div className="home-casus container">
      <div className="home-casus-header">
        <h3>成功案例</h3>
        <i></i>
      </div>
      <ul className="clx">
        <li>
          <a>
            <h3>服装</h3>
            <div className="home-casus-img">
              <i></i>
              <i></i>
            </div>
            <p>帮助商家建议移动支付场景，打造营销平台与商家CRM系统</p>
          </a>
        </li>
        <li>
          <a>
            <h3>餐饮</h3>
            <div className="home-casus-img">
              <i></i>
              <i></i>
            </div>
            <p>有效进行会员管理，提升用户复购率和留存率</p>
          </a>
        </li>
        <li>
          <a>
            <h3>影 视</h3>
            <div className="home-casus-img">
              <i></i>
              <i></i>
            </div>
            <p>帮助商家建议移动支付场景，打造营销平台与商家CRM系统</p>
          </a>
        </li>
        <li>
          <a>
            <h3>商 超</h3>
            <div className="home-casus-img">
              <i></i>
              <i></i>
            </div>
            <p>提供移动支付和精准营销方案，为企业降低成本和效率</p>
          </a>
        </li>
      </ul>
    </div>
    <div className="footer">
      <div className="container">
        <p>万达科技有限公司官网 2010-2018 Wanda 版权所有 京ICP备 1000000000号</p>
      </div>
    </div>
  </div>
)

export default HomeView;
