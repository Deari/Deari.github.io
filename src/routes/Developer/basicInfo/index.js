import React from 'react';
import './index.scss';

class BasicInfo extends React.Component {
  render() {
    return (
      <div>
      <form className="container bo-form-container">
        <fieldset className="col-sm-4">
          <div className="form-group row">
            <input type="text" className="form-control" placeholder="应用名称" />
          </div>
          <div className="form-group row">
            <input type="text" className="form-control" placeholder="描述" />
          </div>
          <div className="form-group row">
            <div className="img-container">
              <img src="..." alt="..." className="img-thumbnail" />
            </div>
          </div>
          <div className="form-group row">
            {/*<input type="file" name="选择图片" className="form-control-file form-control-sm upload-btn" />*/}
            <span className="sl-custom-file">
              <input type="button" className="btn btn-primary" value="选择图片" />
              <input type="file" className="ui-input-file" />
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
            <input type="text" className="form-control" placeholder="标签" />
          </div>
        </fieldset>
      </form>
      <form className="container bo-form-container">
        <fieldset className="col-sm-6">
          <div className="form-group row">
            <textarea className="form-control" rows="5"></textarea>
          </div>
          <div className="form-group row">
            <input type="text" className="form-control" placeholder="版本号" />
          </div>
        </fieldset>
      </form>
      </div>
    )
  }
}

export default BasicInfo;