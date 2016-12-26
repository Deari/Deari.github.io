import React from 'react'
import { RouterHandler, Link } from 'react-router'
import '../../../../styles/_base.scss'
import '../../index.scss'
import fetchUtil from '../../../utils/fetchUtil'
import moment from 'moment'
import Relative from '../../../../components/Relative'

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
      <div className="bg-gray pt40">
        <div className="container">
          <div className="row bg-white p40">
            <div className="Detail-container clx">
              <div className="col-md-3 col-xs-3">
                <div className="Detail-appImg">
                  <img src={data.appLogo} alt="LOGO"/>
                </div>
                <div className="Detail-downloadBtn">
                  <a href={data.fileLink} target="_blank" download=""><button className="btn btn-primary">下载</button></a>
                </div>
              </div>
              <div className="col-md-9 col-xs-9 Detail-detail">
                <h3>应用名称-{data.appName}</h3>
                <dl>
    <dt><span className="text-blue-color">版本：{data.lastCodeVersion ? `${data.lastCodeVersion}的细节功能` : ``}</span> （时间：{data.updateTime}）</dt>
                  <dd><span>.</span>{data.appDesc}</dd>
                </dl>
                <dl>
                  <dt><span className="text-blue-color">作者：{data.developerName}</span></dt>
                  <dd><span>.</span>(假字)加入专属玩家群102452812、462237553，参与独家激情活动。</dd>
                </dl>
              </div>
            </div>
            <hr/>
            <div className="Detail-moreApps">
              <h3><span className="float-right text-gray9-color">更多>></span>相关的店铺组件</h3>
              <Relative data={this.state.widgets} />
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
