import React from 'react'
import { Link } from 'react-router'
import List from 'components/List'
import fetchUtil from 'utils/fetchUtil'
import { getDomain, getLoginDomain, getApiDomain, getSourceVal } from 'utils/domain'
import LoginSDK from 'utils/loginSDK'
import debug from 'utils/debug'
import Slidebar from 'components/Sidebar'
import ListNav from 'components/ListNav'
import './index.scss'
import 'styles/_base.scss'

class HardwaresList extends React.Component {
  state = {
    listData: [],
    navData: [
      {name: "全部", value: -1, active: true},
      {name: "已审核", value: 2},
      {name: "待审核", value: 1},
      {name: "待提交", value: 0}
    ]
  }

  async getList() {
    let apiUrl = getDomain("web/hardware/myHardware")
    const reviewStatus = this.getReviewStatus()
    if (reviewStatus > -1) apiUrl = getDomain(`web/hardware/myHardware/${reviewStatus}`)
    try {
      let res = await fetchUtil.getJSON(apiUrl);
      if(res.status == 200){
        return res.data && res.data.list
      } else {
        debug.warn("获取列表接口错误")
        return false
      }
    } catch (e) {
      console.log("网络错误", e)
    }
  }

  getReviewStatus() {
    const { navData } = this.state
    let reviewStatus = 0
    navData.map((item, index) => {
      if (item && item.active) reviewStatus = item.value 
    })
    return reviewStatus
  }

  getStatus(item) {
    let state = parseInt(item.hardwareStatus)

    switch(state) {
      case 1:
        return { status: "待审核", showEdit: false, showDebug: true }
        break
      case 2:
        return { status: "已审核", showEdit: false, showDebug: true }
        break
      case 0:
        return { status: "待提交", showEdit: true, showDebug: true }
        break
      default:
        return ''
    }
  }

  formatListData(listData) {
    let newData = []
    listData.map((item, index) => {
      if (item) {
        let obj = {}

        obj.id = item.hardwareId && item.hardwareId || ''
        obj.logo = item.hardwareLogo && item.hardwareLogo || ''
        obj.name = item.hardwareName && item.hardwareName || ''
        obj.desc = item.hardwareFunction && item.hardwareFunction || ''
        obj.price = item.hardwarePrice && item.hardwarePrice || '免费'
        obj.status = this.getStatus(item).status
        obj.download = item.hardwareDownnum && item.hardwareDownnum || 100
        obj.detailUrl = `/hardware/detail/${obj.id}`

        const editUrl = `/hardware/edit/${obj.id}`
        const debugUrl = `/hardware/doc`

        const showBtn = this.getStatus(item)

        obj.btnData = [
          {name: "编辑", url: editUrl, active: showBtn.showEdit},
          {name: "调试硬件", url: debugUrl, active: showBtn.showDebug}
        ]

        newData.push(obj)
      }
    })
    
    return newData
  }

  componentDidMount() {
    let sourceVal = getSourceVal()
    let url = getLoginDomain(`passport/session-check.json`)
    let loginUrl = getApiDomain(`#!/login?source=${sourceVal}`)
    let callbackUrl = location.href

    LoginSDK.getStatus( async (status, data) => {
      if (status) {
        const listData = await this.getList()
        const newData = listData && this.formatListData(listData)
        newData && this.setState({listData: newData})
      } else {
        debug.warn("登录失败")
      }
    }, url, loginUrl, callbackUrl)
  }

  changeNav(obj) {
    this.setState({...obj}, async () => {
      const listData = await this.getList()
      const newData = listData && this.formatListData(listData)
      newData && this.setState({listData: newData})
    })
  }

  render() {

    const { navData, listData } = this.state

    const urls = {
      create: { url: `/hardware/create`, name: '发布新硬件' },
      list: { url: `/hardware/list`, name: '我的硬件', active: true },
      doc: { url: `/hardware/doc` }
    }

    return (
      <div className="container clx">
        <Slidebar urls={urls} type="hardware"/>
        <div className="sub-container plf bg-white">
          <ListNav navData={navData} onChange={this.changeNav.bind(this)} />
          <ul className="list-title">
            <li className="w124">Logo</li>
            <li className="w332">硬件名称</li>
            <li className="w90">价格</li>
            <li className="w90">状态</li>
            <li className="w90">已激活</li>
            <li className="w112">操作</li>
          </ul>
          <List listData={listData} />
        </div>
      </div>
    )
  }
}

module.exports = (store) => ({
  path: 'list',
  component: HardwaresList
})