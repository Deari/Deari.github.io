import React from 'react'
import '../index.scss'

class Platform extends React.Component {
  render() {
    return (
      <div className="clx pt40">
        <fieldset className="col-sm-12">
          <div className="form-group row">
            <textarea className="form-control" rows="5" name='appInformat'></textarea>
          </div>
          <div className="form-group row pt10">
            <input type="text" className="form-control" placeholder="版本号" name='appVersion'/>
          </div>
          <div className="form-group row pt10">
            <input type="file" name="选择图片" className="form-control-file form-control-sm upload-btn" />
          </div>
        </fieldset>
      </div>
    )
  }
}

export default Platform;