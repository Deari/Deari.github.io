export const AnalysisContainer = (props) => {
  return <div className="analysis-container">
    <div className="analysis-panel">
      <div className="ana-head">
        <h3 className="title">上午</h3>
        <span className="desc">客流量总计(人)：500</span>
      </div>
      <div className="ana-body">
        <ul className="ana-list">
          <li className="ana-item">
            <span className="time">00:00~08:00</span>
            <span className="amount">100人</span>
          </li>
          <li>
            <span className="time">08:00~09:00</span>
            <span className="amount">100人</span>
          </li>
          <li>
            <span className="time">09:00~10:00</span>
            <span className="amount">100人</span>
          </li>
          <li>
            <span className="time">10:00~11:00</span>
            <span className="amount">100人</span>
          </li>
           <li>
            <span className="time">11:00~12:00</span>
            <span className="amount">100人</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
}

export default AnalysisContainer