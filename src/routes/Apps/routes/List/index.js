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

  getStatus(item) {
    let state = this.formatState(item)
    switch(state) {
      case 1:
        return { status: "审核中", showEdit: false, showNew: false, activeColor: "yellow", }
        break
      case 2:
        return { status: "已发布", showEdit: false, showNew: true, activeColor: "green", }
        break
      case 3:
        return { status: "被管理员下架", showEdit: false, showNew: true, activeColor: "red", }
        break
      case 4:
        return { status: "被开发者下架", showEdit: false, showNew: true, activeColor: "red", }
        break
      case 5:
        return { status: "等待开发者发布", showEdit: false, showNew: false, activeColor: "yellow", }
        break
      case 6:
        return { status: "审核未通过", showEdit: true, showNew: false, activeColor: "red", }
        break
      case 7:
        return { status: "准备提交", showEdit: true, showNew: false, activeColor: "yellow", }
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

  formatState(item) {
    let state = 0
    if(item.reviewStatus==1){
       return 1
    }else if(item.reviewStatus==2){
      if(item.adminUnshelved){
        return 3 
      }else if(item.devUnshelved){
        return 4
      }else if(item.publishStatus){
        return 2 
      }else{
        return 5
      }
    }else if(item.reviewStatus==3){
      return 6 
    }else {
      return 7
    }
  }

  formatListData(listData) {
    let newData = []
    listData.map((item, index) => {
      if (item) {
        let obj = {}
        obj.id = item.appId && item.appId || ''
        obj.logo = item.appLogo && item.appLogo || ''
        obj.name = item.appName && item.appName || ''
        obj.desc = item.appDesc && item.appDesc || ''
        obj.price = '免费'
        obj.statusObj = this.getStatus(item)
        obj.download = 100
        obj.detailUrl = `/apps/detail/${obj.id}`
        obj.appKind = item.appKind
        obj.marketUrl = `/apps`
        obj.marketUrlTxt = '在应用市场中查看'
        obj.codeVersion = item.codeVersion && item.codeVersion || ''
        const editUrl = `/apps/edit/${obj.id}`
        

        obj.btnData = [
          {name: "编辑", url: editUrl, active: obj.statusObj.showEdit},
          {name: "发布新版本", url: editUrl, active: obj.statusObj.showNew}
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
      let sourceVal = getSourceVal()
      let url = getLoginDomain(`passport/session-check.json`)
      let loginUrl = getApiDomain(`#!/login?source=${sourceVal}`)
      let callbackUrl = location.href

      LoginSDK.getStatus( async (status, data) => {
        if (status) {
          const resData = await this.getList()
          const listData = resData.list
          const pageSum = resData.page.lastPage
          const pageIndexs = this.getPageIndexs(pageSum)
          const newData = listData && this.formatListData(listData)
          newData && this.setState({listData: newData,pageIndexs:pageIndexs,pageSum:pageSum})
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
  changeSelect(e){
    this.setState({currentPageIndex:e.target.value})
    this.upDate()
  }
  changePage(e,index){
    this.setState({currentPageIndex:index})
    this.upDate()
  }
  changeNextPage(){
    const {currentPageIndex,pageSum} = this.state
    const index = this.state.currentPageIndex + 1
    if (index <= pageSum) {
      this.setState({ currentPageIndex: index })
      this.upDate()
    } else {
      alert("已经没有下一页了")
    }
  }
  changePrevPage(){
    const {currentPageIndex} = this.state
    const index = currentPageIndex - 1
    if (index > 0) {
      this.setState({ currentPageIndex: index })
      this.upDate()
    } else {
      alert("已经没有上一页了")
    }
  }
  changeLimit(e){
    if(!e.target.value)return
    this.setState({limit:e.target.value,currentPageIndex:1})
    this.upDate(this.state.currentPageIndex)
  }
  render() {

    const { navData, listData, pageIndexs, pageSum, currentPageIndex,limitList} = this.state

    const urls = {
      create: { url: `/apps/create`, name: '发布新应用' },
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
            <li className="w100">状态</li>
            <li className="w90">已下载</li>
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
