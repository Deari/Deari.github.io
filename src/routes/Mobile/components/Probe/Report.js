import React, {Component} from 'react'
import {AreaChart, BarChart, Brush, ReferenceLine, Area,
   Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,Cell
} from 'recharts';
import AnalysisContainer from './Analysis'
import './Report.scss'

const getTimeStr = (date)=>{
  let mouth =  Math.floor((date.getMonth()+3)/3)
  let day = date.getDate()
  if (mouth < 10) {
    mouth = '0' + mouth
  }
  if (day < 10) {
    day = '0' + day
  }
  const timeStr = date.getFullYear()+'-'+mouth+'-'+day
  return timeStr
}

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


const AreaChartContainer = (props) => {
  const {chartData, allNum, ...others} = props
  return <div>
  <h3 className="numTitle">客流量总计(人)：{ allNum }</h3>
  <div className="chart bg-white">
    <h3 className="title">客流量小时分布图（人）</h3>
    <div className="chart-container">
      <AreaChart width={735} height={300} data={chartData} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
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
    <AnalysisContainer {...others}/>
  </div>
</div>
}

const BarChartContainer = ({ data }) => {
  const date = new Date()
  const timeStr = getTimeStr(date)
  return <div>
    <div className="chart bg-white">
      <h3 className="title">客流量日期分布图（人）</h3>
      <div className="chart-container">
        <BarChart width={735} height={310} data={data}>
          <defs>
            <linearGradient id="colorNum" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2692fb" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#2692fb" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="time" />
          <YAxis padding={{ top: 20}}/>
          <CartesianGrid strokeDasharray="3 3" />
          { /* <Brush dataKey='num' height={30} stroke="#2692fb"/> */}
          <Bar dataKey='num'  maxBarSize={40} stroke="#2692fb" label={<CustomizedLabel/>} fill='url(#colorNum)'>
            {
              data.map((value, key) => (
                <Cell fillOpacity={value.time === timeStr  ? 1 : 0.2 }strokeOpacity={value.time === timeStr  ? 1 : 0.5 } key={`cell-${key}`}/>
              ))
            }
         </Bar>
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
  </ul>
}

export class ProbeReport extends Component {

  render() {
    const { dayArray:barData, ...others } = this.props;
    return <div className="report-container">
      <NavBar />
      <AreaChartContainer {...others}  />
      <BarChartContainer data={barData} />
    </div>
  }
}

export default ProbeReport
