import React from 'react'
import { RouterHandler, Link } from 'react-router'
import fetchUtil from '../../../utils/fetchUtil'
import moment from 'moment'
import Relative from '../../../../components/Relative'
import Slidebar from '../../../../components/Sidebar'
import '../../../../styles/_base.scss'
import '../../index.scss'

class Detail extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      widgets: []
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
    return (
      <div className="core-layout__viewport">
        <div className="container clx">
            <Slidebar />
            <div className="sub-container bg-white">
              <div className="detail-container">
                <div className="detail-download">
                  <img className="appImg" src={data.appLogo} alt="LOGO"/>
                  <a className="btn btn-primary btn-download" href={data.fileLink} target="_blank" download="">下载</a>
                </div>
                <div className="detail-info">
                  <dl className="detail-tittle">
                    <dt>应用名称-{data.appName}</dt>
                    <dd><i className="user-img"></i>极速数据（企业）</dd>
                  </dl>
                  
                  <dl className="info-list">
      <dt><span className="text-blue-color">版本：{data.lastCodeVersion ? `${data.lastCodeVersion}的细节功能` : ``}</span> （时间：{data.updateTime}）</dt>
                    <dd>{data.appDesc}</dd>
                  </dl>
                  <dl className="info-list">
                    <dt><span className="text-blue-color">作者：{data.developerName}</span></dt>
                    <dd>(假字)加入专属玩家群102452812、462237553，参与独家激情活动。</dd>
                  </dl>
                  <div className="detail-moreApps">
                    <h3><span className="float-right text-gray9-color">更多>></span>相关的店铺组件</h3>
                    <Relative data={this.state.widgets} />
                  </div>
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
