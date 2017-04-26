import React, { Component } from 'react'
import { getEnvDomain } from 'utils/d'
import { getLoginDomain, getApiDomain, getSourceVal } from 'utils/domain'
import LoginSDK from 'utils/loginSDK'
import fetchUtil from 'utils/fetch'
import TEST_DATA from './data'
import List from '../Components/List'
import { scrollToTop } from 'utils/scroll'

class ListContainer  extends Component {
  constructor(props) {
    super(props);
    const pathname = props.location.pathname
    const result = pathname.match(/^\/(apps|widgets|hardware)\//)
    let type;
    if(result) {
      type = result[1]
    }
    
    this.state = {
      type,
      api: {
        url: getEnvDomain()+'/app/v1/bo/v1/web/developer/statistics/'+type.slice(0, type.length-1),
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
  
  componentDidMount() {
    this.loadData(1)
  }

  loadData(page, options){
    const api = this.state.api;
    let sourceVal = getSourceVal()
    let url = getLoginDomain(`passport/session-check.json`)
    let loginUrl = getApiDomain(`#!/login?source=${sourceVal}`)
    let callbackUrl = location.href

    LoginSDK.getStatus( (status, data) => {
      if (status) {
        return fetchUtil.getJSON(api.url, { 
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
    }, url, loginUrl, callbackUrl)
  }

  onPage (page) {
    this.loadData(page).then(scrollToTop)
  }

  render() {
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
