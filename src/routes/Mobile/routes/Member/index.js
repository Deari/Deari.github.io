import React, { Component } from 'react'
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

import {IncreaseChart} from './charts';
import fetchUtil from '../../../utils/fetchUtil';
import { getHardwareDomain } from 'utils/domain';
import Debug from '../../../utils/debug';
import DATA from './data';
import './index.scss';
function timeLog(txt){
  var date = new Date()
  alert(txt+date)
}
class App extends Component {
  state = DATA

  componentWillMount() {
    timeLog('拉取数据')
    const url = getHardwareDomain('mem/v1/mem?action=memStatistics&clientType=2');
    fetchUtil.getJSON(url).then(res=> {
      if(res.status == 200) {
        this.setState(res.data);
      } else {
        Debug.warn('获取数据失败', res);
      }
    }).catch(e=>{
      Debug.warn('获取数据失败', e);
      this.setState(DATA)
    })
  }

  render () {
    timeLog("首屏渲染")
    const { increase, active, charge, all, analysis: { access, order, payment } } = this.state;
    const orderScale = (((order.new+order.old)/(access.new+access.old))*100).toFixed(0)
    const payScale = (((payment.new+payment.old)/(order.new+order.old))*100).toFixed(0)
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
            <div className="analysis-left">
              <div className="analysis1-content">
                <span className="analysis-btn1"><i className="iconfont icon-access"></i>访问人数</span>
                <p className="analysis-text">会员:{access.new+access.old}人<span>（新会员:{access.new}人，老会员:{access.old}人）</span></p>
              </div>
              <div className="analysis1-content">
                <span className="analysis-btn2"><i className="iconfont icon-shoppingcar"></i>下单人数</span>
                <p className="analysis-text">会员:{order.new+order.old}人<span>（新会员:{order.new}人，老会员:{order.old}人）</span></p>
              </div>
              <div className="analysis1-content">
                <span className="analysis-btn3"><i className="iconfont icon-pay"></i>付款人数</span>
                <p className="analysis-text">会员:{payment.new+payment.old}人<span>（新会员:{payment.new}人，老会员:{payment.old}人）</span></p>
              </div>
              <div className="analysis-link1"></div>
              <div className="analysis-link2"></div>
            </div>
            <div className="analysis-right">
              <div className="analysis2-content1">
                <div className="analysis2-box">
                  <span className="analysis2-text1">浏览下单转换率</span>
                  <span className="analysis2-text2">{orderScale}<i>%</i></span>
                </div>
              </div>
              <div className="analysis2-content2">
                <div className="analysis2-box">
                  <span className="analysis2-text1">下单支付转换率</span>
                  <span className="analysis2-text2">{payScale}<i>%</i></span>
                </div>
              </div>
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
