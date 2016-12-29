import React, { Component } from 'react'
import './index.scss'
const App = () => {
  return (
  	<div className="t-container">
  	  <ul className="phone-box">
  	    <li>
  	      <div className="phone">
  	        <div className="module-one"></div>
  	      </div>
  	      <div className="row-radio radio-active">
            <input type="radio" name="radio" value="" checked="checked" />
            <span>
              <i className="iconfont icon-radio1"></i>
              <i className="iconfont icon-radio"></i>
            </span>
            模板1
          </div>
  	    </li>
  	    <li>
          <div className="phone">
            <div className="module-two"></div>
          </div>
          <div className="row-radio">
            <input type="radio" name="radio" value="" />
            模板2
          </div>
        </li>
        <li>
          <div className="phone">
            <div className="module-three"></div>
          </div>
          <div className="row-radio">
            <input type="radio" name="radio" value="" />
            模板1
          </div>
        </li>
  	  </ul>
      <p className="btn-box">
        <button className="button">确定</button>
      </p>
  	</div>
  )
}

export default store => ({
  path: 'template',
  component: App
})
