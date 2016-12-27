import React, { Component } from 'react'

export const Detail = ({ detail }) => {
  //console.log(props.detail)
  return <div id="detail-container">
    <button className="button">保存</button>
    <pre style={{fontSize: 10}}>
        {
          JSON.stringify(detail || {}, null, 2)
        }
    </pre>
  </div>
}

export default Detail
