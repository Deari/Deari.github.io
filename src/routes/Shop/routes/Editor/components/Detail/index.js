import React, { Component } from 'react'

export const Detail = ({ detail, saveDetail, savePage}) => {
  //console.log(props.detail)
  console.log('--------------')
  console.log(savePage)
  return <div id="detail-container">
    <div className="share">
      <div className="bg-qr">
        <i className="iconfont icon-leftjiao"></i>
        <div className="qr"></div>
      </div>
      <p className="text">用微信<i className="iconfont icon-wechat"></i>扫描即可查看手机橱窗</p>
    </div>
    <pre style={{fontSize: 10}}>
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

export default Detail
