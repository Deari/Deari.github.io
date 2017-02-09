import React from 'react'
import { Link } from 'react-router'
import fetchUtil from 'utils/fetchUtil'
import { getDomain } from 'utils/domain'
import debug from 'utils/debug'
import moment from 'moment'
import Slidebar from 'components/Sidebar'
import { Versions } from 'components/Versions'
import Detail from 'components/Detail'

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
    const latestVersion = (data.versions && data.versions[0]) || {}
    const showSize = true
    const DFooter = Versions

    const urls = {
      create: { url: `/apps/create`, name: '发布新应用' },
      list: { url: `/apps/list`, name: '我的应用' },
      doc: { url: `/apps/doc` }
    }

    return (
      <div className="container clx">
        <Slidebar urls={urls} tags={tags} />

        <Detail data={data} latestVersion={latestVersion} infoTags={infoTags}
                versions={versions} showAll={showAll} showSize={showSize} 
                onChange={this.getVersions.bind(this)} DFooter={DFooter} />
      </div>
    )
  }
}

module.exports = (store) => ({
  path: 'detail/:id',
  component: AppsDetail
})