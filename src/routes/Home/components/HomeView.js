import React from 'react'
import DuckImage from '../assets/Duck.jpg'
import { IndexLink, Link, withRouter, browserHistory } from 'react-router'
import { getApiUrl, getApiDomain, getLoginDomain } from 'utils/domain'
import LoginSDK from 'utils/loginSDK'
import './HomeView.scss'
import '../assets/lib/slick.css'
import '../assets/lib/slick-theme.css'

var Slider = require('react-slick');

const SimpleSlider = React.createClass({

  clickCreate: (type) => {
    let url = getLoginDomain(`passport/session-check.json`)
    let loginUrl = getApiDomain(`#!/login/`)
    let callbackUrl = `${location.host}/${type}/create`
    
    LoginSDK.getStatus((status, data) => {
      if (status) window.location.href = `/${type}/create`
    }, url, loginUrl, callbackUrl)
  },

  render: function () {
    var settings = {
      dots: true,
      arrows: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };

    const apiViewUrl = getApiUrl(`#!/`)
    const apiAddUrl = getApiUrl(`#!/add`)

    return (
      <Slider {...settings}>
        <div className="banner1">
          <dl>
            <dt>应用市场</dt>
            <dd>为实体门店提供经营所需的各项管理工具</dd>
          </dl>
          <p>
           <Link className="btn-left btn btn-primary" to="/apps">浏览应用</Link>
           <a className="btn-right btn" onClick={this.clickCreate.bind(this, 'apps')}>发布应用</a>
          </p>
          <div className="banner-img">
            <img width src="http://nres.ffan.com/newh5/201715/2ec9843614eb7c0be49b4b4430c3247b3cef78ab.jpg" />
          </div>
        </div>
        <div className="banner2">
          <dl>
            <dt>组件市场</dt>
            <dd>助力实体门店，创造个性化和场景化的营销方案</dd>
          </dl>
          <p>
           <Link className="btn-left btn btn-primary" to="/widgets">浏览组件</Link>
           <a className="btn-right btn" onClick={this.clickCreate.bind(this, 'widgets')}>发布组件</a>
          </p>
          <div className="banner-img">
            <img src="http://nres.ffan.com/newh5/201715/fd7753080ecf0b2ad2f18d5bfb1460da2586dcd2.jpg" />
          </div>
        </div>
        <div className="banner3">
          <dl>
            <dt>API市场</dt>
            <dd>为开发者提供最全面，最权威的API服务</dd>
          </dl>
          <p>
           <a className="btn-left btn btn-primary" href={apiViewUrl}>浏览API</a>
           <a className="btn-right btn" href={apiAddUrl}>发布API</a>
          </p>
          <div className="banner-img">
            <img src="http://nres.ffan.com/newh5/201715/978419104ea4e5700f1f83012acecd4d78c3a635.jpg" />
          </div>
        </div>
        <div className="banner4">
          <dl>
            <dt>硬件市场</dt>
            <dd>助力实体门店，连接线上线下，打造O2O解决方案</dd>
          </dl>
          <p>
           <Link className="btn-left btn btn-primary" to="/hardware">浏览硬件</Link>
           <a className="btn-right btn" onClick={this.clickCreate.bind(this, 'hardware')}>发布硬件</a>
          </p>
          <div className="banner-img">
            <img src="http://nres.ffan.com/newh5/201715/852f665fa0464d7187afc22c667d0d8bfbfc20d3.jpg" />
          </div>
        </div>
      </Slider>
    );
  }
});

export const HomeView = () => (
  <div className="">
    <div className="home-banner">
    <SimpleSlider></SimpleSlider>
      
    </div>
    <div className="home-reminder">
      <div className="container">
        <span>
          <i className="iconfont icon-laba"></i>
          系统公告：热烈庆祝蓝海开放平台入驻服务商1000家！
          <i></i>
        </span>
        <a>查看更多</a>
      </div>
    </div>
    <div className="home-market">
      <div className="container">
        <h3>为超过<span>1,764,600</span>客户服务</h3>
        <p className="market-info">数据由飞凡提供</p>
        <ul className="clx">
          <li>
            <Link className="a-bg1" to="/apps">
              <p className="market-tittle">应用市场</p>
              <i className="iconfont icon-business"></i>
              <span className="market-text">提供实体门店经营所需的各项管理工具</span>
              <span className="market-more">了解更多</span>
            </Link>
          </li>
          <li>
            <Link className="a-bg2" to="/widgets">
              <p className="market-tittle">组件市场</p>
              <i className="iconfont icon-component"></i>
              <span className="market-text">助力实体门店创造个性化和场景化的营销方案</span>
              <span className="market-more">了解更多</span>
            </Link>
          </li>
          <li>
            <a className="a-bg3" href={getApiUrl(`#!/`)}>
              <p className="market-tittle">API市场</p>
              <i className="iconfont icon-api"></i>
              <span className="market-text">提供实体服务商/开发者所需的各种服务接口</span>
              <span className="market-more">了解更多</span>
            </a>
          </li>
          <li>
            <Link className="a-bg4" to="/hardware">
              <p className="market-tittle">硬件市场</p>
              <i className="iconfont icon-hardware"></i>
              <span className="market-text">助力实体门店连接线上线下打造O2O解决方案</span>
              <span className="market-more">了解更多</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
    <div className="home-casus">
      <div className="home-casus-header container">
        <h3>成功案例</h3>
        <i></i>
      </div>
      <ul className="container clx">
        <li>
          <a>
            <h3>服装</h3>
            <div className="home-casus-img1">
              <i className="casus-img1"></i>
              <i className="casus-img2"></i>
            </div>
            <p>帮助商家建议移动支付场景，打造营销平台与商家CRM系统</p>
          </a>
        </li>
        <li>
          <a>
            <h3>餐饮</h3>
            <div className="home-casus-img2">
              <i className="casus-img1"></i>
              <i className="casus-img2"></i>
            </div>
            <p>有效进行会员管理，提升用户复购率和留存率</p>
          </a>
        </li>
        <li>
          <a>
            <h3>影视</h3>
            <div className="home-casus-img3">
              <i className="casus-img1"></i>
              <i className="casus-img2"></i>
            </div>
            <p>帮助商家建议移动支付场景，打造营销平台与商家CRM系统</p>
          </a>
        </li>
        <li>
          <a>
            <h3>商超</h3>
            <div className="home-casus-img4">
              <i className="casus-img1"></i>
              <i className="casus-img2"></i>
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
 