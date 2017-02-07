import React from 'react'
import { Link } from 'react-router'
import fetchUtil from 'utils/fetchUtil'
import { getDomain } from 'utils/domain'
import debug from 'utils/debug'
import moment from 'moment'
import Slidebar from 'components/Sidebar'
import Versions from 'components/Versions'
import 'styles/_base.scss'
import './index.scss'

class AppsDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      tags: [],
      versions: [],
      showAll: false
    };
  }

  async getInfo() {
    let id = this.props.params.id;
    let apiUrl = getDomain(`web/app/${id}`);
    try {
      let res = await fetchUtil.getJSON(apiUrl);
      if (res && res.status === 200) {
        res.data && this.formatData(res.data);
      } else {
        debug.warn("获取详情接口返回错误")
      }
    } catch (e) {
     debug.warn("获取详情接口返回错误")
    }
  }

  async getTags() {
    let apiUrl = getDomain(`public/common/tags?type=app`);
    try {
      let res = await fetchUtil.getJSON(apiUrl)
      if (res.status === 200) {
        res.data && this.setState({ tags: res.data })
      } else {
        debug.warn("获取标签接口返回错误")
      }
    } catch (e) {
      debug.warn("获取标签接口返回错误")
    }
  }

  async componentDidMount() {
    await this.getInfo()
    await this.getTags()
    let { tags } = this.state
    tags.unshift({ tagId: 0, tagName: "全部标签" })
    tags.map((item, index)=> {
      item.aHref = (index == 0) ? `/apps` : `/apps?tagId=${item.tagId}`
    })
    this.setState({ tags: tags })
  }

  formatData(data) {
    data.updateTime = data.updateTime && moment(data.updateTime * 1000).format("YYYY-MM-DD H:m:s")
    data.createTime = data.createTime && moment(data.createTime * 1000).format("YYYY-MM-DD H:m:s")

    data.versions.map((v, index) => {
      v.codeUpdateTime = v.codeUpdateTime && moment(v.codeUpdateTime * 1000).format('YYYY-MM-DD H:m:s')
      const size = (v.bundleSize && (v.bundleSize/1024/1024).toFixed(2)) || 0
      v.bundleSize = (size && size != 0.00 && `${size} MB`) || `0 MB`
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
    
    const { data, tags, versions, showAll } = this.state
    const infoTags = data.tags || []
    const len = infoTags.length

    const latestVersion = (data.versions && data.versions[0]) || {}

    const showSize = true

    const urls = {
      create: { url: `/apps/create`, name: '发布新应用' },
      list: { url: `/apps/list`, name: '我的应用' },
      doc: { url: `/apps/doc` }
    }

    return (
      <div className="container clx">
        <Slidebar urls={urls} tags={tags} />
        <div className="sub-container bg-white">
          <div className="detail-container">
            <div className="detail-download">
              <img className="appImg" src={ data.appLogo } alt="LOGO"/>
              <a className="btn btn-primary btn-download" href={ latestVersion.downloadUrl } target="_blank">下载</a>
            </div>
            <div className="detail-info">
              <dl className="detail-tittle">
                <dt>{ data.appName }</dt>
                <dd><i className="user-img"></i><span>{ data.developerName }</span></dd>
              </dl>
              <h3 className="app-title">内容提要</h3>
              <p className="app-text">{ data.appDesc }</p>
              <h3 className="app-title">信息</h3>
              <table className="infomation-list">
                <tr>
                  <td>类别</td>
                  <td>
                    <span className="tag">{ data.categoryName }</span>
                  </td>
                </tr>
                <tr>
                  <td>标签</td>
                  <td>
                  {
                     infoTags.map( (item, index) => {
                       return (
                         <span className="tag">{item.tagName}{ (index < len - 1) ? `、` : '' }</span>
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
            <ul className="detail-tableList">
              <li className="item">
                <div className="cell">
                  <p className="title">更新日期</p>
                  <p className="text">{ latestVersion.codeUpdateTime }</p>
                </div>
                <div className="cell">
                  <p className="title">版本</p>
                  <p className="text">{ latestVersion.codeVersion }</p>
                </div>
                <div className="cell">
                  <p className="title">大小</p>
                  <p className="text">{ latestVersion.bundleSize }</p>
                </div>
                <div className="cell">
                  <p className="title">版本介绍</p>
                  <p className="text">{ latestVersion.codeDesc }</p>
                </div>
              </li>
            </ul>
            <Versions data={versions} onChange={this.getVersions.bind(this)} showAll={showAll} showSize={showSize} />
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