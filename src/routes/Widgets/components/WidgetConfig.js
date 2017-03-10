import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames';
import { Field, reduxForm } from 'redux-form'
import { renderField, renderSelect} from '../modules/renderField'
import './widgetConfig.scss'
class ConfigTpl extends Component {

  render(){
    const {configList}=this.props
    return (<div className='config-box'>
    					<div className="config-contain">
    						<div className="config-btn"></div>
    						<div className="config-clx"></div>
                {
                configList.map((item,index)=>(
                  <div key={index}  className="config-item">
                  	<i className="iconfont icon-close"></i>
                      <Field name={"type"+index} component={renderSelect}>
                        <option value="input">文本框</option>
                      </Field>
                      <div className='config-textBox'>
                        <Field name={"label"+index}  placeholder="标题" component={renderField}></Field>
                        <Field name={"id"+index}  placeholder="KEY" component={renderField}></Field>
                        <Field name={"value"+index}  placeholder="VALUE" component={renderField}></Field>
                        <Field name={"desc"+index}  placeholder="描述" component={renderField}></Field>
                      </div>
                  </div>
                ))
               }
       					<div className="config-clx"></div>
       					<div className="config-edit"><i className="iconfont icon-fileadd"></i>填写属性值</div>
			       </div>
			    </div>)
  }
}
const mapDispatchToProps = {
}

const mapStateToProps = ({ widgetEdit }) => ({
    widgetEdit
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfigTpl)