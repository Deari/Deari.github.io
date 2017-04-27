import React, { Component } from 'react'
import fetchUtil from 'utils/fetch'
import { getEnvDomain } from 'utils/d'
import OverView from '../Components/OverView'

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

  render() {
    return <OverView {...this.state} loadData={::this.loadData}></OverView>
  }
}

export default Container
