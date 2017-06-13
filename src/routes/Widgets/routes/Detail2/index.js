/**
 * Created by lizhuo on 2017/6/12.
 */
import React from 'react'
import { Link } from 'react-router'
import fetchUtil from 'utils/fetch'
import { getDomain } from 'utils/d'
import debug from 'utils/debug'
import moment from 'moment'
import SideBar from 'business/SideBar'
import { PageTypes, getPageLinks } from 'config/index'
import { getCodeStatus } from 'components/Detail/header'
import Detail from 'components/Detail2'

class WidgetsDetail extends React.Component {
  constructor () {
    super()
    this.state = {
      data: [],
      tags:[],
      versions: [],
      currentCode: '',
      activeCodeVersion: '',
      activeCodeStatus: 0,
      showAll: false
    }
  }

  async getInfo () {
    let id = this.props.params.id
    await fetchUtil.getJSON(getDomain(`/app/v1/bo/v1/web/developer/app/${id}`))
      .then(data => {
        this.formatData(data)
      })
      .catch(err => {
        console.log('获取详情接口返回错误', err)
      })
  }

  async getTags () {
    await fetchUtil.getJSON(getDomain(`/app/v1/bo/v1/public/common/tags?type=widget`))
      .then(data => {
        this.setState({tags:data})
      })
      .catch(err => {
        console.log('获取标签接口返回错误', err)
      })
  }

  async componentDidMount () {
    await this.getInfo()
    await this.getTags()
    let { tags } = this.state
    tags.unshift({ tagId: 0, tagName: '全部标签' })
    tags.map((item, index) => {
      item.aHref = (index === 0) ? `/widgets` : `/widgets?tagId=${item.tagId}`
    })
    this.setState({ tags: tags })
  }

  formatData (data) {
    data.updateTime = data.updateTime && moment(data.updateTime * 1000).format('YYYY-MM-DD HH:mm:ss')
    data.createTime = data.createTime && moment(data.createTime * 1000).format('YYYY-MM-DD HH:mm:ss')

    data.versions.map((v, index) => {
      v.codeUpdateTime = v.codeUpdateTime && moment(v.codeUpdateTime * 1000).format('YYYY-MM-DD HH:mm:ss')
    })

    const { currentCode } = this.state
    const activeCode = data.versions[0]
    const activeCodeStatus = WidgetsDetail.getLatestVersionStatus(data, activeCode)
    const versions = (data.versions && data.versions.slice(1, 2)) || []

    this.setState({ data: data, activeCodeStatus: activeCodeStatus, currentCode: activeCode, versions: versions })
  }

  static getLatestVersionStatus (data, currentCode) {
    if (!data || data.mine === 0) return 0
    if (currentCode) {
      return getCodeStatus(data, currentCode).codeStatus
    }
  }

  changeShowAll () {
    const { data } = this.state
    const showAll = !this.state.showAll
    const fistHistory = data.versions.slice(1, 2) || []
    const histories = data.versions.slice(1) || []
    showAll
      ? this.setState({ versions: histories, showAll: showAll })
      : this.setState({ versions: fistHistory, showAll: showAll })
  }

  changeRange (operation) {
    const { activeCodeStatus } = this.state
    if ((activeCodeStatus === 5 && operation === 'shelve') ||
      (activeCodeStatus === 7 && operation === 'unshelve')) return
    let id = this.props.params.id
    let apiUrl = getDomain(`/app/v1/bo/v1/web/developer/shelveApp/${id}?operation=${operation}`)
    fetchUtil.getJSON(apiUrl).then((res) => {
      if (res && res.status === 200) {
        debug.warn('操作成功')
        this.getInfo()
      } else {
        debug.warn('操作失败')
      }
    }).catch(e => {
      debug.warn('网络错误')
    })
  }

  changeVersionBtn (code, version) {
    const { currentCode } = this.state
    if (code.codeVersion === currentCode.codeVersion) return
    code && this.setState({
      currentCode: version,
      activeCodeStatus: code.value
    })
  }

  clickPublish () {
    const { data } = this.state
    const appId = data && data.appId
    const formData = new FormData()
    formData.append('onLine', 1)

    let apiUrl = getDomain(`/app/v1/bo/v1/web/developer/app/${appId}/publish`)
    fetchUtil.postJSON(apiUrl, formData, { jsonStringify: false }).then(res => {
      if (res.status === 200) {
        debug.warn('发布成功')
        this.getInfo()
      } else {
        debug.warn('发布失败')
      }
    }).catch(e => {
      debug.warn('网络错误')
    })
  }

  render () {
    const { data, tags, versions, showAll, currentCode, activeCodeStatus } = this.state,
      infoTags = data.tags || [],
      latestVersion = currentCode || {},
      showSize = false,
      versionsAll = data.versions

    return (
      <div className='container'>
        <SideBar pageLinks={getPageLinks('widgets')} type={'widgets'} />
        <Detail data={data} latestVersion={latestVersion} infoTags={infoTags} versions={versions}
                showAll={showAll} showSize={showSize}
                onChangeShowAll={this.changeShowAll.bind(this)} onChangeRange={this.changeRange.bind(this)}
                onChangeVersion={this.changeVersionBtn.bind(this)}
                activeCodeStatus={activeCodeStatus} onClickPublish={this.clickPublish.bind(this)} versionsAll={versionsAll} />
      </div>
    )
  }
}

module.exports = (store) => ({
  path: 'detail2/:id',
  component: WidgetsDetail
})
