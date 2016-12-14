import React from 'react'
import DuckImage from '../assets/Duck.jpg'
import './HomeView.scss'
import { IndexLink, Link } from 'react-router'

export const HomeView = () => (
  <div>
    <div className='banner'>
    	<div className='login_in'>
    		<div className='loginin_top'>
    			<h5>我是商家</h5>
	    		<span>|</span>
	    		<h5>我是开发者</h5>
    		</div>
    		<form>
    			<input type="text/css" placeholder="用户名"/>
    			<input type="text/css" placeholder="请输入密码"/>
    			<div>
    				<label>
    					<input type="radio"/>
    					记住密码
    				</label>
    				<a>忘记密码</a>
    			</div>
    			<button>登录</button>
    		</form>
    	</div>
    </div>
		<div className='home_reminder'>
			<span className='reminder_m'>系统公告：蓝海BO开放平台关于处理“二元期权”类信息的公告</span>
			<span>查看更多</span>
		</div>
    <div className='home_f'>
      <Link to='/shop' activeClassName='route--active'>
        商家中心
        <p>一种新的开放能力，可以在微信内被便捷地获取和传播，同时具有出色的使用体验。</p>
        <span>了解更多</span>
      </Link>
      <Link to='/developer' activeClassName='route--active'>
        开发者中心
        <p>一种新的开放能力，可以在微信内被便捷地获取和传播，同时具有出色的使用体验。</p>
        <span>了解更多</span>
      </Link>
      <Link to='/open' activeClassName='route--active'>
        开放市场
        <p>一种新的开放能力，可以在微信内被便捷地获取和传播，同时具有出色的使用体验。</p>
        <span>了解更多</span>
      </Link>
    </div>
  </div>
)

export default HomeView
