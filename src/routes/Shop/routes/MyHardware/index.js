import React from 'react'
import { IndexLink, Link } from 'react-router'
import '../../../../styles/_base.scss'

class MyHardware extends React.Component {
  render() {
    return <div className="myshop-content">
		<div className="cContent clx">
	        <div className="col-sm-2 col-md-2 navThird">
	          <ul>
	            <li className="navThirdHover">我的店铺</li>
	          </ul>
	          <ul>
	          	<li>我的开放市场
	          		<ul>
	          			<li>我的商家应用</li>
	          		</ul>
	          		<ul>
	          			<li>我的店铺组件</li>
	          		</ul>
	          		<ul>
	          			<li>我的硬件</li>
	          		</ul>
	          	</li>
	          </ul>
	        </div>
	        <div className="col-sm-10 col-md-10">
	          <div className="ccContent">
		          <div className="clx">
		          	<h3></h3>
		          	<Link className="ccContentBtn" to='/developer/apps/create'>
		              <div className="width110 float-right">
		                <button className="btn btn-primary">+ 购买硬件</button>
		              </div>
		            </Link>
		          </div>
	              <ul>
	              	<li>
	              		<div>
	              			<img src="" />
	              		</div>
	              		<div>
	              			<dl>
	              				<dt>应用名称：</dt>
	              				<dd>AppName5</dd>
	              			</dl>
	              			<dl>
	              				<dt>应用介绍：</dt>
	              				<dd>dddddddd</dd>
	              			</dl>
	              			<p><a>在应用市场查看详情</a></p>
	              		</div>
	              		<div>已使用</div>
	              		<div>
	              			<button>管理</button>
	              		</div>
	              	</li>
	              </ul>
	          </div>
	        </div>
	     </div>
	</div>	
  }
}

module.exports = {
  path: 'hardware',
  component: MyHardware
}