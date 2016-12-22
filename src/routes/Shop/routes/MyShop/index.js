import React from 'react'
import './index.scss'
import '../../../../styles/_base.scss'

class MyShop extends React.Component {
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
        	<div className="bg-white">
        		<div className="preview">
        			<div className="bg-phone">
        				<div className="shop-info">
        					<div className="temp-img"></div>
        				</div>
        			</div>
        			<button className="btn btn-primary">开始装饰店铺</button>
        		</div>
        	</div>
        </div>
    </div>
    </div>
  }
}

export default MyShop;
