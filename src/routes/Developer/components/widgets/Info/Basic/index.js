import React from 'react'
import './index.scss'

class Basic extends React.Component {
  componentDidMount() {
    
    const mod = this.refs.mod;
    const lit = this.refs.lit;
    const big = this.refs.big;
    console.log(mod.checked)
    console.log(lit.checked)
    console.log(big.checked)
  }
  select(){
    alert()
    const rad = this.refs;
    console.log(rad)
  }
  render() {
    return (
      <div>
        <fieldset>
          <div className="form-group row">
            <span>店铺组件名称：</span>
            <input type="text" className="form-control" placeholder="组件名称" />
          </div>
          <div className="form-group row">
            <div>选择尺寸：</div>
            <div className='selectBox'>
              <label onClick={this.select}>
                <img src="" />
                <input name="size" type="radio" value="2X1" ref="lit"/>
              </label>
            </div>
            <div className='selectBox'>
              <label onClick={this.select}>
                <img src="" />
                <input name="size" type="radio" value="1X1" ref="mod"/>
              </label>
            </div>
            <div className='selectBox'>
              <label onClick={this.select}>
                <img src="" />
                <input name="size" type="radio" value="2X2"ref="big"/>
              </label>
            </div>
          </div>
          <div className="form-group row">
            <input type="text" className="form-control" placeholder="描述" />
          </div>
          <div className="form-group row">
            <div className="img-container">
              <img src="" alt="上传图片" className="img-thumbnail" />
            </div>
          </div>
          <div className="form-group row">
            <span className="sl-custom-file">
              <input type="button" className="btn btn-primary" value="选择图片" />
              <input type="file" className="ui-input-file" accept="image/*" />
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
      </div>
    )
  }
}

export default Basic;