import React from 'react'
import { IndexLink, Link } from 'react-router'
import './A.scss'

class A extends React.Component {
  state={
    active : 0
  }
  select () {
    alert()
  }
  render () {
    return (
      <div style={{ paddingTop: '77px' }}>
        <h4>这是 Deomo 的第1层级的A模块</h4>
      </div>
    )
  }
}
export default A
