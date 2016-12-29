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

import React, { Component, PropTypes } from 'react'


export class renderTags extends Component {
  
  handleClick (tagId) {
    const { input } = this.props;
    const newTags = input.value.filter(v=>v != tagId);
    if(newTags.length ==input.value.length) {
      newTags.push(tagId)
    }

    input.onChange(newTags);
  }

  render() {
    const { input, tags, label, meta: { touched, error, warning }} = this.props;
    
    return (
      <div className="form-row">
        <label>{label}</label>
        <ul className="row-right max-width">
          {
            tags.map((item) => (
              <li 
                className={
                  ((tagId)=>{
                    return input.value.indexOf(tagId) > -1 ? 'active' : ''
                  })(item.tagId)
                }
                key={item.tagId}
                onClick={()=>this.handleClick(item.tagId)}
              >{item.tagName}</li>
            ))
          }
        </ul>
      </div>
    )
  }
  
}


export default renderField;