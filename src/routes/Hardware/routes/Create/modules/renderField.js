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

/**
 * 关联下啦列表框
 */
export class renderCorDropdown extends Component {

  state = {
    majorCategoryId: -1,
    minorCategories: [],
    minorCategoryId: -1,
  }

  changeMajor = e => {
    const majorCategoryId = e.target.value
    const selectCate = this.props.cates.find(cate => cate.categoryId == majorCategoryId)

    if (selectCate) {
      this.setState({
        majorCategoryId,
        minorCategories: selectCate.categoryChilds
      })
    } else {
      this.setState({
        minorCategories: [],
        minorCategoryId: -1,
      })
    }
  }

  changeMinor = e => {
    const { input } = this.props
    const { majorCategoryId } = this.state
    const minorCategoryId = e.target.value

    if (minorCategoryId) {
      this.setState({
        minorCategoryId
      }, () => {
        input.onChange({
          majorCategoryId,
          minorCategoryId,
        })
      })
    } else {
      // 次要分类没选择
      input.onChange({
        majorCategoryId,
        minorCategoryId: -1,
      })
    }
  }

  render() {
    const props = this.props
    return <div className="form-row">
      <label>{props.label}</label>
      <div className="row-right">
        <select className="row-select" onChange={this.changeMajor}>
          <option>请选择分类</option>
          {
            props.cates.map(cate => (
              <option key={cate.categoryId} value={cate.categoryId}>{cate.categoryName}</option>
            ))
          }
        </select>
        <select className="row-select" onChange={this.changeMinor}>
          <option>请选择分类</option>
          {
            this.state.minorCategories.map(cate => (
              <option key={cate.categoryId} value={cate.categoryId}>{cate.categoryName}</option>
            ))
          }
        </select>

      </div>
    </div>
  }

}


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


export default renderField;
