import React, { Component, PropTypes } from 'react'

export default class Login extends Component {
  static propTypes = {
    authenticated: PropTypes.bool,
  };

  static defaultProps = {
    authenticated: false
  };

  constructor (props) {
    super(props);
    this.state = {
      isLogin : props.authenticated
    }
  }

  registerHandle = ()=>{
    alert('show register modal');
  }

  loginHandle = ()=>{
    alert('show login modal');
  }

  render (){
    return this.state.isLogin ? (
      <div>
        <span>已登录</span>
      </div>
    ) : (
      <ul className="nav navbar-nav navbar-right">
        <li onClick={this.registerHandle}>立即注册 | </li> 
        <li onClick={this.loginHandle}>使用帮助</li>
      </ul>
    )
  }
}
