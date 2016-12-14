import React from 'react'
// import DuckImage from '../assets/Duck.jpg'
 import './A.scss'
import { IndexLink, Link } from 'react-router'
class A extends React.Component {
  state={
    active : 0
  }
  select(){
     alert()
  }
  render(){
    return(
      <div>
        <h4>这是1层级的A模块</h4>
        {this.props.B||
          <Link to='/1/1-2' activeClassName='route--active'>
          /1/1-2
          </Link>
        }

        <form>
          <h4>选择尺寸：</h4>
          <div className='selectBox'>
          <label onClick={this.select}>
            <img src=""/>
            <input ref={rad} name="size" type="radio" value="2X1" />
          </label>
          </div>
          <div className='selectBox'>
          <label onClick={this.select}>
            <img src=""/>
            <input ref={rad} name="size" type="radio" value="1X1" />
          </label>
          </div>
          <div className='selectBox'>
          <label onClick={this.select}>
            <img src=""/>
            <input ref={rad} name="size" type="radio" value="2X2" />
          </label>
          </div>
        </form>
      </div>
    )
  }
}
export default A