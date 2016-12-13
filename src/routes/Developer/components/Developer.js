import React from 'react'
// import DuckImage from '../assets/Duck.jpg'
// import './HomeView.scss'

export const Developer = (props) => (
  <div>
    <h4>这是1层级的Developer模块</h4>
    {props.APIGroup||<a href="/Developer/Developer/APIGroup">APIGroup</a>}
    {props.businessGroup||<a href="/Developer/Developer/businessGroup">businessGroup</a>}
    {props.storeGroup||<a href="/Developer/Developer/storeGroup">storeGroup</a>}
    {props.productGroup||<a href="/Developer/Developer/productGroup">productGroup</a>}
  </div>
)

export default Developer