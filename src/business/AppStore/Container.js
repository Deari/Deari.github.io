import React from 'react'
import fetchUtil from 'utils/fetch'
import { getEnvDomain } from 'utils/d'
import { PageTypes, getPageLinks } from 'config/index'
import SideBar from 'business/SideBar'
import OpenList from 'components/OpenList'
import List from './List'
import Pagination from 'components/Pagination'
import { scrollToTop } from 'utils/scroll'

class Container extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      type: props.type,
      list: [],
      total: 0,
      tags: [],
      detailLink: `/${props.type}/detail/`,
      page: {
        tag: props.tag,
        limit: 15,
        page: 1
      }
    }
  }
  
  
  componentDidMount() {
    this.fetchTags();
    this.fetchAppList({ skip: 0 })
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
    let _type = type
    if(type !== 'hardware') {
      _type = type.slice(0,-1)
    }
    const url = getEnvDomain()+`/app/v1/bo/v1/public/common/tags?type=${_type}`
    
    fetchUtil.getJSON(url).then(data => {
      const tags = data.map(item => {
        return {
          label: item.tagName,
          to: `/${type}/tag/${item.tagId}`,
          icon: `sidebar${item.tagId}`
        }
      })

      tags.unshift({
        label: '全部'+PageTypes[type],
        to: `/${type}`,
        icon: `sidebar0`
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
    const url = getEnvDomain()+`/app/v1/bo/v1/web/market/tag/${tag}/${this.state.type}`

    return fetchUtil.getJSON(url, {
      ...rest
    }).then(data => {
      let { list, page, meta } = data
      let total = page ? page.totalCount : meta.total

      if(this.state.type == 'hardware') {
        list = list.map((v)=>{
          return {
            price: v.price,
            appDesc:v.productDesc,
            appLogo:v.image,
            appName:v.verboseName,
            appId:v.id,
            developerName:v.brand
          }
        })
      }

      this.setState({ list, total })

    }).catch(e => {
      console.log(e)
    })
  }

  onSelectPage (page) {
    this.fetchAppList({ page, skip: (page-1)*this.state.page.limit }).then(scrollToTop)
  }

  render () {
    const { list, total, tags, urls, detailLink, page, type } = this.state
    const pageLinks = getPageLinks(type).filter(( item ) => { return !item.hide })

    return (
      <div className="container">
        <SideBar pageLinks={pageLinks} type={type} tagLinks={tags} />
        <div className="sub-container">
          <div className={`sub-container-banner-${type}`}></div>
          <h2 className="open-content-nav">
            <i className="iconfont icon-hot-control"></i> 热门{ PageTypes[type] }
          </h2>
          <List data={list} type={type} ></List>
          <Pagination onChange={::this.onSelectPage} pageSize={page.limit} total={total}/>
        </div>
      </div>
    )
  }
}

export default Container