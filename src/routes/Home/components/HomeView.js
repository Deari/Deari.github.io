import React from 'react'
import DuckImage from '../assets/Duck.jpg'
import { IndexLink, Link, withRouter, browserHistory } from 'react-router'
import './HomeView.scss'
import '../../../styles/_base.scss'

export const HomeView = () => (
  <div className="home-banner">
    <div className="container">
      <p>API集市</p>
      <span>为开发者提供最全面 最权威的API服务</span>
      <div>
        <button className="btn btn-primary">浏览API</button>
        <button className="btn">发布API</button>
      </div>
    </div>
  </div>
)

export default HomeView;
