import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import classnames from 'classnames';
import './association.scss'
import {toggleActive} from '../routes/Editor/modules/edit'
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
  render(){
    const { appActive, weigetActive , hardwareActive} = this.state
    const { logoList , wLogoList } = this.props

    return (
    <div className="association">
      <div className="form-row">
        <label htmlFor="app">应用</label>
        <div className="row-right">
          <input id="app" type="checkbox" name='app' onChange={this.onchange.bind(this)}/>
        </div>
        <ul className={classnames({ 'active': appActive })}>
           <li onClick={()=>{this.props.toggleActive({trim:1,type:'app'})}}>
            <span>（icon）选择</span>
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
      <div className="form-row">
        
        <label htmlFor="weiget">组件</label>
        <div className="row-right">
         <input id="weiget" type="checkbox" name='weiget' onChange={this.onchange.bind(this)}/>
        </div>
        <ul className={classnames({ 'active': weigetActive })}>
           <li onClick={()=>{this.props.toggleActive({trim:1,type:'weiget'})}}>
            <span>（icon）选择</span>
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
       <div className="form-row">
       
        <label htmlFor="hardware">硬件</label>
        <div className="row-right">
         <input id="hardware" type="checkbox" name='hardware' onChange={this.onchange.bind(this)}/>
        </div>
        <ul className={classnames({ 'active': hardwareActive })}>
           <li onClick={()=>{this.props.toggleActive({trim:1,type:'hardware'})}}>
            <span>（icon）选择</span>
          </li>
        </ul>
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