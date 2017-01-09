import React from 'react'
import fetchUtil from 'routes/utils/fetchUtil'
import { getDomain } from 'routes/utils/domain'
import Sidebar from 'components/Sidebar'
import OpenList from 'components/OpenList'

class Main extends React.Component {
  state = {
    listData: [],
    tags: [], 
    activeTag: 0,
    urls: {
      create: { url: `/widgets/create`, name: '创建新组件' },
      list: { url: `/widgets/list`, name: '我的组件' },
      doc: { url: `/widgets/doc` }
    },
    detailLink: '/widgets/detail/'
  }
  async getList(tagId) {
    let id = tagId || 'all';
    let apiUrl = getDomain(
      `http://api.intra.`, 
      `ffan.net/bo/v1/web/market/tag/${id}/widgets`
    ) 
    try {
      let res = await fetchUtil.getJSON(apiUrl)
      if (res.status === 200) {
        res.data && this.setState({ listData: res.data.list })
      } else {
        res.msg && window.alert(res.msg)
      }
    } catch (e) {
      console.log("e ", e);
    }
  }
  async getTags() {
    let apiUrl = getDomain(
      `http://api.intra.`,
      `ffan.net/bo/v1/public/common/tags?type=widgets`
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
    await this.getList()
    await this.getTags()
    let { tags } = this.state
    tags.unshift({ tagId: 0, tagName: "全部" })
    this.setState({ tags: tags })
  }
  tagChange(tagId) {
    let { activeTag } = this.state
    if ( activeTag === tagId ) return
    this.setState({ activeTag: tagId })
    this.getList(tagId)
  }
  clickStar(item) {
    let { listData } = this.state
    for (let i=0; i<listData.length; i++) {
      if (listData[i].appId === item.appId) {
        if (listData[i].checkedStar) {
          listData[i].checkedStar = false;
          this.setState({listData: listData})
          return;
        } else {
          listData[i].checkedStar = true;
          this.setState({listData: listData})
          return
        }
      }
    }
  }
  render () {
    const { listData, tags, activeTag, urls, detailLink } = this.state
    return (
        <div className="container clx">
          <Sidebar onTagChange={this.tagChange.bind(this)} activeTag={activeTag} tags={tags} urls={urls} type="widget"/>
          <div className="sub-container">
            <div className="sub-container-banner"></div>
            <h2 className="open-content-nav">
              <i className="iconfont icon-hot-control"></i>热门组件
              <form>
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
              </form>
            </h2>
            <OpenList listData={listData} typeName="app" detailLink={detailLink} clickStar={this.clickStar.bind(this)} />
          </div>
        </div>
    )
  }
}

export default Main;
