export const Versions = (props) => {
  const { onChange, showAll, showSize } = props
  const versions = props.versions || []
  const len = versions && versions.length

  return len > 0 && <div className="table-info">
    <h3 className="app-title">历史版本</h3>
    <ul className="detail-tableList">
    {
      versions.map((item, index) => (
        <li className="item">
          <div className="cell">
            <p className="title">更新日期</p>
            <p className="text">{ item.codeUpdateTime }</p>
          </div>
          <div className="cell">
            <p className="title">版本</p>
            <p className="text">{ item.codeVersion }</p>
          </div>
          { showSize &&
            <div className="cell">
              <p className="title">大小</p>
              <p className="text">{ item.bundleSize }</p>
            </div>
          }
          <div className="cell">
            <p className="title">版本介绍</p>
            <p className="text">{ item.codeDesc }</p>
          </div>
        </li>
      ))
    }
    </ul>
    {(len > 0) && <a className="read-more" onClick={() => {onChange()}}>{showAll ? '收起' : '...更多版本介绍'}</a>}
  </div>
}