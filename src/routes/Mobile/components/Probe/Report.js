import React, {Component} from 'react'
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import AnalysisContainer from './Analysis'

const CustomizedLabel = React.createClass({
  render () {
    const {x, y, stroke, payload} = this.props;
   	return <text x={x} y={y} dy={-6} fill={stroke} fontSize={10} textAnchor="middle">{payload.uv}</text>
  }
});

const ChartContainer = ({ data }) => {
  return <div>
    <h3>客流量分布图</h3>
    <div className="chart-container">
      <AreaChart width={1200} height={300} data={data}
          margin={{top: 5, right: 30, left: 20, bottom: 5}}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
          </linearGradient>
        </defs>
      <XAxis dataKey="time"/>
      <YAxis/>
      <CartesianGrid strokeDasharray="3 3"/>
      <Tooltip/>
      <Legend />
        <Area label={<CustomizedLabel />} type="linear" dataKey="num" 
          stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
      </AreaChart>
    </div>
  </div>
}

const NavBar = (props) => {
  return <ul>
    <li>今天</li>
    <li>近三天</li>
    <li>1周</li>
    <li>1个月</li>
    <li>3个月</li>
    <li>自定义</li>
  </ul>
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
  return source[key].map((v, i) => Object.assign({}, v, {
      text: keyMap[key] && keyMap[key][i]
    })
  )
}

export class ProbeReport extends Component {
  
  getChartData = (source) => {
    let zero2eight = 0;
    const chartData = source.filter((v, i)=>{
      if(i < 8) {
        zero2eight += v.num;
        return false;
      }

      if(i > 18) {
        return false
      }
      
      return true
    })

    chartData.unshift({
      name: '0',
      num: zero2eight
    })

    return chartData
  }

  getListData = (source) => {

    const listData = {
      am: source.slice(7, 11),
      pm: source.slice(11, 16),
      night: source.slice(16, 20)
    }

    listData.am.unshift({
      num: source.slice(0, 8).reduce((num, cur)=> num+cur.num, 0)
    })

    listData.night.push({
      num: source.slice(20).reduce((num, cur)=> num+cur.num, 0)
    })

    for(let key in listData) {
      listData[key] = addTextKey(listData, key)
    }
    return listData;
  }

  render() {
    const {data} = this.props;
    return <div>
      <NavBar />
      <ChartContainer data={this.getChartData(data)} />
      <AnalysisContainer data={this.getListData(data)} />
    </div>
  }
}

export default ProbeReport
