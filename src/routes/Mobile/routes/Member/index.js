import React, { Component } from 'react'
import './index.scss'
const App = () => {
  return (
  	<div className="m-container">
  		<div className="sidebar">
  			<ul className="nav">
  				<li className="item active">
  					<a><i className="iconfont icon-general"></i>概况</a>
  				</li>
  				<li className="item">
  					<a><i className="iconfont icon-vip"></i>会员注册</a>
  				</li>
  				<li className="item">
  					<a><i className="iconfont icon-sidebar1"></i>会员管理</a>
  				</li>
  				<li className="item">
  					<a><i className="iconfont icon-consumption"></i>会员消费</a>
  				</li>
  				<li className="item">
  					<a><i className="iconfont icon-chart"></i>会员分析</a>
  				</li>
  			</ul>
  		</div>
  		<div className="content pull-right">
  			<ul className="chart-list">
  				<li className="item">
  					<div className="data pull-left">
  						<dl className="category">
  							<dt>新增会员</dt>
  							<dd>288人</dd>
  						</dl>
  						<p className="text">昨天：<span>190</span></p>
  						<p className="text">本周：<span>1,980</span></p>
  						<p className="text">本月：<span>7,800</span></p>
  					</div>
  					<img className="chartImg pull-right" src="http://timg.ffan.com/convert/resize/url_T1HmVTBmZ_1RCvBVdK/tfs/chart.png" alt="chart" />
  				</li>
  				<li className="item">
  					<div className="data pull-left">
  						<dl className="category">
  							<dt>活跃会员</dt>
  							<dd>199人</dd>
  						</dl>
  						<p className="text">昨天：<span>190</span></p>
  						<p className="text">本周：<span>1,980</span></p>
  						<p className="text">本月：<span>7,800</span></p>
  					</div>
  					<img className="chartImg pull-right" src="http://timg.ffan.com/convert/resize/url_T1HmVTBmZ_1RCvBVdK/tfs/chart.png" alt="chart" />
  				</li>
  				<li className="item">
  					<div className="data pull-left">
  						<dl className="category">
  							<dt>交易会员</dt>
  							<dd>288人</dd>
  						</dl>
  						<p className="text">昨天：<span>190</span></p>
  						<p className="text">本周：<span>1,980</span></p>
  						<p className="text">本月：<span>7,800</span></p>
  					</div>
  					<img className="chartImg pull-right" src="http://timg.ffan.com/convert/resize/url_T1HmVTBmZ_1RCvBVdK/tfs/chart.png" alt="chart" />
  				</li>
  				<li className="item">
  					<div className="data pull-left">
  						<dl className="category">
  							<dt>累计会员</dt>
  							<dd>360人</dd>
  						</dl>
  						<p className="text">昨天：<span>190</span></p>
  						<p className="text">本周：<span>1,980</span></p>
  						<p className="text">本月：<span>7,800</span></p>
  					</div>
  					<img className="chartImg pull-right" src="http://timg.ffan.com/convert/resize/url_T1HmVTBmZ_1RCvBVdK/tfs/chart.png" alt="chart" />
  				</li>
  			</ul>
  			<div className="data-analysis">
  				<h3 className="title">交易转换率分析</h3>
  				<div className="analysis">
  					<p className="btn-lg-w"><span className="btn btn-lg btn-orange"><i className="iconfont icon-access"></i>访问</span></p>
  					<p className="text">访问人数 会员：698人<span>（新会员：298人，老会员：400人）</span></p>
  				</div>
  				<div className="analysis">
  					<p className="btn-lg-w"><span className="btn btn-md btn-red"><i className="iconfont icon-shoppingcar"></i>下单</span></p>
  					<p className="text">下单人数 会员：698人<span>（新会员：208人，老会员：400人）</span></p>
  				</div>
  				<div className="analysis">
  					<p className="btn-lg-w"><span className="btn btn-sm btn-blue"><i className="iconfont icon-pay"></i>付款</span></p>
  					<p className="text">付款人数 会员：698人<span>（新会员：188人，老会员：400人）</span></p>
  				</div>
  			</div>
  		</div>
  	</div>
  )
}

export default store => ({
  path: 'member',
  component: App
})
