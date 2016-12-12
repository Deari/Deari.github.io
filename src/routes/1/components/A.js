import React from 'react'
// import DuckImage from '../assets/Duck.jpg'
// import './HomeView.scss'

export const A = (props) => (
  <div>
    <h4>这是1层级的A模块</h4>
    {props.B||<a href="/1/1-2">1-2</a>}
  </div>
)

export default A