import React, { Component } from 'react'
import SideBar from 'business/SideBar'
import Search from 'components/Search'
import Table from './table/'
import Pagination from 'components/Pagination'
import { getEnvDomain } from 'utils/d'
import fetchUtil from 'utils/fetch'
import s from './index-new.scss'
import TEST_DATA from './data'

class Analytics extends Component {
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

  onSearch (input) {
    console.log(input)
  }
  
  render() {
    const { list, total } = this.state;
    return (
      <div className={`container ${s.analytics}`} >
        <SideBar></SideBar>
        <div className={s.content}>
          {/*<Search onSearch={this.onSearch}></Search>*/}
          <Table data={list} title={this.props.pageTitle}/>
          <Pagination 
            style={{'textAlign': 'right'}} 
            onChange={::this.onPage}
            total={total}
          />
        </div>
      </div>
    )
  }
}

export default Analytics
