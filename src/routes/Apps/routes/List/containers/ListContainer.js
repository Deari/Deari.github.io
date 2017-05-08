import React from 'react'
import fetchUtil from 'utils/fetch'
import List from '../components/List'

import { getEnvDomain } from 'utils/d'
import { PageTypes, getPageLinks } from 'config/index'
import APPS_FILTERS from '../config'

export default class AppsList extends React.Component {
  state = {
    filter: 'ALL',
    list: [],
    total: 0,
    pagination: {
      limit: 5,
      page: 1,
    }
  }
  componentDidMount() {
    console.log("did mount", this.props.params)
    this.fetchAppsList(1);
  }

  fetchAppsList(page, filter) {
    const apiUrl = getEnvDomain() + "/app/v1/bo/v1/web/developer/apps"
    const _filter = filter || this.state.filter;
    const { status: review } = APPS_FILTERS.find(function (t){ return t.filter === _filter })
    
    fetchUtil.getJSON(apiUrl, { 
      review,
      ...this.state.pagination,
      page
    }).then(data => {
      this.setState({
        list: data.list || [], 
        total: data.page && data.page.totalCount,
        filter: _filter,
        pagination: {
          ...this.state.pagination,
          page
        }
      })
    }).catch(e => {
      console.log('err: ', e)
    })
  }

  onToggleFilter(f) {
    this.fetchAppsList(1, f.filter)
  }

  onPagination(page, size) {
    this.fetchAppsList(page)
  }

  render() {
    const { filter, list, total } = this.state;
    return <List filter={filter} data={list} total={total} 
      onToggleFilter={::this.onToggleFilter}
      onPagination={::this.onPagination} />
  }
}