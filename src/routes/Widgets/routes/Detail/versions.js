import React from 'react'
import './index.scss'

class Versions extends React.Component {
  render() {

    const { onChange, showAll, appPreviewImage, size } = this.props
    const latestVersion = this.props.latestVersion || {}
    const data = this.props.data || []
    const len = data && data.length

    return (
      <div className="table-info">
        <h3 className="app-title">版本信息</h3>
        <ul className="detail-tableList">
          <li className="item">
            <div className="cell">
              <p className="title">更新日期</p>
              <p className="text">{ latestVersion.codeUpdateTime }</p>
            </div>
            <div className="cell">
              <p className="title">版本</p>
              <p className="text">{ latestVersion.codeVersion }</p>
            </div>
            <div className="cell">
              <p className="title">大小</p>
              <p className="text">{ latestVersion.bundleSize }</p>
            </div>
            <div className="cell">
              <p className="title">版本介绍</p>
              <p className="text">{ latestVersion.codeDesc }</p>
            </div>
            <div className="cell">
              <p className="title">组件尺寸</p>
              <p className="text">{ size }</p>
            </div>
            <div className="cell">
              <p className="title">预览图</p>
              <p className="text">
                <div className="img-block">
                  {appPreviewImage ? <img className="img" src={ appPreviewImage } /> : <p className="img-text">加载中</p>}
                </div>
              </p>
            </div>
          </li>
        </ul>

        <h3 className="app-title">历史版本</h3>
        <ul className="detail-tableList">
        {
          data.map((item, index) => (
            <li className="item">
              <div className="cell">
                <p className="title">更新日期</p>
                <p className="text">{ item.codeUpdateTime }</p>
              </div>
              <div className="cell">
                <p className="title">版本</p>
                <p className="text">{ item.codeVersion }</p>
              </div>
              <div className="cell">
                <p className="title">大小</p>
                <p className="text">{ item.bundleSize }</p>
              </div>
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
    )
  }
}

export default Versions