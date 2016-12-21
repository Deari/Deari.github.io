import React from 'react'
import { IndexLink, Link } from 'react-router'
import '../../../../styles/_base.scss'
import '../../index.scss'

class Detail extends React.Component {
  render() {
    return (
      <div className="bg-gray pt40">
        <div className="container">
          <div className="row bg-white p40">
            <div className="Detail-container clx">
              <div className="col-sm-8 col-md-8">
                <div className="Detail-hardwareImg"></div>
              </div>
              <div className="col-sm-4 col-md-4 hardware-price">
                <p>硬件名称:<span className="text-black-color">BEACON</span></p>
                <p>库存：<span className="text-black-color">123456件</span></p>
                <p className="pt">价格：<span className="text-red-color">345元</span></p>
                <div className="Detail-downloadBtn">
                  <button className="btn btn-primary">下载</button>
                </div>
              </div>
            </div>
            <div className="Detail-hardware">
              <div className="clx">
                <a className="hardware-hover">商品介绍</a>
                <a>规格参数</a>
              </div>
              <dl>
                <dt>文字介绍：</dt>
                <dd>感谢您对Thouway户外蓝牙音箱的鼎力支持，支持者将以众筹价格获得低于市场价259元的Thouway户外蓝牙音箱1套（含赠送配件：Micro USB充电线×1，AUX音频线×1，音箱布套×1)。感谢您对Thouway户外蓝牙音箱的鼎力支持，支持者将以众筹价格获得低于市场价259元的Thouway户外蓝牙音箱1套（含赠送配件：Micro USB充电线×1，AUX音频线×1，音箱布套×1)。感谢您对Thouway户外蓝牙音箱的鼎力支持，支持者将以众筹价格获得低于市场价</dd>
              </dl>
            </div>
            <hr/>
            <div className="Detail-moreApps">
              <h3><span className="float-right text-gray9-color">更多>></span>相关的店铺组件</h3>
              <ul className="clx">
                <li className="col-sm-2 col-md-2">
                  <div className="Detail-appBox">
                    <div className="Detail-appImg"></div>
                    <h5>澜海APP</h5>
                    <p>工具类型</p>
                    <button className="btn btn-default btn-xs">下载</button>
                  </div>
                </li>
                <li className="col-sm-2 col-md-2">
                  <div className="Detail-appBox">
                    <div className="Detail-appImg"></div>
                    <h5>澜海APP</h5>
                    <p>工具类型</p>
                    <button className="btn btn-default btn-xs">下载</button>
                  </div>
                </li>
                <li className="col-sm-2 col-md-2">
                  <div className="Detail-appBox">
                    <div className="Detail-appImg"></div>
                    <h5>澜海APP</h5>
                    <p>工具类型</p>
                    <button className="btn btn-default btn-xs">下载</button>
                  </div>
                </li>
                <li className="col-sm-2 col-md-2">
                  <div className="Detail-appBox">
                    <div className="Detail-appImg"></div>
                    <h5>澜海APP</h5>
                    <p>工具类型</p>
                    <button className="btn btn-default btn-xs">下载</button>
                  </div>
                </li>
                <li className="col-sm-2 col-md-2">
                  <div className="Detail-appBox">
                    <div className="Detail-appImg"></div>
                    <h5>澜海APP</h5>
                    <p>工具类型</p>
                    <button className="btn btn-default btn-xs">下载</button>
                  </div>
                </li>
                <li className="col-sm-2 col-md-2">
                  <div className="Detail-appBox">
                    <div className="Detail-appImg"></div>
                    <h5>澜海APP</h5>
                    <p>工具类型</p>
                    <button className="btn btn-default btn-xs">下载</button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

module.exports = {
  path: 'detail/:id',
  component: Detail
}
