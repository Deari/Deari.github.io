import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames';
import{updateConfigArr} from '../routes/Editor/modules/edit';
import './widgetConfig.scss'
class ConfigTpl extends Component {
  addConfig(){
    this.props.updateConfigArr(-1)
  }
  removeConfig(index){
    this.props.updateConfigArr(index)
  }
  titleChange(){
    alert('title')
  }
  keyChange(){
    alert('key') 
  }
  valueChange(){
    alert('value')
  }
  descChange(){
    alert('desc')
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
                    <select>
                      <option value="input">文本框</option>
                    </select>
                    <div className='config-textBox'>
                      <input type='text' placeholder="标题" onChange={this.titleChange}/>
                      <input type='text' placeholder="KEY" onChange={this.keyChange}/>
                      <input type='text' placeholder="VALUE" onChange={this.valueChange}/>
                      <input type='text' placeholder="描述" onChange={this.descChange}/> 
                    </div>
                  </div>
              ))
               }
       					<div className="config-edit" onClick={this.addConfig.bind(this)}><i className="iconfont icon-fileadd"></i>填写属性值</div>
			       </div>
			    </div>)
  }
}
const mapDispatchToProps = {
  updateConfigArr
}

const mapStateToProps = ({ widgetEdit }) => ({
    widgetEdit
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfigTpl)