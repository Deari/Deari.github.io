import React from 'react'
import { connect } from 'react-redux'
import fetchUtil from 'utils/fetch'
import { getEnvDomain } from 'utils/d'
import { PageTypes, getPageLinks } from 'config/index'
import SideBar from 'business/SideBar'
import OpenList from 'components/OpenList'
import List from './List'
import Pagination from 'components/Pagination'
import { scrollToTop } from 'utils/scroll'

import { ActionCreaters as Actions, fetchAppList } from 'reducers/appStore'

class Container extends React.Component {
  constructor(props) {
    super(props)
    
    props.updateStore({
      type: props.type 
    })

    this.state = {
      tag: props.tag,
      tags: [],
      params: {
        appName: '',
        limit: 15,
        page: 1,
        skip: 0   // 硬件分页需要
      }
    }
  }

  componentDidMount() {
    const { params } = this.state;
    const { type, tag } = this.props;
    
    this.fetchTags();
    
    this.props.fetchAppList({
      tag,
      type,
      params
    })
  }

  componentWillReceiveProps (nextProps) {
    const { tag, params } = this.state;
    if(nextProps.tag !== tag) {
      this.setState({ tag: nextProps.tag }, ()=>{
        this.props.fetchAppList({
          tag: nextProps.tag,
          type: this.props.type,
          params
        })
      })
    }
  }

  fetchTags () {
    const { type } = this.props;
    fetchUtil.getJSON(`${getEnvDomain()}/app/v1/bo/v1/public/common/tags`, {
      type: type !== 'hardware' ? type.slice(0,-1) : type
    }).then(data => {
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

  onSelectPage (page) {
    const { params, tag } = this.state;
    const { type } = this.props;

    this.props.fetchAppList({
      tag,
      type,
      params: {
        ...params,
        page,
        skip: (page-1)*params.limit 
      }
    }).then(scrollToTop)
  }

  render () {
    console.log(this.props)
    const { list, total, type, params } = this.props;
    const { tags } = this.state
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
          <Pagination onChange={::this.onSelectPage} pageSize={params.limit} total={total}/>
        </div>
      </div>
    )
  }
}

export default connect((state, props)=>{
  return {
    ...state.appStore,
    type: props.type
  }
}, {
  updateStore: Actions.update,
  fetchAppList
})(Container)