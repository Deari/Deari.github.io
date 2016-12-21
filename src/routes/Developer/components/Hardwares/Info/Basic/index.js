import React from 'react'
import './index.scss'
import Tags from '../../../../../../components/Tags'

class Basic extends React.Component {
  render() {
    return (
      <fieldset className="form-container clx">
        <div className="form-group col-md-12">
          <label className="col-md-2">商家应用名称:</label>
          <input className="form-control col-md-4" type="text" placeholder="应用名称" name="appName"/>
        </div>
        <hr/>
        <div className="form-group col-md-12">
          <label>文字介绍:</label>
          <textarea className="form-control" rows="3"></textarea>
        </div>
      </fieldset>
    )
  }
}

export default Basic;