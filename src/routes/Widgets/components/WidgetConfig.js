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
    this.props.updateconfigType(index,e.target.value)
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
  addConfigAudio(index){
    this.props.updateConfigAudioArr(index,-1)
  }
  removeConfigAudio(index,k){
    this.props.updateConfigAudioArr(index,k)
  }
  audioValueChange(index,k,e){
    this.props.updateConfigAudioValue(index,k,e.target.value)
    
  }
  audioKeyChange(index,k,e){
    this.props.updateConfigAudioKey(index,k,e.target.value)
  }
  render(){
    const {configList}=this.props
    console.log(configList)
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
                        <option value="audio">单选框</option>
                      </select>
                      {
                      item.type=='input'?
                        <div className='config-textBox'>
                          <input type='text' placeholder="标题" value={item.label?item.label:''} onChange={this.titleChange.bind(this,index)}/>
                          <input type='text' placeholder="KEY" value={item.id?item.id:''} onChange={this.keyChange.bind(this,index)}/>
                          <input type='text' placeholder="VALUE" value={item.value?item.value:''} onChange={this.valueChange.bind(this,index)}/>
                          <input type='text' placeholder="描述" value={item.desc?item.desc:''} onChange={this.descChange.bind(this,index)}/> 
                        </div>
                        :
                         <div className='config-audio'>
                          <span>标题：</span><input type='text' placeholder='标题' onChange={this.titleChange.bind(this,index)}/>
                         {
                          item.audioList.map((v,k)=>(
                              <div key={k}>
                                <span>key：</span><input type='text' placeholder='KEY' onChange={this.audioKeyChange.bind(this,index,k)}/>  
                                <span>value：</span><input type='text' placeholder='VALUE' onChange={this.audioValueChange.bind(this,index,k)}/> 
                                <i className='dele-item' onClick={this.removeConfigAudio.bind(this,index,k)}>x</i>   
                              </div>
                             ))
                           }  
                           <span className='add-item' onClick={this.addConfigAudio.bind(this,index)}>+新选项</span>                                           
                         </div>
                      }
                      
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