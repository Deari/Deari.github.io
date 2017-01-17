export const AnalysisContainer = (props) => {
  const {amNum, pmNum, nightNum} = props
  return <div className="analysis-container bg-white">
    <div className="analysis-panel">
      <div className="ana-head">
        <h3 className="title">上午</h3>
        <span className="desc">客流量总计(人)：{amNum}</span>
      </div>
    </div>
    <div className="analysis-panel">
      <div className="ana-head">
        <h3 className="title">下午</h3>
        <span className="desc">客流量总计(人)：{pmNum}</span>
      </div>
    </div>
    <div className="analysis-panel">
      <div className="ana-head">
        <h3 className="title">晚间</h3>
        <span className="desc">客流量总计(人)：{nightNum}</span>
      </div>
    </div>
  </div>
}

export default AnalysisContainer