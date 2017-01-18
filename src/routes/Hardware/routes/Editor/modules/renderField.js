import React, { Component, PropTypes } from 'react'
/**
 * 关联下拉列表框
 */
export class renderCorDropdown extends Component {
  changeMajor = e => {
    const { input } = this.props
    const majorCategoryId = e.target.value
    const selectCate = this.props.cates.find(cate => cate.categoryId == majorCategoryId)

    if (selectCate) {
      input.onChange({
        majorCategoryId,
        minorCategories: selectCate.categoryChilds,
        minorCategoryId: -1,
      })
    } else {
      input.onChange({
        majorCategoryId: -1,
        minorCategories: [],
        minorCategoryId: -1,
      })
    }
  }

  changeMinor = e => {
    const { input } = this.props
    const minorCategoryId = e.target.value
    const { majorCategoryId, minorCategories } = input.value

    input.onChange({
      majorCategoryId,
      minorCategories,
      minorCategoryId,
    })

  }

  render() {
    const props = this.props;
    const { majorCategoryId, minorCategoryId } = props.input.value;
    const { meta: { touched, dirty, error, warning } } = this.props

    const selectCate = this.props.cates.find(cate => cate.categoryId == majorCategoryId);
    const minorCategories = selectCate && selectCate.categoryChilds || []
    
    return <div className="form-row">
      <label>{props.label}</label>
      <div className="row-right">
        <select className="row-select" onChange={this.changeMajor} value={majorCategoryId}>
          <option value={-1}>请选择主分类</option>
          {props.cates.map(cate => <option key={cate.categoryId}
                                           value={cate.categoryId}>{cate.categoryName}</option>)}
        </select>
        <select className="row-select" onChange={this.changeMinor} value={minorCategoryId}>
          <option value={-1}>请选择子分类</option>
          {minorCategories.map(cate => <option key={cate.categoryId}
                                               value={cate.categoryId}>{cate.categoryName}</option>)}
        </select>
        {(dirty || touched) && ((error && <span>{error}</span>))}
      </div>
    </div>
  }
}

export default renderCorDropdown;
