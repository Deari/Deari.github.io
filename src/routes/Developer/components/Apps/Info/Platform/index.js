import React from 'react'

class Platform extends React.Component {
  async fileUpload() {
    let data = new FormData()
    data.append('fileName', this.refs.appFile.files[0])
    const url = "http://api.intra.sit.ffan.net/bo/v1/web/file/upload";
    const fileRes = await fetch(url, {
      method: "POST",
      body: data
    })
    const file = await fileRes.json();
    const fileUrl = file.data.url;
    const fileName = file.data.originalName 
    this.props.onFinish(fileName,fileUrl)
  }

  render() {
    return (
      <div>
        <fieldset className="col-sm-6">
          <div className="form-group row">
            <textarea className="form-control" rows="5" name='codeDesc'></textarea>
          </div>
          <div className="form-group row">
            <input type="file" className="form-control-file form-control-sm upload-btn" ref='appFile' name='appFile' onChange={this.fileUpload.bind(this)}/>
          </div>
        </fieldset>
      </div>
    )
  }
}

export default Platform;