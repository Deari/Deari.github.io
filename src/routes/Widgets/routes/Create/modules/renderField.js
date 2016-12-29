import React, { Component } from 'react'

export const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div className="form-row">
    <label>{label} <i className="iconfont icon-edit"></i></label>
    <div className="row-right">
      <input {...input} placeholder={label} type={type}/>
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
)

export const renderTextArea = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div className="form-row">
    <label>{label}</label>
    <div className="row-right">
      <textarea {...input} placeholder={label}></textarea>
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
)

export const renderSelect = ({ input, label, meta: { touched, error, warning }, children }) => (
  <div className="form-row">
    <label>{label}</label>
    <div className="row-right">
      <select {...input}>
        {children}
      </select>
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
)

export class renderSizeRadioBox extends Component {
  render() {
    const props = this.props

    const list = [
      { image: 'img1', value: '2X1' },
      { image: 'img2', value: '1X1' },
      { image: 'img3', value: '2X2' },
    ]

    return <div className="form-row">
      <label>{props.label}</label>
      <div className="row-right">
        <p>请选择组件在手机屏幕中所占比例的尺寸</p>
        <div className="row-size">
          <span className="row-img img4"></span>
          <div className="row-radio">
            <input type="radio" name="radio" value=""/>
            <span>
              <i className="iconfont icon-radio1"></i>
              <i className="iconfont icon-radio"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
  }
}

export default renderField;
