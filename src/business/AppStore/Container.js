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
      type: props.type,
      tag: props.tag,
      params: {
        appName: '',
        limit: 15,
        page: 1,
        skip: 0   // 硬件分页需要
      }
    })

    this.state = {
      tags: []
    }
  }

  componentDidMount() {
    this.fetchTags();
    this.props.fetchAppList({
      tag: this.props.tag
    })
  }

  componentWillReceiveProps (nextProps) {
    if(nextProps.tag !== this.props.tag) {
      this.props.fetchAppList({
        tag: nextProps.tag,
        type: this.props.type,
        params: {
          appName: '',
          limit: 15,
          page: 1,
          skip: 0   // 硬件分页需要
        }
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
    this.props.fetchAppList({
      params: {
        page
      }
    }).then(scrollToTop)
  }

  render () {
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
    type: props.type,
    tag: props.tag
  }
}, {
  updateStore: Actions.update,
  fetchAppList
})(Container)