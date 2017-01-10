export const AnalysisContainer = ({ am, pm, night }) => {
  return <div className="analysis-container bg-white">
    <div className="analysis-panel">
      <div className="ana-head">
        <h3 className="title">上午</h3>
        <span className="desc">客流量总计(人)：{am.total}</span>
      </div>
      <div className="ana-body">
        <ul className="ana-list">
          {am.list.map(v=>{
            return <li className="ana-item">
              <span className="time">{v.timeText}</span>
              <span className="amount">{v.num}人</span>
            </li>
          })}
        </ul>
      </div>
    </div>
    <div className="analysis-panel">
      <div className="ana-head">
        <h3 className="title">下午</h3>
        <span className="desc">客流量总计(人)：{pm.total}</span>
      </div>
      <div className="ana-body">
        <ul className="ana-list">
          {pm.list.map(v=>{
            return <li className="ana-item">
              <span className="time">{v.timeText}</span>
              <span className="amount">{v.num}人</span>
            </li>
          })}
        </ul>
      </div>
    </div>
    <div className="analysis-panel">
      <div className="ana-head">
        <h3 className="title">晚间</h3>
        <span className="desc">客流量总计(人)：{night.total}</span>
      </div>
      <div className="ana-body">
        <ul className="ana-list">
          {night.list.map(v=>{
            return <li className="ana-item">
              <span className="time">{v.timeText}</span>
              <span className="amount">{v.num}人</span>
            </li>
          })}
        </ul>
      </div>
    </div>
  </div>
}

AnalysisContainer.defaultProps = {
  am: {
    list: [],
    total: 0
  },
  pm: {
    list: [],
    total: 0
  },
  night: {
    list: [],
    total: 0
  }
}

export default AnalysisContainer