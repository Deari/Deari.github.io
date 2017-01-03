import React, { Component, PropTypes } from 'react'
import './login.scss'

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
      <div className="login-wrapper loginIn">
          <span onClick={this.registerHandle}>注册</span> 
          <span onClick={this.loginHandle}>登录</span>
      </div>
    ) : (
      <div className="login-wrapper logined">
          <img src="http://img1.ffan.com/T1F6xTBvVg1RCvBVdK" />
          <span>退出</span>
      </div>
    )
  }
}
