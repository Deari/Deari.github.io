import React from 'react'
import fetchUtil from 'utils/fetchUtil'
import { getDomain } from 'utils/domain'
import debug from 'utils/debug'
import Sidebar, {RenderTags} from 'components/Sidebar'
import OpenList from 'components/OpenList'
import { scrollToTop } from 'components/ScrollToTop'

class Main extends React.Component {
  state = {
    listData: [],
    tags: [], 
    activeTag: 0,
    urls: {
      create: { url: `http://iotdev.ffan.net/zh-cn/developer/product/create`, name: '创建新硬件' },
      list: { url: `http://iotdev.ffan.net/zh-cn/developer/product/all`, name: '我的硬件' },
      doc: { url: `/hardware/doc` }
    },
    detailLink: '/hardware/detail/',
    limit:100,
  }

  async getList(tagId) {
    let id = tagId || 0
    let apiUrl = getDomain(`web/market/tag/${id}/hardware?limit=${this.state.limit}`) 
    try {
      let res = await fetchUtil.getJSON(apiUrl)
      if (res.status === 200) {
        let arr = [];
        res.data.list.map((v)=>{
          const obj={
            hardwareFunction:v.productDesc,
            hardwareLogo:v.image,
            hardwareName:v.verboseName,
            hardwarePrice:v.price,
            hardwareId:v.id,
            developerName:v.brand
          }
          arr.push(obj)
        })
        res.data && this.setState({ listData: arr })
      } else {
        debug.warn("获取列表接口返回错误")
      }
    } catch (e) {
      console.log("获取列表接口返回错误", e)
    }
  }

  async getTags() {
    let apiUrl = getDomain(`public/common/tags?type=hardware`)
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
      item.aHref = (index == 0) ? `/hardware` : `/hardware?tagId=${item.tagId}`
      item.className = ((item.tagId == activeTag) && "active") || ''
    })

    this.setState({ tags: tags, activeTag: activeTag }, () => {
      this.getList(activeTag)
    })
  }

  checkValid() {
    let { activeTag } = this.state
    const search = location.search
    const name = search && search.split('=')[0].slice(1)
    const tagId = search && search.split('=')[1] * 1

    if (name == 'tagId' && typeof(tagId) === 'number' && Number.isInteger(tagId) && tagId >= 13 && tagId < 21) {
      activeTag = tagId
    } else {
      activeTag = 0
    }
    return activeTag
  }

  tagChange(tagId) {

    scrollToTop()

    let { activeTag, tags } = this.state
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
      if (listData[i].hardwareId === item.hardwareId) {
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

    return (
        <div className="container clx">
          <Sidebar onTagChange={this.tagChange.bind(this)} tags={tags} urls={urls} bottomComponent={RenderTags} typeName="hardware"/>
          <div className="sub-container">
            <div className="sub-container-banner-hardware"></div>
            <h2 className="open-content-nav">
              <i className="iconfont icon-hot-control"></i>热门硬件
              {/**<form>
                <p>
                  <select>
                    <option>默认排序</option>
                    <option>默认1排序</option>
                    <option>默认2排序</option>
                  </select>
                </p>
                <p>
                  <select>
                    <option>价格排序</option>
                    <option>价格1排序</option>
                    <option>价格2排序</option>
                  </select>
                </p>
              </form>*/}
            </h2>
            <OpenList listData={listData} typeName="hardware" detailLink={detailLink} clickStar={this.clickStar.bind(this)} />
          </div>
        </div>
    )
  }
}

export default Main
