import React, { Component } from 'react'
import SideBar from 'business/SideBar'
import Search from 'components/Search'
import Table from './table/'
import Pagination from 'components/Pagination'
import { getEnvDomain } from 'utils/d'
import fetchUtil from 'utils/fetch'
import s from './index-new.scss'

class Analytics extends Component {
  state = {
    api: {
      uri: getEnvDomain()+'/app/v1/bo/v1/web/developer/statistics/app',
      params: {
        page: 1,
        limit: 10,
        // appId: 1421,
        appName: ''
      }
    },
    list: []
  }


  componentDidMount() {
    this.getData()
  }

  getData(){
    const { api } = this.state
    return fetchUtil.getJSON(api.uri, { 
      ...api.params 
    }).then(data=>{
      console.log(data)
      this.setState({ list: data.list })
    }).catch(e=>{
      console.warn(e)
    })
  }

  onSearch (input) {
    console.log(input)
  }
  
  render() {
    return (
      <div className={`container ${s.analytics}`} >
        <SideBar></SideBar>
        <div className={s.content}>
          {/*<Search onSearch={this.onSearch}></Search>*/}
          <Table data={this.state.list}></Table>
          <Pagination ></Pagination>
        </div>
      </div>
    )
  }
}

export default Analytics
