import React, { Component } from 'react'
import fetchUtil from 'utils/fetch'
import { getEnvDomain } from 'utils/d'
import { getLoginDomain, getApiDomain, getSourceVal } from 'utils/domain'
import LoginSDK from 'utils/loginSDK'
import OverView from '../Components/OverView'
import TEST_DATA from './overview_data'

class Container extends Component {
  constructor(props) {
    super(props);
    const pathname = props.location.pathname
    const result = pathname.match(/^\/(apps|widgets|hardware)\//)
    let type;
    if(result) {
      type = result[1]
    }
    
    this.state = {
      appId: props.params.id,
      type,
      basic: {},
      yesterday: {},
      chart: []
    }
  }

  componentDidMount() {
    this.loadData()
  }

  loadData (day) {
    const { appId } = this.state
    const url = getEnvDomain()+`/app/v1/bo/v1/web/developer/statistics/app/${appId}`
    let sourceVal = getSourceVal()
    let checkUrl = getLoginDomain(`passport/session-check.json`)
    let loginUrl = getApiDomain(`#!/login?source=${sourceVal}`)
    let callbackUrl = location.href

    LoginSDK.getStatus( (status, data) => {
      if (status) {
        fetchUtil.getJSON(url, { day }).then(data=> {
          this.setState({
            basic: data.yesterday,
            yesterday: data.yesterday,
            chart: data.list.map(item => {
              return {
                ...item, 
                _day: item.statisticsTime.split('-')[2] 
              }
            }).reverse()
          })
        }).catch(e=>{
          console.warn(e);
        })
      }
    }, checkUrl, loginUrl, callbackUrl)
  }

  render() {
    return <OverView {...this.state} loadData={::this.loadData}></OverView>
  }
}

export default Container
