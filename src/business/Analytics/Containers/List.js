import React, { Component } from 'react'
import { getEnvDomain } from 'utils/d'
import fetchUtil from 'utils/fetch'
import TEST_DATA from './data'
import List from '../Components/List'

class ListContainer  extends Component {
  state = {
    api: {
      url: getEnvDomain()+'/app/v1/bo/v1/web/developer/statistics/app',
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
  
  componentDidMount() {
    this.loadData(1)
  }

  loadData(page, options){
    const api = this.state.api;
    
    fetchUtil.getJSON(api.url, { 
      ...api.params,
      ...options,
      page
    }).then(data=>{
      this.setState({ list: data.list, total: data.page.totalCount })
    }).catch(e=>{
      this.setState({ 
        list: TEST_DATA.data.list,
        total: TEST_DATA.data.page.totalCount
      })
      console.warn(e)
    })
  }

  onPage (page) {
    this.loadData(page)
  }

  render() {
    return <List 
      onPage={::this.onPage}
      pageTitle={'应用'}
      list={this.state.list}
      total={this.state.total}
    />
  }
}

export default ListContainer
