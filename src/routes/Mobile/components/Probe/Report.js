import React, {Component} from 'react'
import {AreaChart, BarChart, Brush, ReferenceLine, 
  Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';
import AnalysisContainer from './Analysis'
import './Report.scss'

const CustomizedLabel = React.createClass({
  render () {
    const {x, y, stroke, payload} = this.props;
   	return <text x={x} y={y} dy={-5} fill={stroke} fontSize={10} textAnchor="middle">{payload.num}</text>
  }
});

const CustomTooltip = React.createClass({
  render() {
    const { active } = this.props;

    if (active) {
      const { payload, label } = this.props;

      return (
        <div className="custom-tooltip">
          <p className="label">{`${payload[0].value}人`}</p>
        </div>
      );
    }

    return null;
  }
});

const AreaChartContainer = ({ allNum, data }) => {
  return <div>
  <h3 className="numTitle">客流量总计(人)：{ allNum }</h3>
  <div className="chart bg-white">
    <h3 className="title">客流量分布图</h3>
    <div className="chart-container">
      <AreaChart width={735} height={300} data={data} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
        <defs>
          <linearGradient id="colorNum" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#2692fb" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#2692fb" stopOpacity={0.1}/>
          </linearGradient>
        </defs>
        <XAxis dataKey="time"/>
        <YAxis padding={{ top: 8 }}/>
        <CartesianGrid strokeDasharray="3 3"/>
        <Tooltip content={<CustomTooltip />} />
        <Area label={<CustomizedLabel />} name="流量" unit="人" type="linear" dataKey="num" 
          stroke="#2692fb" fillOpacity={1} fill="url(#colorNum)" />
      </AreaChart>
    </div>
  </div>
</div>
}

const BarChartContainer = ({ data }) => {
  return <div>
    <div className="chart bg-white">
      <h3 className="title">客流日期分布图（人）</h3>
      <div className="chart-container">
        <BarChart width={735} height={310} data={data}>
          <defs>
            <linearGradient id="colorNum" viewBox="0,-10,735,300" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2692fb" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#2692fb" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="time" />
          <YAxis padding={{ top: 8 }}/>
          <CartesianGrid strokeDasharray="3 3" />
          { /* <Brush dataKey='num' height={30} stroke="#2692fb"/> */}
          
          <Bar label={<CustomizedLabel />} dataKey="num" stroke="#2692fb" fillOpacity={1} fill="url(#colorNum)" 
            maxBarSize={40}/>
        </BarChart>
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
    <li>自定义</li>
  </ul>
}

export class ProbeReport extends Component {

  render() {
    const { allNum, chartData, listData, dayArray:barData} = this.props;
    return <div className="report-container">
      <NavBar />
      <AreaChartContainer allNum={allNum} data={chartData} />
      <AnalysisContainer {...listData} />
      <BarChartContainer data={barData} />
    </div>
  }
}

export default ProbeReport
