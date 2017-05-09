import React from 'react'
import fetchUtil from 'utils/fetch'
import List from '../components/List'

import { getEnvDomain } from 'utils/d'
import { PageTypes, getPageLinks } from 'config/index'
import APPS_FILTERS from 'config/appStatus'
import { scrollToTop } from 'utils/scroll'

export default class AppsList extends React.Component {
  state = {
    filter: 'ALL',
    list: [],
    total: 0,
    request_params: {
      limit: 5,
      page: 1,
      appName: '',
      review: ''
    }
  }
  componentDidMount() {
    console.log("did mount", this.props.params)
    this.fetchAppsList();
  }

  fetchAppsList(params = {}) {
    const apiUrl = `${getEnvDomain()}/app/v1/bo/v1/web/developer/${this.props.type}`
    const { filter, ...rest } = params
    const _filter = filter || this.state.filter;
    const { status: review } = APPS_FILTERS.find(function (t){ return t.filter === _filter })

    return fetchUtil.getJSON(apiUrl, { 
      review,
      ...this.state.pagination,
      ...rest,
    }).then(data => {
      this.setState({
        list: data.list || [], 
        total: data.page && data.page.totalCount,
        filter: _filter,
        pagination: {
          ...this.state.pagination,
          ...rest
        }
      })
    }).catch(e => {
      console.log('err: ', e)
    })
  }

  onToggleFilter(f) {
    this.fetchAppsList({ page: 1, appName: '', filter: f.filter })
  }

  onPagination(page, size) {
    this.fetchAppsList({ page }).then(scrollToTop)
  }

  onSearch(v) {
    this.fetchAppsList({ page: 1, appName: v })
  }

  render() {
    const { filter, list, total } = this.state;
    return <List filter={filter} data={list} total={total} type={this.props.type}
      onToggleFilter={::this.onToggleFilter}
      onSearch={::this.onSearch}
      onPagination={::this.onPagination} />
  }
}