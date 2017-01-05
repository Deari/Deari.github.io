import React from 'react'
import { Link } from 'react-router'
import fetchUtil from '../../../utils/fetchUtil'
import { getDomain } from '../../../utils/domain';
import moment from 'moment'
import Slidebar from '../../../../components/Sidebar'
import '../../../../styles/_base.scss'
import './index.scss'

class WidgetsDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      data: []
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
    let { data } = this.state
    const tags = data.tags || []
    const len = tags.length
    const urls = {
      create: { url: `/widgets/create` },
      list: { url: `/widgets/list` },
      doc: { url: `/widgets/doc` }
    }

    return (
      <div className="container clx">
        <Slidebar urls={urls} type='widget'/>
        <div className="sub-container bg-white">
          <div className="detail-container">
            <div className="detail-download">
              <img className="appImg" src={ data.appLogo } alt="LOGO"/>
              <a className="btn btn-primary btn-download" href={ data.fileLink } target="_blank" download="">下载</a>
            </div>
            <div className="detail-info">
              <dl className="detail-tittle">
                <dt>{ data.appName }</dt>
                <dd><i className="user-img"></i>{ data.developerName }</dd>
              </dl>
              <h3 className="app-title">内容提要</h3>
              <p className="app-text">{ data.appDesc }</p>
              <h3 className="app-title">信息</h3>
              <table className="infomation-list">
                <tr>
                  <td>类别</td>
                  <td>
                    <a className="tag" href="">{ data.categoryName }</a>
                  </td>
                </tr>
                <tr>
                  <td>标签</td>
                  <td>
                  {
                     tags.map( (item, index) => {
                       return (
                         <a className="tag">{item.tagName}{ (index < len - 1) ? `、` : '' }</a>
                       )
                     } )
                  }
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div className="table-info">
            <h3 className="app-title">版本信息</h3>
            <table className="detail-table">
              <tr>
                <td className="title">更新日期</td>
                <td className="text">2016年12月21日</td>
              </tr>
              <tr>
                <td className="title">版本</td>
                <td className="text">0.1.6</td>
              </tr>
              <tr>
                <td className="title">大小</td>
                <td className="text">10MB</td>
              </tr>
              <tr>
                <td className="title">版本介绍</td>
                <td className="text">版本介绍信息</td>
              </tr>
              <tr>
                <td className="title">组件尺寸</td>
                <td className="text">2*1</td>
              </tr>
              <tr>
                <td className="title">预览图</td>
                <td className="text">
                  <div className="img-block">
                    <p className="img-text">加载中</p>
                    <img className="img" src="" />
                  </div>
                </td>
              </tr>
            </table>
            <h3 className="app-title">历史版本</h3>
            <table className="detail-table">
              <tr>
                <td className="title">更新日期</td>
                <td className="text">2016年11月15日</td>
              </tr>
              <tr>
                <td className="title">大小</td>
                <td className="text">10MB</td>
              </tr>
              <tr>
                <td className="title">版本</td>
                <td className="text">0.1.5</td>
              </tr>
              <tr>
                <td className="title">版本介绍</td>
                <td className="text">性能优化</td>
              </tr>
            </table>
            <a className="read-more" href="">...更多版本介绍</a>
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