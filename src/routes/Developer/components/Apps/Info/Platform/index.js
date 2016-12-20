import React from 'react'

class Platform extends React.Component {
  fileUpload() {
    const appFileName = this.refs.appFile.name;

    console.log(appFileName)

    const data = {
      fileName: appLogoName,
      width: 640
    }

    const url = "http://10.1.115.14:8006/bo/v1/web/developer/1/app/1/code";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data"
      },
      body: JSON.stringify(data)
    })
  }
  
  render() {
    return (
      <div>
        <fieldset className="col-sm-6">
          <div className="form-group row">
            <textarea className="form-control" rows="5" name='appInformat'></textarea>
          </div>
          <div className="form-group row">
            <input type="text" className="form-control" placeholder="版本号" name='appVersion'/>
          </div>
          <div className="form-group row">
            <input type="file" className="form-control-file form-control-sm upload-btn" ref='appFile' onChange={this.fileUpload.bind(this)}/>
          </div>
        </fieldset>
      </div>
    )
  }
}

export default Platform;