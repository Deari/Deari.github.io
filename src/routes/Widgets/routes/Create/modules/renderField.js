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

  onClickHandler = first => {
     this.props.input.onChange(first)
  }

  render() {
    const props = this.props
    console.log('--------')
    console.log(props)
    const selected = props.input.value

    const list = [
      { image: 'img1', value: '2x1' },
      { image: 'img2', value: '1x1' },
      { image: 'img3', value: '2x2' },
    ]

    return <div className="form-row">
      <label>尺寸</label>
      <div className="row-right">
        <p>请选择组件在手机屏幕中所占比例的尺寸</p>
        {list.map(item => <div className="row-size" onClick={this.onClickHandler.bind(null, item.value)}>
          <span className={`${item.image} row-img`}></span>
          <div className="row-radio">
            <input type="radio" name="radio" checked={selected == item.value}/>
            <span>
										<i className="iconfont icon-radio1"></i>
							      <i className="iconfont icon-radio"></i>
							    </span>
          </div>
        </div>)}
      </div>
    </div>
  }
}

export default renderField;
