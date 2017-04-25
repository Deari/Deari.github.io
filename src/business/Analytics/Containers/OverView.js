import React, { Component } from 'react'
import fetchUtil from 'utils/fetch'
import { getEnvDomain } from 'utils/d'
import OverView from '../Components/OverView'
import TEST_DATA from './overview_data'

class Container extends Component {
  
  state = {
    basic: {},
    yesterday: {},
    chart: {}
  }

  componentDidMount() {
    const { id } = this.props.params
    const url = getEnvDomain()+`/app/v1/bo/v1/web/developer/statistics/app/${id}`;
    fetchUtil.getJSON(url, {}).then(data=> {
      this.setState({
        basic: data.yesterday,
        yesterday: data.yesterday,
        chart: data.list
      })
    }).catch(e=>{
      console.warn(e);
    })
  }

  render() {
    return <OverView {...this.state}></OverView>
  }
}

export default Container
