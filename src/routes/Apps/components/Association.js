import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
const defaultMoule = (props) => (
  <div>
    <span>（icon）选择</span>
  </div>
)
const changedMoule = (props) => (
  <div>
    <img src=""/>
  </div>
)
class AssociationModule extends Component {
  state={
    appActive:0,
    weigetActive:0,
    hardwareActive:0,
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
    return (
    <div>
      <div className="form-row">
        <label htmlFor="app">应用</label>
        <div className="row-right">
          <input id="app" type="checkbox" name='app' onChange={this.onchange.bind(this)}/>
        </div>
        <div>
          {appActive && defaultMoule()}
        </div>
      </div>
      <div className="form-row">
        
        <label htmlFor="weiget">组件</label>
        <div className="row-right">
         <input id="weiget" type="checkbox" name='weiget' onChange={this.onchange.bind(this)}/>
        </div>
        <div>
          {weigetActive && defaultMoule()}
        </div>
      </div>
       <div className="form-row">
       
        <label htmlFor="hardware">硬件</label>
        <div className="row-right">
         <input id="hardware" type="checkbox" name='hardware' onChange={this.onchange.bind(this)}/>
        </div>
        <div>
          {hardwareActive&&defaultMoule()}
        </div>
      </div>
    </div>
    )
  }
}
// const mapDispatchToProps = {
  
// }

// const mapStateToProps = ({ appsCreate }) => ({
//   initialValues: appsCreate.form,
//   tags: appsCreate.tags,
//   cates: appsCreate.cates
// })

export default connect(
)(reduxForm({
  form: 'AssociationModule',
  fields: [],
  forceUnregisterOnUnmount: true,
})(AssociationModule))