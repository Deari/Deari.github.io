import React, { Component } from 'react'
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

import {IncreaseChart} from './charts'
import fetchUtil from '../../../utils/fetchUtil'
import Debug from '../../../utils/debug'
import DATA from './data'
import './index.scss'

class App extends Component {
  state = DATA

  componentWillMount() {
    return;
    const url = '';

    fetchUtil.getJSON(url).then(res=> {
      if(res.status == 200) {
        this.setState(res.data);
      } else {
        throw Error(res)
      }
    }).catch(e=>{
      Debug.warn(e);
      this.setState(DATA)
    })
  }

  render () {
    const { increase, active, charge, all, analysis: { access, order, payment } } = this.state;

    return (
      <div className="m-container">
        <div className="content">
          <ul className="chart-list">
            <li className="item">
              <div className="data pull-left">
                <dl className="category">
                  <dt>新增会员</dt>
                  <dd>{increase.total}人</dd>
                </dl>
                <p className="text">昨天：<span>{increase.yesterday}</span></p>
                <p className="text">本周：<span>{increase.week}</span></p>
                <p className="text">本月：<span>{increase.month}</span></p>
              </div>
              <div className="chartImg pull-right">
                <IncreaseChart data={increase.list}/>
              </div>
            </li>
            <li className="item">
              <div className="data pull-left">
                <dl className="category">
                  <dt>活跃会员</dt>
                  <dd>{active.total}人</dd>
                </dl>
                <p className="text">昨天：<span>{active.yesterday}</span></p>
                <p className="text">本周：<span>{active.week}</span></p>
                <p className="text">本月：<span>{active.month}</span></p>
              </div>
              <div className="chartImg pull-right">
                <IncreaseChart data={active.list}/>
              </div>
            </li>
            <li className="item">
              <div className="data pull-left">
                <dl className="category">
                  <dt>交易会员</dt>
                  <dd>{charge.total}人</dd>
                </dl>
                <p className="text">昨天：<span>{charge.yesterday}</span></p>
                <p className="text">本周：<span>{charge.week}</span></p>
                <p className="text">本月：<span>{charge.month}</span></p>
              </div>
              <div className="chartImg pull-right">
                <IncreaseChart data={charge.list}/>
              </div>
            </li>
            <li className="item">
              <div className="data pull-left">
                <dl className="category">
                  <dt>累计会员</dt>
                  <dd>{all.total}人</dd>
                </dl>
                <p className="text">昨天：<span>{all.yesterday}</span></p>
                <p className="text">本周：<span>{all.week}</span></p>
                <p className="text">本月：<span>{all.month}</span></p>
              </div>
              <div className="chartImg pull-right">
                <IncreaseChart data={all.list}/>
              </div>
            </li>
          </ul>
          <div className="data-analysis">
            <h3 className="title">交易转换率分析</h3>
            <div className="analysis">
              <p className="btn-lg-w"><span className="btn btn-lg btn-orange"><i className="iconfont icon-access"></i>访问</span></p>
              <p className="text">访问人数 会员：{access.new+access.old}人<span>（新会员：{access.new}人，老会员：{access.old}人）</span></p>
            </div>
            <div className="analysis">
              <p className="btn-lg-w"><span className="btn btn-md btn-red"><i className="iconfont icon-shoppingcar"></i>下单</span></p>
              <p className="text">下单人数 会员：{order.new+order.old}人<span>（新会员：{order.new}人，老会员：{order.old}人）</span></p>
            </div>
            <div className="analysis">
              <p className="btn-lg-w"><span className="btn btn-sm btn-blue"><i className="iconfont icon-pay"></i>付款</span></p>
              <p className="text">付款人数 会员：{payment.new+payment.old}人<span>（新会员：{payment.new}人，老会员：{payment.old}人）</span></p>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
}

export default store => ({
  path: 'member',
  component: App
})
