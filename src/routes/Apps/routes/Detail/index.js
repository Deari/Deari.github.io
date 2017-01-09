import React from 'react'
import { Link } from 'react-router'
import fetchUtil from 'routes/utils/fetchUtil'
import { getDomain } from 'routes/utils/domain';
import moment from 'moment'
import Slidebar from 'components/Sidebar'
import Versions from './versions'
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

  async getTags() {
    let apiUrl = getDomain(
      `http://api.intra.`,
      `ffan.net/bo/v1/public/common/tags?type=apps`
    );
    try {
      let res = await fetchUtil.getJSON(apiUrl)
      if (res.status === 200) {
        res.data && this.setState({ tags: res.data })
      } else {
        res.msg && window.alert(res.msg)
      }
    } catch (e) {
      console.log("e ", e);
    }
  }

  async componentDidMount() {
    await this.getInfo()
    await this.getTags()
    let { tags } = this.state
    tags.unshift({ tagId: 0, tagName: "全部" })
    tags.map((item, index)=> {
      item.aHref = (index == 0) ? `/apps` : `/apps?tagId=${item.tagId}`
    })
    this.setState({ tags: tags })
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
    
    const { data, tags, versions, showAll } = this.state
    const infoTags = data.tags || []
    const len = infoTags.length

    const latestVersion = (data.versions && data.versions[0]) || {}

    const urls = {
      create: { url: `/apps/create`, name: '创建新应用' },
      list: { url: `/apps/list`, name: '我的应用' },
      doc: { url: `/apps/doc` }
    }

    return (
      <div className="container clx">
        <Slidebar urls={urls} type='应用' tags={tags}/>
        <div className="sub-container bg-white">
          <div className="detail-container">
            <div className="detail-download">
              <img className="appImg" src={ data.appLogo } alt="LOGO"/>
              <a className="btn btn-primary btn-download" href={ latestVersion.downloadUrl } target="_blank">下载</a>
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
                     infoTags.map( (item, index) => {
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
          <Versions data={versions} latestVersion={latestVersion} onChange={this.getVersions.bind(this)} showAll={showAll} />
        </div>
      </div>
    )
  }
}

module.exports = (store) => ({
  path: 'detail/:id',
  component: AppsDetail
})