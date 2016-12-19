import React from 'react'
import './index.scss'

class Basic extends React.Component {
  render() {
    return (
      <div>
        <fieldset className="col-md-4">
          <div className="form-group row">
            <input type="text" className="form-control" placeholder="应用名称" name="appName"/>
          </div>
          <div className="form-group row">
            <input type="text" className="form-control" placeholder="描述"/>
          </div>
          <div className="form-group row">
            <div className="img-container">
              <img src="" alt="上传图片" className="img-thumbnail" name='appLogo'/>
            </div>
          </div>
          <div className="form-group row">
            <span className="sl-custom-file">
              <input type="button" className="btn btn-primary" value="选择图片"/>
              <input type="file" className="ui-input-file" accept="image/*"/>
            </span>
          </div>
          <div className="form-group row">
            <select className="form-control">
              <option>分类1</option>
              <option>分类2</option>
              <option>分类3</option>
              <option>分类4</option>
              <option>分类5</option>
            </select>
          </div>
          <div className="form-group row">
            <input type="text" className="form-control" placeholder="标签"/>
          </div>
        </fieldset>
      </div>
    )
  }
}

export default Basic;