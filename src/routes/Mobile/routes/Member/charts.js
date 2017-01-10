import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

export const IncreaseChart = ({ data }) => {
  return <AreaChart width={210} height={110} data={data} stackOffse={'expand'}
    margin={{top: 20, right: 30, left: -30, bottom: 0}}>
    <defs>
      <linearGradient id="colorNum" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#2692fb" stopOpacity={0.8}/>
        <stop offset="95%" stopColor="#2692fb" stopOpacity={0}/>
      </linearGradient>
    </defs>
    <XAxis dataKey="day" />
    <YAxis/>
    <CartesianGrid strokeDasharray="3 3"/>
    <Area type="monotone" dataKey="num" 
      stroke="#2692fb" fillOpacity={1} fill="url(#colorNum)" />
  </AreaChart>
}