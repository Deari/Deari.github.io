import React, { Component, PropTypes } from 'react'
import fetchUtil from '../../../../utils/fetchUtil'
import { getDomain } from '../../../../utils/domain'

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

/**
 * 关联下拉列表框
 */
export class renderCorDropdown extends Component {

  state = {
    majorCategoryId: -1,
    minorCategories: [],
    minorCategoryId: -1,
  }

  changeMajor = e => {
    const { input } = this.props
    const majorCategoryId = e.target.value
    const selectCate = this.props.cates.find(cate => cate.categoryId == majorCategoryId)

    if (selectCate) {
      this.setState({
        majorCategoryId,
        minorCategories: selectCate.categoryChilds
      }, input.onChange({
        majorCategoryId,
        minorCategories: selectCate.categoryChilds,
        minorCategoryId: -1,
      }))
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
          minorCategories: this.state.minorCategories,
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

  isValid = (value) => {
    const { majorCategoryId, minorCategoryId } = value
    return majorCategoryId !== -1 && minorCategoryId !== -1
  }

  render() {
    const props = this.props
    const value = props.input.value
    console.log('------------')
    console.log(this.props)
    console.log(value)
    const minorCategories = value.minorCategories.length ?  value.minorCategories : this.state.minorCategories
    const valid = this.isValid(props.input.value)
    return <div className="form-row">
      <label>{props.label}</label>
      <div className="row-right">
        <select className="row-select" onChange={this.changeMajor} value={valid ? value.majorCategoryId : undefined}>
          <option value={-1}>请选择分类</option>
          {
            props.cates.map(cate => (
              <option key={cate.categoryId} value={cate.categoryId}>{cate.categoryName}</option>
            ))
          }
        </select>
        <select className="row-select" onChange={this.changeMinor} value={valid ? value.minorCategoryId : undefined}>
          <option value={-1}>请选择分类</option>
          {
            minorCategories.map(cate => (
              <option key={cate.categoryId} value={cate.categoryId}>{cate.categoryName}</option>
            ))
          }
        </select>

      </div>
    </div>
  }

}

export class renderTags extends Component {

  handleClick(tagId) {
    const { input } = this.props;
    const newTags = input.value.filter(v => v != tagId);
    if (newTags.length == input.value.length) {
      newTags.push(tagId)
    }

    input.onChange(newTags);
  }

  render() {
    const { input, tags, label, meta: { touched, error, warning } } = this.props;

    return (
      <div className="form-row">
        <label>{label}</label>
        <ul className="row-right max-width">
          {
            tags.map((item) => (
              <li
                className={
                  ((tagId) => {
                    return input.value.indexOf(tagId) > -1 ? 'active' : ''
                  })(item.tagId)
                }
                key={item.tagId}
                onClick={() => this.handleClick(item.tagId)}
              >{item.tagName}</li>
            ))
          }
        </ul>
      </div>
    )
  }

}

export class renderImageUpload extends Component {

  imageUpload(e) {
    const url = getDomain("http://api.intra.", "ffan.net/bo/v1/web/photo/upload")
    const formData = new FormData()
    formData.append('fileName', e.target.files[ 0 ])

    fetchUtil.postJSON(url, formData, {
      jsonStringify: false
    }).then(res => {
      if (res.status == 200) {
        this.props.input.onChange(res.data.url)
      } else {
        res.msg && window.alert(res.msg)
      }
    }).catch(e => {
      console.log(e)
    })
  }

  render() {
    const { input, label, meta: { touched, error, warning } } = this.props;

    return (
      <div className="form-row">
        <label>{label}</label>
        <div className="row-right">
          <p>请上传应用高清图片</p>
          <p>400*400像素，仅支持PNG格式，大小不超过300KB</p>
          <span>
            <input type="button" value="选择文件"/>
            <input type="file" accept="image/*" onChange={::this.imageUpload}/>
          </span>
          <div className="img-container">
            <img src={input.value} alt="上传图片" className="img-thumbnail"/>
          </div>
        </div>
      </div>
    )
  }

}

export class renderImgsUpload extends Component {

  state = {
    imgs: []
  }

  componentDidMount() {
    const { input } = this.props
    this.setState({ imgs: input.value })
  }

  imageUpload(e) {
    const { input } = this.props
    if (input.value.length >= 4) {
      window.alert("最多上传四张")
      return
    }
    const url = getDomain("http://api.intra.", "ffan.net/bo/v1/web/photo/upload")
    const formData = new FormData()
    formData.append('fileName', e.target.files[ 0 ])

    fetchUtil.postJSON(url, formData, {
      jsonStringify: false
    }).then(res => {
      if (res.status == 200) {
        input.value.push(res.data.url)
        input.onChange(input.value)
        this.setState({ imgs: input.value })
      } else {
        res.msg && window.alert(res.msg)
      }
    }).catch(e => {
      console.log(e)
    })
  }

  render() {
    const { input, label, meta: { touched, error, warning } } = this.props;
    const { imgs } = this.state

    return (
      <div className="form-row">
        <label>{label}</label>
        <div className="row-right">
          <p>请上传硬件真实图片</p>
          <p>要求细节清晰，尺寸不限，最多上传4张，每张大小不超过1M。</p>
          <span>
            <input type="button" value="选择文件"/>
            <input type="file" accept="image/*" onChange={::this.imageUpload}/>
          </span>
          <div className="img-container">
            {
              imgs.map((item, index) => {
                return <img src={item} alt="上传图片" className="img-thumbnail"/>
              })
            }
          </div>
        </div>
      </div>
    )
  }

}

export class renderFile extends Component {

  fileUpload(e) {
    const url = getDomain("http://api.intra.", "ffan.net/bo/v1/web/file/upload")
    const formData = new FormData()

    formData.append('fileName', e.target.files[ 0 ])

    fetchUtil.postJSON(url, formData, {
      jsonStringify: false

    }).then(res => {
      if (res.status === 200) {
        this.props.input.onChange(res.data.url)
      } else {
        res.msg && window.alert(res.msg)
        console.warn(res);
      }
    }).catch(e => {
      console.warn(e);
    })
  }

  render() {
    const { input, tags, label, meta: { touched, error, warning } } = this.props;

    return (

      <div className="form-row file-position">
        <label>{label}</label>
        <div className="row-right">
          <input type="file" className="form-file" onChange={::this.fileUpload}/>
        </div>
      </div>
    )
  }

}

export default renderField;
