import React from 'react'
import './index.scss'
import Tags from '../../../../../../components/Tags'

class Basic extends React.Component {
  constructor() {
    super();
    this.state = {
      tags: [
        {id: 0, name: '标签一'},
        {id: 1, name: '标签二'},
        {id: 2, name: '标签三'},
        {id: 3, name: '标签四'},
        {id: 4, name: '标签五'},
        {id: 5, name: '标签六'},
        {id: 6, name: '标签七'},
      ]
    };
  }
  // state = {
  //   appName: "",
  //   appLogo: "",
  //   appDesc: "",
  //   categoryId: ""
  // }
  // handleChange(name, event) {
  //   var newState = {};
  //   newState[name] = (name == "checked" ? event.target.checked : event.target.value);
  //   this.setState(newState);
  //   value={this.state} onChange={this.handleChange.bind(this, "username")}
  // }
  getValue(){
    this.props.fromList()
  }
  render() {
    return (
      <div>
        <fieldset className="col-md-4">
          <div className="form-group row">
            <input type="text" className="form-control" placeholder="应用名称" onChange={this.getValue}/>
          </div>
          <div className="form-group row">
            <input type="text" className="form-control" placeholder="描述" onChange={this.getValue}/>
          </div>
          <div className="form-group row">
            <div className="img-container">
              <img src="" alt="上传图片" className="img-thumbnail" onChange={this.getValue}/>
            </div>
          </div>
          <div className="form-group row">
            <span className="sl-custom-file">
              <input type="button" className="btn btn-primary" value="选择图片" onChange={this.getValue}/>
              <input type="file" className="ui-input-file" accept="image/*" onChange={this.getValue}/>
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
            <label>标签</label>
            <Tags data={this.state.tags} />
          </div>
        </fieldset>
      </div>
    )
  }
}

export default Basic;