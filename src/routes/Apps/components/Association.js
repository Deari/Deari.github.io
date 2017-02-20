import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import classnames from 'classnames';
import './association.scss'
import { toggleActive } from '../routes/Editor/modules/edit'
import { validate } from '../modules/validate'
class AssociationModule extends Component {
  state={
    appActive:0,
    weigetActive:0,
    hardwareActive:0
  }
  onchange(e){
    if(e.target.name === "app"){
      if(e.target.checked){
        this.setState({appActive:1})
      }else{
        this.setState({appActive:0})
      }
    }else if(e.target.name === "weiget"){
      if(e.target.checked){
        this.setState({weigetActive:1})
      }else{
        this.setState({weigetActive:0})
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
    this.props.handlechange(item.logo,'app')
    this.props.handleIdchange(item.id,'app')
    
  }
  onWeigetDelete(item,index){
    this.props.handlechange(item.logo,'weiget')
    this.props.handleIdchange(item.id,'weiget')
  }
  render(){
    const { appActive, weigetActive , hardwareActive} = this.state
    const { appObj , weiObj } = this.props
    return (
    <div className="association">
      <div className="form-row">
      	<label>推荐</label>
        <div className="row-right max-width">
        	<div>
        		<div className="row-radio">
		          <input id="app" type="checkbox" name='app' onChange={this.onchange.bind(this)}/>
		          <span>
		            <i className="iconfont icon-radio1 icon-recommend"></i>
		            <i className="iconfont icon-radio icon-recommend"></i>
		          </span>
		        </div>
		        <label className="labelCheckbox" htmlFor="app">应用</label>
	        	<ul className={classnames({ 'active': appActive })}>
		          {
		             appObj.map((item,id)=>(
		              <li key={item.id}>
		                <img src={item.logo}/>
		                <i className="iconfont icon-del" onClick={this.onAppDelete.bind(this,item)}></i>
		              </li>
		             ))
		          }
		          <li onClick={()=>{this.props.toggleActive({trim:1,type:'app'})}}>
		            <span><i className="iconfont icon-add"></i>选择</span>
		          </li>
		        </ul>
        	</div>
        	<div>
        		<div className="row-radio">
		          <input id="weiget" type="checkbox" name='weiget' onChange={this.onchange.bind(this)}/>
		          <span>
		            <i className="iconfont icon-radio1 icon-recommend"></i>
		            <i className="iconfont icon-radio icon-recommend"></i>
		          </span>
		        </div>
		        <label className="labelCheckbox" htmlFor="weiget">组件</label>
	        	<ul className={classnames({ 'active': weigetActive })}>
		          {
		             weiObj.map((item,id)=>(
		              <li key={item.id}>
		                <img src={item.logo}/>
		                <i className="iconfont icon-del" onClick={this.onWeigetDelete.bind(this,item)}></i>
		              </li>
		             ))
		          }
	           <li onClick={()=>{this.props.toggleActive({trim:1,type:'weiget'})}}>
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
		           <li onClick={()=>{this.props.toggleActive({trim:1,type:'hardware'})}}>
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
  const mapDispatchToProps = {
    toggleActive  
  }

 const mapStateToProps = ({ appsEdit }) => ({
    appsEdit
 })

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssociationModule)