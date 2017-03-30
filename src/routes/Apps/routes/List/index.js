import React from 'react'
import { Link } from 'react-router'
import List from 'components/List'
import Pager from 'components/Pager'
import fetchUtil from 'utils/fetchUtil'
import { getDomain, getLoginDomain, getApiDomain, getSourceVal } from 'utils/domain'
import LoginSDK from 'utils/loginSDK'
import debug from 'utils/debug'
import Slidebar from 'components/Sidebar'
import ListNav from 'components/ListNav'
import { getCodeStatus } from 'components/Detail/header'
import './index.scss'
import 'styles/_base.scss'

class AppsList extends React.Component {
  state = {
    listData: [],
    navData: [
      {name: "全部", value: 0, active: true},
      {name: "已审核", value: 2},
      {name: "待审核", value: 1},
      {name: "待提交", value: 3}
    ],
    limitList:[10,20,50],
    currentPageIndex:1,
    pageIndexs:[],
    pageSum:0,
    limit:10
  }

  async getList() {
    const apiUrl = getDomain("web/developer/apps")
    const review = this.getReviewStatus()
    const {limit, currentPageIndex} = this.state
    try {
      let res = await fetchUtil.getJSON(apiUrl, { review: review, limit: limit, page: currentPageIndex });
      if(res.status == 200){
        return res.data 
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

  getStatus(listData, version) {
    let stateObj = getCodeStatus(listData, version) || {}
    switch(stateObj.codeStatus) {
      case 1:
        return { stateObj, showEdit: true, showNew: false, activeColor: "color-yellow", }
        break
      case 2:
        return { stateObj, showEdit: false, showNew: false, activeColor: "color-yellow", }
        break
      case 3:
        return { stateObj, showEdit: false, showNew: false, activeColor: "color-yellow", }
        break
      case 4:
        return { stateObj, showEdit: true, showNew: false, activeColor: "color-red", }
        break
      case 5:
        return { stateObj, showEdit: false, showNew: true, activeColor: "color-green", }
        break
      case 6:
        return { stateObj, showEdit: false, showNew: true, activeColor: "color-red", }
        break
      case 7:
        return { stateObj, showEdit: false, showNew: true, activeColor: "color-red", }
        break
      default:
        return ''
    }
  }

  getPageIndexs(pageSum){
    let newArray=[]
    for(let i=0;i<pageSum;i++){
      const obj = {};
      obj.value = i+1; 
      newArray.push(obj)
    }
    return newArray
  }

  formatListData(listData) {
    let newData = []
    listData && listData.map((item, index) => {
      if (item) {
        let obj = {}
        let latestStatusObj = item.versions && item.versions[0] && this.getStatus(item, item.versions[0]) || {}
        let prevStatusObj = item.versions && item.versions[1] && this.getStatus(item, item.versions[1]) || {}
        obj.id = item.appId && item.appId || ''
        obj.logo = item.appLogo && item.appLogo || ''
        obj.name = item.appName && item.appName || ''
        obj.desc = item.appDesc && item.appDesc || ''
        obj.price = '免费'
        obj.download = 100
        obj.detailUrl = `/apps/detail/${obj.id}`
        obj.appKind = item.appKind
        obj.marketUrl = `/apps`
        obj.marketUrlTxt = '在应用市场中查看'
        obj.latestActiveColor = latestStatusObj.activeColor && latestStatusObj.activeColor || ''
        obj.latestCodeVersion = latestStatusObj.stateObj && latestStatusObj.stateObj.codeVersion || ''
        obj.latestStatusName = latestStatusObj.stateObj && latestStatusObj.stateObj.codeStatusName || ''
        obj.prevActiveColor = prevStatusObj.activeColor && prevStatusObj.activeColor || ''
        obj.prevCodeVersion = prevStatusObj.stateObj && prevStatusObj.stateObj.codeVersion || ''
        obj.prevStatusName = prevStatusObj.stateObj && prevStatusObj.stateObj.codeStatusName || ''

        let latestCodeStatus = latestStatusObj.stateObj && latestStatusObj.stateObj.codeStatus || ''
        let prevCodeStatus = prevStatusObj.stateObj && prevStatusObj.stateObj.codeStatus || ''

        if (latestCodeStatus === prevCodeStatus) obj.prevCodeVersion = ''

        obj.showOpenLink = latestCodeStatus == 5 || prevCodeStatus == 5
        
        const editUrl = `/apps/edit/${obj.id}`

        obj.btnData = [
          {name: "编辑", url: editUrl, active: latestStatusObj.showEdit},
          {name: "发布新版本", url: editUrl, active: latestStatusObj.showNew}
        ]
        
        newData.push(obj)
      }
    })
    
    return newData
  }
  upDate(currentPageIndex){
  
      let sourceVal = getSourceVal()
      let url = getLoginDomain(`passport/session-check.json`)
      let loginUrl = getApiDomain(`#!/login?source=${sourceVal}`)
      let callbackUrl = location.href

      LoginSDK.getStatus( async (status, data) => {
      if (status) {
   
        const resData = await this.getList()
        const listData = resData.list
        const newData = listData && this.formatListData(listData)
 
        const pageSum = resData.page.lastPage
        const pageIndexs = this.getPageIndexs(pageSum)
  
        newData && this.setState({listData: newData,pageSum:pageSum,pageIndexs:pageIndexs})
      } else {
        debug.warn("登录失败")
      }
    }, url, loginUrl, callbackUrl)
  }
  componentDidMount() {
    this.upDate()
  }

  changeNav(obj) {
    this.setState({...obj, currentPageIndex:1 }, this.upDate())
  }
  changeSelect(e){
    this.setState({currentPageIndex:e.target.value},this.upDate())
    
  }
  changePage(e,index){
    this.setState({currentPageIndex:index},this.upDate())
  }
  changeNextPage(){
    const {currentPageIndex,pageSum} = this.state
    const index = this.state.currentPageIndex + 1
    if (index <= pageSum) {
      this.setState({ currentPageIndex: index },this.upDate())
    } 
  }
  changePrevPage(){
    const {currentPageIndex} = this.state
    const index = currentPageIndex - 1
    if (index > 0) {
      this.setState({ currentPageIndex: index },this.upDate())
    }
  }
  changeLimit(e){
    this.setState({limit:e.target.value,currentPageIndex:1},this.upDate())
  }
  render() {

    const { navData, listData, pageIndexs, pageSum, currentPageIndex,limitList} = this.state

    const urls = {
      create: { url: `/apps/create`, name: '创建新应用' },
      list: { url: `/apps/list`, name: '我的应用', active: true },
      doc: { url: `/apps/doc` }
    }

    return (
      <div className="container clx">
        <Slidebar urls={urls} />
        <div className="sub-container plf bg-white">
          <ListNav navData={navData} onChange={this.changeNav.bind(this)} />
          <ul className="list-title">
            <li className="w124">Logo</li>
            <li className="w332">应用名称</li>
            <li className="w90">价格</li>
            <li className="w190">状态</li>
            {/**<li className="w90">已下载</li>*/}
            <li className="w112">操作</li>
          </ul>
          <List listData={listData} />
          <Pager 
            changePage={this.changePage.bind(this)} 
            changeNextPage={this.changeNextPage.bind(this)} 
            changePrevPage={this.changePrevPage.bind(this)}
            changeSelect={this.changeSelect.bind(this)}
            changeLimit={this.changeLimit.bind(this)} 
            pageIndexs={pageIndexs}  
            pageSum={pageSum} 
            limitList={limitList}  
            currentPageIndex={currentPageIndex}      
          />
        </div>
      </div>
    )
  }
}
module.exports = (store) => ({
  path: 'list',
  component: AppsList
})
