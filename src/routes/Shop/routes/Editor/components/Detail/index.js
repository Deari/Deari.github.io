import React, { Component } from 'react'
import Business from '../../../../../../components/business'


export const Detail = props => {

  const { detail, saveDetail, savePage } = props

  const { element } = detail

  if (element.moduleType === 'html5') {

    const { Detail } = Business[ element.moduleName ]
    if (Detail) {
      return <div id="detail-container">
        <Detail {...props}  />
      </div>
    }
  }

  return <div id="detail-container">
    <div className="share">
      <div className="bg-qr">
        <i className="iconfont icon-leftjiao"></i>
        <div className="qr"></div>
      </div>
      <p className="text">用微信<i className="iconfont icon-wechat"></i>扫描即可查看手机橱窗</p>
    </div>
    <pre style={{ fontSize: 10 }}>
        {
          JSON.stringify(detail || {}, null, 2)
        }
    </pre>
    <div className="btn-block">
      <button className="btn btn-blue" onClick={savePage}><i className="iconfont icon-save"></i>保存</button>
      <button className="btn btn-white" onClick=""><i className="iconfont icon-update"></i>发布</button>
    </div>
  </div>
}

Detail.defaultProps = {
  detail: {
    element: {}
  }
}

export default Detail
