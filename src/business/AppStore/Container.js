import React from 'react'
import fetchUtil from 'utils/fetch'
import { getDomain } from 'utils/domain'
import { PageTypes, getPageLinks } from 'config/index'
import SideBar from 'business/SideBar'
import OpenList from 'components/OpenList'
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
    const url = getDomain(`public/common/tags?type=${_type}`)
    
    fetchUtil.getJSON(url).then(data => {
      const tags = data.map(item => {
        return {
          label: item.tagName,
          to: `/${type}?tagId=${item.tagId}`,
          icon: `sidebar${item.tagId}`
        }
      })

      tags.unshift({
        label: '所有'+PageTypes[type],
        to: `/${type}?tagId=0`,
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
    const url = getDomain(`web/market/tag/${tag}/${this.state.type}`)

    return fetchUtil.getJSON(url, {
      ...rest
    }).then(data => {
      let { list, page, meta } = data
      let total = page ? page.totalCount : meta.total

      if(this.state.type == 'hardware') {
        list = list.map((v)=>{
          return {
            hardwareFunction:v.productDesc,
            hardwareLogo:v.image,
            hardwareName:v.verboseName,
            hardwarePrice:v.price,
            hardwareId:v.id,
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
    let _type = type;
    
    if(_type !== 'hardware') {
      _type = 'app'
    }

    return (
      <div className="container">
        <SideBar pageLinks={getPageLinks(type)} type={type} tagLinks={tags} />
        <div className="sub-container">
          <div className="sub-container-banner"></div>
          <h2 className="open-content-nav">
            <i className="iconfont icon-hot-control"></i> 热门{ PageTypes[type] }
          </h2>
          <OpenList listData={list} typeName={_type} detailLink={detailLink} />
          <Pagination onChange={::this.onSelectPage} pageSize={page.limit} total={total}/>
        </div>
      </div>
    )
  }
}

export default Container