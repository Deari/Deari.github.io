import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import classnames from 'classnames';
import './association.scss'
import { toggleActive } from '../routes/Create/modules/create'
import { validate } from '../modules/validate'
class CreateAssocation extends Component {
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
  render(){
    const { appActive, weigetActive , hardwareActive} = this.state
    const { logoList , wLogoList } = this.props
    console.log(logoList)
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
		        <b htmlFor="app">应用</b>
	        	<ul className={classnames({ 'active': appActive })}>
		           <li onClick={()=>{this.props.toggleActive({trim:1,type:'app'})}}>
		            <span><i className="iconfont icon-add"></i>选择</span>
		          </li>
		          {
		             logoList.map((item,index)=>(
		              <li key={index}>
		                <img src={item}/>
		              </li>
		             ))
		          }
		        </ul>
        	</div>
        	<div>
        		<div className="row-radio row-recommend">
		          <input id="weiget" type="checkbox" name='weiget' onChange={this.onchange.bind(this)}/>
		          <span>
		            <i className="iconfont icon-radio1 icon-recommend"></i>
		            <i className="iconfont icon-radio icon-recommend"></i>
		          </span>
		        </div>
		        <b htmlFor="weiget">组件</b>
	        	<ul className={classnames({ 'active': weigetActive })}>
	           <li onClick={()=>{this.props.toggleActive({trim:1,type:'weiget'})}}>
	            <span><i className="iconfont icon-add"></i>选择</span>
		          </li>
		          {
		             wLogoList.map((item,index)=>(
		              <li key={index}>
		                <img src={item}/>
		              </li>
		             ))
		          }
		        </ul>
        	</div>
        	<div>
        		<div className="row-radio row-recommend">
		          <input id="hardware" type="checkbox" name='hardware' onChange={this.onchange.bind(this)}/>
		          <span>
		            <i className="iconfont icon-radio1 icon-recommend"></i>
		            <i className="iconfont icon-radio icon-recommend"></i>
		          </span>
		        </div>
		        <b htmlFor="hardware">硬件</b>
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
)(CreateAssocation)