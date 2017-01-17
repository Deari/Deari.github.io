import React from 'react'
import md5 from 'md5'
import ProbeReport from '../components/Probe/Report'

import fetchUtil from '../../utils/fetchUtil'
import { getHardwareDomain } from 'utils/domain';
import Debug from '../../utils/debug'

import DATA from '../components/Probe/data'
import BARDATA from '../components/Probe/barData'

const getTimeStr = (date)=>{
  const timeStr = date.getFullYear()+'/'+Math.floor((date.getMonth()+3)/3)+'/'+date.getDate()
  return timeStr
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


export const Promised = (Wrapped) => class extends React.Component {

  state = {
    amNum: 0, 
    pmNum: 0, 
    nightNum: 0, 
    timeArray: [],
    dayArray:[] 
  }
  
 async componentWillMount() {
    const date = new Date ()
    const startTime = (new Date (getTimeStr(date)).getTime())/1000
    const endTime = ((date.getTime())/1000).toFixed()
    
    const signParam = "app_key=d93823b9e5d089a338a6c0b860e61a7b&app_secret=bfe96bf06c1e9ea185202da3f413f126&method=GET&ts=" + endTime
    const sign = md5(signParam)
    const timeParams = `startTime=${startTime}&endTime=${endTime}`
    const hourParams = `storeId=10021141&${timeParams}&app_key=d93823b9e5d089a338a6c0b860e61a7b&method=GET&ts=${endTime}&sign=${sign}`

    const timeApiUrl = getHardwareDomain(`bo/store/v1/storePerSummary/hour?${hourParams}`)
    const dayApiUrl = getHardwareDomain(`bo/store/v1/storePerSummary/day?${hourParams}`)
    try{
       const timeRes = await fetchUtil.getJSON(timeApiUrl)
       if(timeRes.status == 200) {
        console.info(timeRes.data);
        this.setState(timeRes.data);
       } else {
        Debug.warn('获取数据异常', res);
        this.setState(DATA)
       }
    }catch(e){
      Debug.warn('获取数据异常', e);
      this.setState(DATA)
    }
   
    // try {
    //   const dayRes = await fetchUtil.getJSON(dayApiUrl)
    //   if (dayRes.status == 200) {
    //     //console.info(dayRes.data);
    //     this.setState({dayArray: dayRes.data&&dayRes.data.timeArray});
    //   } else {
    //     Debug.warn('获取数据异常', res);
    //     this.setState({dayArray: BARDATA.data&&BARDATA.data.timeArray})
    //   }
    // } catch (e) {
    //   Debug.warn('获取数据异常', e);
    //   this.setState({dayArray: BARDATA.data&&BARDATA.data.timeArray})
    // }
    this.setState({dayArray: BARDATA.data&&BARDATA.data.timeArray})

  }

  getChartData = () => {
    const data = this.state.timeArray;
    return [{
      time: '0',
      num: getSumOfTimeArray(data, 0, 8)
    }].concat(data.slice(8, 19))
  }

  render () {
    const { allNum, amNum, pmNum, nightNum ,dayArray} = this.state;
    
    const data = {
      allNum, amNum, pmNum, nightNum,
      chartData: this.getChartData(),
      dayArray: dayArray,
    }
    
    return <Wrapped {...data} />
  }
}

export default Promised(ProbeReport)
