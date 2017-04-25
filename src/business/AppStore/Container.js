import React from 'react'
import fetchUtil from 'utils/fetch'
import { getDomain } from 'utils/domain'
import { PageTypes, getPageLinks } from 'config/index'
import SideBar from 'business/SideBar'
import OpenList from 'components/OpenList'
import Pagination from 'components/Pagination'

class Container extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      type: props.type,
      list: [],
      total: 0,
      tags: [],
      detailLink: '/apps/detail/',
      page: {
        tag: props.tag,
        limit: 15,
        page: 1
      }
    }
  }
  
  
  componentDidMount() {
    this.fetchTags();
    this.fetchAppList()
  }

  componentWillReceiveProps (nextProps) {
    const { page } = this.state;
    const { tag } = nextProps;

    if(tag !== page.tag) {
      this.setState({ 
        page: {
          ...page,
          tag
        }
      }, ()=>{
        this.fetchAppList()
      })
    }
  }

  fetchTags () {
    const { type } = this.state;
    const url = getDomain(`public/common/tags?type=`+type.slice(0,-1))
    
    fetchUtil.getJSON(url).then(data => {
      console.log("tags: ", data)
      const tags = data.map(item => {
        return {
          label: item.tagName,
          to: `/${type}?tagId=${item.tagId}`,
          icon: `sidebar${item.tagId}`
        }
      })
      this.setState({ tags })

    }).catch(e => {

    })
  }

  fetchAppList (params) {
    const _p = {
      ...this.state.page,
      ...params
    }
    const { tag, ...rest } = _p;
    const url = getDomain(`web/market/tag/${tag}/${this.state.type}`)
    fetchUtil.getJSON(url, {
      ...rest
    }).then(data => {
      this.setState({ list: data.list, total: data.page.totalCount })
    }).catch(e => {

    })
  }

  onSelectPage (page) {
    this.fetchAppList({ page })
  }

  render () {
    const { list, total, tags, urls, detailLink, page, type } = this.state
    
    return (
      <div className="container">
        <SideBar pageLinks={getPageLinks(type)} type={type} tagLinks={tags} />
        <div className="sub-container">
          <div className="sub-container-banner"></div>
          <h2 className="open-content-nav">
            <i className="iconfont icon-hot-control"></i>热门应用
          </h2>
          <OpenList listData={list} typeName="app" detailLink={detailLink} />
          <Pagination onChange={::this.onSelectPage} pageSize={page.limit} total={total}/>
        </div>
      </div>
    )
  }
}

export default Container