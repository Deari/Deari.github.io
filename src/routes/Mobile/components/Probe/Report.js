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
      <AreaChart width={600} height={300} data={data}
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
      <XAxis dataKey="name"/>
      <YAxis/>
      <CartesianGrid strokeDasharray="3 3"/>
      <Tooltip/>
      <Legend />
        <Area label={<CustomizedLabel />} type="linear" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
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

export class ProbeReport extends Component {
  render() {
    const {data} = this.props;
    return <div>
      <NavBar />
      <ChartContainer data={data} />
      <AnalysisContainer />
    </div>
  }
}

export default ProbeReport
