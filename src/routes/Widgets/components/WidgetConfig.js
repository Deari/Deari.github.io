import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames';
import { Field, reduxForm } from 'redux-form'
import { renderField, renderSelect} from '../modules/renderField'
import './widgetConfig.scss'
class ConfigTpl extends Component {
  render(){
    return (<div className='config-box'>
       <Field name="type" component={renderSelect}>
          <option value="input">文本框</option>
       </Field>
       <div className='config-textBox'>
       <Field name="label"  placeholder="标题" component={renderField}></Field>
       <Field name="id"  placeholder="KEY" component={renderField}></Field>
       <Field name="value"  placeholder="VALUE" component={renderField}></Field>
       <Field name="desc"  placeholder="描述" component={renderField}></Field>
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