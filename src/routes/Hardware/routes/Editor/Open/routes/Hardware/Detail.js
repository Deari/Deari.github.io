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
              <div className="silder pull-left"></div>
              <div className="price pull-right">
                <p className="title">硬件名称:<span className="text">BEACON</span></p>
                <p className="title">库存:<span className="text">123456件</span></p>
                <p className="title mt40">价格:<span className="text text-lg-red">345元</span></p>
                <a className="btn btn-primary">下载</a>
              </div>
            </div>
            <div className="tab-detail-info">
              <div className="tab">
                <a className="active">商品介绍</a>
                <a>规格参数</a>
              </div>
              <p className="text">相关的店铺组件相关的店铺组件相关的店铺组件相关的店铺组件相关的店铺组件相关的店铺组件相关的店铺组件
              相关的店铺组件相关的店铺组件相关的店铺组件相关的店铺组件相关的店铺组件相关的店铺组件相关的店铺组件</p>
            </div>
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
