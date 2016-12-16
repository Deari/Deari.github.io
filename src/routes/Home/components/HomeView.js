import React from 'react'
import DuckImage from '../assets/Duck.jpg'
import './HomeView.scss'
import { IndexLink, Link, withRouter, browserHistory } from 'react-router'
import '../../../styles/tools.scss'
import '../../../styles/form.scss'
import '../../../styles/button.scss'

export const HomeView = () => (
  <div>
    <div className='banner'>
    	<div className="view-width">
      	<div className='login_in'>
          <div className='loginin_top'>
            <h5>我是商家</h5>
            <span>|</span>
            <h5>我是开发者</h5>
          </div>
          <form>
            <input className="form-control" type="text/css" placeholder="用户名"/>
            <input className="form-control" type="text/css" placeholder="请输入密码"/>
            <div className="checkbox">
              <label>
                <input type="checkbox"/>
                记住密码
              </label>
              <a className="float-right">忘记密码</a>
            </div>
            <button className="btn btn-primary btn-lg">登录</button>
          </form>
        </div>
    	</div>
    </div>
		<div className='home_reminder'>
			<div>
  			<span>系统公告：蓝海BO开放平台关于处理“二元期权”类信息的公告<i></i></span>
        <span>查看更多</span>
			</div>
		</div>
    <div>
      <ul className='home_f'>
        <li className="homef_width">
          <Link to='/shop' activeClassName='route--active'>
          <i className="homef-business"></i>
          <h3>商家中心</h3>
          <p>一种新的开放能力，可以在微信内被便捷地获取和传播，同时具有出色的使用体验。</p>
          <span>了解更多</span>
        </Link>
        </li>
        <li className="homef_width">
          <Link to='/developer' activeClassName='route--active'>
            <i className="homef-developer"></i>
            <h3>开发者中心</h3>
            <p>一种新的开放能力，可以在微信内被便捷地获取和传播，同时具有出色的使用体验。</p>
            <span>了解更多</span>
          </Link>
        </li>
        <li className="homef_width">
          <Link to='/open' activeClassName='route--active'>
            <i className="homef-openmarket"></i>
            <h3>开放市场</h3>
            <p>一种新的开放能力，可以在微信内被便捷地获取和传播，同时具有出色的使用体验。</p>
            <span>了解更多</span>
          </Link>
        </li>
      </ul>
    </div>
  </div>
)

export default HomeView;
