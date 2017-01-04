import React from 'react'
import DuckImage from '../assets/Duck.jpg'
import { IndexLink, Link, withRouter, browserHistory } from 'react-router'
import './HomeView.scss'
import '../assets/lib/slick.css'
import '../assets/lib/slick-theme.css'

var Slider = require('react-slick');

const SimpleSlider = React.createClass({
  render: function () {
    var settings = {
      dots: true,
      arrows: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    return (
      <Slider {...settings}>
        <div className="banner1">
          <dl>
            <dt>应用市场</dt>
            <dd>为实体门店提供经营所需的各项管理工具</dd>
          </dl>
          <p>
           <Link className="btn-left btn btn-primary" to="/apps">浏览应用</Link>
           <Link className="btn-right btn" to="/apps/create">发布应用</Link>
          </p>
        </div>
        <div className="banner2">
          <dl>
            <dt>组件市场</dt>
            <dd>助力实体门店，创造个性化和场景化的营销方案</dd>
          </dl>
          <p>
           <Link className="btn-left btn btn-primary" to="/widgets">浏览组件</Link>
           <Link className="btn-right btn" to="/widgets/create">发布组件</Link>
          </p>
        </div>
        <div className="banner3">
          <dl>
            <dt>API集市</dt>
            <dd>为开发者提供最全面 最权威的API服务</dd>
          </dl>
          <p>
           <a className="btn-left btn btn-primary" href="http://apistore.intra.test.ffan.net">浏览API</a>
           <a className="btn-right btn" href="http://apistore.intra.test.ffan.net/#!/add">发布API</a>
          </p>
        </div>
        <div className="banner4">
          <dl>
            <dt>硬件市场</dt>
            <dd>助力实体门店，连接线上线下，打造O2O解决方案</dd>
          </dl>
          <p>
           <Link className="btn-left btn btn-primary" to="/hardware">浏览硬件</Link>
           <Link className="btn-right btn" to="/hardware/create">发布硬件</Link>
          </p>
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
            <Link className="a-bg1" to="/apps">
              <p>应用市场</p>
              <i className="iconfont icon-business"></i>
              <span>为2000万中小门店提供信息化工具，帮助其改善经营效率，共享收益</span>
            </Link>
          </li>
          <li>
            <Link className="a-bg2" to="/widgets">
              <p>组件市场</p>
              <i className="iconfont icon-component"></i>
              <span>为2000万中小门店提供信息化工具，帮助其改善经营效率，共享收益</span>
            </Link>
          </li>
          <li>
            <a className="a-bg3" href="http://apistore.intra.test.ffan.net">
              <p>API市场</p>
              <i className="iconfont icon-api"></i>
              <span>为2000万中小门店提供信息化工具，帮助其改善经营效率，共享收益</span>
            </a>
          </li>
          <li>
            <Link className="a-bg4" to="/hardware">
              <p>硬件市场</p>
              <i className="iconfont icon-hardware"></i>
              <span>为2000万中小门店提供信息化工具，帮助其改善经营效率，共享收益</span>
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
 