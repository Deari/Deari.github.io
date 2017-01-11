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

const getSumOfTimeArray = (arr=[], start, end) => {
  return arr.slice(start, end).reduce((prev, cur)=> prev+cur.num, 0)
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
      Debug.warn('获取数据异常', e);
      this.setState(DATA)
    })
  }

  getChartData = () => {
    const data = this.state.timeArray;
    return [{
      time: '0',
      num: getSumOfTimeArray(data, 0, 8)
    }].concat(data.slice(8, 19))
  }

  getListData = () => {
    const { amNum, pmNum, nightNum, timeArray } = this.state;

    const listData = {
      am: {
        list: [
          {num: getSumOfTimeArray(timeArray, 0, 8)}
        ].concat(timeArray.slice(7, 11)),
        total: amNum,
      },
      pm: {
        list: timeArray.slice(11, 16),
        total: pmNum,
      },
      night: {
        list: timeArray.slice(16, 20).concat([ 
          {num: getSumOfTimeArray(timeArray, 0, 8)}
        ]),
        total: nightNum,
      }
    }

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
