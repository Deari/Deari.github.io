import React from 'react'
import fetchUtil from 'utils/fetch'
import List from '../components/List'

import { getDomain } from 'utils/d'
import { PageTypes, getPageLinks } from 'config/index'
import APPS_FILTERS from 'config/appStatus'
import { scrollToTop } from 'utils/scroll'

export default class Container extends React.Component {
  state = {
    filter: 'ALL',
    list: [],
    total: 0,
    request_params: {
      limit: 10,
      page: 1,
      appName: '',
      review: ''
    }
  }
  componentDidMount () {
    this.fetchAppsList()
  }

  fetchAppsList (params = {}) {
    const apiUrl = getDomain(`/app/v1/bo/v1/web/developer/${this.props.type}`)
    const { filter, ...rest } = params
    const _filter = filter || this.state.filter
    const { status: review } = APPS_FILTERS.find(function (t) { return t.filter === _filter })

    return fetchUtil.getJSON(apiUrl, {
      ...this.state.request_params,
      ...rest,
      review
    }).then(data => {
      this.setState({
        list: data.list || [],
        total: data.page && data.page.totalCount,
        filter: _filter,
        request_params: {
          ...this.state.request_params,
          ...rest
        }
      })
    }).catch(e => {
      console.log('err: ', e)
    })
  }

  onToggleFilter (f) {
    this.fetchAppsList({ page: 1, appName: '', filter: f.filter })
  }

  onPagination (page, size) {
    this.fetchAppsList({ page }).then(scrollToTop)
  }

  onSearch (v = '') {
    this.setState({
      request_params: {
        ...this.setState.request_params,
        appName: v
      }
    })
    this.fetchAppsList({ page: 1, appName: v })
  }

  render () {
    const { filter, list, total, request_params } = this.state
    return (
      <List 
        filter={filter} 
        data={list} 
        total={total} 
        type={this.props.type}
        onToggleFilter={::this.onToggleFilter}
        searchText={request_params.appName}
        onSearch={::this.onSearch}
        onPagination={::this.onPagination} 
      />
    )
  }
}
