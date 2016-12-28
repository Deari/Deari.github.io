import React from 'react'
import { RouterHandler, Link } from 'react-router'
import fetchUtil from '../../../utils/fetchUtil'
import moment from 'moment'
import Relative from '../../../../components/Relative'
import Slidebar from '../../../../components/Sidebar'
import OpenList from '../../../../components/OpenList'
import '../../../../styles/_base.scss'
import '../../index.scss'

class Detail extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      widgets: [],
      listData: []
    };
  }
  async componentDidMount() {
    console.log(this.props)
    let id = this.props.params.id;
    let apiUrl = `http://api.intra.sit.ffan.net/bo/v1/web/app/${id}`;
    try {
      let res = await fetchUtil.getJSON(apiUrl);
      if (res && res.status === 200) {
        res.data && this.formatData(res.data);
      }
    } catch (e) {
      console.log(e);
    }
  }
  formatData(data) {
    if (data.updateTime) {
      data.updateTime = moment(parseInt(data.updateTime)).format('YYYY-MM-DD H:m:s')
      data.createTime = moment(parseInt(data.updateTime)).format('YYYY-MM-DD H:m:s')
    }
    this.setState({data: data});
  }
  render() {
    let data = this.state.data;
    let { listData } = this.state
    return (
      <div className="core-layout__viewport">
        <div className="container clx">
            <Slidebar />
            <div className="sub-container bg-white">
              <div className="detail-container">
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
            <div className="detail-moreApps">
                <div className="moreApp-list">
                  <h3><span className="float-right text-gray9-color">更多>></span>相关的店铺组件</h3>
                  <OpenList listData={listData} typeName="app" />
                </div>
                <div className="moreApp-list">
                  <h3><span className="float-right text-gray9-color">更多>></span>相关的开放硬件</h3>
                  <OpenList listData={listData} typeName="app" />
                </div>
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
