import React, { Component, PropTypes } from 'react'
import classnames from 'classnames';
import './association.scss'
import { validate } from '../modules/validate'
class AssociationModule extends Component {
  state={
    appActive:this.props.appActive,
    widgetActive:this.props.widgetActive,
    hardwareActive:0
  }
  onchange(e){
    if(e.target.name === "app"){
      if(e.target.checked){
        this.setState({appActive:1})
      }else{
        this.setState({appActive:0})
      }
    }else if(e.target.name === "widget"){
      if(e.target.checked){
        this.setState({widgetActive:1})
      }else{
        this.setState({widgetActive:0})
      }
    }else{
       if(e.target.checked){
        this.setState({hardwareActive:1})
      }else{
        this.setState({hardwareActive:0})
      }
    }
    
  }
  onAppDelete(item,index){
    this.props.handleLogochange(item.logo,'app')
    this.props.handleIdchange(item.id,'app')
    this.props.handleNamechange(item.name,'app')
  }
  onWidgetDelete(item,index){
    this.props.handleLogochange(item.logo,'widget')
    this.props.handleIdchange(item.id,'widget')
    this.props.handleNamechange(item.name,'widget')
  }
  render(){
    const { appActive, widgetActive , hardwareActive} = this.state
    const { appObj , weiObj } = this.props
    return (
    <div className="association">
      <div className="form-row">
      	<label>推荐</label>
        <div className="row-right max-width">
        	<div>
        		<div className="row-radio">
		          <input id="app" type="checkbox" name='app' onChange={this.onchange.bind(this)} checked={this.state.appActive}/>
		          <span>
		            <i className="iconfont icon-radio1 icon-recommend"></i>
		            <i className="iconfont icon-radio icon-recommend"></i>
		          </span>
		        </div>
		        <label className="labelCheckbox" htmlFor="app">应用</label>
	        	<ul className={classnames({ 'active': appActive })}>
		          {
		             appObj.map((item,id)=>(
		              <li className='logo-box' key={item.id}>
		                <img src={item.logo}/>
		                <i className="iconfont icon-del" onClick={this.onAppDelete.bind(this,item)}></i>
                     <p>{item.name}</p>
		              </li>
		             ))
		          }
		          <li className="logo-box logo-default" onClick={()=>{this.props.toggleActive({trim:1,type:'app'})}}>
		            <span><i className="iconfont icon-add"></i>选择</span>
		          </li>
		        </ul>
        	</div>
        	<div>
        		<div className="row-radio">
		          <input id="widget" type="checkbox" name='widget' onChange={this.onchange.bind(this)} checked={this.state.widgetActive}/>
		          <span>
		            <i className="iconfont icon-radio1 icon-recommend"></i>
		            <i className="iconfont icon-radio icon-recommend"></i>
		          </span>
		        </div>
		        <label className="labelCheckbox" htmlFor="widget">组件</label>
	        	<ul className={classnames({ 'active': widgetActive })}>
		          {
		             weiObj.map((item,id)=>(
		              <li className="logo-box" key={item.id}>
		                <img src={item.logo}/>
		                <i className="iconfont icon-del" onClick={this.onWidgetDelete.bind(this,item)}></i>
                    <p>{item.name}</p>
		              </li>
		             ))
		          }
	           <li className="logo-box logo-default" onClick={()=>{this.props.toggleActive({trim:1,type:'widget'})}}>
	            <span><i className="iconfont icon-add"></i>选择</span>
		          </li>
		        </ul>
        	</div>
        	<div>
        		<div className="row-radio">
		          <input id="hardware" type="checkbox" name='hardware' onChange={this.onchange.bind(this)}/>
		          <span>
		            <i className="iconfont icon-radio1 icon-recommend"></i>
		            <i className="iconfont icon-radio icon-recommend"></i>
		          </span>
		        </div>
		        <label className="labelCheckbox" htmlFor="hardware">硬件</label>
	        	<ul className={classnames({ 'active': hardwareActive })}>
		           <li className="logo-box logo-default" onClick={()=>{this.props.toggleActive({trim:1,type:'hardware'})}}>
		            <span><i className="iconfont icon-add"></i>选择</span>
		          </li>
		        </ul>
        	</div>
        </div>
      </div>
    </div>
    )
  }
}


export default AssociationModule