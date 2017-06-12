import React, { Component, PropTypes } from 'react'
import { getDomain } from 'utils/d'
import fetchUtil from 'utils/fetch'
import List from '../components/List/'
import { scrollToTop } from 'utils/scroll'
import { getTheme } from 'business/HOCs/theme'

class ListContainer extends Component {
  state = {
    params: {
      page: 1,
      limit: 10,
      appId: '',
      appName: ''
    },
    list: [],
    total: 0
  }

  componentDidMount () {
    this.loadData(1)
  }

  loadData (page, options) {
    const { type } = this.props.theme
    const _t = type.slice(0, type.length - 1);
    return fetchUtil.getJSON(getDomain(`/app/v1/bo/v1/web/developer/statistics/${_t}`), {
      ...this.state.params,
      ...options,
      page
    }).then(data => {
      this.setState({ list: data.list, total: data.page.totalCount })
    }).catch(e => {
      console.warn(e)
    })
  }

  handlePage (page) {
    this.loadData(page).then(scrollToTop)
  }

  render () {
    const { list, total } = this.state
    return <List
      onPage={::this.handlePage}
      type={this.props.theme.type}
      list={list}
      total={total}
    />
  }
}

export default getTheme(ListContainer)
