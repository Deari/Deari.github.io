import React from 'react'
import fetchUtil from 'utils/fetchUtil'
import { getDomain } from 'utils/domain'
import debug from 'utils/debug'
import Sidebar, {RenderTags} from 'components/Sidebar'
import OpenList from 'components/OpenList'
import { scrollToTop } from 'components/ScrollToTop'
import SideBar from 'business/SideBar'
import { PageTypes, getPageLinks } from 'config/index'

class Main extends React.Component {
  state = {
    listData: [],
    tags: [], 
    activeTag: 0,
    urls: {
      create: { url: `/apps/create`, name: '创建新应用' },
      list: { url: `/apps/list`, name: '我的应用' },
      doc: { url: `/apps/doc`}
    },
    detailLink: '/apps/detail/'
  }

  async getList(tagId) {

    let id = tagId || 'all'
    let apiUrl = getDomain(`web/market/tag/${id}/apps`)
    try {
      let res = await fetchUtil.getJSON(apiUrl)
      if (res.status === 200) {
        res.data && this.setState({ listData: res.data.list })
      } else {
        debug.warn("获取列表接口返回错误")
      }
    } catch (e) {
      console.log("获取列表接口返回错误", e)
    }
  }

  async getTags() {
    let apiUrl = getDomain(`public/common/tags?type=app`)
    try {
      let res = await fetchUtil.getJSON(apiUrl)
      if (res.status === 200) {
        res.data && this.setState({ tags: res.data })
      } else {
        debug.warn("获取标签接口返回错误")
      }
    } catch (e) {
      console.log("获取标签接口返回错误", e)
    }
  }

  async componentDidMount() {
    await this.getTags()

    let { tags, activeTag } = this.state

    activeTag = this.checkValid()

    tags.unshift({ tagId: 0, tagName: "全部标签" })
    tags.map((item, index)=> {
      item.aHref = (index == 0) ? `/apps` : `/apps?tagId=${item.tagId}`
      item.className = ((item.tagId == activeTag) && "active") || ''
    })

    this.setState({ tags: tags, activeTag: activeTag}, () => { 
      this.getList(activeTag) 
    })
  }

  checkValid() {
    let { activeTag } = this.state
    const search = location.search
    const name = search && search.split('=')[0].slice(1)
    const tagId = search && search.split('=')[1] * 1

    if (name == 'tagId' && typeof(tagId) === 'number' && Number.isInteger(tagId) && tagId >= 0 && tagId < 8) {
      activeTag = tagId
    } else {
      activeTag = 0
    }
    return activeTag
  }

  tagChange(tagId) {

    scrollToTop()

    let { activeTag, tags, aHref } = this.state
    if ( activeTag === tagId ) return
    tags.map((item, index)=> {
      item.className = ((item.tagId == tagId) && "active") || ''
    })
    this.setState({ activeTag: tagId, tags: tags }, () => {
      this.getList(tagId)
    })
  }

  clickStar(item) {
    let { listData } = this.state
    for (let i=0; i<listData.length; i++) {
      if (listData[i].appId === item.appId) {
        if (listData[i].checkedStar) {
          listData[i].checkedStar = false
          this.setState({listData: listData})
          return
        } else {
          listData[i].checkedStar = true
          this.setState({listData: listData})
          return
        }
      }
    }
  }

  render () {
    const { listData, tags, urls, detailLink } = this.state
    const _tags = tags.map(item => {
      return {
        label: item.tagName,
        to: `/apps?tagId=${item.tagId}`,
        icon: `sidebar${item.tagId}`
      }
    })

    return (
      <div className="container clx">
        <SideBar 
          pageLinks={getPageLinks('apps')}
          type='apps'
          tagLinks={_tags}
        />

        {/*<Sidebar 
          onTagChange={this.tagChange.bind(this)} 
          tags={tags} 
          urls={urls} 
          bottomComponent={RenderTags} 
        />*/}
        <div className="sub-container">
          <div className="sub-container-banner"></div>
          <h2 className="open-content-nav">
            <i className="iconfont icon-hot-control"></i>热门应用
          </h2>
          <OpenList listData={listData} typeName="app" detailLink={detailLink} clickStar={this.clickStar.bind(this)} />
        </div>
      </div>
    )
  }
}

export default Main