import React from 'react'
import DuckImage from '../assets/Duck.jpg'
import { IndexLink, Link, withRouter, browserHistory } from 'react-router'
import './HomeView.scss'

export const HomeView = () => (
  <div className="home-banner">
    <div className="container">
      <dl>
        <dt>API集市</dt>
        <dd>为开发者提供最全面 最权威的API服务</dd>
      </dl>
      <p>
        <a className="btn btn-primary btn-lg">浏览API</a>
        <a className="btn btn-lg">发布API</a>
      </p>
    </div>
  </div>
  <div className="home_reminder">
    
  </div>
)

export default HomeView;
