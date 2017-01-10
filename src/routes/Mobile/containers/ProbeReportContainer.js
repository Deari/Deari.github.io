import React from 'react'

import ProbeReport from '../components/Probe/Report'

import fetchUtil from '../../utils/fetchUtil'
import Debug from '../../utils/debug'

import DATA from '../components/Probe/data'

const promised = {
}


const keyMap = {
  am: [
    '00:00~08:00',
    '08:00~09:00',
    '09:00~10:00',
    '10:00~11:00',
    '11:00~12:00'
  ],
  pm: [
    '12:00~13:00',
    '13:00~14:00',
    '14:00~15:00',
    '15:00~16:00',
    '16:00~17:00'
  ],
  night: [
    '17:00~18:00',
    '18:00~19:00',
    '19:00~20:00',
    '20:00~21:00',
    '21:00~24:00'
  ]
}

const addTextKey = (source, key) => {
  return source.map((v, i) => Object.assign({}, v, {
      timeText: keyMap[key] && keyMap[key][i]
    })
  )
}


export const Promised = (promiseProp, Wrapped) => class extends React.Component {
  state = {
    amNum: 0, 
    pmNum: 0, 
    nightNum: 0, 
    timeArray: []
  }
  componentWillMount() {
    const apiUrl = 'http://api.sit.ffan.com/bo/store/v1/storePersonSum?storeId=111&startTime=111&endTime=111';
    
    fetchUtil.getJSON(apiUrl).then(res=>{
      if(res.status == 200) {
        console.info(res.data);
        this.setState(res.data);
      } else {
        Debug.warn('获取数据异常', res);
        this.setState(DATA)
      }
    }).catch(e=>{
      // Debug.warn('获取数据异常', e);
      this.setState(DATA)
    })
  }

  getChartData = () => {
    const data = this.state.timeArray;
    return [{
      time: '0',
      num: data.slice(0, 8).reduce((num, cur)=> num+cur.num, 0)
    }].concat(data.slice(8, 19))
  }

  getListData = () => {
    const { amNum, pmNum, nightNum, timeArray } = this.state;

    const listData = {
      am: {
        list: timeArray.slice(7, 11),
        total: amNum,
      },
      pm: {
        list: timeArray.slice(11, 16),
        total: pmNum,
      },
      night: {
        list: timeArray.slice(16, 20),
        total: nightNum,
      }
    }

    listData.am.list.unshift({
      num: timeArray.slice(0, 8).reduce((num, cur)=> num+cur.num, 0)
    })

    listData.night.list.push({
      num: timeArray.slice(20).reduce((num, cur)=> num+cur.num, 0)
    })

    for(let key in listData) {
      listData[key].list = addTextKey(listData[key].list, key)
    }
    return listData;
  }

  render () {
    const { allNum, amNum, pmNum, nightNum } = this.state;

    const data = {
      allNum, amNum, pmNum, nightNum,
      listData: this.getListData(),
      chartData: this.getChartData()
    }
    return <Wrapped {...data} />
  }
}

export default Promised(promised, ProbeReport)
