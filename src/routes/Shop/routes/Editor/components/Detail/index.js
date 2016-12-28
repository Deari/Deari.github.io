import React, { Component } from 'react'

export const Detail = ({ detail, saveDetail, savePage}) => {
  return <div id="detail-container">
    <button className="button" onClick={savePage}>保存</button>
    <pre style={{fontSize: 10}}>
        {
          JSON.stringify(detail || {}, null, 2)
        }
    </pre>
  </div>
}

export default Detail
