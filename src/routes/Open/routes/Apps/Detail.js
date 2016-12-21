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
              <div className="col-md-3 col-xs-3">
                <div className="Detail-appImg"></div>
                <div className="Detail-downloadBtn">
                  <button className="btn btn-primary">下载</button>
                </div>
              </div>
              <div className="col-md-9 col-xs-9 Detail-detail">
                <h3>应用名称-蓝海商品管理APP</h3>
                <dl>
                  <dt><span className="text-color-blue">版本：1.11.8的细节功能</span> （时间：2016-12-1）</dt>
                  <dd><span>.</span>(假字)加入专属玩家群102452812、462237553，参与独家激情活动。</dd>
                  <dd><span>.</span>(假字)中国人气MMO网络游戏《梦幻西游》推出的同名手游！</dd>
                  <dd><span>.</span>(假字)将游戏场景打造成一幅“游戏画卷”。相比起惯用的场景贴图手法而造成的视觉单调而言，所有场景都由美工手绘完成。游戏中，分为人、魔、仙三界，而你可以选择人物和门派，玩法和PC版梦幻西游一致。</dd>
                </dl>
                <dl>
                  <dt><span className="text-color-blue">作者：蓝海开发团队；</span></dt>
                  <dd><span>.</span>(假字)加入专属玩家群102452812、462237553，参与独家激情活动。</dd>
                  <dd><span>.</span>(假字)中国人气MMO网络游戏《梦幻西游》推出的同名手游！</dd>
                  <dd><span>.</span>(假字)将游戏场景打造成一幅“游戏画卷”。相比起惯用的场景贴图手法而造成的视觉单调而言，所有场景都由美工手绘完成。游戏中，分为人、魔、仙三界，而你可以选择人物和门派，玩法和PC版梦幻西游一致。Q版造型的可爱人物，浓郁古典风的精美场景，原汁原味的经典玩法，尽在手游重现，随时随地领略梦幻西游的精彩与快乐！</dd>
                </dl>
              </div>
            </div>
            <hr/>
            <div className="Detail-moreApps">
              <h3><span className="float-right text-gray9-color">更多>></span>相关的店铺组件</h3>
              <ul className="clx">
                <li className="col-md-2 col-sm-2">
                  <div className="Detail-appBox">
                    <div className="Detail-appImg"></div>
                    <h5>澜海APP</h5>
                    <p>工具类型</p>
                    <button className="btn btn-default btn-xs">下载</button>
                  </div>
                </li>
                <li className="col-md-2 col-sm-2">
                  <div className="Detail-appBox">
                    <div className="Detail-appImg"></div>
                    <h5>澜海APP</h5>
                    <p>工具类型</p>
                    <button className="btn btn-default btn-xs">下载</button>
                  </div>
                </li>
                <li className="col-md-2 col-sm-2">
                  <div className="Detail-appBox">
                    <div className="Detail-appImg"></div>
                    <h5>澜海APP</h5>
                    <p>工具类型</p>
                    <button className="btn btn-default btn-xs">下载</button>
                  </div>
                </li>
                <li className="col-md-2 col-sm-2">
                  <div className="Detail-appBox">
                    <div className="Detail-appImg"></div>
                    <h5>澜海APP</h5>
                    <p>工具类型</p>
                    <button className="btn btn-default btn-xs">下载</button>
                  </div>
                </li>
                <li className="col-md-2 col-sm-2">
                  <div className="Detail-appBox">
                    <div className="Detail-appImg"></div>
                    <h5>澜海APP</h5>
                    <p>工具类型</p>
                    <button className="btn btn-default btn-xs">下载</button>
                  </div>
                </li>
                <li className="col-md-2 col-sm-2">
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
