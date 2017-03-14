import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames';
import './widgetConfig.scss'
class ConfigTpl extends Component {
  addConfig(){
    this.props.updateConfigArr(-1)
  }
  removeConfig(index){
    this.props.updateConfigArr(index)
  }
  typeChange(index,e){
    console.log(e.target.value)
    //this.props.updateconfigType()
  }
  titleChange(index,e){
    this.props.updateconfigLabel(index,e.target.value)
  }
  keyChange(index,e){
    this.props.updateconfigId(index,e.target.value)
  }
  valueChange(index,e){
    this.props.updateconfigValue(index,e.target.value)
  }
  descChange(index,e){
    this.props.updateconfigDesc(index,e.target.value)
  }

  render(){
    const {configList}=this.props
    return (<div className='config-box'>
    					<div className="config-contain">
    						<div className="config-btn"></div>
    						<div className="config-clx"></div>
                {
                  configList.map((item,index)=>(
                    <div key={index}  className="config-item">
                      <i className="iconfont icon-close" onClick={this.removeConfig.bind(this,index)}></i>
                      <select onChange={this.typeChange.bind(this,index)}>
                        <option value="input">文本框</option>
                      </select>
                      <div className='config-textBox'>
                        <input type='text' placeholder="标题" value={item.label?item.label:''} onChange={this.titleChange.bind(this,index)}/>
                        <input type='number' placeholder="KEY" value={item.id?item.id:''} onChange={this.keyChange.bind(this,index)}/>
                        <input type='text' placeholder="VALUE" value={item.value?item.value:''} onChange={this.valueChange.bind(this,index)}/>
                        <input type='text' placeholder="描述" value={item.desc?item.desc:''} onChange={this.descChange.bind(this,index)}/> 
                      </div>
                    </div>
                  ))
                }
       					<div className="config-clx"></div>
       					<div className="config-edit" onClick={this.addConfig.bind(this)}><i className="iconfont icon-fileadd"></i>填写属性值</div>
			       </div>
			    </div>)
  }
}


export default ConfigTpl