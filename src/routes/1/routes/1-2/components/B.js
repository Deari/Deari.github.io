import React from 'react'
// import DuckImage from '../assets/Duck.jpg'
// import './HomeView.scss'

export const B = (props) => (
  <div>
    <h4>这是1-2层级的B模块</h4>
    {props.C ||<a href="/1/1-2/1-2-3">1-2-3</a>}
  </div>
)

export default B
