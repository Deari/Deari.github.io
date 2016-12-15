import React from 'react'
import { IndexLink, Link } from 'react-router'
import './A.scss'

class A extends React.Component {
  state={
    active : 0
  }
  select(){
     alert()
  }
  render(){
    return (
      <div>
        <h4>这是 Deomo 的第1层级的A模块</h4>
        {this.props.B||
          <Link to='/1/1-2' activeClassName='route--active'>
          /1/1-2
          </Link>
        }

        <form>

        </form>
      </div>
    )
  }
}
export default A