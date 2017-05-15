import React from 'react'
import { Link } from 'react-router'
import cx from 'classnames'
import { PageTypes, getPageLinks } from 'config/index'
const Main = () => {
  return <div>
  	<h2>
  		<a class="iconfont icon-fanhui" href="/apps/list"></a>
  		<span>我的应用</span>
  	</h2>
  	<h3>基本信息</h3>
  	<form>
  		<div>
  			<label>应用名称</label>
  			<div>
  				<div>
  					<i></i>
	  				<input type="text"/>
	  				<i></i>
  				</div>
  			</div>
  		</div>
  		<div>
  			<label>应用图片</label>
  			<div>
  				<p>请上传应用高清图片</p>
  				<p>400*400像素，仅支持PNG格式，大小不超过300KB</p>
  				<div>
  					<span>
	  					<input typs="file"/>
	  					<button>选择文件</button>
	  				</span>
  				</div>
  				<ul>
  					<li>
  						<img src=""/>
  					</li>
  				</ul>
  			</div>
  		</div>
  		<div>
  			<label>应用简介</label>
  			<div>
  				<textarea></textarea>
  			</div>
  		</div>
  		<div>
  			<label>标签</label>
  			<div>
  				<ul>
  					<li>营销常用</li>
  				</ul>
  			</div>
  		</div>
  	</form>
  </div>
}

export default {
  path: 'h5',
  component: Main
}
