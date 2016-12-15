import React from 'react'

class Platform extends React.Component {
  render() {
    return (
      <div>
        <fieldset className="col-sm-6">
          <div className="form-group row">
            <textarea className="form-control" rows="5"></textarea>
          </div>
          <div className="form-group row">
            <input type="text" className="form-control" placeholder="版本号" />
          </div>
          <div className="form-group row">
            <input type="file" name="选择图片" className="form-control-file form-control-sm upload-btn" />
          </div>
        </fieldset>
      </div>
    )
  }
}

export default Platform;