import React from 'react'
import { IndexLink, Link } from 'react-router'

class Download extends React.Component {
  render() {
    return (
      <div className="cContent">
        <div className="col-sm-2 col-md-2 navThird">
          <ul>
            <li className="navThirdHover">
            介绍
            </li>
          </ul>
          <ul>
            <li>
            规范
            </li>
          </ul>
          <ul>
            <li>
            开发
              <ul>
                <li>接入指南
                  <ul>
                    <li>Android接入指南</li>
                    <li>IOS接入指南</li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="col-sm-10 col-md-10">
          <div className="ccContent">
            <dl>
              <dt>1. 介绍我们的产品定位</dt>
              <dd>
              本文档将带你一步步创建完成一个BO小程序，并可以在手机上体验该小程序的实际效果。这个小程序的首页将会显示欢迎语以及当前用户的BO头像，点击头像，可以在新开的页面中查看当前小程序的启动日志。
              <span>下载源码</span>
              </dd>
              <dd>登录 https://mp.weixin.qq.com ，就可以在网站的“设置”-“开发者设置”中，查看到微信小程序的 AppID 了，注意不可直接使用服务号或订阅号的 AppID 。</dd>
              <dd><div></div></dd>
              <dd>注意：如果要以非管理员微信号在手机上体验该小程序，那么我们还需要操作“绑定开发者”。即在“用户身份”-“开发者”模块，绑定上需要体验该小程序的微信号。本教程默认注册帐号、体验都是使用管理员微信号。</dd>
            </dl>
            <dl>
              <dt>2. 介绍我们的产品功能</dt>
              <dd>我们需要通过开发者工具，来完成小程序创建和代码编辑。</dd>
              <dd>开发者工具安装完成后，打开并使用微信扫码登录。选择创建“项目”，填入上文获取到的 AppID ，设置一个本地项目的名称（非小程序名称），比如“我的第一个项目”，并选择一个本地的文件夹作为代码存储的目录，点击“新建项目”就可以了。</dd>
              <dd>为方便初学者了解微信小程序的基本代码结构，在创建过程中，如果选择的本地文件夹是个空文件夹，开发者工具会提示，是否需要创建一个 quick start 项目。选择“是”，开发者工具会帮助我们在开发目录里生成一个简单的 demo。</dd>
            </dl>
          </div>
        </div>
      </div>
    )
  }
}

module.exports = {
  path: 'download',
  component: Download
}
