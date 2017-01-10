import React, {Component} from 'react'
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import AnalysisContainer from './Analysis'
import './Report.scss'

const CustomizedLabel = React.createClass({
  render () {
    const {x, y, stroke, payload} = this.props;
   	return <text x={x} y={y} dy={-6} fill={stroke} fontSize={10} textAnchor="middle">{payload.num}</text>
  }
});

const ChartContainer = ({ allNum, data }) => {
  return <div>
  <h3 className="numTitle">客流量总计(人)：{ allNum }</h3>
  <div className="chart bg-white">
    <h3 className="title">客流量分布图</h3>
    <div className="chart-container">
      <AreaChart width={735} height={300} data={data}
          margin={{top: 5, right: 30, left: 20, bottom: 5}}>
        <defs>
          <linearGradient id="colorNum" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#2692fb" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#2692fb" stopOpacity={0}/>
          </linearGradient>
        </defs>
      <XAxis dataKey="time"/>
      <YAxis/>
      <CartesianGrid strokeDasharray="3 3"/>
      <Tooltip/>
      <Area label={<CustomizedLabel />} type="linear" dataKey="num" 
        stroke="#2692fb" fillOpacity={1} fill="url(#colorNum)" />
      </AreaChart>
    </div>
  </div>
</div>
}

const NavBar = (props) => {
  return <ul className="tab">
    <li className="active">今天</li>
    <li>近三天</li>
    <li>1周</li>
    <li>1个月</li>
    <li>3个月</li>
    <li>自定义</li>
  </ul>
}

export class ProbeReport extends Component {

  render() {
    const { allNum, chartData, listData, } = this.props;

    return <div className="report-container">
      <NavBar />
      <ChartContainer allNum={allNum} data={chartData} />
      <AnalysisContainer {...listData} />
    </div>
  }
}

export default ProbeReport
