import React from 'react'
import { Link } from 'react-router'
import fetchUtil from '../../../utils/fetchUtil'
import { getDomain } from '../../../utils/domain';
import moment from 'moment'
import Slidebar from '../../../../components/Sidebar'
import Versions from './versions'
import '../../../../styles/_base.scss'
import './index.scss'

class AppsDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      versions: [],
      showAll: false
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

    data.versions.map((v, index) => {
      v.codeUpdateTime = v.codeUpdateTime && moment(parseInt(v.codeUpdateTime)).format('YYYY-MM-DD H:m:s')
    })

    const versions = (data.versions && data.versions.slice(1, 2)) || []
    this.setState({data: data, versions: versions});
  }

  getVersions() {
    const { data } = this.state
    const showAll = !this.state.showAll
    const fistHistory = data.versions.slice(1, 2) || []
    const histories = data.versions.slice(1) || []
    showAll 
      ? this.setState({versions: histories, showAll: showAll}) 
      : this.setState({versions: fistHistory, showAll: showAll})
  }

  render() {
    const { data, versions, showAll } = this.state
    const tags = data.tags || []
    const len = tags.length

    const latestVersion = (data.versions && data.versions[0]) || {}

    const urls = {
      create: { url: `/apps/create` },
      list: { url: `/apps/list` },
      doc: { url: `/apps/doc` }
    }

    return (
      <div className="container clx">
        <Slidebar urls={urls} type='应用'/>
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
                    <a className="tag">{ data.categoryName }</a>
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
                <td className="text">{ latestVersion.codeUpdateTime }</td>
              </tr>
              <tr>
                <td className="title">版本</td>
                <td className="text">{ latestVersion.codeVersion }</td>
              </tr>
              <tr>
                <td className="title">大小</td>
                <td className="text">{ latestVersion.fileSize }</td>
              </tr>
              <tr>
                <td className="title">版本介绍</td>
                <td className="text">{ latestVersion.codeDesc }</td>
              </tr>
            </table>
            <Versions data={versions} onChange={this.getVersions.bind(this)} showAll={showAll} />
          </div>
        </div>
      </div>
    )
  }
}

module.exports = (store) => ({
  path: 'detail/:id',
  component: AppsDetail
})