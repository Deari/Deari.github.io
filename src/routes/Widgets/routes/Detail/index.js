import React from 'react'
import { Link } from 'react-router'
import fetchUtil from '../../../utils/fetchUtil'
import { getDomain } from '../../../utils/domain';
import moment from 'moment'
import Slidebar from '../../../../components/Sidebar'
import OpenList from '../../../../components/OpenList'
import '../../../../styles/_base.scss'
import './index.scss'

class WidgetsDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      listData: []
    };
  }
  async componentDidMount() {
    let id = this.props.params.id;
    let apiUrl = getDomain(`http://api.intra.`, `ffan.net/bo/v1/web/app/${id}`);
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
    data.updateTime = data.updateTime && moment(parseInt(data.updateTime)).format('YYYY-MM-DD H:m:s')
    data.createTime = data.createTime && moment(parseInt(data.updateTime)).format('YYYY-MM-DD H:m:s')
    this.setState({data: data});
  }
  render() {
    let { data, listData } = this.state
    const urls = {
      create: { url: `/widgets/create` },
      list: { url: `/widgets/list` },
      doc: { url: `/widgets/doc` }
    }

    return (
      <div className="container clx">
        <Slidebar urls={urls} type='组件'/>
        <div className="sub-container bg-white">
          <div className="detail-container">
            <div className="detail-download">
              <img className="appImg" src={ data.appLogo } alt="LOGO"/>
              <a className="btn btn-primary btn-download" href={ data.fileLink } target="_blank" download="">下载</a>
            </div>
            <div className="detail-info">
              <dl className="detail-tittle">
                <dt>应用名称-{ data.appName }</dt>
                <dd><i className="user-img"></i>极速数据（企业）</dd>
              </dl>
              <h3 className="app-title">版本：{ data.lastCodeVersion ? `${data.lastCodeVersion}的细节功能` : `` } <span>（时间：{ data.updateTime }）</span></h3>
              <p className="app-text">{ data.appDesc }</p>
              <h3 className="app-title">作者：{ data.developerName }</h3>
              <p className="app-text">(假字)加入专属玩家群102452812、462237553，参与独家激情活动。</p>
            </div>
          </div>
          <div className="detail-moreApps">
            <div className="moreApp-list">
              <h3><span className="float-right text-gray9-color">更多>></span>相关的店铺组件</h3>
              <OpenList listData={ listData } typeName="app" />
            </div>
            <div className="moreApp-list">
              <h3><span className="float-right text-gray9-color">更多>></span>相关的开放硬件</h3>
              <OpenList listData={ listData } typeName="app" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

module.exports = (store) => ({
  path: 'detail/:id',
  component: WidgetsDetail
})