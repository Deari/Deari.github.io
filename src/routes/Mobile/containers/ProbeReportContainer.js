import React from 'react'

import ProbeReport from '../components/Probe/Report'

import fetchUtil from '../../utils/fetchUtil'
import Debug from '../../utils/debug'

import DATA from '../components/Probe/data'

const promised = {
}

export const Promised = (promiseProp, Wrapped) => class extends React.Component {
  state = {
    data: [
      
    ]
  }
  componentWillMount() {
    const apiUrl = 'http://api.sit.ffan.com/bo/store/v1/storePersonSum?storeId=111&startTime=111&endTime=111';
    
    fetchUtil.getJSON(apiUrl).then(res=>{
      if(res.status == 200) {
        console.info(res.data);
        this.setState(res.data)
      } else {
        Debug.warn('获取数据异常', res);
        this.setState({ data : DATA})
      }
    }).catch(e=>{
      // Debug.warn('获取数据异常', e);
      this.setState({ data : DATA})
    })
  }

  render () {
    const data = this.state.data;
    return <Wrapped data={data}/>
  }
}

export default Promised(promised, ProbeReport)
