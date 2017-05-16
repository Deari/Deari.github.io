import React, { Component } from 'react'
import { getDomain } from 'utils/d'
import fetchUtil from 'utils/fetch'
import List from '../Components/List'
import { scrollToTop } from 'utils/scroll'

class ListContainer extends Component {
  constructor (props) {
    super(props)
    const pathname = props.location.pathname
    const result = pathname.match(/^\/(apps|widgets|hardware)\//)
    let type
    if (result) {
      type = result[1]
    }

    const _t = type.slice(0, type.length - 1);
    const url = getDomain(`/app/v1/bo/v1/web/developer/statistics/${_t}`);
    
    this.state = {
      type,
      api: {
        url,
        params: {
          page: 1,
          limit: 10,
          appId: '',
          appName: ''
        }
      },
      list: [],
      total: 0
    }
  }

  componentDidMount () {
    this.loadData(1)
  }

  loadData (page, options) {
    const api = this.state.api
    return fetchUtil.getJSON(api.url, {
      ...api.params,
      ...options,
      page
    }).then(data => {
      this.setState({ list: data.list, total: data.page.totalCount })
    }).catch(e => {
      console.warn(e)
    })
  }

  onPage (page) {
    this.loadData(page).then(scrollToTop)
  }

  render () {
    const { type, list, total } = this.state
    return <List
      onPage={::this.onPage}
      type={type}
      list={list}
      total={total}
    />
  }
}

export default ListContainer
